const rootNotes = document.querySelectorAll(".root-note");
const chordVariations = document.querySelectorAll(".chord-variation");

const firstStringFrets = document.querySelectorAll(".first .fret");
const secondStringFrets = document.querySelectorAll(".second .fret");
const thirdStringFrets = document.querySelectorAll(".third .fret");
const fourthStringFrets = document.querySelectorAll(".fourth .fret");
const fifthStringFrets = document.querySelectorAll(".fifth .fret");
const sixthStringFrets = document.querySelectorAll(".sixth .fret");

const allFrets = [
  sixthStringFrets,
  fifthStringFrets,
  fourthStringFrets,
  thirdStringFrets,
  secondStringFrets,
  firstStringFrets,
];

let currentRoot = "C";
let currentVariation = "major";
let notesArray = [];
let chordData;
const colorMap = {
  0: "#e67e22",
  1: "#3498db",
  2: "#a352c2",
  3: "#35cc71",
  4: "#f1c40f",
};

//Testing

const testFrets = [1, 3, 3, 1, 1, 1];
const testFingering = [1, 3, 4, 1, 1, 1];
const barre = true;
const capo = true;
const baseFret = 8;

//Inicializar base de datos

const initDB = function (rootNote) {
  fetch("../src/guitar.json")
    .then((response) => response.json())
    .then((data) => {
      chordData = {
        ...data[rootNote].filter((chord) => chord.suffix === currentVariation),
      };
      chordData[0].positions.forEach((chord, index) => {
        console.log(chord);
        localStorage.setItem(`Position ${index}`, JSON.stringify(chord));
      });
    })
    .catch((error) => {
      console.error("Error reading JSON file:", error);
    });
};

//Function to render notes

const createNoteElements = function (fingeringArray, fretArray) {
  let i = 0;
  let element;
  fingeringArray.forEach((f) => {
    if (f === 0 && fretArray[i] === 0) {
      element = `<span class='open-note'> </span>`;
    } else if (f === 0 && fretArray[i] == -1) {
      element = element = `<span class='muted-string'>X</span>`;
    } else {
      element = `<span class='fret-note' style='background-color: ${colorMap[f]}'>${f}</span>`;
    }
    notesArray.push(element);
    i++;
  });
};

const insertNoteElements = function (
  fretNumber,
  stringFrets,
  index,
  barre,
  capo,
  baseFret
) {
  let matchingFret;
  if (fretNumber === -1) {
    matchingFret = [...stringFrets].find((fret) => fret.dataset.number === "0");
  } else if (!baseFret && !capo && !barre) {
    matchingFret = [...stringFrets].find(
      (fret) => fret.dataset.number === fretNumber.toString()
    );
  } else {
    matchingFret = [...stringFrets].find(
      (fret) => fret.dataset.number * 1 === fretNumber + baseFret
    );
  }
  if (matchingFret) {
    matchingFret.innerHTML = notesArray[index];
  }
};

const insertBarre = function (barre, baseFret) {
  document.addEventListener("DOMContentLoaded", function () {
    if (barre && baseFret >= 0) {
      // Crear pseudo elemento
      const barreElement = document.createElement("before");

      // Agregar estilos
      barreElement.style.cssText =
        "content: ''; background-color: var(--primary-blue); opacity: 0.8; position: absolute; height: 26rem; width: 2.5rem; border-radius: 20px; transform: translateX(-2rem) translateY(6rem);";

      // Seleccionar el padre
      const parentElement = document.querySelector(
        `.fret-numbers li:nth-child(${baseFret + 3})`
      );

      if (parentElement) {
        // Agregar el pseudo elemento
        parentElement.appendChild(barreElement);
      }
    }
  });
};

//Basic toggle functionality for picklist

rootNotes.forEach((note) =>
  note.addEventListener("click", (e) => {
    rootNotes.forEach((n) => n.classList.remove("active-root"));
    chordVariations.forEach((v) => v.classList.remove("active-variation"));
    e.target.classList.toggle("active-root");
    //Borrar local storage antes de actualizar variable
    localStorage.clear();
    currentRoot = e.target.textContent;
    initDB(currentRoot);
  })
);

chordVariations.forEach((variation) =>
  variation.addEventListener("click", (e) => {
    chordVariations.forEach((v) => v.classList.remove("active-variation"));
    e.target.classList.toggle("active-variation");
    currentVariation = e.target.textContent;
    console.log(JSON.parse(localStorage.getItem(currentRoot)));
  })
);

localStorage.clear();
initDB(currentRoot);

createNoteElements(testFingering, testFrets);

insertBarre(barre, baseFret);

for (let i = 0; i <= 6; i++) {
  insertNoteElements(testFrets[i], allFrets[i], i, barre, capo, baseFret);
}
