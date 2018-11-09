


// Делаем конструктор класса карточки
/*
    img - ссылка на картинку
    flip - открыта true, закрыта - false, на старте - undefined (не false, чтобы молчала анимация)
    id - порядковый номер карты
    domCard - карточка в DOM, чтобы найти конкретную карту через querySelector
    domFront - лицевая сторона карты в DOM
*/



function Card(img, orderNumber) {
    this.img = img; // url картинки
    this.flip = undefined; // начальное состояние - undefined, рубашкой - false, картинкой - true
    this.id = orderNumber;
    this.domCard = document.querySelector('#card' + this.id);
    this.domFront = this.domCard.querySelector('.front');
    this.domImg = document.getElementById('img' + this.id);

    //при создании карточки сразу указываем в DOM ссылку на изображение
    this.domImg.setAttribute('src', this.img);




    this.rotate = function () { //реализует переворот карточки как на лицо, так и на рубашку

        if (this.flip === undefined) {
            this.flip = true; // на старте undefined, поэтому цепляем нужные классы открытия
            this.domCard.classList.add('rotate-card');
            this.domFront.classList.add('opened');
        } else {
            this.flip = !this.flip; // потом просто делаем toggle
            this.domCard.classList.toggle('rotate-card');
            this.domCard.classList.toggle('rotate-reverse');
            this.domFront.classList.toggle('opened');
        }
    };



    this.setCorrect = function () { // делаем лицевую сторону зеленой
        this.domFront.classList.add('correct');
        this.domCard.classList.add('correct');
    };

    this.setIncorrect = function () { // делаем лицевую сторону красной
        this.domFront.classList.add('incorrect');
        this.domCard.classList.add('incorrect');
    };

    this.removeIncorrect = function () { // снимаем красноту
        this.domFront.classList.remove('incorrect');
        this.domCard.classList.remove('incorrect');

    };

    this.removeAll = function () { // удаляем все классы с карты
        this.domCard.classList.remove('rotate-card');
        this.domCard.classList.remove('rotate-reverse');
        this.domCard.classList.remove('correct');
        this.domCard.classList.remove('incorrect');

        this.domFront.classList.remove('opened');
        this.domFront.classList.remove('correct');
        this.domFront.classList.remove('incorrect');
    };


    // при создании карты очищаем ее прошлые состояния:
    this.removeAll();


}




/*
Делаем конструктор класса игрового поля


в нем создаем массив объектов всех 12 карточек (изображений)
перемешиваем массив
создаем массив объектов карточек

плюс к этому куча разных массивов - открытых карт, угаданных карт, неугаданных карт
и таймер!


 */

