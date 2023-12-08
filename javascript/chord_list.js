const rootNotes = document.querySelectorAll(".root-note");
const chordVariations = document.querySelectorAll(".chord-variation");

//Basic toglle functionality

rootNotes.forEach((note) =>
  note.addEventListener("click", (e) => {
    rootNotes.forEach((n) => n.classList.remove("active-root"));
    chordVariations.forEach((v) => v.classList.remove("active-variation"));
    e.target.classList.toggle("active-root");
  })
);

chordVariations.forEach((variation) =>
  variation.addEventListener("click", (e) => {
    chordVariations.forEach((v) => v.classList.remove("active-variation"));
    e.target.classList.toggle("active-variation");
  })
);
