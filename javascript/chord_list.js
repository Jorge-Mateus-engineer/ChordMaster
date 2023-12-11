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

let currentRoot = "";
let currentVariation = "";
let notesArray = [];
const colorMap = {
  0: "#e67e22",
  1: "#3498db",
  2: "#a352c2",
  3: "#35cc71",
  4: "#f1c40f",
};

const testFrets = [-1, 3, 2, 0, 1, 0];
const testFingering = [0, 3, 2, 0, 1, 0];

//Function to render notes

const createNoteElements = function (fingeringArray, fretArray) {
  let i = 0;
  fingeringArray.forEach((f) => {
    notesArray.push(
      `<span class='fret-note' style='background-color: ${colorMap[f]}'>${
        f === 0 && fretArray[i] === -1 ? "x" : f
      }</span>`
    );
    i++;
  });
};

const insertNoteElements = function (fretNumber, stringFrets, index) {
  let matchingFret;
  if (fretNumber === -1) {
    matchingFret = [...stringFrets].find((fret) => fret.dataset.number === "0");
  } else {
    matchingFret = [...stringFrets].find(
      (fret) => fret.dataset.number === fretNumber.toString()
    );
  }
  debugger;
  if (matchingFret) {
    matchingFret.innerHTML = notesArray[index];
  }
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
  })
);

document.querySelector(".logo-container").addEventListener("click", () => {
  firstStringFrets.forEach((f) => console.log(f.dataset.number));
});

createNoteElements(testFingering, testFrets);

for (let i = 0; i <= 6; i++) {
  insertNoteElements(testFrets[i], allFrets[i], i);
}
