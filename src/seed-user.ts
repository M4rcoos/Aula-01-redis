import mysql from 'mysql2/promise';

async function seedUsers() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'meubanco',
  });

  for (let i = 1; i <= 200; i++) {
    const name = `Usuario ${i}`;
    const email = `user${i}@example.com`;

    await connection.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
  }

  await connection.end();
  console.log('Inserção finalizada!');
}

seedUsers().catch(console.error);
