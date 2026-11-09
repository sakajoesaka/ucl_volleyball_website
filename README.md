# UCL Volleyball Society Website

The club website: Home, Our Legacy, Committee, What We Offer, Upcoming Events and FAQs.
Built with Next.js, hosted on Vercel.

**All the text, events, photos and links live in the `content/` folder.** You never need to touch anything else to keep the site up to date. Edit the file, save, and push to GitHub. Vercel rebuilds the site automatically within a minute or two.

| To change…                                         | Edit this file                         |
| -------------------------------------------------- | -------------------------------------- |
| Events                                             | `content/events.ts`                    |
| Photos (and the Life at the Club slideshow)        | `content/images.ts` + `public/images/` |
| Social media links                                 | `content/socials.ts`                   |
| WhatsApp/SU links, price, member count, email      | `content/site.ts`                      |
| Teams: achievements, descriptions, captains        | `content/achievements.ts`              |
| Committee page: names, roles, courses, photos      | `content/committee.ts`                 |
| Memberships slideshow (incl. each one's sessions)  | `content/memberships.ts`               |
| Social Membership sessions, socials & trips photos | `content/sessions.ts`                  |
| FAQs                                               | `content/faqs.ts`                      |
| Movember page (fundraising total, goal, links)     | `content/movember.ts`                  |
| Halloween page (photos, costume winners)           | `content/halloween.ts`                 |

**Placeholders:** any text in `[square brackets]` shows on the site as a dashed "placeholder" tag, e.g. `"Gruia [Surname]"`. Replace it with the real details and delete the brackets, e.g. `"Gruia Popescu"`.

Tip: you can edit these files directly on github.com (open the file, click the pencil icon, then "Commit changes"). No coding setup needed.

---

## Add a new event

Open `content/events.ts` and copy an existing block, from `{` to `},`. Paste it inside the list and change the details:

```ts
{
  date: "2027-03-14",          // YYYY-MM-DD
  time: "7pm until late",      // any text
  title: "Boat Ball 2027",
  location: "Tickets and location in the WhatsApp group",
  description: "Our biggest night of the year.",
  featured: true,              // optional: shows it in the "Next Big Event" box
},
```

- The day after its date, an event moves by itself from Upcoming Events to the **Past Events** archive lower down the same page. Delete it from the list to remove it from the archive too.
- To link an event to its own page (like the Halloween social), add `page: "/events/halloween",`. Its archive card then gets a button to that page.
- If several events have `featured: true`, the soonest one goes in the "Next Big Event" box.
- To show a poster or photo on an event's card, save it in `public/images/` and add `image: { src: "/images/your-poster.jpg", alt: "Describe the poster", label: "" },`. Without one, the card shows a purple date graphic.
- If there are no upcoming events, the page says "No upcoming events right now — check the WhatsApp group".
- **Delete the three example events** (marked `example: true`) before the site goes live.

## Add a committee member

Open `content/committee.ts` and copy an existing block:

```ts
{
  name: "Full Name",
  role: "Treasurer",
  year: "2nd year",
  course: "Course name",
  position: "Setter",          // optional: delete the line if they don't play a position
  image: photo("full-name", "Full Name"),
},
```

Members show in the order they appear. To add someone's picture, save it as `public/images/committee/full-name.jpg`, matching the name given to `photo(...)`. Until then, the card shows a "Photo coming soon" box.

## Add a game or result

Open `content/games.ts` and copy an existing block:

```ts
{
  date: "2026-11-04",          // YYYY-MM-DD
  time: "2–4pm",
  team: "Women's 1st Team",
  opponent: "King's W1",
  venue: "Somers Town Leisure Centre",
  score: [3, 1],               // add after the game, OUR sets first
},
```

The Home page shows a Monday-to-Sunday calendar of the current week's games. It moves on to the new week by itself every Monday, so there's no need to delete old games. Leave out `score` for games that haven't been played yet. Once a score is added, the game shows "Won 3–1" (or "Lost") and counts towards the Played and Won totals.

## Swap in real photos

1. Open `content/images.ts`. Each photo has a `src` (its file name), a `label` (what the grey placeholder says) and `alt` (a description for screen readers and Google).
2. Save your photo into the `public/images/` folder **using exactly the file name in `src`**. For example, the women's 1st team photo goes in as `public/images/womens-1st-trophy.jpg`.
3. Update the `alt` text so it describes what's really in your photo.

That's it: the placeholder is replaced automatically. Any size or shape works (the site crops it to fit), but landscape photos around 2000px wide look best. Next.js resizes and compresses them for each device, so they load fast.

To use a different file name, change the `src` in `content/images.ts` to match. The logo (header, footer and browser tab) is `public/images/logo.png`, with the browser-tab versions in `app/icon.png` and `app/apple-icon.png`.

**Life at the Club slideshow (Home page):** the list at the bottom of `content/images.ts` sets which photos appear and in what order.

**Socials & trips photos (What We Offer page):** in `content/sessions.ts`, each social has an `images` list. Add more photos to it and that social shows a mini slideshow when picked. Each one also has a short `description` (shown under the photo) and an `icon` (`"sun"`, `"ship"`, `"trophy"`, `"beer"` or `"mic"`).

## Update team details

Open `content/achievements.ts`. Each team has its achievements, an `about` description (one string per paragraph) and its `captain` (name, course, email). These show when someone taps the team on the Our Legacy page. Once a captain's email is filled in, it becomes a clickable email link.

## Update the Halloween page

Open `content/halloween.ts`:

- **Photos:** the slideshow uses four photos. Save them in `public/images/` as `halloween-costumes.jpg`, `halloween-party.jpg`, `halloween-winners.jpg` and `halloween-night.jpg` (or change the names in `content/images.ts`). To add more, add entries in `content/images.ts` and list them in `photos`.
- **Costume winners:** fill in the names and costumes in `awards`.
- **Date, time and venue:** these come from the Halloween entry in `content/events.ts`.

## Update the Movember page

Open `content/movember.ts`. As donations come in, change `raised` (and `goal` if it moves). Numbers only, in pounds, with no £ sign or commas:

```ts
goal: 1000,
raised: 350,
```

The pixel bar on the Movember page updates itself. Once the figures are real, set `figuresArePlaceholders` to `false` to remove the "placeholder" note. Put the club's Movember team page in `donateUrl` so the Donate buttons go straight to it. The fundraising goals are in `milestones` and the dates are in `calendar`. When Movember is over, set `showOnEventsPage` to `false` to hide the banner on the Upcoming Events page.

## Change the social links

Open `content/socials.ts`. Paste the full link between the quotes:

```ts
{ platform: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@uclvolleyball" },
```

An icon only appears when its `url` is filled in. Set it back to `""` to hide it. Icons are available for Instagram, WhatsApp, TikTok, Facebook, LinkedIn and YouTube.

---

## Still to do

- [ ] Add the real committee email in `content/site.ts` (`contactEmail`). The feedback form sends there.
- [ ] Optional: connect the feedback form to a form service so messages send without opening the visitor's email app. See the `TODO` in `components/FeedbackForm.tsx`.
- [ ] Confirm the Men's 1st Team results in `content/achievements.ts` (1st and 2nd at the same 2025 BUCS Beach event).
- [ ] Update `url` in `content/site.ts` once the site has its final web address (used for link previews and Google).
- [ ] Replace the example events and placeholder photos.
- [ ] Halloween: check the date in `content/events.ts`, and add the photos, the costume winners and a line about the night (`content/halloween.ts`).
- [ ] Movember (`content/movember.ts`): the real total and the club's team page link (`donateUrl`).
- [ ] Fill in the placeholders: team descriptions and captains (`content/achievements.ts`) and team memberships (`content/memberships.ts`).

## For developers

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (run before pushing big changes)
```

- Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion.
- **Page transition:** `components/transition/`. Internal links use `TransitionLink`, which hands the click to `TransitionProvider`. That plays `BallOverlay`: a spinning volleyball appears where you clicked and grows into a purple circle (a CSS clip-path) that covers the screen; the page switches underneath; then the circle shrinks back into a ball that hops and drops out of view. About 1.2s in total (timings at the top of `BallOverlay.tsx`). Keyboard navigation starts it from the centre of the screen. It's a simple fade for users with "reduce motion" switched on, and it never plays on the first page load.
- **Volleyball cursor:** `components/VolleyballCursor.tsx`. Only on devices with a mouse.
- **Events** are filtered on each visit (not at build time), so past events drop off without a redeploy.
- **Placeholders:** `components/Photo.tsx` checks at build time whether each photo exists in `public/images`.
