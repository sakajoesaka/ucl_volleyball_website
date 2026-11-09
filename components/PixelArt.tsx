// Little pixel-art pictures for the themed event pages (and their cursors), drawn from text grids.
// Each character in a row is one pixel: "." is empty, any other character is looked up in `palette`.

export type Sprite = { rows: string[]; palette: Record<string, string> };

// Only the left half is written out; the right half is its mirror image.
const mirror = (half: string[]) => half.map((row) => row + [...row].reverse().join(""));

// Handlebar moustache, for Movember.
export const moustache = (colour = "#2b1a12"): Sprite => ({
  rows: mirror([
    "##........",
    "#.......##",
    "#....#####",
    "##.#######",
    ".#########",
    "..######..",
    "....###...",
  ]),
  palette: { "#": colour },
});

// Jack-o'-lantern, for Halloween.
export const pumpkin: Sprite = {
  rows: [
    ".....gg......",
    "......g......",
    "..oodooodoo..",
    ".ooodooodooo.",
    "ooooooooooooo",
    "ooyyyoooyyyoo",
    "oooyoooooyooo",
    "oooooyyyooooo",
    "oyyyyyyyyyyyo",
    "ooyyoyyyoyyoo",
    ".ooodooodooo.",
    "..oodooodoo..",
  ],
  palette: { o: "#ff7a1a", d: "#d9480f", y: "#ffd23f", g: "#5b8c2a" },
};

export const ghost: Sprite = {
  rows: [
    "....####....",
    "..########..",
    ".##########.",
    ".##########.",
    "###kk##kk###",
    "###kk##kk###",
    "############",
    "#####kk#####",
    "#####kk#####",
    "############",
    "############",
    "##.###.###.#",
    "#...#...#...",
  ],
  palette: { "#": "#f5ecd7", k: "#120b1a" },
};

export const bat: Sprite = {
  rows: [
    "b.............b",
    "bb....b.b....bb",
    "bbb..bbbbb..bbb",
    "bbbbbbbbbbbbbbb",
    ".bbbbbbybbbbbb.",
    "..bb.bbbbb.bb..",
    "......b.b......",
  ],
  palette: { b: "#05030a", y: "#ffd23f" },
};

// Full moon with craters and a faint glow, drawn from circles, for Halloween.
export const moon: Sprite = (() => {
  const radius = 11;
  const size = 2 * (radius + 2) + 1;
  const centre = (size - 1) / 2;
  const craters = [
    { x: centre - 4, y: centre - 4, r: 2.4 },
    { x: centre + 4, y: centre + 1, r: 1.8 },
    { x: centre - 3, y: centre + 5, r: 1.3 },
    { x: centre + 1, y: centre - 7, r: 1 },
  ];
  const within = (x: number, y: number, cx: number, cy: number, r: number) =>
    (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
  const rows = Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) => {
      if (within(x, y, centre, centre, radius)) {
        return craters.some((c) => within(x, y, c.x, c.y, c.r)) ? "c" : "#";
      }
      return within(x, y, centre, centre, radius + 1.6) ? "h" : ".";
    }).join(""),
  );
  // The glow is a solid colour (not see-through), so overlapping pixels never show seams.
  return { rows, palette: { "#": "#f5ecd7", c: "#ddd0b2", h: "#35303c" } };
})();

export function PixelArt({ sprite, className = "" }: { sprite: Sprite; className?: string }) {
  const { rows, palette } = sprite;
  return (
    <svg
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "." ? null : (
            // Slightly over 1 so neighbouring pixels never show a hairline gap.
            <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={palette[cell]} />
          ),
        ),
      )}
    </svg>
  );
}
