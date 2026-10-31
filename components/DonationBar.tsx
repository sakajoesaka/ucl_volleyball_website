import { pixelFont } from "@/lib/fonts";
import { PixelMoustache } from "@/components/PixelMoustache";

const BLOCKS = 20;
const pounds = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

// The Movember fundraising total as a retro game health bar: blocks fill up towards the goal,
// with a little moustache riding along the top.
export function DonationBar({
  raised,
  goal,
  placeholder,
}: {
  raised: number;
  goal: number;
  placeholder?: boolean;
}) {
  const progress = goal > 0 ? Math.min(raised / goal, 1) : 0;
  const filled = Math.round(progress * BLOCKS);
  const percent = Math.round(progress * 100);
  const toGo = Math.max(goal - raised, 0);

  return (
    <div>
      <div className={`${pixelFont.className} pixel-frame mx-[6px] bg-mo-black p-5 text-white sm:p-7 md:p-9`}>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 text-xs leading-relaxed sm:text-sm">
          <p>
            <span className="block text-mo-tan">Raised</span>
            <span className="mt-2 block text-2xl sm:text-3xl md:text-4xl">{pounds.format(raised)}</span>
          </p>
          <p className="text-right">
            <span className="block text-mo-tan">Goal</span>
            <span className="mt-2 block text-lg sm:text-xl md:text-2xl">{pounds.format(goal)}</span>
          </p>
        </div>

        <div
          role="progressbar"
          aria-label="Movember fundraising"
          aria-valuemin={0}
          aria-valuemax={goal}
          aria-valuenow={Math.min(raised, goal)}
          aria-valuetext={`${pounds.format(raised)} raised of a ${pounds.format(goal)} goal`}
          className="relative mt-12"
        >
          {/* The moustache rides along on top of the bar, at the current total. */}
          <div
            className="absolute bottom-full mb-2 -translate-x-1/2"
            style={{ left: `clamp(1.5rem, ${percent}%, calc(100% - 1.5rem))` }}
          >
            <PixelMoustache
              colour="#ffffff"
              highlight="#c08a5a"
              className="h-5 w-12 motion-safe:animate-[mo-bob_0.8s_steps(2)_infinite]"
            />
          </div>
          <div className="flex gap-1 border-4 border-white p-1 sm:gap-1.5 sm:p-1.5">
            {Array.from({ length: BLOCKS }, (_, i) => (
              <span
                key={i}
                className={`h-6 flex-1 sm:h-8 md:h-10 ${
                  i < filled
                    ? "bg-mo-brown shadow-[inset_0_4px_0_var(--color-mo-tan),inset_0_-4px_0_#4a2a14] motion-safe:animate-[pixel-pop_160ms_steps(2)_both]"
                    : "bg-white/10"
                }`}
                style={i < filled ? { animationDelay: `${300 + i * 70}ms` } : undefined}
              />
            ))}
          </div>
        </div>

        <p className="mt-6 flex flex-wrap justify-between gap-x-6 gap-y-2 text-[0.65rem] leading-relaxed text-white/80 sm:text-xs">
          <span>{percent}% complete</span>
          <span>{toGo > 0 ? `${pounds.format(toGo)} to go` : "Goal reached!"}</span>
        </p>
      </div>
      {placeholder && (
        <p className="mt-6 text-sm text-mo-black/70">
          These figures are placeholders until our fundraising page is live.
        </p>
      )}
    </div>
  );
}
