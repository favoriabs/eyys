import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["./app/assets/css/main.css"],

  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Aguafina+Script&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Syne:wght@400..800&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Clash+Display:wght@200..700&display=swap",
        },
      ],

      /**
       * 🔥 Paystack Script Injection (Correct for Nuxt 3/4)
       */
      script: [
        { src: "https://js.paystack.co/v1/inline.js" }
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxt/image"],
});
