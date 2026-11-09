// General club details used across the whole site.
// Edit the text in quotes. Keep the quotes and commas.

export const site = {
  name: "UCL Volleyball",
  fullName: "UCL Volleyball Society",
  description:
    "UCL Volleyball Society: a welcoming, competitive and social volleyball club at University College London. All levels welcome, with three indoor sessions a week, five teams, socials and trips.",

  // TODO: change this to the real address once the site is live (e.g. a custom domain).
  // It is used to build link previews for WhatsApp and Instagram.
  url: "https://uclvolleyball.vercel.app",

  whatsappUrl: "https://chat.whatsapp.com/BvK2Fzg9NbyHshjcBSyLcs",
  joinUrl: "https://studentsunionucl.org/clubs-societies/volleyball-club",

  // TODO: replace with the committee's real email address.
  // The feedback form on the home page sends messages here.
  contactEmail: "committee@example.com",

  // The main (non-team) membership, used across the site and the FAQs.
  membershipName: "Social Membership",
  membershipPrice: "£80",
  memberCount: "200+",
  foundedYear: 1996,
  copyright: "© 2026 UCL Volleyball Society",
};

// The links in the menu bar, in order.
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/our-legacy", label: "Our Legacy" },
  { href: "/committee", label: "Committee" },
  { href: "/what-we-offer", label: "What We Offer" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/faqs", label: "FAQs" },
] as const;
