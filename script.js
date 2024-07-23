const gridContainer = document.querySelector("#grid-container");
const buttonContainer = document.querySelector("#button-container");
const setGridButton = document.querySelector("#set-grid-button");
const setGridInput = document.querySelector("#set-grid-input");
const colorSelector = document.querySelector("#color-selector");
let activeColor = "teal";

function createGrid(pixelsPerRow) {
    for (let i = 0; i < pixelsPerRow; i++ ) { 
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");

        for (let j = 0; j < pixelsPerRow; j++) {
            const newPixel = document.createElement("div");
            newPixel.classList.add("pixel");
            newPixel.style.width = `${800 / pixelsPerRow}px`;
            newPixel.style.height = `${800 / pixelsPerRow}px`;
            gridRow.appendChild(newPixel);
        }
    gridContainer.appendChild(gridRow);
    }
};


setGridButton.addEventListener("click", () => {
    const numbersOnly = /[0-9]/;
    
    if(setGridInput.value > 100) {
        setGridInput.value = "";
        alert("Side length must be less than 100 to stop your computer from exploding");
    } else {
        if (!setGridInput.value.match(numbersOnly)) {
            setGridInput.value = "";
            alert("You must enter a number");
        } else if (setGridInput.value.match(numbersOnly)) {
            gridContainer.innerHTML = "";
            createGrid(setGridInput.value);
            setGridInput.value = "";
        }
    }
});

gridContainer.addEventListener("mouseover", (e) => {
    let pixelArray = document.querySelectorAll(".pixel");
    pixelArray = [...pixelArray];

    let target = e.target;
    if (pixelArray.indexOf(target) >= 0) {
        target.style.backgroundColor = activeColor;
    }
});

colorSelector.addEventListener("input", () => {
    activeColor = colorSelector.value;
})



