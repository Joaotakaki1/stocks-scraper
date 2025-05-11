import scraperRunner from '../utils/scraperRunner.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Simula o __dirname no ES6 Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getStockData = async (req, res) => {
    const { ticker } = req.params;

    // Caminho correto para o diretório do Scrapy
    const scraperPath = path.resolve(__dirname, '../../scraper/scraper');

    try {
        console.log(`Executando o scraper para o ticker: ${ticker}`);
        console.log(`Caminho absoluto do scraper: ${scraperPath}`);
        const data = await scraperRunner.runScraper(scraperPath, ticker);
        res.json(data);
    } catch (error) {
        console.error(`Erro ao buscar dados da ação: ${error.message}`);
        res.status(500).json({ error: 'Erro ao buscar dados da ação' });
    }
};

export default { getStockData };