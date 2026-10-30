# UCL Volleyball Society Website

The club website: Home, Our Legacy, What We Offer, Upcoming Events and FAQs.
Built with Next.js, hosted on Vercel.

**All the text, events, photos and links live in the `content/` folder.** You never need to touch anything else to keep the site up to date. Edit the file, save, and push to GitHub. Vercel rebuilds the site automatically within a minute or two.

| To change…                                  | Edit this file           |
| ------------------------------------------- | ------------------------ |
| Events                                      | `content/events.ts`      |
| Photos                                      | `content/images.ts` + `public/images/` |
| Social media links                          | `content/socials.ts`     |
| WhatsApp/SU links, price, contact email     | `content/site.ts`        |
| Team achievements                           | `content/achievements.ts` |
| Weekly sessions and socials list            | `content/sessions.ts`    |
| FAQs                                        | `content/faqs.ts`        |

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

- Events disappear by themselves the day after their date, so you don't need to delete old ones.
- If several events have `featured: true`, the soonest one goes in the "Next Big Event" box.
- If there are no upcoming events, the page says "No upcoming events right now — check the WhatsApp group".
- **Delete the three example events** (marked `example: true`) before the site goes live.

## Swap in real photos

1. Open `content/images.ts`. Each photo has a `src` (its file name), a `label` (what the grey placeholder says) and `alt` (a description for screen readers and Google).
2. Save your photo into the `public/images/` folder **using exactly the file name in `src`**. For example, the women's 1st team photo goes in as `public/images/womens-1st-trophy.jpg`.
3. Update the `alt` text so it describes what's really in your photo.

That's it: the placeholder is replaced automatically. Any size or shape works (the site crops it to fit), but landscape photos around 2000px wide look best. Next.js resizes and compresses them for each device, so they load fast.

To use a different file name, change the `src` in `content/images.ts` to match. The footer logo is `public/images/logo.png`.

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

## For developers

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (run before pushing big changes)
```

- Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion.
- **Page transition:** `components/transition/`. Internal links use `TransitionLink`, which hands the click to `TransitionProvider`. That plays `SpikeOverlay` (stick figure spikes, ball fills the screen), navigates while the screen is covered, then reveals the new page. About 0.9s in total. It's a simple fade for users with "reduce motion" switched on, and it never plays on the first page load.
- **Volleyball cursor:** `components/VolleyballCursor.tsx`. Only on devices with a mouse.
- **Events** are filtered on each visit (not at build time), so past events drop off without a redeploy.
- **Placeholders:** `components/Photo.tsx` checks at build time whether each photo exists in `public/images`.
