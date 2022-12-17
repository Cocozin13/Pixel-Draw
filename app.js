const conteiner = document.querySelector(".conteiner")
const resetGrid = document.querySelector(".newGrid")
const numPixels = document.querySelector(".numPixels")

resetGrid.onclick = () => newGrid()

function makeGrid(pixelsNum){
    conteiner.style.gridTemplateColumns = `repeat(${pixelsNum}, 1fr)`;
    conteiner.style.gridTemplateRows = `repeat(${pixelsNum}, 1fr)`;

    for (let i = 0; i < pixelsNum * pixelsNum;i++) {
        let pixel = document.createElement("div")
        pixel.classList.add("pixel");
        pixel.addEventListener('click', function(){
            pixel.style.backgroundColor = "black"
        })            
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
        numPixels.textContent = `${newSizeNum} x ${newSizeNum}`;
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
    //Extra buttons
}

makeGrid(16)