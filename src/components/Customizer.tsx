"use client";

import { useState, useEffect } from "react";

// Types
interface ColorPreset {
  name: string;
  id: string;
  isDark: boolean;
  bg: string;
  card: string;
  text: string;
  accent: string;
  border: string;
}

interface FontPreset {
  name: string;
  id: string;
  sansName: string;
  monoName: string;
  fontUrl: string | null; // null for system/default
  variables: Record<string, string>;
}

// Fixed Color Presets
const COLOR_PRESETS: ColorPreset[] = [
  {
    name: "Current Version (Classic Sand)",
    id: "current",
    isDark: false,
    bg: "#F7F7F4",
    card: "#FFFFFF",
    text: "#111113",
    accent: "#18181c",
    border: "#e4e3de",
  },
  {
    name: "Dark Version (Obsidian Slate)",
    id: "dark-version",
    isDark: true,
    bg: "#111113",
    card: "#17171a",
    text: "#e8e6df",
    accent: "#ffffff",
    border: "#28282c",
  },
  {
    name: "Black & White Combination",
    id: "black-white",
    isDark: false,
    bg: "#FFFFFF",
    card: "#FFFFFF",
    text: "#000000",
    accent: "#000000",
    border: "#000000",
  },
  {
    name: "Black & Cream Combination",
    id: "black-cream",
    isDark: false,
    bg: "#F7F7F4",
    card: "#F7F7F4",
    text: "#111113",
    accent: "#111113",
    border: "#e4e3de",
  },
];

// Font Presets
const FONT_PRESETS: FontPreset[] = [
  {
    name: "Current (JetBrains Mono)",
    id: "current",
    sansName: "DM Sans",
    monoName: "JetBrains Mono",
    fontUrl: null,
    variables: {
      "--font-sans": "var(--font-dm-sans), sans-serif",
      "--font-mono": "var(--font-jetbrains-mono), monospace",
    },
  },
  {
    name: "Inter",
    id: "inter",
    sansName: "Inter",
    monoName: "Inter",
    fontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    variables: {
      "--font-sans": "'Inter', sans-serif",
      "--font-mono": "'Inter', sans-serif",
    },
  },
  {
    name: "Poppins",
    id: "poppins",
    sansName: "Poppins",
    monoName: "Poppins",
    fontUrl: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
    variables: {
      "--font-sans": "'Poppins', sans-serif",
      "--font-mono": "'Poppins', sans-serif",
    },
  },
  {
    name: "Best Option (Fraunces & DM Sans)",
    id: "best-option",
    sansName: "DM Sans",
    monoName: "Fraunces",
    fontUrl: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=DM+Sans:wght@400;500;700&display=swap",
    variables: {
      "--font-sans": "'DM Sans', sans-serif",
      "--font-mono": "'Fraunces', serif",
    },
  },
];

