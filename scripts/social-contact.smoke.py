"""Run with Python Playwright and Chrome against a local business Workers preview."""

import re
import sys
from urllib.parse import urlsplit

from playwright.sync_api import expect, sync_playwright


BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8787").rstrip("/")
assert urlsplit(BASE).hostname == "127.0.0.1", "This test only runs against loopback"
WHATSAPP = "https://wa.me/254754533271"
INSTAGRAM = "https://www.instagram.com/benkai_systems/"


def check_contacts(browser, width, theme):
    mobile = width < 500
    with browser.new_context(
        viewport={"width": width, "height": 900},
        is_mobile=mobile,
        has_touch=mobile,
        reduced_motion="reduce",
        service_workers="block",
    ) as context:
        requests = []

        def intercept(route):
            url = route.request.url
            if url in (WHATSAPP, INSTAGRAM):
                route.fulfill(body="Intercepted social destination", content_type="text/plain")
            elif url.startswith("https://www.googletagmanager.com/gtag/js?"):
                route.fulfill(body="/* Offline GA4 */", content_type="application/javascript")
            elif url == BASE + "/api/chat/analytics":
                route.fulfill(status=204)
            elif url.startswith(BASE + "/") and route.request.method in ("GET", "HEAD"):
                route.continue_()
            else:
                requests.append((route.request.method, urlsplit(url).hostname, urlsplit(url).path))
                route.abort()

        context.route("**/*", intercept)
        context.add_init_script(f"localStorage.setItem('benkai-site-theme', '{theme}')")
        page = context.new_page()
        errors = []
        contact_rsc = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.on("response", lambda r: contact_rsc.append(r) if (
            urlsplit(r.url).path.startswith("/contact") and r.request.headers.get("rsc") == "1"
        ) else None)
        response = page.goto(BASE + "/")
        assert response.ok
        page.wait_for_function("typeof window.gtag === 'function'")
        page.evaluate("window.__socialNavigationProbe = true")

        if mobile:
            page.get_by_role("button", name="Open menu").click()
            nav = page.get_by_role("navigation", name="Mobile navigation")
        else:
            nav = page.get_by_role("navigation", name="Primary navigation")
        contact = nav.locator('a[href="/contact"]')
        # Capture both automatic prefetch and requests triggered on click.
        contact.click()
        expect(page).to_have_url(re.compile(re.escape(BASE + "/contact") + r"/?$"))
        expect(page.get_by_role("heading", name="Instagram", exact=True)).to_be_visible()
        assert page.evaluate("window.__socialNavigationProbe === true")
        assert contact_rsc and all(r.ok for r in contact_rsc), [r.status for r in contact_rsc]
        assert any("text/" in r.headers.get("content-type", "") and "text/html" not in r.headers["content-type"] for r in contact_rsc)
        assert page.evaluate("(document.documentElement.dataset.theme || 'dark')") == theme
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).to_have_count(1)
        assert page.evaluate("dataLayer.filter(args => args[0] === 'config').length") == 1

        page.evaluate("""window.__socialEvents = [];
            window.gtag = (...args) => window.__socialEvents.push(args);""")
        # Wait for the delegated effect, not just the independent GA script.
        page.wait_for_function("""() => {
            const probe = document.createElement('a');
            probe.href = 'tel:000';
            probe.addEventListener('click', event => event.preventDefault());
            document.body.append(probe);
            probe.click();
            probe.remove();
            return window.__socialEvents.some(args => args[1] === 'contact_click');
        }""")
        page.evaluate("window.__socialEvents.length = 0")
        footer = page.locator("footer")
        main = page.locator("main")
        expect(main.get_by_role("heading", name="Location", exact=True)).to_be_visible()
        expect(main.get_by_role("heading", name="Email", exact=True)).to_be_visible()
        expect(main.get_by_role("link", name="0754533271", exact=True)).to_have_attribute("href", "tel:0754533271")
        expect(main.get_by_role("link", name="benkaisystems@gmail.com", exact=True).first).to_have_attribute("href", "mailto:benkaisystems@gmail.com")
        expect(footer.get_by_role("link", name="GitHub", exact=True)).to_be_visible()
        expect(footer.get_by_role("link", name="Email", exact=True)).to_have_attribute("href", "mailto:benkaisystems@gmail.com")
        expect(footer.get_by_role("link", name="Phone: 0754533271", exact=True)).to_have_attribute("href", "tel:0754533271")

        def open_link(link, url, keyboard=False):
            expect(link).to_have_attribute("href", url)
            expect(link).to_have_attribute("target", "_blank")
            assert {"noopener", "noreferrer"} <= set(link.get_attribute("rel").split())
            box = link.bounding_box()
            assert min(box["width"], box["height"]) >= 44
            assert 0 <= box["x"] <= box["x"] + box["width"] <= width
            if keyboard:
                link.focus()
                page.keyboard.press("Shift+Tab")
                page.keyboard.press("Tab")
                expect(link).to_be_focused()
                assert link.evaluate("el => el.matches(':focus-visible') && getComputedStyle(el).boxShadow !== 'none'")
            with page.expect_popup() as popup:
                if keyboard:
                    page.keyboard.press("Enter")
                else:
                    link.click()
            expect(popup.value).to_have_url(url)
            expect(popup.value.locator("body")).to_have_text("Intercepted social destination")
            popup.value.close()

        events = []
        for location, scope in (("page", main), ("footer", footer)):
            open_link(scope.get_by_role("link", name=re.compile("^Chat on WhatsApp")), WHATSAPP, keyboard=not mobile)
            events.append(["event", "contact_click", {"contact_method": "whatsapp", "click_location": location}])
            assert (observed := page.evaluate("window.__socialEvents")) == events, (observed, events)
            name = re.compile("^@benkai_systems" if location == "page" else "^Instagram")
            open_link(scope.get_by_role("link", name=name), INSTAGRAM, keyboard=not mobile)
            assert (observed := page.evaluate("window.__socialEvents")) == events, (observed, events)

        whatsapp = footer.get_by_role("link", name=re.compile("^Chat on WhatsApp"))
        page.evaluate("window.gtag = undefined")
        open_link(whatsapp, WHATSAPP)
        page.evaluate("() => { window.gtag = () => { throw new Error('Offline tracking test'); }; }")
        open_link(whatsapp, WHATSAPP)
        assert page.evaluate("window.__socialEvents") == events
        assert not errors and not requests, (errors, requests)
        print(f"PASS {width}px {theme}: RSC {sorted({r.status for r in contact_rsc})}, four social links, exact events {events}")


with sync_playwright() as playwright:
    with playwright.chromium.launch(channel="chrome", args=["--disable-background-networking"]) as chrome:
        for viewport_width in (320, 390, 1440):
            for color_theme in ("dark", "light"):
                check_contacts(chrome, viewport_width, color_theme)