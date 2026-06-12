const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity:false,
  defaultCommandTimeout: 10000,
  requestTimeout: 30000,

  retries: 2,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'https://hat-arootah-web-24408-staging.botics.co',
  },
});
