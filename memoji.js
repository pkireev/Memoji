


// Make the constructor of card class
/*
    img - url to image
    flip - opened = true, closed = false, at start = undefined (not false for animation's silence)
    id - card id
    domCard - card in DOM for easy finding specific card with querySelector
    domFront - front side of card in DOM
*/



function Card(img, orderNumber) {
    this.img = img; // image url
    this.flip = undefined; // begininng state = undefined, closed = false, opened = true
    this.id = orderNumber;
    this.domCard = document.querySelector('#card' + this.id);
    this.domFront = this.domCard.querySelector('.front');
    this.domImg = document.getElementById('img' + this.id);

    //put image url in "src" attribute
    this.domImg.setAttribute('src', this.img);




    this.rotate = function () { // rotates card to make either opened or closed

        if (this.flip === undefined) {
            this.flip = true; // at start = undefined and cards have no any class, that's why ADD classes of opening
            this.domCard.classList.add('rotate-card'); // for animation of opening
            this.domFront.classList.add('opened'); // front is visible now
        } else {
            this.flip = !this.flip; // now just doing TOGGLE
            this.domCard.classList.toggle('rotate-card'); // for animation of closing
            this.domCard.classList.toggle('rotate-reverse'); // front is unvisible now
            this.domFront.classList.toggle('opened'); // too
        }
    };



    this.setCorrect = function () { // make front green = correct
        this.domFront.classList.add('correct');
        this.domCard.classList.add('correct');
    };

    this.setIncorrect = function () { // make fron red = incorrect
        this.domFront.classList.add('incorrect');
        this.domCard.classList.add('incorrect');
    };

    this.removeIncorrect = function () { // remove red color
        this.domFront.classList.remove('incorrect');
        this.domCard.classList.remove('incorrect');

    };

    this.removeAll = function () { // remove all classes. it is needed at start of new game
        this.domCard.classList.remove('rotate-card');
        this.domCard.classList.remove('rotate-reverse');
        this.domCard.classList.remove('correct');
        this.domCard.classList.remove('incorrect');

        this.domFront.classList.remove('opened');
        this.domFront.classList.remove('correct');
        this.domFront.classList.remove('incorrect');
    };


    // while constructing new card it removes all old states
    this.removeAll();


}




/*
Make the constructor of playground class

here we make an array of all 12 cards (array of urls in fact)
then shuffle it
then make an array of card objects

and many other arrays - opened cards, guessed cards, unguessed cards
and timer!


 */

