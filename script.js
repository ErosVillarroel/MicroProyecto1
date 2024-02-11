//Arrays de combinaciones ganadoras 3x3
const winningArraySmall = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const winningArraySmallSpecial = [
  [0, 4, 8],
  [2, 4, 6],
];

//Arrays de combinaciones ganadoras 4x4
const winningArrayMedium = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
];

const winningArrayMediumSpecial = [
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

//Arrays de combinaciones ganadoras 5x5
const winningArrayLarge = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
];

const winningArrayLargeSpecial = [
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

//crear un "diccionario" y llenarlo con numeros del 1 al 50 inicializados en 0
function generateBingoNumbersRegistry() {
  const bingoNumbers = {}; // Crear un objeto vacío

  for (let i = 1; i < 51; i++) {
    bingoNumbers[i] = 0; // Inicializar cada número con 0
  }

  // Convertir el objeto a una cadena de texto y guardarlo en localStorage (no entendi como monda funciona esto pq el localstorage es raro, pero internet dice q asi)
  localStorage.setItem("bingoNumbers", JSON.stringify(bingoNumbers));
}

//Guarda el tamano seleccionado por el usuario para el carton
function setSize(size) {
  localStorage.setItem("size", size);
  console.log(`Opcion sleccionada: ${size}`);
}

//Barajea un array para conseguir un orden aleatoreo
function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
//crea la tabla con el tamano elegido.
function createTable() {
  //Pedir la tabla
  const table = document.querySelector("#carton");

  //Pedir el tamano del carton del localstorage
  let size = parseInt(localStorage.getItem("size"));

  //limpiar la tabla
  while (table.rows.length > 0) {
    table.deleteRow(table.rows.length - 1);
  }

  //crear array desde 1 hasta tamano*tamano para poder hacer una tabla
  const numbers = Array.from({ length: size * size }, (_, i) => i + 1);

  //barajeamos el arreglo
  shuffle(numbers);

  //jiji
  console.log(numbers);

  let iterator = 0;

  //creamos la tabla y le anadimos las celdas con su formato
  for (i = 0; i < size; i++) {
    let tr = document.createElement("tr");
    table.appendChild(tr);

    for (j = 0; j < size; j++) {
      let td = document.createElement("td");

      let id = numbers[iterator].toString();

      td.id = id;
      td.style.height = "20%";
      td.style.width = "20%";
      td.classList.add("main-table-cell");

      let div = document.createElement("div");
      div.classList.add("cell-format");
      div.textContent = numbers[iterator].toString();
      td.appendChild(div);
      tr.appendChild(td);
      iterator++;
    }
  }

  //Anadimos listeners a todas las celdas generadas
  assignEventListeners();
}

//Events listeners de las celdas
function assignEventListeners() {
  const cells = document.querySelectorAll(".main-table-cell");

  cells.forEach((e) => {
    e.addEventListener("click", () => {
      e.classList.add("stricken");
    });
  });
}

//Funcion para cuando se empiece a jugar
function startPlaying() {
  //Primero se revisa si al menos el nombre 1 existe
  const importantName = document.getElementById("nameInput1").value;

  //revisa si el nombre obligatorio esta lleno y si no, pide la accion otra vez
  if (importantName.trim() === "") {
    alert("Debe ingresar al menos un nombre de usuario");
    closeCard();
    return;
  }

  //Guarda el nombre obligatorio
  localStorage.setItem("player_1", importantName);
  console.log(`Nombre player_1: ${importantName}`);

  //pide todos los inputs
  const names = document.querySelectorAll(".nameInput");

  //el contador empieza en 2 porque siempre viene lleno un nombre
  let counter = 2;
  names.forEach((e) => {
    let name = e.value;
    //Si el nombre esta vacio, se llena con player_#
    if (name.trim() === "") {
      let name = "player_" + counter.toString();
      localStorage.setItem(name, name);
      console.log(`Nombre ${name}: ${name}`);
      counter++;
      //Si no, se guarda en la memoria local como player_# y el nombre introducido
    } else {
      let placeholderName = "player_" + counter.toString();
      localStorage.setItem(placeholderName, name);
      console.log(`Nombre ${placeholderName}: ${name}`);
      counter++;
    }
  });

  //esconde el boton original de play
  let playBtn = document.querySelector(".playBtn");
  playBtn.style.display = "none";

  //pide los botones que estan escondidos
  let cartonBtns = document.querySelectorAll(".cartonBtn");

  //cambia el display de los botones para que sean visibles
  cartonBtns.forEach((e) => {
    e.style.display = "flex";
  });

  //cierra la tarjeta de nombres
  closeCard();

  document.getElementById("playText").innerHTML = "Elija el tamano del carton";
}

// funcion para mostrar la tarjeta de nombres
function showNamesCard() {
  const card = document.getElementById("namesCard");
  card.style.display = "flex";
}

// funcion para cerrar la tarjeta de nombres
function closeCard() {
  const card = document.getElementById("namesCard");
  card.style.display = "none";

  document.getElementById("nameInput1").value = "";
  let nameInputs = document.querySelectorAll(".nameInput");

  //Limpia los campos de texto
  console.log(nameInputs);
  nameInputs.forEach((e) => {
    e.value = "";
  });
}

//funcion para pedir los nombres guardados en la memoria local
function fetchButtonNames() {
  //pide el array de los botones
  const btns = document.querySelectorAll(".playerBtn");
  // console.log(btns);

  //se usa este contador para iterar en el array de bottones, cambiando el innerHTML al nombre guardado en esa posicion, si no hay un nombre guardado de cambia con el default player_#
  let counter = 1;
  btns.forEach((btn) => {
    let pNumber = "player_" + counter.toString();
    let pName = localStorage.getItem(pNumber);
    btn.innerHTML = pName;
    counter++;
    console.log(pName);
  });

  //Mostrar el nombre del carton del player 1
  document.getElementById("cartonName").innerHTML =
    "Carton de: " + localStorage.getItem("player_1");
}

//genera el numero aleatoreo para los cartones
function generateRandomNumber() {
  let movesCounter = parseInt(localStorage.getItem("movesCounter"), 10);

  if (movesCounter < 26) {
    // Recuperar el objeto del localStorage y convertirlo nuevamente a un objeto
    const bingoNumbersFromStorage = JSON.parse(
      localStorage.getItem("bingoNumbers")
    );

    // Numero aleatorio entre 1 y 50
    let randomNum = Math.floor(Math.random() * 50) + 1;

    if (bingoNumbersFromStorage[randomNum.toString()] === 0) {
      // Cambia el display del número para que sea visible
      let display = document.getElementById("bingoNumber");
      display.innerHTML = randomNum;
      display.style.display = "flex";
      //cambiar el numero de movimientos para que sea visible
      document.getElementById("numbersLeft").innerHTML =
        "Numero de movimientos: " + movesCounter;
      document.getElementById("numbersLeft").style.display = "block";
      bingoNumbersFromStorage[randomNum.toString()] = 1;

      movesCounter++;
      // Guarda los cambios en el almacenamiento local
      localStorage.setItem(
        "bingoNumbers",
        JSON.stringify(bingoNumbersFromStorage)
      );

      localStorage.setItem("movesCounter", movesCounter);
    } else {
      generateBingoNumbersRegistry();
    }

    // Cambia el texto del botón
    document.getElementById("generateBtn").innerHTML = "Siguiente Número";
  }
}

//Empeiza el contador de numeros generados
function startCounter() {
  localStorage.setItem("movesCounter", 0);
}
