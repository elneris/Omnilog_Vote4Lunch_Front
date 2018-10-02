import express from 'express';
import { Client } from 'pg'

const router = express.Router();

const connection = new Client({
  user: 'votemap_db_user',
  host: 'localhost',
  database: 'votemap',
  password: 'fakepassword',
  port: 5432,
})

connection.connect((err) => {
  if (!err) {
    console.log('Database is connected');
  } else {
    console.log('No connection with database');
  }
});

router.get('/api/now', (req, res) => {
  const sqlQuery = "SELECT * FROM restaurant;";
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json(results);
    }
  });
});


export default router;
