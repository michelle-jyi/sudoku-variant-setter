class Cell {
    constructor(row, col, box) {
        this.row = row;
        this.col = col;
        this.box = box;
        this.clicked = false;
        this.number = 0;
        this.prev = 0;
        this.errorCount = 0;
    }
}

var currentSelectedCell = 0;
function clickCell(id) {
    if (currentSelectedCell != 0) {
        let button = document.getElementById(currentSelectedCell);
        button.classList.remove("selected");
        let buttonObj = JSON.parse(button.dataset.cell);
        buttonObj.clicked = false;
    }
    currentSelectedCell = id;
    let button = document.getElementById(id);
    button.classList.add("selected");
    let buttonObj = JSON.parse(button.dataset.cell);
    buttonObj.clicked = true;
    console.log(id + " " + buttonObj.row + " " + buttonObj.col + " " + buttonObj.box + "pressed");
    console.log(button.classList);
}

var grid = document.getElementById("grid");

/* 2d array of html elements */
var cells = new Array(9);

for (let i = 0; i < 9; i++) {
    cells[i] = new Array(9);
}

for (let i = 0; i < 81; i++) {
    let row = Math.floor(i / 9);
    let col = i % 9;
    let box = getBox(row, col);
    let buttonObj = new Cell(row, col, box);
    let button = document.createElement("button");
    button.className = "cell";
    if (row % 3 == 0) {
        button.classList.add("top");
    }
    if (row % 3 == 2) {
        button.classList.add("bottom");
    }
    if (col % 3 == 0) {
        button.classList.add("left");
    } 
    if (col % 3 == 2) {
        button.classList.add("right");
    }

    button.id = i;
    button.dataset.cell = JSON.stringify(buttonObj);
    (function(button) {
        button.addEventListener("click", function() {
            clickCell(button.id);
        });
    })(button);
    grid.appendChild(button);
    cells[row][col] = button;
}

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
        let button = document.getElementById(currentSelectedCell);
        button.innerHTML = number;
        let buttonObj = JSON.parse(button.dataset.cell);
        buttonObj.prev = buttonObj.number;
        buttonObj.number = number;
        button.dataset.cell = JSON.stringify(buttonObj);
        cells[getRow(currentSelectedCell)][getCol(currentSelectedCell)] = button;
        errorChecking();
    }
}

function errorChecking() {
    let row = getRow(currentSelectedCell);
    let col = getCol(currentSelectedCell);
    let box = getBox(row, col);
    let error = false;
    let number = JSON.parse(cells[row][col].dataset.cell).number;
    let prev = JSON.parse(cells[row][col].dataset.cell).prev;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (r == row && c == col) continue;
            if (r == row || c == col || getBox(r, c) == box) {
                let obj = JSON.parse(cells[r][c].dataset.cell);
                if (cells[r][c].innerHTML == number) {
                    error = true;
                    cells[r][c].classList.add("error");
                    obj.errorCount++;
                    cells[r][c].dataset.cell = JSON.stringify(obj);
                } else {
                    if (prev != 0 && cells[r][c].innerHTML == prev) {
                        obj.errorCount--;
                        cells[r][c].dataset.cell = JSON.stringify(obj);
                        if (obj.errorCount == 0) {
                            cells[r][c].classList.remove("error");
                        }
                    }
                }
            }
        }
    }
    if (error) {
        cells[row][col].classList.add("error");
    } else {
        cells[row][col].classList.remove("error");
    }
}

function getRow(id) {
    return Math.floor(id / 9);
}

function getCol(id) {
    return id % 9;
}

/**
 * Returns the box number of a cell given its row and column.
 */
function getBox(row, col) {
    return (Math.floor(row / 3) * 3) + (Math.floor(col / 3));
}