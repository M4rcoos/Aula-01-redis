"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redisClient_1 = require("./database/redisClient");
const connection_1 = require("./database/connection");
async function start() {
    await (0, redisClient_1.connectRedis)();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const router = express_1.default.Router();
    const getUsers = async (_req, res) => {
        const cacheKey = 'users:all';
        const cachedUsers = await redisClient_1.redisClient.get(cacheKey);
        if (cachedUsers) {
            return res.json({ fromCache: true, data: JSON.parse(cachedUsers) });
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
        const [rows] = await connection_1.db.query('SELECT * FROM users');
        await redisClient_1.redisClient.setEx(cacheKey, 60, JSON.stringify(rows));
        return res.json({ fromCache: false, data: rows });
    };
    router.get('/users', getUsers);
    app.use(router);
    app.listen(3000, () => console.log('✅ Server running!'));
}
start();
