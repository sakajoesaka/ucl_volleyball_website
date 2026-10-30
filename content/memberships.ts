import { site } from "./site";

// Memberships shown in the slideshow on the What We Offer page, in order.
// Text in [square brackets] shows on the site as a placeholder tag.
// Replace it with the real details (and delete the brackets) when you have them.

export type Membership = {
  name: string;
  price: string;
  period: string;
  description: string;
  includes: string[];
  // Where the "Join" button goes. Change it if a team membership has its own SU page.
  joinUrl: string;
};

export const memberships: Membership[] = [
  {
    name: site.membershipName,
    price: site.membershipPrice,
    period: "per year",
    description: "For everyone, from complete beginners to experienced players.",
    includes: ["Three indoor sessions every week", "Every social event"],
    joinUrl: site.joinUrl,
  },
  {
    name: "1st Team Membership",
    price: "[Price]",
    period: "per year",
    description: "[Placeholder: who this membership is for and how to get in.]",
    includes: [
      "[Number of training sessions per week]",
      "[Coaches]",
      "[Matches and leagues]",
      "[Anything else included]",
    ],
    joinUrl: site.joinUrl,
  },
  {
    name: "2nd Team Membership",
    price: "[Price]",
    period: "per year",
    description: "[Placeholder: who this membership is for and how to get in.]",
    includes: [
      "[Number of training sessions per week]",
      "[Coaches]",
      "[Matches and leagues]",
      "[Anything else included]",
    ],
    joinUrl: site.joinUrl,
  },
  {
    name: "Mixed Team Membership",
    price: "[Price]",
    period: "per year",
    description: "[Placeholder: who this membership is for and how to get in.]",
    includes: [
      "[Number of training sessions per week]",
      "[Coaches]",
      "[Matches and leagues]",
      "[Anything else included]",
    ],
    joinUrl: site.joinUrl,
  },
];
