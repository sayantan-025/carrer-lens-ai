import React from "react";
const companies = [
  "Google",
  "Meta",
  "Amazon",
  "Microsoft",
  "Netflix",
  "Apple",
  "Stripe",
  "Vercel",
  "OpenAI",
  "Anthropic",
];

const InfiniteMarquee = () => {
  // Repeating the array 4 times ensures the marquee covers ultra-wide screens seamlessly.
  const repeatedCompanies = [
    ...companies,
    ...companies,
    ...companies,
    ...companies,
  ];

  return (
    <div className="w-full overflow-hidden py-16 relative flex items-center bg-transparent z-20">
      <div className="absolute left-0 top-0 w-32 md:w-64 h-full  z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-32 md:w-64 h-full  z-10 pointer-events-none"></div>

      <div className="flex w-max animate-[marquee_50s_linear_infinite] hover:[animation-play-state:paused]">
        {repeatedCompanies.map((company, i) => (
          <div
            key={i}
            className="px-12 text-2xl md:text-3xl font-display font-bold text-white/10 tracking-tighter transition-all hover:text-brand-neon/40 hover:scale-110 cursor-default whitespace-nowrap"
          >
            {company}
          </div>
        ))}
      </div>
    </div>
  );
};
export default InfiniteMarquee;
