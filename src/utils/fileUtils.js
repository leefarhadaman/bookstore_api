const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '../../users.json');
const BOOKS_FILE = path.join(__dirname, '../../books.json');

async function readJson(file) {
  try {
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeJson(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

module.exports = {
  USERS_FILE,
  BOOKS_FILE,
  readJson,
  writeJson
}; 