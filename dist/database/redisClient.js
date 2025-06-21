"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
exports.connectRedis = connectRedis;
const redis_1 = require("redis");
exports.redisClient = (0, redis_1.createClient)({
    url: 'redis://localhost:6379',
});
exports.redisClient.on('error', (err) => console.log('Redis Client Error', err));
async function connectRedis() {
    if (!exports.redisClient.isOpen) {
        await exports.redisClient.connect();
    }
}
