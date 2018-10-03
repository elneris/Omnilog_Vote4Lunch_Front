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

router.get('/api/lunch/all', (req, res) => {
  const sqlQuery = "SELECT * FROM lunch  ORDER BY id;";
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json(results);
    }
  });
});

router.get('/api/lunch/today', (req, res) => {
  const sqlQuery = "SELECT * FROM lunch where date = current_date  ORDER BY id;";
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json(results);
    }
  });
});

router.post('/api/lunch/add', (req, res) => {
  const sqlQuery = `INSERT INTO lunch (username, place, date) VALUES ('${req.body.username}', '${req.body.place}', '${req.body.date}');`
  
  connection.query( sqlQuery, (error) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.sendStatus(200);
    }
  });
});

router.get('/api/lunch/up_vote/:id', (req, res) => {
  
  const sqlQuery = `UPDATE lunch SET vote = vote + 1 WHERE id = '${req.params.id}'`
  
  connection.query( sqlQuery, (error) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.sendStatus(200);
    }
  });
});

router.get('/api/lunch/down_vote/:id', (req, res) => {

  const sqlQuery = `UPDATE lunch SET vote = vote - 1 WHERE id = '${req.params.id}'`
  
  connection.query( sqlQuery, (error) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.sendStatus(200);
    }
  });
});

export default router;
