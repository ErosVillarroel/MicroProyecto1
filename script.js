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
  const table = document.querySelector("#carton1");

  //Pedir el tamano del carton del localstorage
  let size = parseInt(localStorage.getItem("size"));

  //limpiar la tabla
  while (table.rows.length > 0) {
    table.deleteRow(table.rows.length - 1);
  }

  //crear array desde 1 hasta 50 para poder hacer los numeros de la tabla
  const numbers = Array.from({ length: 50 }, (_, i) => i + 1);

  //barajeamos el arreglo
  shuffle(numbers);

  //jiji
  // console.log(numbers);

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

//Crear 4 tablas (YUCA)
function createTables() {
  // Get references to the table containers
  const table1 = document.querySelector("#carton1");
  const table2 = document.querySelector("#carton2");
  const table3 = document.querySelector("#carton3");
  const table4 = document.querySelector("#carton4");

  // Get the size of the carton from local storage
  let size = parseInt(localStorage.getItem("size"));

  // Clear existing tables
  while (table1.rows.length > 0) {
    table1.deleteRow(table1.rows.length - 1);
  }
  while (table2.rows.length > 0) {
    table2.deleteRow(table2.rows.length - 1);
  }
  while (table3.rows.length > 0) {
    table3.deleteRow(table3.rows.length - 1);
  }
  while (table4.rows.length > 0) {
    table4.deleteRow(table4.rows.length - 1);
  }

  // Create an array of numbers from 1 to 50
  const numbers = Array.from({ length: 50 }, (_, i) => i + 1);

  // Shuffle the array
  shuffle(numbers);

  let iterator = 0;

  // Create the tables and add cells with formatting
  for (let i = 0; i < size; i++) {
    // Table 1
    let tr1 = document.createElement("tr");
    table1.appendChild(tr1);

    // Table 2
    let tr2 = document.createElement("tr");
    table2.appendChild(tr2);

    // Table 3
    let tr3 = document.createElement("tr");
    table3.appendChild(tr3);

    // Table 4
    let tr4 = document.createElement("tr");
    table4.appendChild(tr4);

    for (let j = 0; j < size; j++) {
      let td = document.createElement("td");
      let id = numbers[iterator].toString();
      td.id = id;
      td.style.height = "20%";
      td.style.width = "20%";
      td.classList.add("main-table-cell");

      let div = document.createElement("div");
      div.classList.add("cell-format");
      div.textContent = numbers[iterator].toString();

      // Add cells to respective tables
      td.appendChild(div);
      tr1.appendChild(td);
      tr2.appendChild(td.cloneNode(true));
      tr3.appendChild(td.cloneNode(true));
      tr4.appendChild(td.cloneNode(true));

      iterator++;
    }

    // Hacer las tablas invisibles
    table2.style.display = "none";
    table3.style.display = "none";
    table4.style.display = "none";
  }

  // Add event listeners to all generated cells
  assignEventListeners();
}

