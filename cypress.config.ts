import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    video: false,
    fixturesFolder: 'cypress/fixtures'
  },
  env: {},
});
