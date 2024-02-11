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
