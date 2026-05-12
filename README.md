# XCrawl Scrape Action

A GitHub Action to scrape web pages using XCrawl Proxy.

## Inputs

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `url` | Yes | — | URL to scrape |
| `api-key` | Yes | — | XCrawl API key |
| `format` | No | `markdown` | Output format |
| `output-file` | No | `scraped-output.md` | Output file path |

## Outputs

| Output | Description |
|--------|-------------|
| `content` | Scraped content |
| `status` | Success or failure |

## Example Usage

```yaml
name: Daily Scrape
on:
  schedule:
    - cron: '0 8 * * *'  # Every day at 8 AM UTC

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Scrape target site
        uses: ./
        with:
          url: 'https://example.com'
          api-key: ${{ secrets.XCRAWL_API_KEY }}
          format: 'markdown'
          output-file: 'daily-data/example.md'

      - name: Commit data
        run: |
          git config user.name "xcrawl-bot"
          git config user.email "bot@xcrawl.com"
          git add daily-data/
          git commit -m "Daily scrape update" || echo "No changes"
          git push
```
