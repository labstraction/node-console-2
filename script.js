const prompt = require('prompt');
const model = require('./model.js')
const fs = require('fs');

const publicationArray = loadData();

console.log('benvenuto in book manager!')



startMenu();


function startMenu() {
  console.log('sono disponibili tre opzioni');
  console.log('1) aggiungi un pubblicazioni');
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
    insertMenu();
  } else if (result.selection === '2'){
    printMenu();
  } else if (result.selection === '3') {
    console.log('Grazie e a Presto!')
    process.exit();
  } else {
    console.log('selezione non disponibile');
    startMenu();
  }
}

function printMenu() {
  console.log('sono disponibili tre opzioni');
  console.log('1) lista in ordine di inserimento');
  console.log('2) lista in ordine alfabetico del titolo');
  console.log('3) lista in ordine di prezzo')
  console.log('4) torna al menù principale')

  const schema = {
    properties: {
      selection: {
        description: 'Seleziona una delle opzioni',
      }
    }
  };

  prompt.get(schema, printMenuManager);
}

function printMenuManager(err, result) {
  if (result.selection === '1') {
    printArray(publicationArray);
    startMenu();
  } else if (result.selection === '2') {
    printArrayOrderdByTitle();
    startMenu();
  } else if (result.selection === '3') {
    printArrayOrderdByPrice();
    startMenu();
  } else if (result.selection === '4') {
    startMenu();
  } else {
    console.log('selezione non disponibile');
    printMenu();
  }
}

function printArrayOrderdByTitle(){

  const copy = [...publicationArray];

  copy.sort(comparePublicationByTitle);

  printArray(copy);
}

function comparePublicationByTitle(pub1, pub2){
  return pub1.title.localeCompare(pub2.title);
}

function printArrayOrderdByPrice() {

  const copy = [...publicationArray];

  copy.sort(comparePublicationByPrice);

  printArray(copy);
}

function comparePublicationByPrice(pub1, pub2) {
  return pub1.price - pub2.price;
}

function printArray(arrayToPrint){

  for (const pub of arrayToPrint) {
    console.log(pub.toString());
    console.log('----------------------')
  }

}


function insertMenu(){

  console.log('sono disponibili tre opzioni');
  console.log('1) aggiungi un libro');
  console.log('2) aggiungi un magazine');
  console.log('3) torna al menù principale')

  const schema = {
    properties: {
      selection: {
        description: 'Seleziona una delle opzioni',
      }
    }
  };

  prompt.get(schema, insertMenuManager);
} 

function insertMenuManager(err, result){
  if (result.selection === '1') {
    insertBook();
  } else if (result.selection === '2') {
    insertMagazine();
  } else if (result.selection === '3') {
    startMenu();
  } else {
    console.log('selezione non disponibile');
    insertMenu();
  }
}

function insertBook() {

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
        type:{
        description: 'inserisci il tipo'
      },
        price: {
        description: 'inserisci il prezzo',
      },
        copies: {
        description: 'inserisci il numero di copie',
      },
        pages: {
        description: 'inserisci il numero di pagine',
      },
        yop: {
        description: 'inserisci l\'anno di pubblicazione'
      },
        discount: {
        description: 'inserisci lo sconto'
      }
    }
  };

  prompt.get(schema, insertBookManger);
  
}

function insertBookManger(err, result){

  const book = new model.Book(result.title, result.author, result.publisher, result.type, parseFloat(result.price), parseInt(result.copies), parseInt(result.pages), parseInt(result.yop), parseFloat(result.discount));

  publicationArray.push(book);

  saveData(publicationArray);

  startMenu();

}


function insertMagazine() {


  const schema = {
    properties: {
      title: {
        description: 'inserisci il titolo',
      },
      publisher: {
        description: 'inserisci la casa editrice',
      },
      release:{
        description: 'inserisci il numero di uscita'
      },
      periodicity: {
        description: 'inserisci la periodicità'
      },
      type: {
        description: 'inserisci il tipo'
      },
      price: {
        description: 'inserisci il prezzo',
      },
      copies: {
        description: 'inserisci il numero di copie',
      },
      discount: {
        description: 'inserisci la percentuale sconto'
      }
    }
  };



  prompt.get(schema, insertMagazineManger);

}

function insertMagazineManger(err, result) {

  const magazine = new model.Magazine(result.title, result.publisher, result.release, result.periodicity, result.type, parseFloat(result.price), parseInt(result.copies), parseFloat(result.discount));

  publicationArray.push(magazine);

  saveData(publicationArray);

  startMenu();

}

function saveData(arrayToSave){

  const jsonArray = JSON.stringify(arrayToSave);

  try {
    fs.writeFileSync('./data_file.json', jsonArray);
  } catch (error) {
    console.log('impossibile salvare i file');
  }
  

}

function loadData(){

  let jsonArray
  
   try {
    jsonArray = fs.readFileSync('./data_file.json', 'utf8');
  } catch (error) {
    jsonArray = '[]'
  }

  jsonArray = jsonArray.trim();
  const array = [];
  if (jsonArray) {
    array = JSON.parse(jsonArray);
  }

  const pubArray = [];

  for (const obj of array) {
    const publication = model.pubblicationFactory(obj);
    pubArray.push(publication);
  }

  return pubArray;
}