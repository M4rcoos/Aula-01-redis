"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = require("../database/connection");
const redisClient_1 = require("../database/redisClient");
const routes = (0, express_1.Router)();
routes.get('/', async (_req, res) => {
    console.log("aquiii");
    try {
        const cacheKey = 'users:all';
        const cachedUsers = await redisClient_1.redisClient.get(cacheKey);
        if (cachedUsers) {
            console.log('Retornando dados do cache');
            return res.json(JSON.parse(cachedUsers));
        }
        console.log('Cache vazio, buscando no banco');
        const [rows] = await connection_1.db.query('SELECT * FROM users');
        await redisClient_1.redisClient.setEx(cacheKey, 60, JSON.stringify(rows));
        console.log('Dados salvos no cache');
        res.json({ "ksaj": rows });
    }
    catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro interno' });
    }
});
exports.default = routes; // ✅ exporta o router que realmente tem as rotas configuradas
