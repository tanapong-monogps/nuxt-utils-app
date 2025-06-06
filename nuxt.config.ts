// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  modules: [["@pinia/nuxt", { autoImports: ["defineStore"] }]],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
