import { teams } from "./achievements";
import type { SiteImage } from "./images";

// The people on the Committee page, shown in this order.
//
// - To add someone, copy a block and change the details.
// - Text in [square brackets] shows on the site as a placeholder tag.
//   Replace it with the real details (and delete the brackets) when you have them.
// - Photos: save each one as public/images/committee/<file>.jpg, using the name
//   given to photo() below. Until the file exists, the card shows a grey box.
// - Clicking a card opens a panel with their photo and details. `extras` adds more to it.

export type MemberExtras = {
  tagline?: string;
  // Include the quote marks and any attribution, exactly as it should appear.
  quote?: string;
  favourites?: { label: string; value: string }[];
};

export type CommitteeMember = {
  name: string;
  role: string;
  course: string;
  position?: string;
  image: SiteImage;
  extras?: MemberExtras;
};

const photo = (file: string, name: string): SiteImage => ({
  src: `/images/committee/${file}.jpg`,
  alt: `Portrait of ${name}`,
  label: "Photo coming soon",
});

const favourites = (meal: string, song: string, player: string, talent: string) => [
  { label: "Pre-game meal", value: meal },
  { label: "Go-to karaoke song", value: song },
  { label: "Favourite volleyball player", value: player },
  { label: "Useless talent", value: talent },
];

const hevo = "Higher Education Volleyball Officer";
const socialSecretary = "Social Secretary";

const committee: CommitteeMember[] = [
  {
    name: "Henry De Lima",
    role: "President",
    course: "Psychology with Education, 2nd year",
    position: "Outside Hitter",
    image: photo("henry-de-lima", "Henry De Lima"),
    extras: {
      tagline: "Our Pres serving some fun facts",
      favourites: favourites(
        "Sainsbury's meal deal",
        "Anything from Hamilton",
        "Serginho",
        "I can growl really well (ask me to growl)",
      ),
    },
  },
  {
    name: "Izaac Lim",
    role: "Vice President",
    course: "Mathematics and Statistical Science, 2nd year",
    position: "Setter",
    image: photo("izaac-lim", "Izaac Lim"),
    extras: {
      tagline: "Lim-teresting...",
      quote: "“Say less”",
      favourites: favourites("Monster", "Anything One Direction", "Antoine Brizard", "Juggling"),
    },
  },
  {
    name: "Boren Xiao",
    role: "Treasurer",
    course: "Philosophy, Politics & Economics, 2nd year",
    position: "Opposite Hitter",
    image: photo("boren-xiao", "Boren Xiao"),
    extras: {
      tagline: "Boren don't walk when it comes to volleyball",
      quote: "“I swear oppos aren't allowed to tip, set or defend”",
      favourites: favourites(
        "Malatang, medium spicy, from DaGe",
        "Made in China",
        "Darlan Souza",
        "Roadman impression",
      ),
    },
  },
  {
    name: "Gerona Haxhiu",
    role: hevo,
    course: "Crime and Security Science, 3rd year",
    position: "Middle Blocker",
    image: photo("gerona-haxhiu", "Gerona Haxhiu"),
    extras: {
      tagline: "Ger-on-a roll with these choices",
      favourites: favourites(
        "Matcha and dried mango",
        "Beauty and a Beat",
        "Simeon Nikolov",
        "Cat whisperer",
      ),
    },
  },
  {
    name: "Jonathan Davis",
    role: hevo,
    course: "Law, 2nd year",
    position: "Setter",
    image: photo("jonathan-davis", "Jonathan Davis"),
    extras: {
      tagline: "Davis-tatingly hot takes incoming",
      favourites: favourites(
        "A huge bowl of rice",
        "Broken Clocks",
        "Simeon Nikolov",
        "Being able to name all Pokémon",
      ),
    },
  },
  {
    name: "Maria [Surname]",
    role: hevo,
    course: "[Course], 2nd year",
    image: photo("maria", "Maria"),
  },
  {
    name: "Gwyneth Pang",
    role: "Marketing Director",
    course: "Medicine, 2nd year",
    position: "Libero",
    image: photo("gwyneth-pang", "Gwyneth Pang"),
    extras: {
      tagline: "Gwen all is said and done...",
      quote: "“Volleyball is blood, sweat and ecchymosis on my ASIS”",
      favourites: favourites(
        "Leon's aioli chicken rice box",
        "Rewrite the Stars",
        "Ran Takahashi",
        "Can bend backwards in half",
      ),
    },
  },
  {
    name: "Cruz Yu",
    role: socialSecretary,
    course: "Applied Medical Sciences, 3rd year",
    position: "Outside Hitter",
    image: photo("cruz-yu", "Cruz Yu"),
    extras: {
      tagline: "Cruz-ing through these questions",
      quote: "“Life is like the discriminant, so long as you stay positive there will always be solutions”",
      favourites: favourites(
        "Yaya's braised pork rice",
        "If I Ain't Got You",
        "Wilt Chamberlain",
        "I know Chinese lyrics but don't know what they mean",
      ),
    },
  },
  {
    name: "Jane Lee",
    role: socialSecretary,
    course: "Law, 2nd year",
    position: "Middle Blocker",
    image: photo("jane-lee", "Jane Lee"),
    extras: {
      tagline: "Just Lee-ving these here",
      favourites: favourites("Sweets", "Everything JB", "Ishikawa", "Mental memory of Friends lines"),
    },
  },
  {
    name: "Henry Greenwood",
    role: "Welfare Officer",
    course: "Philosophy, 2nd year",
    position: "Outside Hitter",
    image: photo("henry-greenwood", "Henry Greenwood"),
    extras: {
      tagline: "Henry Green-wood you look at these",
      quote: "“Once you were a vegone, now you will be gone” – Immanuel Kant",
      favourites: favourites(
        "Henry De Lima",
        "Sunday – The Cranberries",
        "Francisco Ruiz",
        "I can flare my nose so it looks like I have a duck's bill",
      ),
    },
  },
  {
    name: "Stacey [Surname]",
    role: "Event Coordinator",
    course: "[Course], [Year]",
    position: "[Position]",
    image: photo("stacey", "Stacey"),
    extras: {
      favourites: favourites("[Pre-game meal]", "[Karaoke song]", "[Favourite player]", "[Useless talent]"),
    },
  },
];

