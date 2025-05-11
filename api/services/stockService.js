import scraperRunner from '../utils/scraperRunner.js';
import path from 'path';
import fs from 'fs/promises';

const fetchStockData = async (ticker) => {
    const scraperPath = path.resolve('../scraper');
    const outputPath = path.resolve(scraperPath, 'output/data.json');

    // Executa o scraper
    await scraperRunner.runScraper(scraperPath, ticker);

    // Lê o arquivo de saída gerado pelo scraper
    const data = await fs.readFile(outputPath, 'utf8');
    return JSON.parse(data);
};

export default { fetchStockData };