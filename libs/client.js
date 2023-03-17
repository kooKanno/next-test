import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'ou7qoyv2zw',
  apiKey: process.env.API_KEY,
});