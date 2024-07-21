const gridContainer = document.querySelector("#grid-container");

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
}

createGrid(16); 

let pixel = document.querySelectorAll(".pixel");
pixel = [...pixel];


gridContainer.addEventListener("mouseover", (e) => {
    let target = e.target;
    if (pixel.indexOf(target) >= 0) {
        target.style.backgroundColor = "yellow";
    }
})

console.log(pixel);
