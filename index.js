/**
 * XCrawl Scrape — GitHub Action
 * 
 * Scrapes a web page using XCrawl Proxy API
 */

const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const url = core.getInput('url', { required: true });
    const apiKey = core.getInput('api-key', { required: true });
    const format = core.getInput('format') || 'markdown';
    const outputFile = core.getInput('output-file') || 'scraped-output.md';
    const baseUrl = process.env.XCRAWL_API_URL || 'https://api.xcrawl.com/v1';

    core.info(`Scraping: ${url}`);

    const response = await axios.post(
      `${baseUrl}/scrape`,
      { url, format },
      {
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    const data = response.data;
    const content = data.content || JSON.stringify(data);

    // Write output file
    const fs = require('fs');
    const path = require('path');
    const outDir = path.dirname(outputFile);
    if (outDir && outDir !== '.') {
      fs.mkdirSync(outDir, { recursive: true });
    }
    fs.writeFileSync(outputFile, content);

    core.setOutput('content', content);
    core.setOutput('status', 'success');
    core.info(`✅ Scraped ${url} → ${outputFile}`);
  } catch (error) {
    core.setFailed(`Scrape failed: ${error.message}`);
    core.setOutput('status', 'failed');
  }
}

run();
