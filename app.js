const mainContainer = document.getElementById('container');
const gridSizeSelection = document.querySelector('select');
const colorPicker = document.querySelector('input[type=color]');
const random = document.getElementById('random');
const darken = document.getElementById('darken');
const resetbtn = document.getElementById('reset');

function createGrid(size){
    for(let i = 1; i <= size*size; i++){
        let div = document.createElement('div');
        div.className = 'divs';
        mainContainer.className = 'container';
        mainContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        mainContainer.appendChild(div);
    }
}

function removeCurrentGrid(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function chooseGridSize(event){
    removeCurrentGrid(mainContainer);
    let size = event.target.value;
    createGrid(size);
}

function drawPickedColor(e){
    let color = e.target.value;
    let divs = mainContainer.childNodes;
    divs.forEach((div) => {
        div.addEventListener('mouseover', () => {
            div.style.backgroundColor = color;
        });
    });
}

function randomColor(){
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    let randomColor = `rgb(${r},${g},${b})`;
    return randomColor;
}

function drawRandom(){
    let divs = mainContainer.childNodes;
    divs.forEach((div) => {
        div.addEventListener('mouseover', () => {
            div.style.backgroundColor = randomColor();
        });
    });
}

function makeDarker(){
    let divs = mainContainer.childNodes;
    divs.forEach((div) => {
        div.replaceWith(div.cloneNode(true));
    })
    divs.forEach((div) => {
        div.addEventListener('mouseover', () => {
            let color = window.getComputedStyle(div).backgroundColor;
            let rgbArr = color.slice(4,-1).split(',');
            let r = Number(rgbArr[0]);
            let g = Number(rgbArr[1]);
            let b = Number(rgbArr[2]);
            div.style.backgroundColor = `rgb(${r-25}, ${g-25}, ${b-25})`;
        });
    });
}  

function clearGrid(){
    removeCurrentGrid(mainContainer);
    let size = gridSizeSelection.value;
    createGrid(size);
}

window.addEventListener('load', createGrid(16));
gridSizeSelection.addEventListener('change', chooseGridSize);
colorPicker.addEventListener('change', drawPickedColor);
random.addEventListener('click', drawRandom);
darken.addEventListener('click', makeDarker);
resetbtn.addEventListener('click', clearGrid);







