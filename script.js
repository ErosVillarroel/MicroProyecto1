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
  assignEventListeners()
}

//Funcion para anadir listeners
function assignEventListeners(){
    const cells = document.querySelectorAll(".main-table-cell")

    cells.forEach(e => {
        e.addEventListener("click", () => {
            e.classList.add("stricken")
        })
        
    });

}