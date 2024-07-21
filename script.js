const gridContainer = document.querySelector("#grid-container");
const buttonContainer = document.querySelector("#button-container");
const setGridButton = document.querySelector("#set-grid-button");
const setGridInput = document.querySelector("#set-grid-input");
let activeColor = "yellow";

function createGrid(pixelsPerRow) {
    for (let i = 0; i < pixelsPerRow; i++ ) { 
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");

        for (let j = 0; j < pixelsPerRow; j++) {
            const newPixel = document.createElement("div");
            newPixel.classList.add("pixel");
            gridRow.appendChild(newPixel);
        }
    gridContainer.appendChild(gridRow);
    }
};

setGridButton.addEventListener("click", () => {
    const numbersOnly = /[0-9]/gm;

    if (!setGridInput.value.match(numbersOnly)) {
        setGridInput.value = "";
        alert("You must enter a number");
    } 
    gridContainer.innerHTML = "";
    createGrid(setGridInput.value);
});

gridContainer.addEventListener("mouseover", (e) => {
    let pixelArray = document.querySelectorAll(".pixel");
    pixelArray = [...pixelArray];

    let target = e.target;
    if (pixelArray.indexOf(target) >= 0) {
        target.style.backgroundColor = activeColor;
    }
});

buttonContainer.addEventListener("click", (e) => {
    let target = e.target;
    activeColor = target.textContent;
});



