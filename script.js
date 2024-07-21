const gridContainer = document.querySelector("#grid-container");
const buttonContainer = document.querySelector("#button-container");
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

createGrid(16); 

let pixel = document.querySelectorAll(".pixel");
pixel = [...pixel];

buttonContainer.addEventListener("click", (e) => {
    let target = e.target;
    activeColor = target.textContent;
    console.log(activeColor);
});

gridContainer.addEventListener("mouseover", (e) => {
    let target = e.target;
    if (pixel.indexOf(target) >= 0) {
        target.style.backgroundColor = activeColor;
    }
});

console.log(pixel);
