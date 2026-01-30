const monInput = document.getElementById('monInput');
const monBouton = document.getElementById('monBouton');
const Password = document.getElementById('Password');
const monBouton_2 = document.getElementById("monBouton_2");
const monBouton_3 = document.getElementById("monBouton_3");
const monBoutonvote = document.getElementById("Vote");

var i = 1;

monBouton.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loginValue: login.value ,passwordValue: Password.value})
    }).then(response => response.text())
        .then(data => {
            alert(data);
        });
    i++;
});

monBoutonvote.addEventListener('click', () => {
    const usersList = document.getElementById('usersList');
    const selectedUserId = usersList.value;   
    alert('Utilisateur : ' + selectedUserId+ ' à voter');

    fetch('/votes', {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idValue: selectedUserId})
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

monBouton_2.addEventListener('click', () => {
    if (i == 1) {

        fetch('/info')
            .then(responsebrute => responsebrute.json()) 
            .then(
                responsejson => {
                    document.getElementById('reponse').innerHTML = responsejson.cle1; 
                });

    }
    else {
        fetch('/info')
            .then(responsebrute => responsebrute.json())
            .then(
                responsejson => {
                    document.getElementById('reponse').innerHTML = responsejson.cle2;
                });
    }
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
        
});*/