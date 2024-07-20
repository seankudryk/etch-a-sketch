const pixel = document.querySelector("#pixel");
const gridRow = document.querySelector(".grid-row");
//let createPixel = document.createElement("div");

//write a function which creates pixels


function createGrid(pixelsPerSide) {
   
    for (let i = 0; i < pixelsPerSide; i++) {
        createPixel();
    }
        
}


function createPixel() {
    const createPixel = document.createElement("div");
    createPixel.classList.add("pixel");
    document.body.appendChild(createPixel);
}

createGrid(16);