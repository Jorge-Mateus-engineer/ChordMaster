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
const colorMap = {
  0: "#e67e22",
  1: "#3498db",
  2: "#a352c2",
  3: "#35cc71",
  4: "#f1c40f",
};

let chordInfo = {};

//Inicializar base de datos

const initDB = function (rootNote) {
  fetch("../src/guitar.json")
    .then((response) => response.json())
    .then((data) => {
      const chordData = {
        ...data[rootNote].filter(
          (chord) => chord.suffix === currentVariation.toLowerCase()
        ),
      };
      chordInfo = { ...chordData[0] };
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
  if (stringFrets && typeof stringFrets[Symbol.iterator] === "function") {
    const fretArray = Array.from(stringFrets);
    if (fretNumber === -1) {
      matchingFret = fretArray.find((fret) => fret.dataset.number === "0");
    } else if (barre === baseFret /*|| capo == undefined*/) {
      matchingFret = fretArray.find(
        (fret) => fret.dataset.number === fretNumber.toString()
      );
    } else if (capo) {
      matchingFret = fretArray.find(
        (fret) => fret.dataset.number * 1 === fretNumber + baseFret
      );
    } else {
      matchingFret = fretArray.find(
        (fret) => fret.dataset.number * 1 === fretNumber
      );
    }
    if (matchingFret) {
      matchingFret.innerHTML = notesArray[index];
    }
  }
};

const insertBarre = function (barre, baseFret) {
  if (barre && baseFret >= 0) {
    let parentElement;
    // Create pseudo element
    const barreElement = document.createElement("div");

    // Add styles
    barreElement.classList.add("barre-element");

    // Select parent
    document.querySelectorAll(`.fret-numbers li`).forEach((f) => {
      if (f.textContent === `${barre === 1 ? baseFret : baseFret + barre}`) {
        parentElement = f;
      }
    });

    if (parentElement) {
      // Agregar el pseudo elemento
      parentElement.appendChild(barreElement);
    }
  }
};

const removeBarre = function () {
  document.querySelector(".barre-element")?.remove();
};

const deleteNotes = function () {
  document.querySelectorAll(".open-note").forEach((o) => o.remove());
  document.querySelectorAll(".muted-string").forEach((m) => m.remove());
  document.querySelectorAll(".fret-note").forEach((f) => f.remove());
  notesArray = [];
};

//Basic toggle functionality for picklist

rootNotes.forEach((note) =>
  note.addEventListener("click", (e) => {
    rootNotes.forEach((n) => n.classList.remove("active-root"));
    chordVariations.forEach((v) => v.classList.remove("active-variation"));
    e.target.classList.toggle("active-root");
    currentRoot = e.target.textContent;
  })
);

chordVariations.forEach((variation) =>
  variation.addEventListener("click", (e) => {
    chordVariations.forEach((v) => v.classList.remove("active-variation"));
    e.target.classList.toggle("active-variation");
    currentVariation = e.target.textContent;
    initDB(currentRoot);
    deleteNotes();
    removeBarre();
    //Creacion del acorde en pantalla
    setTimeout(() => {
      insertBarre(
        chordInfo.positions[0].barres[0]
          ? chordInfo.positions[0].barres[0]
          : false,
        chordInfo.positions[0].baseFret
      );
      createNoteElements(
        chordInfo.positions[0].fingers,
        chordInfo.positions[0].frets
      );
      for (let i = 0; i <= 6; i++) {
        insertNoteElements(
          chordInfo.positions[0].frets[i],
          allFrets[i],
          i,
          chordInfo.positions[0].barres[0],
          chordInfo.positions[0].capo,
          chordInfo.positions[0].baseFret
        );
      }
      console.log(chordInfo);
    }, 500);
  })
);

initDB(currentRoot);
