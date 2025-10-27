import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import { fontFamily } from "html2canvas/dist/types/css/property-descriptors/font-family";

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react(), tailwindcss() ],

  base: "/",

  build: {
    outDir : "dist"
  }
});
