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
  res.json({ cle1: 'toujour pas Connecter', cle2: 'Connecter' });
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

app.post('/connexion', (req, res) => {
  console.log(req.body);
  //on récupère le login et le password
  const { login, password } = req.body;
  connection.query('SELECT * FROM User WHERE login = ? AND password = ?', 
    [login, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification des identifiants :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ message: 'Identifiants invalides' });
      return;
    }
    // Identifiants valides 
    res.json({ message: 'Connexion réussie !',user:results[0]  });
  });
});

app.post('/register', (req, res) => {

  connection.query(
    'INSERT INTO User (login, Password) VALUES (?, ?)',
    [req.body.loginValue, req.body.passwordValue],
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

app.post('/votes', (req, res) => {

  //récupérer du front idvoté et id du connecté ( qui est dans la base idElecteur)
  connection.query(
    'INSERT INTO Vote (idUser, idElecteur) VALUES (?, ?)',
    [req.body.idValue,req.body.idElecteur],
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

app.listen(3000, () => {
  let monIp = require("ip").address();
  console.log(`Server running on http://${monIp}:3000`);
});
/*
app.get('/participants', (req, res) => {
  connection.query('SELECT * FROM Vote', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});*/