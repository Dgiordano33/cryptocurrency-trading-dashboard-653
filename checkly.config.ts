import { defineConfig } from '@checkly/cli';

export default defineConfig({
  projectName: 'Crypto Dashboard',
  logicalId: 'crypto-dashboard',
  repoUrl: 'https://github.com/your-repo/crypto-dashboard',
  accountId: 'aef047d0-6519-49eb-b651-f12aea78b041',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10',
    frequency: 5,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website', 'crypto'],
    alertChannels: [],
    checkMatch: '**/__checks__/**/*.check.ts',
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: 10,
      testMatch: '**/__checks__/**/*.spec.ts',
    },
  },
  cli: {
    runLocation: 'eu-west-1',
  },
});