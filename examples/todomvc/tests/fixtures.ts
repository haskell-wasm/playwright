/* eslint-disable notice/notice */

import { test as baseTest } from '@playwright/test';
import path from 'node:path';
import { promises as fs } from 'node:fs';

export { expect } from '@playwright/test';

const mimeByExtension: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.wasm': 'application/wasm',
  '.ico': 'image/x-icon',
};

export const test = baseTest.extend({
  agentOptions: {
    provider: {
      api: 'anthropic',
      apiKey: process.env.AZURE_SONNET_API_KEY!,
      apiEndpoint: process.env.AZURE_SONNET_ENDPOINT!,
      model: 'claude-sonnet-4-5',
    },
  },
  page: async ({ page }, use) => {
    const distDir = process.env.TODOMVC_DIST_DIR;
    if (!distDir) {
      throw new Error('TODOMVC_DIST_DIR must be set to use the TodoMVC fixtures.');
    }

    await page.route('**/*', async route => {
      const requestUrl = route.request().url();
      let url: URL;
      try {
        url = new URL(requestUrl);
      } catch {
        await route.continue();
        return;
      }

      if (url.origin !== 'http://localhost') {
        await route.continue();
        return;
      }

      const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
      const filePath = path.join(distDir, pathname);

      try {
        const body = await fs.readFile(filePath);
        const contentType = mimeByExtension[path.extname(filePath)] ?? 'application/octet-stream';
        await route.fulfill({
          status: 200,
          body,
          headers: {
            'content-type': contentType,
          },
        });
      } catch (error: any) {
        if (error?.code === 'ENOENT') {
          await route.fulfill({
            status: 404,
            body: 'Not Found',
          });
          return;
        }

        throw error;
      }
    });

    await page.goto('http://localhost');
    await use(page);
  },
});
