const main = document.querySelector("main");
const fretNumbers = document.querySelector(".fret-numbers");
const fretboard = document.querySelector(".fretboard");

const resizeElements = () => {
  if (window.screen.width <= 864 && window.screen.width >= 402) {
    if (window.screen.width <= fretNumbers.offsetWidth) {
      fretboard.style.overflowX = "scroll";
      fretboard.style.marginLeft = `${window.screen.width * 0.01}%`;
      fretboard.style.paddingLeft = window.screen.width < 570 ? "70%" : "30%";
    } else {
      fretboard.style.overflowX = null;
      fretboard.style.marginLeft = null;
      fretboard.style.paddingLeft = null;
    }
  }
  if (window.screen.width <= 402) {
    if (window.screen.width <= fretNumbers.offsetWidth) {
      fretboard.style.overflowX = "scroll";
      fretboard.style.marginLeft = `${window.screen.width * 0.02}%`;
      fretboard.style.paddingLeft = "90%";
    } else {
      fretboard.style.overflowX = null;
      fretboard.style.marginLeft = null;
      fretboard.style.paddingLeft = null;
    }
  }
};

setTimeout(resizeElements, 100);

window.addEventListener("resize", resizeElements);
