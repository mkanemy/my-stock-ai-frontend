const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "video": false,
    defaultCommandTimeout: 50000,
    execTimeout: 50000,
    taskTimeout: 50000,
    pageLoadTimeout: 50000,
    requestTimeout: 50000,
    responseTimeout: 50000,
  },
});
