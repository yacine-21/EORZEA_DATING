import { defineNuxtConfig } from "nuxt";
// nuxt.config.js
export default defineNuxtConfig({
	modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
	server: {
		host: "0.0.0.0"
	}
});
