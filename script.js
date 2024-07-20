const gridContainer = document.querySelector("#grid-container");

function createGrid(pixelsPerRow) {
    for (let i = 0; i < pixelsPerRow; i++ ) { 
        //create a new empty div
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

createGrid(20); 