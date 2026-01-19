const monInput = document.getElementById('monInput');
const monBouton = document.getElementById('monBouton');
const Password = document.getElementById('Password');
const monBouton_2 = document.getElementById("monBouton_2");
const monBouton_3 = document.getElementById("monBouton_3");

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