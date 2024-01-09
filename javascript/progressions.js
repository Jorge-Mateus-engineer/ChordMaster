const chords = document.querySelector(".chords");
const progressionElements = document.querySelectorAll(".progression");

const progressions = {
  "Major Triads": ["Major", "Minor", "Minor", "Major", "Major", "Minor", "Dim"],
  "Major 7th": ["maj7", "m7", "m7", "maj7", "7", "m7", "m7b5"],
  "Major 6th": ["6", "m6", "6", "6"],
  "Major 9th": ["maj9", "m9", "maj9", "9", "m9"],
  "Natural minor triads": [
    "Minor",
    "dim",
    "Major",
    "Minor",
    "Minor",
    "Major",
    "Major",
  ],
  "Harmonic minor triad": [
    "Minor",
    "Dim",
    "Aug",
    "Minor",
    "Major",
    "Major",
    "Dim",
  ],
  "Melodic minor triad": [],
};

const chormaticSacle = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const numerals = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
};

const renderChordButtons = function (modArr, root, notationArr) {
  const notePosition = chormaticSacle.indexOf(root);
};

progressionElements.forEach((p) => {
  p.addEventListener("click", (e) => {
    progressionElements.forEach((ps) => {
      ps.classList.remove("active-progression");
      e.target.classList.add("active-progression");
      console.log(currentRoot);
    });
  });
});
