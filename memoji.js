



// НАДО ИСПРАВИТЬ ЧИТ-МОДЕ!!!!!!





// Делаем конструктор класса карточки
/*
    img - ссылка на картинку
    flip - открыта или нет, по умолчанию нет
    backgroundColor - открытая карта зеленая или красная, для понимания - угадали или нет
    domClass - класс, чтобы найти конкретную карту через querySelector
*/



function Card(img, orderNumber) {
    this.img = img; // url картинки
    this.flip = undefined; // начальное состояние - undefined, рубашкой - false, картинкой - true
    this.backgroundColor = '';
    this.id = orderNumber;



    // здесь надо реализовать логику работы с классами HTML через методы




    this.rotate = function () {
        var card = document.querySelector('#card' + this.id);

        if (this.flip === undefined) {
            this.flip = true; // на старте undefined, поэтому цепляем нужные классы открытия
            card.classList.add('rotate-card');
            card.querySelector('.front').classList.add('opened');
        } else {
            this.flip = !this.flip; // потом просто делаем toggle
            card.classList.toggle('rotate-card');
            card.classList.toggle('rotate-reverse');
            card.querySelector('.front').classList.toggle('opened');
        }
    }
}





// Делаем конструктор класса игрового поля
/*
в нем создаем массив объектов всех 12 карточек (изображений)
перемешиваем массив
создаем массив объектов карточек


 */

function Playground() {
    // создать набор из 12 карточек

    var _imgPath = 'https://cdn.shopify.com/s/files/1/1061/1924/products/';
    var _pictures = 'tiger_emoji_icon_png_large.png?v=1480481019;' +
        'Bear_emoji_icon_png_large.png?v=1480481027;' +
        'Cow_emoji_icon_png_large.png?v=1480481026;' +
        'Octopus_Iphone_Emoji_JPG_large.png?v=1513340509;' +
        'Rabbit_Face_Emoji_large.png?v=1480481037;' +
        'Spouting_Whale_Emoji_large.png?v=1480481038';

    // создаем массив картинок методом перевода строки url в массив дважды, соединения 2 массивов и затем перемешивания
    var _picturesArray = _shuffle(_pictures.split(';').concat(_pictures.split(';')));


    function _shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    this.cards = []; // массив объектов карточек

    for (var i = 0; i < 12; i++) {
        var card = new Card(_imgPath + _picturesArray[i], i);
        this.cards.push(card);
    }

    this.cardsOpened = []; // массив из открытых для проверки карт
    this.cardsGuessed = []; // массив из угаданных карт, которые не крутятся больше
    this.cardsRed = []; // массив из красных карт, чтобы их закрыть

}





// при загрузке создаем экземпляр класса игрового поля, расставляем url картинок (уже перетасованных)
// и добавляем в атрибут src каждой карточки


var play = new Playground();

for (var i = 0; i < 12; i++) {
    var obj = document.getElementById('img' + play.cards[i].id);
    obj.setAttribute('src', play.cards[i].img);
}












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


    // сначала проверим - есть ли красные карты, чтобы их закрыть

    // если были открыты красные карты, то они должны закрыться

    if (play.cardsRed.length > 0) {
        play.cards[play.cardsRed[0]].rotate();
        play.cards[play.cardsRed[1]].rotate();

        document.querySelector('#card' + play.cardsRed[0]).querySelector('.front').classList.remove('incorrect');
        document.querySelector('#card' + play.cardsRed[1]).querySelector('.front').classList.remove('incorrect');

        play.cardsRed = []; // надо еще убрать класс incorrect
        play.cardsOpened = [];
    }


    // получаем номер открытой карты и кидаем в массив открытых карт

    play.cardsOpened.push(id);



    if (play.cardsOpened.length === 2) {

        // если открыто 2 карты, сверяем их по картинкам
        var card1 = play.cards[play.cardsOpened[0]];
        var card2 = play.cards[play.cardsOpened[1]];


        if (card1.img === card2.img) {

            // совпали! красим зеленым и делаем недоступными
            // находим карту по id, а в ней уже заходим в front

            document.querySelector('#card' + card1.id).querySelector('.front').classList.add('correct');
            document.querySelector('#card' + card2.id).querySelector('.front').classList.add('correct');

            play.cardsGuessed.push(card1.id, card2.id);
            play.cardsOpened = [];


        } else {
            // не совпали! красим красным и закроем их на следующем клике
            document.querySelector('#card' + card1.id).querySelector('.front').classList.add('incorrect');
            document.querySelector('#card' + card2.id).querySelector('.front').classList.add('incorrect');

            play.cardsRed.push(card1.id, card2.id);
        }
    }

}
