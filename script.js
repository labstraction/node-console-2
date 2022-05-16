const prompt = require('prompt');
const model = require('./model.js')

const bookArray = [];

console.log('benvenuto in book manager!')

startMenu();


function startMenu() {
  console.log('sono disponibili tre opzioni');
  console.log('1) aggiungi un libro');
  console.log('2) lista libri');
  console.log('3) esci')

  prompt.start();

  const schema = {
    properties: {
      selection: {
        description: 'Seleziona una delle opzioni',
      }
    }
  };

  prompt.get(schema, startMenuManager);
}


function startMenuManager(err, result){
  if (result.selection === '1') {
    insertBook();   
  } else if (result.selection === '2'){

  } else if (result.selection === '3') {
    console.log('Grazie e a Presto!')
    process.exit();
  } else {
    console.log('selezione non disponibile');
    startMenu();
  }
}

function insertBook() {

  // prompt.start();

  const schema = {
    properties: {
      title: {
        description: 'inserisci il titolo',
      },
        author: {
        description: 'inserisci l\'autore',
      },
        publisher: {
        description: 'inserisci la casa editrice',
      },
    }
  };

  prompt.get(schema, insertBookManger);
  
}

function insertBookManger(err, result){

  const book = new model.Book(result.title, result.author, result.publisher);

  bookArray.push(book);

  startMenu();

}