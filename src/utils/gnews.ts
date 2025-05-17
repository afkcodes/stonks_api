import Sentiment from 'sentiment';
import { parseStringPromise } from 'xml2js';

// Define interfaces for the data structures
interface NewsArticle {
  title: string;
  link: string;
  pubDate: string;
  source: string | null;
  sourceUrl: string | null;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface ScrapeOptions {
  keyword: string;
  limit?: number;
  language?: string;
  country?: string;
  timeout?: number;
}

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  source?: {
    _: string;
    $: { url: string };
  };
}

interface RSSFeed {
  rss: {
    channel: {
      item: RSSItem | RSSItem[];
    };
  };
}

interface ApiResponse {
  success: boolean;
  error?: string;
  keyword?: string;
  count?: number;
  articles?: NewsArticle[];
}

// Express request and response types (assuming Express is used)
interface ExpressRequest {
  query: {
    keyword?: string;
    limit?: string;
    language?: string;
    country?: string;
  };
}

interface ExpressResponse {
  status: (code: number) => ExpressResponse;
  json: (data: ApiResponse) => void;
}

/**
 * Analyze sentiment of a text string
 * @param text - Text to analyze (e.g., article title)
 * @returns Sentiment label ('positive', 'negative', 'neutral')
 */
function analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);
  const score = result.score;

  // Define thresholds for sentiment classification
  if (score > 0) {
    return 'positive';
  }
  if (score < 0) {
    return 'negative';
  }
  return 'neutral';
}

/**
 * Scrape Google News for a specific keyword using RSS feed
 *
 * @param options - Scraping options
 * @returns Array of article objects
 */
async function scrapeGoogleNews(options: ScrapeOptions): Promise<NewsArticle[]> {
  // Set default options
  const config: Required<ScrapeOptions> = {
    limit: 20,
    language: 'en-US',
    country: 'US',
    timeout: 10000,
    ...options,
  };

  if (!config.keyword) {
    throw new Error('Keyword is required');
  }

  try {
    // Create RSS feed URL for the keyword
    const encodedKeyword = encodeURIComponent(config.keyword);
    const rssUrl = `https://news.google.com/rss/search?q=${encodedKeyword}&hl=${
      config.language
    }&gl=${config.country}&ceid=${config.country}:${config.language.split('-')[0]}`;

    // Fetch RSS feed content
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      // Note: node-fetch v2 doesn't support timeout directly
      // For production, consider using a more robust solution
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }

    const xml = await response.text();

    // Parse XML content
    const result: RSSFeed = await parseStringPromise(xml, {
      explicitArray: false,
      trim: true,
    });

    if (!result.rss || !result.rss.channel || !result.rss.channel.item) {
      return [];
    }

    // Ensure items is an array
    const items = Array.isArray(result.rss.channel.item)
      ? result.rss.channel.item
      : [result.rss.channel.item];

    // Transform items into a cleaner format with sentiment analysis
    const articles: NewsArticle[] = items
      .map((item: RSSItem) => {
        let source: string | null = null;
        if (item.source) {
          source = typeof item.source === 'string' ? item.source : item.source._ || null;
        }

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          source: source,
          sourceUrl: item.source?.$ ? item.source.$.url : null,
          sentiment: analyzeSentiment(item.title),
        };
      })
      .slice(0, config.limit);

    return articles;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error scraping Google News: ${errorMessage}`);
    throw error;
  }
}

/**
 * Express API handler example
 *
 * @param req - Express request object
 * @param res - Express response object
 */
async function googleNewsApiHandler(req: ExpressRequest, res: ExpressResponse): Promise<void> {
  try {
    const { keyword, limit, language, country } = req.query;

    if (!keyword) {
      res.status(400).json({
        success: false,
        error: 'Keyword parameter is required',
      });
      return;
    }

    const articles = await scrapeGoogleNews({
      keyword,
      limit: limit ? Number.parseInt(limit, 10) : 20,
      language: language || 'en-US',
      country: country || 'US',
    });

    res.json({
      success: true,
      keyword,
      count: articles.length,
      articles,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`API error: ${errorMessage}`);
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
}

/**
 * Command line interface
 */
async function cli(): Promise<void> {
  // Process command line arguments
  const args: string[] = process.argv.slice(2);
  let keyword = '';
  let limit = 20;

  // Extract keyword and limit
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--limit' || args[i] === '-l') {
      if (i + 1 < args.length) {
        limit = Number.parseInt(args[i + 1], 10);
        i++;
      }
    } else {
      keyword += (keyword ? ' ' : '') + args[i];
    }
  }

  if (!keyword) {
    console.log('Please provide a keyword to search for.');
    console.log('Usage: ts-node google-news-rss.ts <keyword> [--limit <number>]');
    console.log('Example: ts-node google-news-rss.ts "financial markets" --limit 10');
    process.exit(1);
  }

  try {
    console.log(`Searching Google News for: "${keyword}"`);

    const articles = await scrapeGoogleNews({
      keyword,
      limit,
    });

    console.log(`Found ${articles.length} articles`);
    console.log(JSON.stringify(articles, null, 2));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${errorMessage}`);
    process.exit(1);
  }
}

// Execute CLI if run directly
if (require.main === module) {
  cli();
}

export { googleNewsApiHandler, scrapeGoogleNews };
