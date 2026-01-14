const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/login', (req, res) => {
    res.send('Bienvenue sur la page de login');
});

app.get('/register', (req, res) => {
    res.send('Merci de vous créer un compte !');
});

app.get('/login', (req, res) => {
    res.send('Bienvenue sur la page de login');
});

app.get('/info', (req, res) => {
    res.json({cle1: 'valeur1', cle2:'valeur2'});
});

app.listen(3000, () => {
    console.log('S erver running on http://localhost:3000');
});