export default function Customizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"colors" | "fonts">("colors");

  // Color states
  const [selectedColorPreset, setSelectedColorPreset] = useState("current");
  const [customBg, setCustomBg] = useState("#F7F7F4");
  const [customCard, setCustomCard] = useState("#FFFFFF");
  const [customText, setCustomText] = useState("#111113");
  const [customAccent, setCustomAccent] = useState("#18181c");
  const [customBorder, setCustomBorder] = useState("#e4e3de");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Font states
  const [fontSizeScale, setFontSizeScale] = useState(1.0);
  const [selectedFontPreset, setSelectedFontPreset] = useState("current");

  // Update specific color values
  const applyColors = (colors: {
    bg: string;
    card: string;
    text: string;
    accent: string;
    border: string;
    isDark: boolean;
  }) => {
    const root = document.documentElement;

    root.style.setProperty("--bg-primary", colors.bg);
    root.style.setProperty("--bg-secondary", colors.card);
    root.style.setProperty("--bg-tertiary", colors.isDark ? "#1f1f23" : "#eceae4");
    root.style.setProperty("--text-primary", colors.text);

    // Dynamic opacities for text shade variables
    root.style.setProperty("--text-secondary", `${colors.text}b3`); // ~70% opacity
    root.style.setProperty("--text-tertiary", `${colors.text}80`);  // ~50% opacity

    root.style.setProperty("--border-default", colors.border);
    root.style.setProperty("--accent-cta", colors.accent);

    // SVG Illustration components
    root.style.setProperty("--svg-linen", colors.bg);
    root.style.setProperty("--svg-paper", colors.card);
    root.style.setProperty("--svg-ink", colors.text);
    root.style.setProperty("--svg-line", colors.border);
    root.style.setProperty("--svg-tint", colors.isDark ? "#1f1f23" : "#eceae4");
    root.style.setProperty("--svg-gray", `${colors.text}80`);

    if (colors.isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // Font adjustments
  const applyFontSize = (scale: number) => {
    setFontSizeScale(scale);
    document.documentElement.style.fontSize = `${scale * 16}px`;
    localStorage.setItem("customizer-font-scale", scale.toString());
  };

  const applyFontPreset = (presetId: string) => {
    const preset = FONT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    if (preset.fontUrl) {
      let linkElement = document.getElementById("customizer-font-link") as HTMLLinkElement;
      if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "customizer-font-link";
        linkElement.rel = "stylesheet";
        document.head.appendChild(linkElement);
      }
      linkElement.href = preset.fontUrl;
    }

    const root = document.documentElement;
    Object.entries(preset.variables).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });

    setSelectedFontPreset(presetId);
    localStorage.setItem("customizer-font-preset", presetId);
  };

  // Load configuration from localstorage on mount
  useEffect(() => {
    try {
      const savedPreset = localStorage.getItem("customizer-color-preset") || "current";
      const savedBg = localStorage.getItem("customizer-bg") || "#F7F7F4";
      const savedCard = localStorage.getItem("customizer-card") || "#FFFFFF";
      const savedText = localStorage.getItem("customizer-text") || "#111113";
      const savedAccent = localStorage.getItem("customizer-accent") || "#18181c";
      const savedBorder = localStorage.getItem("customizer-border") || "#e4e3de";
      const savedDark = localStorage.getItem("customizer-dark") === "true";

      const savedScale = parseFloat(localStorage.getItem("customizer-font-scale") || "1.0");
      const savedFont = localStorage.getItem("customizer-font-preset") || "current";

      setSelectedColorPreset(savedPreset);
      setCustomBg(savedBg);
      setCustomCard(savedCard);
      setCustomText(savedText);
      setCustomAccent(savedAccent);
      setCustomBorder(savedBorder);
      setIsDarkMode(savedDark);
      setFontSizeScale(savedScale);
      setSelectedFontPreset(savedFont);

      // Apply initial theme settings
      applyColors({
        bg: savedBg,
        card: savedCard,
        text: savedText,
        accent: savedAccent,
        border: savedBorder,
        isDark: savedDark,
      });

      applyFontSize(savedScale);
      applyFontPreset(savedFont);
    } catch (e) {
      console.error("Customizer load settings error:", e);
    }
  }, []);

  const handleSelectPreset = (presetId: string) => {
    const preset = COLOR_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setSelectedColorPreset(presetId);
    setCustomBg(preset.bg);
    setCustomCard(preset.card);
    setCustomText(preset.text);
    setCustomAccent(preset.accent);
    setCustomBorder(preset.border);
    setIsDarkMode(preset.isDark);

    applyColors({
      bg: preset.bg,
      card: preset.card,
      text: preset.text,
      accent: preset.accent,
      border: preset.border,
      isDark: preset.isDark,
    });

    localStorage.setItem("customizer-color-preset", presetId);
    localStorage.setItem("customizer-bg", preset.bg);
    localStorage.setItem("customizer-card", preset.card);
    localStorage.setItem("customizer-text", preset.text);
    localStorage.setItem("customizer-accent", preset.accent);
    localStorage.setItem("customizer-border", preset.border);
    localStorage.setItem("customizer-dark", preset.isDark ? "true" : "false");
  };

  const handleCustomColorChange = (key: string, value: string) => {
    setSelectedColorPreset("custom");
    localStorage.setItem("customizer-color-preset", "custom");

    let updatedBg = customBg;
    let updatedCard = customCard;
    let updatedText = customText;
    let updatedAccent = customAccent;
    let updatedBorder = customBorder;
    let updatedDark = isDarkMode;

    if (key === "bg") {
      setCustomBg(value);
      updatedBg = value;
      localStorage.setItem("customizer-bg", value);
    } else if (key === "card") {
      setCustomCard(value);
      updatedCard = value;
      localStorage.setItem("customizer-card", value);
    } else if (key === "text") {
      setCustomText(value);
      updatedText = value;
      localStorage.setItem("customizer-text", value);
    } else if (key === "accent") {
      setCustomAccent(value);
      updatedAccent = value;
      localStorage.setItem("customizer-accent", value);
    } else if (key === "border") {
      setCustomBorder(value);
      updatedBorder = value;
      localStorage.setItem("customizer-border", value);
    } else if (key === "dark") {
      const val = value === "true";
      setIsDarkMode(val);
      updatedDark = val;
      localStorage.setItem("customizer-dark", value);
    }

    applyColors({
      bg: updatedBg,
      card: updatedCard,
      text: updatedText,
      accent: updatedAccent,
      border: updatedBorder,
      isDark: updatedDark,
    });
  };


  const handleReset = () => {
    handleSelectPreset("current");
    applyFontSize(1.0);
    applyFontPreset("current");
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-ink text-paper border border-line rounded-none shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
        aria-label="Open style customizer"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.63-.77 1.63-1.7 0-.42-.16-.83-.44-1.14-.28-.31-.44-.72-.44-1.15 0-.93.77-1.69 1.7-1.69h2.83C20.1 16.32 22 14.36 22 12c0-5.5-4.5-10-10-10z"/>
        </svg>
      </button>

      {/* Style Switcher Drawer */}
      <div
        className={`fixed top-0 right-0 w-[350px] z-50 bg-paper border-l border-line shadow-[0_0_50px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out select-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ height: '100vh' }}
      >
        {/* Header (Static) */}
        <div className="p-5 border-b border-line flex items-center justify-between" style={{ flexShrink: 0 }}>
          <div>
            <h2 className="font-mono text-[0.875rem] font-bold text-ink uppercase tracking-wider">
              Style Customizer
            </h2>
            <p className="text-[0.6875rem] font-mono text-ink-3 uppercase tracking-tight mt-0.5">
              Live Preview controls
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-ink-2 hover:text-ink hover:bg-tint transition-colors duration-200 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab switch buttons (Static) */}
        <div className="flex border-b border-line" style={{ flexShrink: 0 }}>
          <button
            onClick={() => setActiveTab("colors")}
            className={`flex-1 py-3 font-mono text-[0.75rem] uppercase tracking-wider text-center border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === "colors"
                ? "border-ink text-ink font-bold"
                : "border-transparent text-ink-3 hover:text-ink-2"
            }`}
          >
            Color Palette
          </button>
          <button
            onClick={() => setActiveTab("fonts")}
            className={`flex-1 py-3 font-mono text-[0.75rem] uppercase tracking-wider text-center border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === "fonts"
                ? "border-ink text-ink font-bold"
                : "border-transparent text-ink-3 hover:text-ink-2"
            }`}
          >
            Typography
          </button>
        </div>

        {/* Scrollable content container — scroll trapped inside panel */}
        <div
          className="p-5 space-y-6"
          style={{
            height: 'calc(100vh - 189px)',
            overflowY: 'scroll',
            overflowX: 'hidden',
            overscrollBehavior: 'contain',
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {activeTab === "colors" ? (
            <>
              {/* Group combinations */}
              <div className="space-y-3">
                <p className="text-[0.6875rem] font-mono text-ink-3 uppercase tracking-wider font-bold">
                  Color Preset Groups
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset.id)}
                      className={`w-full flex items-center gap-3.5 p-3.5 border text-left transition-all duration-200 cursor-pointer ${
                        selectedColorPreset === preset.id
                          ? "border-ink bg-tint shadow-[3px_3px_0px_0px_var(--color-line)]"
                          : "border-line bg-paper hover:bg-tint/40"
                      }`}
                    >
                      {/* Swatch swatch */}
                      <div
                        className="w-8 h-8 border border-line flex items-center justify-center shrink-0"
                        style={{ backgroundColor: preset.bg }}
                      >
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: preset.accent }}
                        >
                          <span
                            className="text-[8px] font-mono font-bold"
                            style={{ color: preset.text }}
                          >
                            a
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[0.72rem] font-bold text-ink uppercase tracking-wide">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color pickers */}
              <div className="space-y-4 border-t border-line/65 pt-5">
                <p className="text-[0.6875rem] font-mono text-ink-3 uppercase tracking-wider font-bold">
                  Customize Colors
                </p>

                <div className="space-y-3">
                  {/* Background picker */}
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-[0.75rem] text-ink uppercase">Page Background</label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.6875rem] text-ink-2 select-all">{customBg}</span>
                      <input
                        type="color"
                        value={customBg}
                        onChange={(e) => handleCustomColorChange("bg", e.target.value)}
                        className="w-8 h-8 border border-line cursor-pointer p-0"
                      />
                    </div>
                  </div>

                  {/* Card Background picker */}
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-[0.75rem] text-ink uppercase">Card Background</label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.6875rem] text-ink-2 select-all">{customCard}</span>
                      <input
                        type="color"
                        value={customCard}
                        onChange={(e) => handleCustomColorChange("card", e.target.value)}
                        className="w-8 h-8 border border-line cursor-pointer p-0"
                      />
                    </div>
                  </div>

                  {/* Text picker */}
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-[0.75rem] text-ink uppercase">Primary Text</label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.6875rem] text-ink-2 select-all">{customText}</span>
                      <input
                        type="color"
                        value={customText}
                        onChange={(e) => handleCustomColorChange("text", e.target.value)}
                        className="w-8 h-8 border border-line cursor-pointer p-0"
                      />
                    </div>
                  </div>

                  {/* Accent picker */}
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-[0.75rem] text-ink uppercase">Accent / CTA</label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.6875rem] text-ink-2 select-all">{customAccent}</span>
                      <input
                        type="color"
                        value={customAccent}
                        onChange={(e) => handleCustomColorChange("accent", e.target.value)}
                        className="w-8 h-8 border border-line cursor-pointer p-0"
                      />
                    </div>
                  </div>

                  {/* Border picker */}
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-[0.75rem] text-ink uppercase">Borders</label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.6875rem] text-ink-2 select-all">{customBorder}</span>
                      <input
                        type="color"
                        value={customBorder}
                        onChange={(e) => handleCustomColorChange("border", e.target.value)}
                        className="w-8 h-8 border border-line cursor-pointer p-0"
                      />
                    </div>
                  </div>

                  {/* Dark Mode toggle */}
                  <div className="flex items-center justify-between pt-2">
                    <label className="font-mono text-[0.75rem] text-ink uppercase">Force Dark Mode</label>
                    <input
                      type="checkbox"
                      checked={isDarkMode}
                      onChange={(e) => handleCustomColorChange("dark", e.target.checked ? "true" : "false")}
                      className="w-4 h-4 cursor-pointer accent-ink"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Font Size multiplier section */}
              <div className="space-y-4">
                <p className="text-[0.6875rem] font-mono text-ink-3 uppercase tracking-wider font-bold">
                  Scale Font Size
                </p>

                {/* Quick size scale buttons */}
                <div className="grid grid-cols-4 gap-1.5">
                  {[1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.5, 3.0].map((scale) => (
                    <button
                      key={scale}
                      onClick={() => applyFontSize(scale)}
                      className={`py-1.5 border font-mono text-[0.68rem] tracking-tight uppercase cursor-pointer transition-all duration-200 text-center ${
                        fontSizeScale === scale
                          ? "border-ink bg-ink text-paper font-bold"
                          : "border-line bg-paper text-ink hover:bg-tint"
                      }`}
                    >
                      {scale === 1.0 ? "1.0x" : `${scale}x`}
                    </button>
                  ))}
                </div>

                {/* Custom size inputs */}
                <div className="space-y-2 border border-line p-3 bg-tint/15">
                  <div className="flex justify-between items-center text-[0.6875rem] font-mono text-ink-2">
                    <span>CUSTOM SCALE:</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="1.0"
                        max="3.0"
                        step="0.05"
                        value={fontSizeScale}
                        onChange={(e) => applyFontSize(parseFloat(e.target.value) || 1.0)}
                        className="w-12 h-6 border border-line bg-paper text-center font-mono text-[0.75rem] text-ink p-0"
                      />
                      <span>x</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="3.0"
                    step="0.05"
                    value={fontSizeScale}
                    onChange={(e) => applyFontSize(parseFloat(e.target.value))}
                    className="w-full h-1 bg-line rounded-none appearance-none cursor-pointer accent-ink"
                  />
                </div>
              </div>

              {/* Font Selection preset */}
              <div className="space-y-3 border-t border-line/65 pt-5">
                <p className="text-[0.6875rem] font-mono text-ink-3 uppercase tracking-wider font-bold">
                  Select Typography
                </p>

                <div className="space-y-2">
                  {FONT_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyFontPreset(preset.id)}
                      className={`w-full p-3.5 border text-left transition-all duration-200 cursor-pointer flex flex-col gap-1.5 ${
                        selectedFontPreset === preset.id
                          ? "border-ink bg-tint shadow-[3px_3px_0px_0px_var(--color-line)]"
                          : "border-line bg-paper hover:bg-tint/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[0.72rem] font-bold text-ink uppercase tracking-wide">
                          {preset.name}
                        </span>
                        {selectedFontPreset === preset.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-ink shrink-0" />
                        )}
                      </div>

                      <div className="flex gap-2 justify-between items-center border-t border-line/50 pt-1.5 text-[0.65rem] font-mono text-ink-3">
                        <span>Sans: {preset.sansName}</span>
                        <span>Mono: {preset.monoName}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer buttons (Static) */}
        <div className="p-5 border-t border-line flex gap-3" style={{ flexShrink: 0 }}>
          <button
            onClick={handleReset}
            className="flex-1 py-2.5 border border-line text-ink font-mono text-[0.75rem] uppercase tracking-wider hover:bg-tint transition-all duration-200 cursor-pointer text-center"
          >
            Reset Style
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 py-2.5 bg-ink text-paper font-mono text-[0.75rem] uppercase tracking-wider hover:bg-ink/90 transition-all duration-200 cursor-pointer text-center"
          >
            Close Panel
          </button>
        </div>
      </div>
    </>
  );
}
