const chords = document.querySelector(".chords");
const progressionElements = document.querySelectorAll(".progression");
let progressionName;
let currentProgressionModes;
let currentRelativePositions;

const progressions = {
  "Major triads": ["Major", "Minor", "Minor", "Major", "Major", "Minor", "Dim"],
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
  "Melodic minor triad": [
    "Minor",
    "Minor",
    "Aug",
    "Major",
    "Major",
    "Dim",
    "Dim",
  ],
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

const scalePatterns = {
  Major: [2, 2, 1, 2, 2, 2, 1],
  Minor: [2, 1, 2, 2, 1, 2, 2],
};

const numerals = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
};

const getCurrentScale = function (progression, root) {
  const rootPosition = chormaticSacle.indexOf(root);
  let counter = 0;
  let scaleNotes = [];

  const scaleType = progression.toLowerCase().includes("major")
    ? "Major"
    : "Minor";

  scalePatterns[scaleType].forEach((p, i) => {
    if (i == 0) {
      scaleNotes.push(chormaticSacle[rootPosition]);
      counter += p;
    } else {
      scaleNotes.push(
        chormaticSacle[
          rootPosition + counter >= chormaticSacle.length
            ? rootPosition + counter - chormaticSacle.length
            : rootPosition + counter
        ]
      );
      counter += p;
    }
  });
  return scaleNotes;
};

const createProgressionChords = function (
  rootNote,
  relarivePositionsString,
  progressionName
) {
  const rootPosition = chormaticSacle.indexOf(rootNote);
  const scale = getCurrentScale(progressionName, rootNote);
  /*Remove unnecesary characters and convert into array*/
  const relativePositionsArr = relarivePositionsString
    .replaceAll("-", " ")
    .replaceAll("*", "")
    .toLowerCase()
    .split(" ");

  const notesArr = relativePositionsArr.map((r, i) => {
    if (i === 0) {
      return `${scale[rootPosition]}${currentProgressionModes[i]}`;
    } else {
      return `${
        numerals[r] + rootPosition > scale.length
          ? scale[rootPosition + numerals[r] - scale.length]
          : scale[rootPosition + numerals[r] - 1]
      }${currentProgressionModes[i]}`;
    }
  });

  return notesArr;
};

progressionElements.forEach((p) => {
  p.addEventListener("click", (e) => {
    /*Get current progression and relative positions fom DOM */
    [progressionName, currentRelativePositions] =
      e.target.innerHTML.split(/<br\s*\/?>/);

    /*Get modes from the progressions object*/
    currentProgressionModes = progressions[progressionName.trim()];

    /*Create the chords of the progression */
    const progressionChordsArray = createProgressionChords(
      currentRoot,
      currentRelativePositions.trim(),
      progressionName.trim()
    );

    /*Remove any previous chords */
    document.querySelectorAll(".progression-chord").forEach((p) => p.remove());

    /*Render the new chords */
    progressionChordsArray.forEach((pc) => {
      chords.insertAdjacentHTML(
        "beforeend",
        `<li class=progression-chord>${pc}</li>`
      );
    });
    progressionElements.forEach((ps) => {
      ps.classList.remove("active-progression");
      e.target.classList.add("active-progression");
    });
  });
});