// What appears when a captain's card is clicked. Use the name exactly as it's written in achievements.ts.
const captainExtras: Record<string, MemberExtras> = {
  "Hei-Tou Wong": {
    tagline: "Stop Tou-ching the net guys",
    favourites: favourites(
      "Tesco rainbow belts",
      "Lush Life",
      "Yuki Ishikawa",
      "I can pop out my elbow joints and make them look broken (party trick)",
    ),
  },
  "Joe Michael Sakamura Sissons": {
    quote: "“Joe mama”",
    favourites: favourites(
      "Rice",
      "Titanium – Sia",
      "Akihiro Yamauchi",
      "I can do a Joe from Family Guy voice impression",
    ),
  },
  "Ekaterina Komarova": {
    tagline: "Not Kat-ching anyone out here",
    favourites: favourites(
      "Kinder Bueno",
      "Everybody Talks",
      "Jake Sanders",
      "Knowing the Welsh national anthem by heart",
    ),
  },
  "Maayan Biran": {
    tagline: "Can you Maayan-age to wrap your head around these",
    favourites: favourites(
      "Only hungry for the win",
      "Pitch Perfect 2 riff-off",
      "Jean Patry",
      "Travle.earth demon",
    ),
  },
  "Brooke Tluchak": {
    tagline: "Brooking no nonsense here",
    favourites: favourites("Avocado toast or PB&J", "Don't Stop Believin'", "Ahnika Kus", "Juggling"),
  },
  "Gruia Natasta": {
    tagline: "He Gru up with these",
    favourites: favourites(
      "Oatmeal & raisin cookies",
      "Is This Love – Whitesnake",
      "Miguel Ángel López",
      "Slappyball",
    ),
  },
};

// The captains' names and courses come from each team in achievements.ts.
export const captains: CommitteeMember[] = teams.flatMap((team) =>
  team.captains.map((captain) => ({
    name: captain.name,
    role: `${team.name} Captain`,
    course: captain.course,
    position: captain.position,
    image: photo(captain.name.toLowerCase().replace(/[^a-z]+/g, "-"), captain.name),
    extras: captainExtras[captain.name],
  })),
);

// The sections of the Committee page, in order. People are sorted into them by role.
export const committeeGroups: { heading?: string; members: CommitteeMember[] }[] = [
  { members: committee.filter((member) => member.role !== hevo && member.role !== socialSecretary) },
  { heading: "HEVOs", members: committee.filter((member) => member.role === hevo) },
  { heading: "Social Secretary", members: committee.filter((member) => member.role === socialSecretary) },
  { heading: "Captains", members: captains },
];
