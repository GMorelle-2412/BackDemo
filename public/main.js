const monInput = document.getElementById('MonInput');
const monBouton = document.getElementById('monBoutton');

monBouton.addEventListener('click', () =>{
    fetch('/register', {
        methode: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ inputValue: monInput.value })
    }).then(response=> response.text())
    .then(data => {
        alert(data);
    });
});