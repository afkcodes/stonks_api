import * as cheerio from 'cheerio';

interface Commodity {
  commodity: string;
  price: number;
  unit: string;
  change: number;
  change_percent: number;
  volume: number;
  high: number;
  low: number;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const hexClean = hex.replace('#', '');
  const r = Number.parseInt(hexClean.substring(0, 2), 16);
  const g = Number.parseInt(hexClean.substring(2, 4), 16);
  const b = Number.parseInt(hexClean.substring(4, 6), 16);
  return Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b) ? null : { r, g, b };
}

function isRedSpectrum(rgb: { r: number; g: number; b: number }): boolean {
  return rgb.r > rgb.g * 1.5 && rgb.r > rgb.b * 1.5; // Red dominant
}

function isGreenSpectrum(rgb: { r: number; g: number; b: number }): boolean {
  return rgb.g > rgb.r * 1.5 && rgb.g > rgb.b * 1.5; // Green dominant
}

function extractCommodityData(htmlContent: string): Commodity[] {
  const $ = cheerio.load(htmlContent);
  const commodities: Commodity[] = [];

  $('.statcomp .stats').each((_index, element) => {
    if ($(element).attr('id') === 'stathead') return;

    const commodity = $(element).find('.com a').text().trim();
    const price = Number.parseFloat($(element).find('.price').text().trim());
    const unit = $(element).find('.price').attr('title')?.replace('Price/Unit = ', '').trim() || '';
    const changeText = $(element).find('.chng span').text().trim();
    const volume = Number.parseInt($(element).find('div[style*="width:75px"]').text().trim());
    const high = Number.parseFloat($(element).find('div[_high]').text().trim());
    const low = Number.parseFloat($(element).find('div[_low]').text().trim());

    // Extract change and change percent from changeText (e.g., "81.0 (0.9)")
    const changeMatch = changeText.match(/([-]?\d+\.?\d*)\s*\(([-]?\d+\.?\d*)\)/);
    let change = changeMatch ? Number.parseFloat(changeMatch[1]) : 0;
    let changePercent = changeMatch ? Number.parseFloat(changeMatch[2]) : 0;

    const color = $(element).find('.chng span').css('color')?.toLowerCase();
    if (color?.startsWith('#')) {
      const rgb = hexToRgb(color);
      if (rgb) {
        if (isRedSpectrum(rgb) && change > 0) {
          change = -change;
          changePercent = -changePercent;
        } else if (isGreenSpectrum(rgb) && change < 0) {
          change = Math.abs(change);
          changePercent = Math.abs(changePercent);
        }
      }
    }

    // Calculate previous price and verify change percentage
    const previousPrice = price - change;
    const calculatedChangePercent = ((change / previousPrice) * 100).toFixed(2);

    commodities.push({
      commodity,
      price,
      unit,
      change,
      change_percent: Number.parseFloat(calculatedChangePercent),
      volume,
      high,
      low,
    });
  });

  return commodities;
}

export function processCommodities(htmlContent: string) {
  try {
    const data = extractCommodityData(htmlContent);
    return data;
  } catch (error) {
    console.error('Error processing HTML:', error);
  }
}