//Events listeners de las celdas
function assignEventListeners() {
  const cells = document.querySelectorAll(".main-table-cell");

  //Pedir el tamano del carton del localstorage
  let size = parseInt(localStorage.getItem("size"));

  cells.forEach((e) => {
    e.addEventListener("click", () => {
      e.classList.add("stricken");

      if (checkFull()) {
        localStorage.setItem("player_1Points", 5);
        document.getElementById("pointsCount").innerHTML =
          "Carton Full! Puntos: " + 5;
        alert("Carton full");
        return;
      }

      if (size === 5) {
        //revisar si hay puntos
        if (findPointLarge()) {
          let player_1Points = parseInt(
            localStorage.getItem("player_1Points"),
            10
          );

          player_1Points++;
          document.getElementById("pointsCount").innerHTML =
            "Puntos: " + player_1Points;

          localStorage.setItem("player_1Points", player_1Points);
        } else if (findPointLargeSpecial()) {
          let player_1Points = parseInt(
            localStorage.getItem("player_1Points"),
            10
          );

          player_1Points += 3;
          document.getElementById("pointsCount").innerHTML =
            "Puntos: " + player_1Points;

          localStorage.setItem("player_1Points", player_1Points);
        }
      } else if (size === 4) {
        if (findPointMedium()) {
          let player_1Points = parseInt(
            localStorage.getItem("player_1Points"),
            10
          );
          player_1Points++;
          document.getElementById("pointsCount").innerHTML =
            "Puntos: " + player_1Points;

          localStorage.setItem("player_1Points", player_1Points);
        } else if (findPointMediumSpecial()) {
          let player_1Points = parseInt(
            localStorage.getItem("player_1Points"),
            10
          );

          player_1Points += 3;
          document.getElementById("pointsCount").innerHTML =
            "Puntos: " + player_1Points;

          localStorage.setItem("player_1Points", player_1Points);
        }
      } else if (size === 3) {
        if (findPointSmall()) {
          let player_1Points = parseInt(
            localStorage.getItem("player_1Points"),
            10
          );

          player_1Points++;
          document.getElementById("pointsCount").innerHTML =
            "Puntos: " + player_1Points;

          localStorage.setItem("player_1Points", player_1Points);
        } else if (findPointSmallSpecial()) {
          let player_1Points = parseInt(
            localStorage.getItem("player_1Points"),
            10
          );

          player_1Points += 3;
          document.getElementById("pointsCount").innerHTML =
            "Puntos: " + player_1Points;

          localStorage.setItem("player_1Points", player_1Points);
        }
      }
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

  //da a elegir el tamano de los cartones
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
    // console.log(pName);
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

      // console.log(bingoNumbersFromStorage);
      // console.log(randomNum);
    } else {
      generateBingoNumbersRegistry();
    }

    // Cambia el texto del botón
    document.getElementById("generateBtn").innerHTML = "Siguiente Número";
  } else {
    document.getElementById("carton1").style.pointerEvents = "none";
    document.getElementById("carton2").style.pointerEvents = "none";
    document.getElementById("carton3").style.pointerEvents = "none";
    document.getElementById("carton4").style.pointerEvents = "none";

    document.getElementById("generateBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "block";

    alert("Numero maximo de numeros alcanzado.");
  }
}

//Empeiza el contador de numeros generados
function startCounter() {
  localStorage.setItem("movesCounter", 0);

  //empieza los contadores de puntos de los usuarios
  localStorage.setItem("player_1Points", 0);
  localStorage.setItem("player_2Points", 0);
  localStorage.setItem("player_3Points", 0);
  localStorage.setItem("player_4Points", 0);

  localStorage.setItem("currentPlayer", localStorage.getItem("player_1"));
}

//vaina rara que encontre en internet para encontrar los matches entre los cartones y los array ganadores
function findPointLarge() {
  // Selecciona todas las celdas del documento con la clase "main-table-cell"
  const cells = document.querySelectorAll(".main-table-cell");

  // Itera sobre cada combinación en winningArrayLarge
  return winningArrayLarge.some((combination) => {
    let iterator = 0;
    // Para cada índice en la combinación
    combination.forEach((index) => {
      // Si la celda en el índice actual tiene la clase "stricken", incrementa el contador
      if (cells[index].classList.contains("stricken")) {
        iterator++;
      }
    });

    if (iterator === 5) {
      let indexWin = winningArrayLarge.indexOf(combination);
      winningArrayLarge.splice(indexWin, 1);
    }

    // Verifica si todos los índices en la combinación tienen la clase "stricken"
    return combination.every((index) => {
      return cells[index].classList.contains("stricken");
    });
  });
}

//verificar punto en diagonal
function findPointLargeSpecial() {
  // Selecciona todas las celdas del documento con la clase "main-table-cell"
  const cells = document.querySelectorAll(".main-table-cell");

  // Itera sobre cada combinación en cawinningArrayLargeSpecial
  return winningArrayLargeSpecial.some((combination) => {
    let iterator = 0;
    // Para cada índice en la combinación
    combination.forEach((index) => {
      // Si la celda en el índice actual tiene la clase "stricken", incrementa el contador
      if (cells[index].classList.contains("stricken")) {
        iterator++;
      }
    });

    if (iterator === 5) {
      let indexWin = winningArrayLargeSpecial.indexOf(combination);
      winningArrayLargeSpecial.splice(indexWin, 1);
    }

    // Verifica si todos los índices en la combinación tienen la clase "stricken"
    return combination.every((index) => {
      return cells[index].classList.contains("stricken");
    });
  });
}

//verificador punto tamano medio
function findPointMedium() {
  // Selecciona todas las celdas del documento con la clase "main-table-cell"
  const cells = document.querySelectorAll(".main-table-cell");

  // Itera sobre cada combinación en winningArrayMedium
  return winningArrayMedium.some((combination) => {
    let iterator = 0;
    // Para cada índice en la combinación
    combination.forEach((index) => {
      // Si la celda en el índice actual tiene la clase "stricken", incrementa el contador
      if (cells[index].classList.contains("stricken")) {
        iterator++;
      }
    });

    if (iterator === 4) {
      let indexWin = winningArrayMedium.indexOf(combination);
      winningArrayMedium.splice(indexWin, 1);
    }

    // Verifica si todos los índices en la combinación tienen la clase "stricken"
    return combination.every((index) => {
      return cells[index].classList.contains("stricken");
    });
  });
}

//verificar punto tamano medio diagonal
function findPointMediumSpecial() {
  // Selecciona todas las celdas del documento con la clase "main-table-cell"
  const cells = document.querySelectorAll(".main-table-cell");

  // Itera sobre cada combinación en winningArrayMediumSpecial
  return winningArrayMediumSpecial.some((combination) => {
    let iterator = 0;
    // Para cada índice en la combinación
    combination.forEach((index) => {
      // Si la celda en el índice actual tiene la clase "stricken", incrementa el contador
      if (cells[index].classList.contains("stricken")) {
        iterator++;
      }
    });

    if (iterator === 4) {
      let indexWin = winningArrayMediumSpecial.indexOf(combination);
      winningArrayMediumSpecial.splice(indexWin, 1);
    }

    // Verifica si todos los índices en la combinación tienen la clase "stricken"
    return combination.every((index) => {
      return cells[index].classList.contains("stricken");
    });
  });
}

//verificar punto tamano pequeno
function findPointSmall() {
  // Selecciona todas las celdas del documento con la clase "main-table-cell"
  const cells = document.querySelectorAll(".main-table-cell");

  // Itera sobre cada combinación en winningArraySmall
  return winningArraySmall.some((combination) => {
    let iterator = 0;
    // Para cada índice en la combinación
    combination.forEach((index) => {
      // Si la celda en el índice actual tiene la clase "stricken", incrementa el contador
      if (cells[index].classList.contains("stricken")) {
        iterator++;
      }
    });

    if (iterator === 3) {
      let indexWin = winningArraySmall.indexOf(combination);
      winningArraySmall.splice(indexWin, 1);
    }

    // Verifica si todos los índices en la combinación tienen la clase "stricken"
    return combination.every((index) => {
      return cells[index].classList.contains("stricken");
    });
  });
}

//Verificar punto tamano pequenoi diagonal
function findPointSmallSpecial() {
  // Selecciona todas las celdas del documento con la clase "main-table-cell"
  const cells = document.querySelectorAll(".main-table-cell");

  // Itera sobre cada combinación en winningArraySmall
  return winningArraySmallSpecial.some((combination) => {
    let iterator = 0;
    // Para cada índice en la combinación
    combination.forEach((index) => {
      // Si la celda en el índice actual tiene la clase "stricken", incrementa el contador
      if (cells[index].classList.contains("stricken")) {
        iterator++;
      }
    });

    if (iterator === 3) {
      let indexWin = winningArraySmallSpecial.indexOf(combination);
      winningArraySmallSpecial.splice(indexWin, 1);
    }

    // Verifica si todos los índices en la combinación tienen la clase "stricken"
    return combination.every((index) => {
      return cells[index].classList.contains("stricken");
    });
  });
}

//verifica si un carton esta lleno
function checkFull() {
  const cells = document.querySelectorAll(".main-table-cell");
  const size = localStorage.getItem("size");

  let counter = 0;
  cells.forEach((cell) => {
    if (cell.classList.contains("stricken")) {
      counter++;
    }
  });

  return counter === size * size;
}
