export interface SocialLinks {
  github?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: { url: string; handle: string };
}

export const social: SocialLinks = {
  github: "https://github.com/kamaubenjamin",
  email: "benkaisystems@gmail.com",
  phone: "0754533271",
  whatsapp: "https://wa.me/254754533271",
  instagram: {
    url: "https://www.instagram.com/benkai_systems/",
    handle: "@benkai_systems",
  },
  // Add remaining URLs here when available:
  // linkedin: "https://linkedin.com/in/benjamin-kamau",
};