function Playground(imgPath, pictures) {
    // создать набор из 12 карточек (6 пар!)

    /*
    // версия 1:
    // создаем массив картинок методом перевода строки url в массив дважды, соединения 2 массивов и затем перемешивания
    var _picturesArray = _shuffle(pictures.split(';').concat(pictures.split(';')));
    */


    // версия 2:
    // создаем массив из 6 случайных карточек, цепляем к нему его же и перемешиваем
    // делаем так: берем весь массив картинок, перемешиваем, берем первые 6, цепляем к нему его же и перемешиваем

    var _allPicturesArray = _shuffle(pictures.split(';'));

    var _picturesArray = _shuffle(_allPicturesArray.slice(0, 6));
    _picturesArray = _shuffle(_picturesArray.concat(_picturesArray));





    function _shuffle(a) { // здесь перемешиваются картинки
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    this.cards = []; //наполняем массив объектов карточек

    for (var i = 0; i < 12; i++) {
        var card = new Card(imgPath + _picturesArray[i], i);
        this.cards.push(card);
    }

    this.cardsOpened = []; // массив из открытых на текущий момент карт
    this.cardsGuessed = []; // массив из угаданных карт, которые не крутятся больше
    this.cardsRed = []; // массив из красных карт, чтобы их закрыть


    this.timeLeft = 60; // сколько секунд на игру



    this.timerId = undefined; // заготовочка под timerId


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






// при загрузке создаем экземпляр класса игрового поля, создаем 12 объектов карточек со своими картинками

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




// навесим события на каждую карточку

var cards = Array.from(document.querySelectorAll('.card'));

cards.forEach(function (card) {
    card.addEventListener('click', function(event){
        event.preventDefault();

        var id = parseInt(card.getAttribute('id').replace('card', '')); // это номер открытой только что карты


        // если номер карты, по которой кликнули, есть в массиве отгаданных, то ничего не происходит,
        // иными словами по зеленой карте нет смысла клацать

        // если номер карты есть в массиве открытых, то то же самое
        // в противном случае - делаем переворот и проверяем по логике

        if (play.cardsGuessed.indexOf(id) === -1 && play.cardsOpened.indexOf(id) === -1) {
            play.cards[id].rotate();

            gameLogic(id); // передаем в функцию номер открытой только что карты, закрытую не передаем
        }


        if (!play.timerId) {
            // запускаем таймер, если сейчас был первый клик, определяем по отсутствующему текущему timerId

            play.timerId = setInterval(function () {
                play.timeLeft--;
                play.displayTimer();
            }, 1000);

        }

    });
});



function gameLogic(id) {

    // эта логика работает на клике. Если событие по таймеру, то оно обрабатывается не здесь!


    var card1, card2;
    // сначала проверим - есть ли красные карты, чтобы их закрыть

    if (play.cardsRed.length > 0) {
        card1 = play.cards[play.cardsRed[0]];
        card2 = play.cards[play.cardsRed[1]];

        card1.rotate(); // закрываем бывшую красную карту
        card2.rotate(); // и вторую

        card1.removeIncorrect();
        card2.removeIncorrect();

        play.cardsRed = [];
        play.cardsOpened = [];
    }


    // получаем номер открытой карты и кидаем в массив открытых карт

    play.cardsOpened.push(id);


    // если открытых карт две - вступает логика

    if (play.cardsOpened.length === 2) {

        // если открыто 2 карты, сверяем их по картинкам
        card1 = play.cards[play.cardsOpened[0]];
        card2 = play.cards[play.cardsOpened[1]];


        if (card1.img === card2.img) {

            // совпали! красим зеленым

            card1.setCorrect();
            card2.setCorrect();

            play.cardsGuessed.push(card1.id, card2.id);
            play.cardsOpened = [];

        } else {
            // не совпали! красим красным и закроем их на следующем клике

            card1.setIncorrect();
            card2.setIncorrect();

            play.cardsRed.push(card1.id, card2.id); // запомним красные карты, чтобы закрыть потом
        }


// сделаем задержку на 400 мс для вывода модального окна, чтобы анимация успела отыграть

        if (play.cardsGuessed.length === 12) { // если угадано 12 карт, т.е. все

            clearInterval(play.timerId);

            // сделаем соответствующую надпись на модальном окошке
            document.querySelector('.form .text span:nth-child(1)').innerHTML = 'W';
            document.querySelector('.form .text span:nth-child(2)').innerHTML = 'i';
            document.querySelector('.form .text span:nth-child(3)').innerHTML = 'n';
            document.querySelector('.form .text span:nth-child(4)').innerHTML = '!';


            setTimeout(function () {
                document.querySelector('.modal').classList.add('show-modal');
                document.querySelector('.form-wrapper').classList.add('show-form');
            }, 400);

            // далее сработает событие по кнопке Play again, которое мы повесим чуть ниже

      }
    }
}





// повесим событие на кнопку Play again в модальном окошке:

var buttonNewGame = document.querySelector('.form-button');
buttonNewGame.addEventListener('click', function() {

    play.cards.forEach(function (card) {
        if (card.flip) {
            // проверяем - открыта ли карта, чтобы закрыть, а то не все могут быть открыты, если LOSE
            card.rotate();
        }

        // card.removeAll(); // снимем все классы с карты
    });


    document.querySelector('.modal').classList.remove('show-modal');
    document.querySelector('.form-wrapper').classList.remove('show-form');



    // НОВАЯ ИГРА через полсекунды, чтобы сработала анимация на закрытие карт!
    setTimeout(function () {
        play = new Playground(_imgPath, _pictures);
        play.displayTimer(); // отобразим таймер
    }, 500);
});
