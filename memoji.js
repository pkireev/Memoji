
    var cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach(function (card) {

        card.addEventListener('click', function (event) {
            event.preventDefault();

            if (event.target.classList.contains('rotate-card')) {
                event.target.classList.remove('rotate-card')
            } else {
                event.target.classList.add('rotate-card');
            }
        });
    });


