class Publication {


  constructor(title, publisher, type, price, copies, discount, tax) {
    this.title = title;
    this.publisher = publisher;
    this.type = type;
    this.price = price;
    this.copies = copies;
    this.discount = discount;
    this.tax = tax;
  }

  toString() {

    const publicPrice = this.getPublicPrice() > 0 ? this.getPublicPrice().toFixed(2) : 'Non disponibile'

    const pubString = 'Titlo: ' + this.title + '\n' +
      'Casa Editrice: ' + this.publisher + '\n' +
      'Genere: ' + this.type + '\n' +
      'Price: ' + publicPrice + '€' + '\n' +
      'Copie: ' + this.copies + '\n' +
      'Sconto: ' + this.discount + '%';

    return pubString;

  }

  // getPublicPriceWithoutTax(){
  //   const discount = this.price * this.discount / 100;
  //   const margin = this.price * 0.3;
  //   const publicPriceWithoutTax = this.price - discount + margin;
  //   return publicPriceWithoutTax;
  // }

  getPublicPrice() {

    if (this.price < 0) {
      return this.price;
    }

    const discount = this.price * this.discount / 100;
    const margin = this.price * 0.3;
    const tax = this.price * this.tax / 100
    const publicPrice = this.price + tax - discount + margin;
    const roundedPublicPrice = Publication.round(publicPrice, 2);
    return roundedPublicPrice;
  }

  static round(number, decimalPlace) {
    const roundedString = number.toFixed(decimalPlace);
    const roundedNumber = parseFloat(roundedString);
    return roundedNumber;
  }
}

class Book extends Publication {

  constructor(title, author, publisher = 'Non disponibile', type = 'Non classificato', price = -1, copies = 0, pages = -1, yop = -1, discount = 0) {
    super(title, publisher, type, price, copies, discount, 10);
    this.author = author;
    this.pages = pages;
    this.yop = yop;
  }

  toString() {

    const pages = this.pages > 0 ? this.pages : 'Sconosciute';

    const year = this.yop > 0 ? this.yop : 'Sconosciuto'

    const bookString = super.toString() + '\n' +
      'Autore: ' + this.author + '\n' +
      'Pagine: ' + pages + '\n' +
      'Anno di Pubblicazione: ' + year;
    return bookString;
  }

  // getPublicPrice() {
  //   const publicPriceWithoutTax = super.getPublicPriceWithoutTax();
  //   const tax = this.price * 0.1;
  //   const publicPrice = publicPriceWithoutTax + tax;
  //   const roundedPrice = this.round(publicPrice, 2);

  //   return roundedPrice;
  // }

}


class Magazine extends Publication {

  constructor(title, publisher, release, periodicy = "non disponibile", type = "non classificato", price = -1, copies = 0, discount = 0, releaseDate = new Date()) {
    super(title, publisher, type, price, copies, discount, 20);
    this.release = release;
    this.periodicy = periodicy;
    this._releaseDate = releaseDate.getTime();
  }

  get releaseDate() {
    const date = new Date(this._releaseDate);
    return date;
  }

  set releaseDate(value) {
    const time = value.getTime();
    this._releaseDate = time;
  }

  toString() {

    const magazineString = super.toString() + '\n' +
      'Numero: ' + this.release + '\n' +
      'Periodicità: ' + this.periodicy + '\n' +
      'Data di Pubblicazione: ' + this.releaseDate;

    return magazineString;

  }

  // getPublicPrice(){

  //   const publicPriceWithoutTax = super.getPublicPriceWithoutTax();
  //   const tax = this.price * 0.2;
  //   const publicPrice = publicPriceWithoutTax + tax;
  //   const roundedPrice = this.round(publicPrice, 2);

  //   return roundedPrice;

  // }


}


function pubblicationFactory(obj){

  if (obj.author) {
    return new Book(obj.title, obj.author, obj.publisher, obj.type, obj.price, obj.copies, obj.pages, obj.yop, obj.discount);
  } else {
    return new Magazine(obj.title, obj.pubString, obj.release, obj.periodicy, obj.type, obj.price, obj.copies, obj.discount, new Date(obj._releaseDate));
  }

}

exports.Book = Book;
exports.Magazine = Magazine;
exports.pubblicationFactory = pubblicationFactory;