const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let activeMode = DEFAULT_MODE;

const conteiner = document.querySelector(".conteiner")
const resetGrid = document.querySelector(".newGrid")
const numPixels = document.querySelector(".numPixels")
const colorBtn = document.querySelector(".colorMode")
const rainbowBtn = document.querySelector(".rainbowMode")
const eraserBtn = document.querySelector(".eraserMode")
const clearBtn = document.querySelector(".clearAll")

function setCurrentMode(newMode) {
    chooseMode(newMode)
    activeMode = newMode
}

colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')
clearBtn.onclick = () => clear()
resetGrid.onclick = () => newGrid()

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function makeGrid(pixelsNum){
    conteiner.style.gridTemplateColumns = `repeat(${pixelsNum}, 1fr)`;
    conteiner.style.gridTemplateRows = `repeat(${pixelsNum}, 1fr)`;

    for (let i = 0; i < pixelsNum * pixelsNum;i++) {
        let pixel = document.createElement("div")
        pixel.classList.add("pixel");
        pixel.addEventListener('mouseover', fillPixel)
        pixel.addEventListener('mousedown', fillPixel)
        conteiner.appendChild(pixel) 
    }
}

function newGrid(){
    let newSize = Number(prompt("Choose the new size: (Max: 100)"))
    let newSizeNum = parseInt(newSize)
    if (isNaN(newSizeNum)){return}
    else if (newSizeNum <= 0){return}
    else if (newSizeNum > 100){return}
    else {
        numPixels.textContent = `Grid Size: ${newSizeNum} x ${newSizeNum}`;
        makeGrid(newSizeNum)
        clear()
    }  
}

function clear() {
    const conteinerDivs = document.querySelectorAll(".conteiner > div");
    conteinerDivs.forEach((div) => {
        div.style.cssText = "opacity: 1; background-color: white";
        div.count = 0;
    })
}

function fillPixel(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (activeMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (activeMode === 'color') {
        e.target.style.backgroundColor = 'black'
    } else if (activeMode === 'eraser') {
        e.target.style.backgroundColor = 'white'
    }
}

function chooseMode(newMode) {
    if (activeMode === 'rainbow') {
        rainbowBtn.classList.remove('active')
    } else if (activeMode === 'color') {
        colorBtn.classList.remove('active')
    } else if (activeMode === 'eraser') {
        eraserBtn.classList.remove('active')
    }

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
        colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
    }
}

makeGrid(DEFAULT_SIZE)
chooseMode(DEFAULT_MODE)