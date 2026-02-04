const monInput = document.getElementById('monInput');
const monBouton = document.getElementById('monBouton');
const Password = document.getElementById('Password');
const connection = document.getElementById("monBouton_2");
const monBouton_3 = document.getElementById("monBouton_3");
const monBoutonvote = document.getElementById("Vote");

var i = 0;

monBouton.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loginValue: login.value, passwordValue: Password.value })
    }).then(response => response.text())
        .then(data => {
            alert(data);
        });
    i++;
});

monBoutonvote.addEventListener('click', () => {
    const usersList = document.getElementById('usersList');
    const selectedUserId = usersList.value;
    alert('Utilisateur : ' + selectedUserId + ' à voter');


    //récupérer aussi id du connecté dans le local storage
    //localstorage.getItem("idConnecte")
    //modifier la route votes pour qu'elle accept une deuxieme variable
    //on envoi selectedUserId et localstorage.getItem("idConnecte")


    fetch('/votes', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idValue: selectedUserId })
    }).then(response => response.text())
        .then(data => {
            alert(data);
        });
});

window.onload = () => {
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const usersList = document.getElementById('usersList');
            users.forEach(user => {
                //création d'un input select option avec id en value et login en texte  
                const option = document.createElement('option');
                option.value = user.id;
                option.text = user.Login;
                usersList.appendChild(option);
            });
        });
}

const userSelectedButton = document.getElementById('userSelectedButton');

userSelectedButton.addEventListener('click', () => {
    const usersList = document.getElementById('usersList');
    const selectedUserId = usersList.value;
    alert('Utilisateur sélectionné ID : ' + selectedUserId);
});

connection.addEventListener('click', () => {
    const login = document.getElementById('login').value;
    const password = document.getElementById('Password').value;

    fetch('/connexion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: login, password: password })
    }).then(response => response.json())
        .then(data => {
            alert(data.message);
            alert('ID utilisateur : ' + data.user.id);
            localStorage.setItem(login, data.user.id);
        });

        fetch('/info')
            .then(responsebrute => responsebrute.json())
            .then(
                responsejson => {
                    document.getElementById('reponse').innerHTML = responsejson.cle2;
                });
});

/*
const listeParticipants = document.getElementById("participants");

listeParticipants.addEventListener('click', () => {
    fetch('/participants')
        .then(responsebrute => responsebrute.json()) 
        .then(
            responsejson => {
                document.getElementById('reponse').innerHTML = responsejson.cle1; 
            });
        
*/