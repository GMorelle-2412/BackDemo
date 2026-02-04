var i = 0;

const monBouton = document.getElementById('monBouton');
monBouton.addEventListener('click', () => {
    const Password = document.getElementById('Password');
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

const monBoutonvote = document.getElementById("Vote");
monBoutonvote.addEventListener('click', () => {
    
    let idElecteur = localStorage.getItem("idUser");
    let idUser = document.getElementById("usersList").value;

    const newDiv = document.createElement("p");
    const newContent = document.createTextNode("L'id Utilisateur " +
        idElecteur + "  voter pour l'id " + idUser);

    const currentDiv = document.getElementById("div");

    fetch('/votes', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idValue: idUser, idElecteur: idElecteur })
    }).then(response => response.text())
        .then(data => {
            alert("L'id Utilisateur " + idElecteur + "  voter pour l'id " + idUser);
        });
        newDiv.appendChild(newContent);

        document.body.insertBefore(newDiv, currentDiv);
    

});

const userSelectedButton = document.getElementById('userSelectedButton');
userSelectedButton.addEventListener('click', () => {
    const usersList = document.getElementById('usersList');
    const selectedUserId = usersList.value;
    alert('Utilisateur sélectionné ID : ' + selectedUserId);
});

const connection = document.getElementById("monBouton_2");
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
            localStorage.setItem("idUser", data.user.id);
        });

    fetch('/info')
        .then(responsebrute => responsebrute.json())
        .then(
            responsejson => {
                document.getElementById('reponse').innerHTML = responsejson.cle2;
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