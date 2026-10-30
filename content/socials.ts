// Social media links.
// An icon only appears on the site when its url is filled in.
// To add one, paste the full link between the quotes, e.g. "https://www.tiktok.com/@uclvolleyball".
// To hide one, set its url back to "".

export type SocialPlatform = "instagram" | "whatsapp" | "tiktok" | "facebook" | "linkedin" | "youtube";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url: string;
};

export const socials: SocialLink[] = [
  // TODO: confirm this is the club's account (@uclvolleyball).
  { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/uclvolleyball/" },
  { platform: "whatsapp", label: "WhatsApp group", url: "https://chat.whatsapp.com/BvK2Fzg9NbyHshjcBSyLcs" },
  // TODO: add the TikTok link if the club has one.
  { platform: "tiktok", label: "TikTok", url: "" },
  // TODO: add the club's own Facebook page link (not facebook.com on its own).
  { platform: "facebook", label: "Facebook", url: "" },
  // TODO: add the LinkedIn page link if the club has one.
  { platform: "linkedin", label: "LinkedIn", url: "" },
  // TODO: add the YouTube channel link if the club has one.
  { platform: "youtube", label: "YouTube", url: "" },
];

export const activeSocials = socials.filter((s) => s.url.trim() !== "");
