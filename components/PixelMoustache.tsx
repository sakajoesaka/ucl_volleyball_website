// A pixel-art handlebar moustache, drawn from a grid. Used on the Movember page and as its cursor.
// "#" is the main colour, "o" a highlight, "." empty. Only the left half is drawn; it's mirrored.
const LEFT_HALF = [
  "##........",
  "#.......##",
  "#....##ooo",
  "##.#######",
  ".#########",
  "..######..",
  "....###...",
];

const rows = LEFT_HALF.map((row) => row + [...row].reverse().join(""));
const width = rows[0].length;
const height = rows.length;

export function PixelMoustache({
  className = "",
  colour = "#2b1a12",
  highlight = "#7a4a26",
}: {
  className?: string;
  colour?: string;
  highlight?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "." ? null : (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1.02}
              height={1.02}
              fill={cell === "o" ? highlight : colour}
            />
          ),
        ),
      )}
    </svg>
  );
}
