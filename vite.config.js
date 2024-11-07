import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.png"],
      manifest: {
        name: "Tic-Tac-Toe Game",
        short_name: "Tic-Tac-Toe",
        description: "Tic-Tac-Toe Game",
        theme_color: "#000",
        background_color: "#000",
        display: "standalone",
        start_url: ".",
        icons: [
          {
            src: "icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
