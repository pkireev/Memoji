


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
    };

    this.setIncorrect = function () { // делаем лицевую сторону красной
        this.domFront.classList.add('incorrect');
    };

    this.removeIncorrect = function () { // снимаем красноту
        this.domFront.classList.remove('incorrect');
    };

}





// Делаем конструктор класса игрового поля
/*

в нем создаем массив объектов всех 12 карточек (изображений)
перемешиваем массив
создаем массив объектов карточек


 */

function Playground(imgPath, pictures) {
    // создать набор из 12 карточек

    // создаем массив картинок методом перевода строки url в массив дважды, соединения 2 массивов и затем перемешивания
    var _picturesArray = _shuffle(pictures.split(';').concat(pictures.split(';')));


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

}





// при загрузке создаем экземпляр класса игрового поля, создаем 12 объекутов карточек со своими картинками

var _imgPath = 'https://cdn.shopify.com/s/files/1/1061/1924/products/';
var _pictures = 'tiger_emoji_icon_png_large.png?v=1480481019;' +
    'Bear_emoji_icon_png_large.png?v=1480481027;' +
    'Cow_emoji_icon_png_large.png?v=1480481026;' +
    'Octopus_Iphone_Emoji_JPG_large.png?v=1513340509;' +
    'Rabbit_Face_Emoji_large.png?v=1480481037;' +
    'Spouting_Whale_Emoji_large.png?v=1480481038';


var play = new Playground(_imgPath, _pictures);










// навесим события на клик на каждую карточку





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
    });
});



function gameLogic(id) {

    var card1, card2;
    // сначала проверим - есть ли красные карты, чтобы их закрыть

    if (play.cardsRed.length > 0) {
        card1 = play.cards[play.cardsRed[0]];
        card2 = play.cards[play.cardsRed[1]];

        card1.rotate(); // закрываем бывшую красную карту
        card2.rotate(); // и вторую

        card1.removeIncorrect(); // снимаем с них класс некорректности
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
    }

}