function Playground(imgPath, pictures) {
<<<<<<< HEAD
    // создать набор из 12 карточек (6 пар!)

    /*
    // версия 1:
    // создаем массив картинок методом перевода строки url в массив дважды, соединения 2 массивов и затем перемешивания
=======
    // make set of 12 cards

    
    // you know 'pictures' is the string of 6 urls separated by semicolon
    // we make 2 arrays with splits 
    // then join them and have one array of 12 elements
    // and then shuffle it
    
>>>>>>> 919255ce9011bf455b90ab335d0de7d81fde7578
    var _picturesArray = _shuffle(pictures.split(';').concat(pictures.split(';')));
    */


    // версия 2:
    // создаем массив из 6 случайных карточек, цепляем к нему его же и перемешиваем
    // делаем так: берем весь массив картинок, перемешиваем, берем первые 6, цепляем к нему его же и перемешиваем

    var _allPicturesArray = _shuffle(pictures.split(';'));

    var _picturesArray = _shuffle(_allPicturesArray.slice(0, 6));
    _picturesArray = _shuffle(_picturesArray.concat(_picturesArray));





    function _shuffle(a) { // it is clear
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    this.cards = []; // array of card objects

    for (var i = 0; i < 12; i++) {
        var card = new Card(imgPath + _picturesArray[i], i);
        this.cards.push(card);
    }

    this.cardsOpened = []; // array of opened cards at the moment
    this.cardsGuessed = []; // array of guessed (and green and unrotatable) cards at the moment
    this.cardsRed = []; // array of red cards for closing them after the next click


    this.timeLeft = 60; // how longs the game in seconds



    this.timerId = undefined; // draft for timerId. Undefined = timer is not running


    this.displayTimer = function () {
        if (this.timeLeft >= 0) {
            var mins = Math.floor(this.timeLeft / 60);
            var secs = this.timeLeft - mins * 60;

            if (mins < 10) {
                mins = '0' + mins
            }
            if (secs < 10) {
                secs = '0' + secs
            }
        } else {

            mins = '00';
            secs = '00';


            document.querySelector('.form .text span:nth-child(1)').innerHTML = 'L';
            document.querySelector('.form .text span:nth-child(2)').innerHTML = 'o';
            document.querySelector('.form .text span:nth-child(3)').innerHTML = 's';
            document.querySelector('.form .text span:nth-child(4)').innerHTML = 'e';



            document.querySelector('.modal').classList.add('show-modal');
            document.querySelector('.form-wrapper').classList.add('show-form');

            clearInterval(this.timerId);
        }

        document.querySelector('.timer').innerHTML = mins + ":" + secs;
    };
}






// after html is loaded we make an instance of playground class and 12 card objects with image urls

/*
var _imgPath = 'https://cdn.shopify.com/s/files/1/1061/1924/products/';
var _pictures = 'tiger_emoji_icon_png_large.png?v=1480481019;' +
    'Bear_emoji_icon_png_large.png?v=1480481027;' +
    'Cow_emoji_icon_png_large.png?v=1480481026;' +
    'Octopus_Iphone_Emoji_JPG_large.png?v=1513340509;' +
    'Rabbit_Face_Emoji_large.png?v=1480481037;' +
    'Spouting_Whale_Emoji_large.png?v=1480481038';*/



var _imgPath = './img/';
var _pictures = 'Bear.png;CAT.png;Caterpie_Bug.png;chicken.png;Cow.png;Dog.png;FROG.png;honeybee.png;' +
    'koala.png;Lady_beetle.png;Monkey.png;Monkey2.png;Octopus.png;Panda.png;Pig.png;Rabbit.png;' +
    'Spouting_Whale.png;tiger.png;Tropical_Fish.png;Turtle.png;Unicorn.png';




var play = new Playground(_imgPath, _pictures);
play.displayTimer();




// hangs on events on each card

var cards = Array.from(document.querySelectorAll('.card'));

cards.forEach(function (card) {
    card.addEventListener('click', function(event){
        event.preventDefault();

        var id = parseInt(card.getAttribute('id').replace('card', '')); // this is id of just opened card

        // if id of just clicked card is in the array of guessed cards, then it does nothing
        // in other words - there is no meaning to click on green card

        // if card id is in the array of opened cards - it does nothing too
        // in all other cases we make the card rotate and check logic


        if (play.cardsGuessed.indexOf(id) === -1 && play.cardsOpened.indexOf(id) === -1) {
            play.cards[id].rotate();

            gameLogic(id); // give card id for logic check
        }


        if (!play.timerId) {
            // if it is the first click (timer == undefined) we have to run the timer

            play.timerId = setInterval(function () {
                play.timeLeft--;
                play.displayTimer();
            }, 1000);

        }

    });
});



function gameLogic(id) {

    // this is click-initiated logic. There is no timer-events-checking in this function


    var card1, card2;
    // first of all - checks red cards for closing them

    if (play.cardsRed.length > 0) {
        card1 = play.cards[play.cardsRed[0]];
        card2 = play.cards[play.cardsRed[1]];

        card1.rotate(); // closes red card no.1
        card2.rotate(); // and no.2

        card1.removeIncorrect();
        card2.removeIncorrect();

        play.cardsRed = [];
        play.cardsOpened = [];
    }


    // we've got id of just opened card and push it in the array

    play.cardsOpened.push(id);

<<<<<<< HEAD

    // если открытых карт две - вступает логика
=======
    // if there are two opened cards - logic runs
>>>>>>> 919255ce9011bf455b90ab335d0de7d81fde7578

    if (play.cardsOpened.length === 2) {

        card1 = play.cards[play.cardsOpened[0]];
        card2 = play.cards[play.cardsOpened[1]];

        // compare image urls of these cards
        if (card1.img === card2.img) {

            // the same! paints green

            card1.setCorrect();
            card2.setCorrect();

            play.cardsGuessed.push(card1.id, card2.id);
            play.cardsOpened = [];

        } else {
            // not the same! paints red and will close them after the next click

            card1.setIncorrect();
            card2.setIncorrect();

            play.cardsRed.push(card1.id, card2.id); // remember red cards for closing later
        }


// makes delay 400 ms for rendering of modal window, because of slower animation can play to the end

        if (play.cardsGuessed.length === 12) { // if 12 cards are guessed - WIN!

            clearInterval(play.timerId);

            // makes congrats
            document.querySelector('.form .text span:nth-child(1)').innerHTML = 'W';
            document.querySelector('.form .text span:nth-child(2)').innerHTML = 'i';
            document.querySelector('.form .text span:nth-child(3)').innerHTML = 'n';
            document.querySelector('.form .text span:nth-child(4)').innerHTML = '!';


            setTimeout(function () {
                document.querySelector('.modal').classList.add('show-modal');
                document.querySelector('.form-wrapper').classList.add('show-form');
            }, 400);

            // then will run an event of Play-again button. It is described below

      }
    }
}





// play-again-button event

var buttonNewGame = document.querySelector('.form-button');
buttonNewGame.addEventListener('click', function() {

    play.cards.forEach(function (card) {
        if (card.flip) {
            // check - if the card is open, then we have to close it (not the all cards might be opened if player has lost the game)
            card.rotate();
        }

    });


    document.querySelector('.modal').classList.remove('show-modal');
    document.querySelector('.form-wrapper').classList.remove('show-form');



    // NEW GAME in a half of second, becase of slower animation
    setTimeout(function () {
        play = new Playground(_imgPath, _pictures);
        play.displayTimer(); // отобразим таймер
    }, 500);
});
