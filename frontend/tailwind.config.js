/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0B",
        panel: "#121212",
        line: "#2A2A2A",
        gold: "#D4AF37",
        ink: "#F8F2DC",
        muted: "#A68F4A",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(212, 175, 55, 0.2), 0 24px 80px rgba(0, 0, 0, 0.45)",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ['"Manrope"', "sans-serif"],
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(212, 175, 55, 0.16), transparent 30%), radial-gradient(circle at 80% 10%, rgba(255, 255, 255, 0.08), transparent 18%)",
      },
    },
  },
  plugins: [],
};
