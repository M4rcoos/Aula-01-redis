"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
async function seedUsers() {
    const connection = await promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin123',
        database: 'meubanco',
    });
    for (let i = 1; i <= 200; i++) {
        const name = `Usuario ${i}`;
        const email = `user${i}@example.com`;
        await connection.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    }
    await connection.end();
    console.log('Inserção finalizada!');
}
seedUsers().catch(console.error);
