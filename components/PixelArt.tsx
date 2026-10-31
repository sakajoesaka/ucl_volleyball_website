// Little pixel-art pictures for the themed event pages (and their cursors), drawn from text grids.
// Each character in a row is one pixel: "." is empty, any other character is looked up in `palette`.

export type Sprite = { rows: string[]; palette: Record<string, string> };

// Only the left half is written out; the right half is its mirror image.
const mirror = (half: string[]) => half.map((row) => row + [...row].reverse().join(""));

// Handlebar moustache, for Movember.
export const moustache = (colour = "#2b1a12", highlight = "#7a4a26"): Sprite => ({
  rows: mirror([
    "##........",
    "#.......##",
    "#....##ooo",
    "##.#######",
    ".#########",
    "..######..",
    "....###...",
  ]),
  palette: { "#": colour, o: highlight },
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
