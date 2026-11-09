import type { SiteImage } from "./images";

// The people on the Committee page, shown in this order.
//
// - To add someone, copy a block and change the details.
// - Text in [square brackets] shows on the site as a placeholder tag.
//   Replace it with the real details (and delete the brackets) when you have them.
// - Photos: save each one as public/images/committee/<file>.jpg, using the name
//   given to photo() below. Until the file exists, the card shows a grey box.

export type CommitteeMember = {
  name: string;
  role: string;
  year: string;
  course: string;
  position?: string;
  image: SiteImage;
};

const photo = (file: string, name: string): SiteImage => ({
  src: `/images/committee/${file}.jpg`,
  alt: `Portrait of ${name}`,
  label: "Photo coming soon",
});

const hevo = "Higher Education Volleyball Officer";

export const committee: CommitteeMember[] = [
  {
    name: "Henry De Lima",
    role: "President",
    year: "2nd year",
    course: "Psychology with Education",
    position: "Outside Hitter",
    image: photo("henry-de-lima", "Henry De Lima"),
  },
  {
    name: "Gerona Haxhiu",
    role: hevo,
    year: "3rd year",
    course: "Crime and Security Science",
    position: "Middle Blocker",
    image: photo("gerona-haxhiu", "Gerona Haxhiu"),
  },
  {
    name: "Jonathan Davis",
    role: hevo,
    year: "2nd year",
    course: "Law",
    position: "Setter",
    image: photo("jonathan-davis", "Jonathan Davis"),
  },
  {
    name: "Maria [Surname]",
    role: hevo,
    year: "2nd year",
    course: "[Course]",
    image: photo("maria", "Maria"),
  },
];
