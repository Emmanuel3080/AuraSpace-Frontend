import React from "react";

/**
 * AuraspaceSymbol
 * The custom, recognizable brand mark for Auraspace.
 * Represents an ethereal "Aura" (orbital radiant energy ring) converging
 * with a structural "Space" (apex archway / gathering ground),
 * symbolizing shared experiences, live energy, and human connection.
 */
export const AuraspaceSymbol = ({
  size = 32,
  className = "",
  variant = "gradient", // "gradient" | "violet" | "white" | "monochrome"
  idPrefix = "aura",
}) => {
  const gradId = `${idPrefix}-primary-grad`;
  const ringGradId = `${idPrefix}-ring-grad`;
  const glowId = `${idPrefix}-glow`;

  // Color configurations based on variant
  const isWhite = variant === "white";
  const isMonochrome = variant === "monochrome";

  const circleStroke = isWhite
    ? "#FFFFFF"
    : isMonochrome
    ? "#111827"
    : `url(#${gradId})`;

  const apexStroke = isWhite
    ? "#FFFFFF"
    : isMonochrome
    ? "#111827"
    : `url(#${gradId})`;

  const ringStroke = isWhite
    ? "rgba(255, 255, 255, 0.85)"
    : isMonochrome
    ? "#111827"
    : `url(#${ringGradId})`;

  const ringBackStroke = isWhite
    ? "rgba(255, 255, 255, 0.4)"
    : isMonochrome
    ? "rgba(17, 24, 39, 0.4)"
    : `url(#${ringGradId})`;

  const sparkFill = isWhite
    ? "#FFFFFF"
    : isMonochrome
    ? "#111827"
    : "#F45B69";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
      aria-label="Auraspace Symbol"
    >
      <defs>
        {/* Primary violet-to-indigo gradient */}
        <linearGradient
          id={gradId}
          x1="6"
          y1="8"
          x2="38"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#9D85FF" />
          <stop offset="60%" stopColor="#8065E8" />
          <stop offset="100%" stopColor="#5D3FD3" />
        </linearGradient>

        {/* Dynamic orbital ring gradient blending from violet to coral */}
        <linearGradient
          id={ringGradId}
          x1="4"
          y1="28"
          x2="40"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#8065E8" />
          <stop offset="50%" stopColor="#B378F4" />
          <stop offset="100%" stopColor="#F45B69" />
        </linearGradient>

        {/* Subtle drop filter for ambient aura glow */}
        <filter id={glowId} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodColor="#8065E8"
            floodOpacity="0.25"
          />
        </filter>
      </defs>

      <g filter={variant === "gradient" ? `url(#${glowId})` : undefined}>
        {/* 1. Back segment of the tilted orbital aura ring (passes behind the apex) */}
        <path
          d="M 6.5 24.5 C 5.5 21.5 8 18 14.5 15.5 C 22.5 12.5 32 12.5 36.5 15 C 38 16 38.5 17.5 37.5 19"
          stroke={ringBackStroke}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeDasharray="none"
          opacity="0.85"
        />

        {/* 2. Concentric Aura Halo / Gathering Circle (The 'Space' boundary) */}
        <circle
          cx="22"
          cy="22"
          r="12"
          stroke={circleStroke}
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* 3. The Ascending Architectural Apex (The stylized 'A' of Auraspace) */}
        <path
          d="M 13.5 31.5 L 22 10.5 L 30.5 31.5"
          stroke={apexStroke}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 4. Apex Crossbar / Resonant Horizon */}
        <path
          d="M 17 23.5 L 27 23.5"
          stroke={apexStroke}
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* 5. Front segment of the orbital aura ring (sweeps boldly across the front) */}
        <path
          d="M 37.5 19 C 39 21.5 37 24.5 30.5 27.5 C 22.5 31 12.5 30.5 7.5 27.5 C 5.8 26.3 5.5 25 6.5 24"
          stroke={ringStroke}
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* 6. Central connection spark / focal pulse */}
        <circle cx="22" cy="18" r="1.6" fill={sparkFill} />
      </g>
    </svg>
  );
};

/**
 * AuraspaceLogo
 * Combined Brand Mark + Typographic Wordmark for Auraspace.
 *
 * @param {"dark" | "light" | "white" | "monochrome"} variant
 *        "dark": For light backgrounds (Midnight Navy text + Violet accent)
 *        "light": For dark backgrounds (White text + Violet accent)
 *        "white": Full white for high contrast dark surfaces
 *        "monochrome": Full midnight navy
 * @param {"sm" | "md" | "lg" | "xl"} size
 * @param {boolean} iconOnly - Set true for icon-only usage (mobile, favicon, avatar)
 * @param {string} badge - Optional suffix badge like "Organizer"
 */
export const AuraspaceLogo = ({
  variant = "dark",
  size = "md",
  iconOnly = false,
  badge = null,
  className = "",
  symbolClassName = "",
}) => {
  // Sizing tokens
  const sizeMap = {
    sm: { symbol: 26, text: "text-base", gap: "gap-2" },
    md: { symbol: 32, text: "text-xl", gap: "gap-2.5" },
    lg: { symbol: 38, text: "text-2xl", gap: "gap-3" },
    xl: { symbol: 46, text: "text-3xl", gap: "gap-3.5" },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Color tokens
  const isLightMode = variant === "dark" || variant === "monochrome";
  const textColor = isLightMode ? "text-[#111827]" : "text-white";
  const accentColor =
    variant === "white"
      ? "text-white"
      : variant === "monochrome"
      ? "text-[#111827]"
      : isLightMode
      ? "text-[#8065E8]"
      : "text-[#9D85FF]";

  const symbolVariant =
    variant === "white"
      ? "white"
      : variant === "monochrome"
      ? "monochrome"
      : "gradient";

  return (
    <div
      className={`inline-flex items-center ${currentSize.gap} group select-none ${className}`}
      aria-label="Auraspace"
    >
      {/* Brand Symbol Icon */}
      <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
        <AuraspaceSymbol
          size={currentSize.symbol}
          variant={symbolVariant}
          className={symbolClassName}
          idPrefix={`logo-${variant}-${size}`}
        />
      </div>

      {/* Wordmark */}
      {!iconOnly && (
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-['Plus_Jakarta_Sans'] font-extrabold tracking-tight ${currentSize.text} ${textColor}`}
          >
            Aura<span className={accentColor}>space</span>
          </span>

          {badge && (
            <span
              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                isLightMode
                  ? "bg-[#111827]/5 text-[#111827] border border-[#E9E9E7]"
                  : "bg-white/10 text-white/90 border border-white/15"
              }`}
            >
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AuraspaceLogo;
