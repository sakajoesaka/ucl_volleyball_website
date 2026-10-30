import { activeSocials } from "@/content/socials";
import { BrandIcon } from "@/components/BrandIcon";

// One row of social icons. Only accounts with a link in content/socials.ts are shown.
export function SocialIcons({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  if (activeSocials.length === 0) return null;

  const toneClasses =
    tone === "light"
      ? "bg-white/10 text-white hover:bg-lilac hover:text-brand-950"
      : "bg-lilac-100 text-brand hover:bg-brand hover:text-white";

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {activeSocials.map((social) => (
        <li key={social.platform}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.label} (opens in a new tab)`}
            className={`flex size-11 items-center justify-center rounded-full transition-colors duration-200 ${toneClasses}`}
          >
            <BrandIcon platform={social.platform} className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
