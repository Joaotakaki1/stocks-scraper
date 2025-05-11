import 'dotenv/config';
import express from 'express';
import db from './src/config/database.js';
import stockRoutes from './routes/stockRoutes.js';

const app = express();
app.use(express.json());


// Teste de conexão com o banco
db.raw('SELECT 1')
    .then(() => console.log('Conexão com o banco de dados bem-sucedida!'))
    .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

app.use('/stocks', stockRoutes);
    
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});