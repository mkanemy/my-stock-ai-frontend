const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "video": false,
    defaultCommandTimeout: 20000,
    execTimeout: 20000,
    taskTimeout: 20000,
    pageLoadTimeout: 20000,
    requestTimeout: 20000,
    responseTimeout: 20000,
  },
});
