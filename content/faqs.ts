import { site } from "./site";

// Questions on the FAQs page.
// `button` (optional) shows a button directly under that answer.
// Links starting with "/" go to a page on this site.

export type Faq = {
  question: string;
  answer: string[];
  button?: { label: string; href: string };
};

export const faqs: Faq[] = [
  {
    question: "How do I join?",
    answer: [
      `Buy the ${site.membershipName} on the Students' Union UCL website. Everyone is welcome, whatever your level.`,
    ],
    button: { label: "Join the Society", href: site.joinUrl },
  },
  {
    question: "Do I need to know how to play?",
    answer: [
      "Not at all. Lots of our members had never played volleyball before joining, and our sessions are built for complete beginners as well as experienced players.",
    ],
  },
  {
    question: "How do I go to indoor sessions?",
    answer: [
      `After buying the ${site.membershipName}, send your proof of purchase to a committee member. You'll find them in our WhatsApp group.`,
      "They'll add you to a separate group where free tickets for each session are released. A ticket guarantees your spot.",
    ],
    button: { label: "Join our WhatsApp", href: site.whatsappUrl },
  },
  {
    question: "How do I join the Team UCL social league?",
    answer: [
      "The social league is run by Team UCL, not by the society, so please contact Team UCL directly.",
    ],
  },
  {
    question: "What does membership cost and include?",
    answer: [
      `The ${site.membershipName} costs ${site.membershipPrice} per year. It covers three indoor sessions every week and every social event, which is everything on the What We Offer page.`,
    ],
    button: { label: "See What We Offer", href: "/what-we-offer" },
  },
];
