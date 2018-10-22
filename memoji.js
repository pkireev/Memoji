

var cards = Array.from(document.querySelectorAll('.card'));
cards.forEach(function (card) {

    card.addEventListener('click', function (event) {
        event.preventDefault();


        if(card.classList.contains('rotate-card') || card.classList.contains('rotate-reverse')) {
            card.classList.toggle('rotate-card');
            card.classList.toggle('rotate-reverse');
        } else {
            card.classList.toggle('rotate-card');
        }

        if(card.classList.contains('rotate-card')) {
            card.querySelector('.front').classList.add('opened');
        } else {
            card.querySelector('.front').classList.remove('opened');
        }

    });

});





