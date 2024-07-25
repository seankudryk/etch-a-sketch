const gridContainer = document.querySelector("#grid-container");
const optionsContainer = document.querySelector("#options-container");
const setGridButton = document.querySelector("#set-grid-button");
const setGridInput = document.querySelector("#set-grid-input");
const colorSelector = document.querySelector("#color-selector");
const randomizerButton = document.querySelector("#randomizer-button");
const eraserButton = document.querySelector("#eraser-button");
const dumpButton = document.querySelector("#dump-button");
const saveToPalette = document.querySelector("#palette-save");
const paletteGrid = document.querySelector("#palette-grid");

let activeColor = "black"; //default pixel color, overwritten by user selection in the color input element

let randomizerActive = false; //a boolean switch variable to check the status of the randomizer button
let eraserActive = false; // same as randomizer, but for the eraser element

setGridInput.focus();

function createGrid(pixelsPerRow) {
    for (let i = 0; i < pixelsPerRow; i++ ) { 
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");

        for (let j = 0; j < pixelsPerRow; j++) {
            const newPixel = document.createElement("div");
            newPixel.classList.add("pixel");
            newPixel.style.width = `${800 / pixelsPerRow}px`;
            newPixel.style.height = `${800 / pixelsPerRow}px`;
            newPixel.style.opacity = 1.0;
            gridRow.appendChild(newPixel);
        }
    gridContainer.appendChild(gridRow);
    }
};

setGridButton.addEventListener("click", () => {
    const numbersOnly = /[0-9]/gm; 
    
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
    setGridInput.focus();
});

gridContainer.addEventListener("mouseover", (e) => {
    let pixelArray = document.querySelectorAll(".pixel");
    pixelArray = [...pixelArray];
    
    let target = e.target;

    if (randomizerActive) { //if the randomizer button is active, then randomize the color of pixels on mouseover
        if (pixelArray.indexOf(target) >= 0) {
            target.style.backgroundColor = randomColorGenerator();
        }
    } else if (eraserActive) { //if the eraser button is active, then randomize the color of pixels on mouseover
        if (pixelArray.indexOf(target) >= 0) {
            target.style.backgroundColor = "white";
        }
    } 
    else { // default case of setting the background color of pixel to the current active color (set through the color input element)
        if (pixelArray.indexOf(target) >= 0) {
            target.style.backgroundColor = activeColor;
            if (e.ctrlKey) {
                console.log("The CTRL key is currently being held");
                target.style.opacity = +target.style.opacity - 0.1;
            } else if (e.shiftKey) {
                console.log("The SHIFT key is currently being held");
                target.style.opacity = +target.style.opacity + 0.1;
            } else if (e.altKey) {
                target.style.opacity = 1.0;
            }
        }
    }
});

colorSelector.addEventListener("input", () => {
    randomizerOff();
    eraserOff();
    activeColor = colorSelector.value;
});


function randomColorGenerator() {
    let red = Math.round(Math.random() * 255);
    let green = Math.round(Math.random() * 255);
    let blue = Math.round(Math.random() * 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

randomizerButton.addEventListener("click", () => {
    if (randomizerActive === false) {
        randomizerButton.style.backgroundColor = "black";
        randomizerButton.style.color = "white";
        randomizerActive = true;
        eraserOff()
    } else {
        randomizerOff();
    };
});

eraserButton.addEventListener("click", () => {
    if (eraserActive === false) {
        eraserButton.style.backgroundColor = "black";
        eraserButton.style.color = "white";
        eraserActive = true;
        randomizerOff();
    } else {
        eraserOff();
    };
});

dumpButton.addEventListener("click", () => {
    let promptResponse = prompt("WARNING: The button you just clicked will set every pixel to the same color as is currently selected. This will overwrite all content on the canvas currently. Type 'yes' to confirm this action.") === 'yes';
    
    if (promptResponse) {
        activeColor = colorSelector.value;
        const pixelList = document.querySelectorAll(".pixel");
    
        pixelList.forEach((pixel) => {
            pixel.style.backgroundColor = activeColor;
        }) 
    }
});

function randomizerOff() {
    randomizerButton.style.backgroundColor = "white";
    randomizerButton.style.color = "black";
    randomizerActive = false;
}

function eraserOff() {
    eraserButton.style.backgroundColor = "white";
    eraserButton.style.color = "black";
    eraserActive = false;
}

saveToPalette.addEventListener("click", () => {
    let paletteColors = document.querySelectorAll(".palette-color");
    
    for (let i = paletteColors.length - 1; i > 0; i--) {
        paletteColors[i].style.backgroundColor = paletteColors[i - 1].style.backgroundColor;
    }
    paletteColors[0].style.backgroundColor = activeColor;   
})

paletteGrid.addEventListener("click", (e) => {
    let target = e.target;
    activeColor = target.style.backgroundColor;

    //the rest of this event listener will handle converting a rgb value into a hexidecimal value
    const numberSlicer = /\d/gm;
    const spaceSlicer = /\s/gm
    activeColor = activeColor.split("").filter((index) => index.match(numberSlicer) || index.match(spaceSlicer));

    let counter = 0;

    let red = [];
    let green = [];
    let blue = [];

    for (let i = counter; activeColor[i].match(numberSlicer); i++) {
        red.push(activeColor[i]);
        counter = i;
    }

    for (let i = counter + 2; activeColor[i].match(numberSlicer); i++) {
        counter = i;
        green.push(activeColor[i]);
    }

    for (let i = counter + 2; i < activeColor.length; i++) {
        counter = i;
        blue.push(activeColor[i]);
    }

    red = red.join('');
    if (red <= 15) {
        red = Number(red).toString(16) + "0";
    } else {
        red = Number(red).toString(16);
    }
    
    green = green.join('');
    if (green <= 15) {
        green = Number(green).toString(16) + "0";
    } else {
        green = Number(green).toString(16);
    }

    blue = blue.join('');
    if (blue <= 15) {
        blue = Number(blue).toString(16) + "0";
    } else {
        blue = Number(blue).toString(16);
    }

    colorSelector.value = `#${red}${green}${blue}`;
    activeColor = colorSelector.value;
});

//add key modifiers where shift increase the opacity by 10%, control reduces it by 10%

setGridInput.focus();

