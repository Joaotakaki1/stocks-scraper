import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

const runScraper = (scraperPath, ticker) => {
    return new Promise((resolve, reject) => {
        const command = `cd ${scraperPath} && scrapy crawl investidor10 -a ticker=${ticker}`;

        exec(command, async (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao executar o scraper: ${error.message}`);
                return reject(new Error('Erro ao executar o scraper'));
            }

            if (stderr) {
                console.warn(`Aviso do scraper: ${stderr}`);
                // Não rejeita imediatamente, pois pode ser apenas um aviso
            }

            console.log(`Scraper executado com sucesso: ${stdout}`);

            // Lê o arquivo de saída gerado pelo scraper
            try {
                const dataPath = path.resolve(scraperPath, 'output/data.json');
                const data = await fs.readFile(dataPath, 'utf8');
                const parsedData = JSON.parse(data);

                // Retorna os dados coletados
                resolve(parsedData);
            } catch (readError) {
                console.error(`Erro ao ler o arquivo de saída: ${readError.message}`);
                reject(new Error('Erro ao ler os dados do scraper'));
            }
        });
    });
};

export default { runScraper };