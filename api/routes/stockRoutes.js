import express from 'express';
import stockController from '../controllers/stockController.js';

const router = express.Router();

// Rota para buscar informações de uma ação
router.get('/:ticker', stockController.getStockData);

export default router;