const express = require('express');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '172.29.18.115',
  user: 'accessNodeServerDemo',
  password: 'accessNodeServerDemo',
  database: 'BDD_Test'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

const app = express();

app.use(express.static('public'));
app.use(express.json());



app.get('/login', (req, res) => {
  res.send('<h1>Bienvenue sur la page de login  </h1>');
});



app.get('/info', (req, res) => {
  res.json({ cle1: 'valeur1', cle2: 'valeur2'});
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM User', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});

app.post('/register', (req, res) => {

  connection.query(
    'INSERT INTO User (login, Password) VALUES (?, ?)',
    [req.body.loginValue,req.body.passwordValue],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }
      console.log('Insertion réussie, ID utilisateur :', results.insertId);
      res.json({ message: 'Inscription réussie !', userId: results.insertId });
    }
  );
});

/*app.get('/votes', (req, res) => {
  connection.query('SELECT * FROM Vote', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});*/

app.listen(3000, () => {
  let monIp = require("ip").address();
  console.log(`Server running on http://${monIp}:3000`);
});
