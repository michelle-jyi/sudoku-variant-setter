class Cell {
    constructor(row, col, box) {
        this.row = row;
        this.col = col;
        this.box = box;
        this.clicked = false;
    }
}

var currentSelectedCell = 0;
function clickCell(id) {
    if (currentSelectedCell != 0) {
        var buttonObj = JSON.parse(document.getElementById(currentSelectedCell).dataset.cell);
        buttonObj.clicked = false;
    }
    currentSelectedCell = id;
    var button = document.getElementById(id);
    var buttonObj = JSON.parse(button.dataset.cell);
    buttonObj.clicked = true;
    console.log(id + " " + buttonObj.row + " " + buttonObj.col + " " + buttonObj.box + "pressed");
}

var grid = document.getElementById("grid");
for (let i = 1; i <= 81; i++) {
    let row = 1 + Math.floor((i - 1) / 9);
    let col = i % 9;
    if (col == 0) {
        col = 9;
    }
    let box = (Math.floor((row - 1) / 3) * 3 + 1) + (Math.floor((col - 1) / 3));
    let buttonObj = new Cell(row, col, box);
    let button = document.createElement("button");
    console.log("in loop");
    button.className = "cell";
    button.id = "cell" + i;
    button.dataset.cell = JSON.stringify(buttonObj);
    (function(button) {
        button.addEventListener("click", function() {
            clickCell(button.id);
        });
    })(button);
    grid.appendChild(button);
}
var buttons = document.querySelectorAll(".cell");
buttons.forEach(function(button) {
    console.log(button.id);
});

var numbers = document.getElementById("numbers");
for (i = 1; i <= 9; i++) {
    let button = document.createElement("button");
    button.className = "number";
    button.id = "number" + i;
    button.innerHTML = i;
    (function(button) {
        button.addEventListener("click", function() {
            clickNumber(button.innerHTML);
        });
    })(button);
    numbers.append(button);
}

function clickNumber(number) {
    if (currentSelectedCell != 0) {
        var button = document.getElementById(currentSelectedCell);
        button.innerHTML = number;
    }
}
