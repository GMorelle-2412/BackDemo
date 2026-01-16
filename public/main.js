const monInput = document.getElementById('monInput');
const monBouton = document.getElementById('monBouton');
const monBouton_2 = document.getElementById("monBouton_2");
const monBouton_3 = document.getElementById("monBouton_3");

monBouton.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputValue: monInput.value })
    }).then(response => response.text())
        .then(data => {
            alert(data);
        });
});

monBouton_2.addEventListener('click', () => {
    fetch('info').then(
        response => response.json()
    ).then(
        JsonResponse => {
            document.getElementById('reponse').innerHTML = JsonResponse.cle1;
        }
    );
})
