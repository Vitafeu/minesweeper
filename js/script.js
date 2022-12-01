// ---------------------------- Variables ----------------------------

var fullTime;
var timer;

// ---------------------------- Functions ----------------------------

function createTable(tableData) {
    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');

    tableData.forEach(function(rowData) {
        let row = document.createElement('tr');

        rowData.forEach(function(cellData) {
            let cell = document.createElement('td');
            cell.classList.add("tile");
            cell.addEventListener('mouseup', (e) => {
                switch (e.button) {
                  case 0:
                    showTile(cell);
                    break;
                  case 2:
                    placeFlag(cell);
                    break;
                  default:
                    break;
            }});

            if (cellData == "X") {
                cell.classList.add("mine");
            }
            
            if (cellData != "0") {
                cell.appendChild(document.createTextNode(cellData));
            }

            switch (cellData) {
                case "1":
                    cell.classList.add("blue");
                    break;
                case "2":
                    cell.classList.add("green");
                    break;
                case "3":
                    cell.classList.add("red");
                    break;
                case "4":
                    cell.classList.add("purple");
                    break;
                case "5":
                    cell.classList.add("maroon");
                    break;
                case "6":
                    cell.classList.add("turquoise");
                    break;
                case "7":
                    cell.classList.add("black");
                    break;
                case "8":
                    cell.classList.add("gray");
                    break;
                default:
                    break;
            }

            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.body.appendChild(table);

    createHTMLTimer();
}

function createGrid(sizeY, sizeX, mines) {
    
    let grid = new Array(sizeY);

    for (let y = 0; y < grid.length; y++) {
        grid[y] = new Array(sizeX);

        for (let x = 0; x < grid[y].length; x++) {
            grid[y][x] = "0";
        }
    }

    for (let i = 0; i < mines; i++) {
        let randX = Math.floor(Math.random() * sizeX);
        let randY = Math.floor(Math.random() * sizeY);

        while (grid[randY][randX] == "X") {
            randX = Math.floor(Math.random() * sizeX);
            randY = Math.floor(Math.random() * sizeY);
        }

        grid[randY][randX] = "X";
    }

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            
            if (grid[y][x] != "X") {
                let nearMines = 0;

                if (y != 0) {
                    if (x != 0) {
                        if (grid[y - 1][x - 1] == "X") {
                            nearMines += 1;
                        }
                    }
                    
                    if (grid[y - 1][x] == "X") {
                        nearMines += 1;
                    }
            
                    if (x != sizeX) {
                        if (grid[y - 1][x + 1] == "X") {
                            nearMines += 1;
                        }
                    }
                    
                }  
                // --------------------------------
                if (x != 0) {
                    if (grid[y][x - 1] == "X") {
                        nearMines += 1;
                    }
                }
                

                if (x != sizeX) {
                    if (grid[y][x + 1] == "X") {
                        nearMines += 1;
                    }
                }
                // --------------------------------
                if (y != (sizeY - 1)) {
                    if (x != 0) {
                        if (grid[y + 1][x - 1] == "X") {
                            nearMines += 1;
                        }
                    }
                    
                    if (grid[y + 1][x] == "X") {
                        nearMines += 1;
                    }

                    if (x != sizeX) {
                        if (grid[y + 1][x + 1] == "X") {
                            nearMines += 1;
                        }    
                    }
                }
            
                grid[y][x] = nearMines.toString();
            }
        } 
    }

    createTable(grid);
}


function destroyGrid() {
    let grids = document.getElementsByTagName("table");

    for (let i = 0; i < grids.length; i++) {
        grids[i].remove();
    }

    clearInterval(timer);
    try {
        timeDiv.remove();
    } catch (error) {
        
    }
    
}

function initGame() {

    destroyGrid();

    let inputs = document.getElementsByTagName('input');
    let difficulty;

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "radio" && inputs[i].checked) {
            difficulty = inputs[i].value;
        }
    }

    switch (difficulty) {
        case 'begginer':
            createGrid(9, 9, 10);
            break;
        case 'intermediate':
            createGrid(16, 16, 40);
            break;
        case 'expert':
            createGrid(16, 30, 99);
            break;
        default:
            break;
    }
}

function showTile(element) {

    if (element.classList.contains("flag")) {
        element.classList.remove("flag");
    } else if (element.classList.contains("tile")) {
        element.classList.remove("tile");

        if (element.textContent == "X") {
            setTimeout(function(){
                alert("You lose !")
                destroyGrid();
            }, 100);
        } else if (element.textContent == "") {
            revealNearZeros(element);
        }
    }

    winCheck();
}

function placeFlag(element) {
    if (element.classList.contains("flag")) {
        element.classList.remove("flag");
    } else if (element.classList.contains("tile")) {
        element.classList.add("flag");
    }
    
}

function revealNearZeros(element) {
    let grid = document.getElementsByTagName("table")[0];

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if ((i != 0) || (j != 0)) {
                try {
                    if (typeof grid.rows[element.parentNode.rowIndex + i].cells[element.cellIndex + j] != "undefined") {
                        showTile(grid.rows[element.parentNode.rowIndex + i].cells[element.cellIndex + j]);
                    }        
                } catch (error) {
                    break;
                }
            }
        }
    }
}

function winCheck() {
    let grid = document.getElementsByTagName("table")[0];
    let win = true;

    for (var i = 0, r = grid.rows.length; i < r; i++) {
        for (var j = 0, c = grid.rows[i].cells.length; j < c; j++) {
            if (grid.rows[i].cells[j].textContent != "X" && grid.rows[i].cells[j].classList.contains("tile")) {
                win = false;
            }          
        }
    }

    if (win) {
        setTimeout(function(){
            alert("You win !")
            destroyGrid();
            setBestTime();
            win = false;
        }, 100);
    }
}

function startTimer() {
    let seconds = 0;
    let minutes = 0;
    timer = setInterval(function(){
        
        if (seconds >= 59) {
            seconds = 0;
            minutes += 1;
        } else {
            seconds += 1;
        }

        if (minutes < 10) {
            if (seconds < 10) {
                fullTime = "0" + minutes.toString() + ":" + "0" + seconds.toString();
            } else {
                fullTime = "0" + minutes.toString() + ":" + seconds.toString();
            }  
        } else {
            if (seconds < 10) {
                fullTime = minutes.toString() + ":" + "0" + seconds.toString();
            } else {
                fullTime = minutes.toString() + ":" + seconds.toString();
            }
        }

        time.innerHTML = fullTime;
    }, 1000);
}

function createHTMLTimer() {
    let times = document.createElement('div');
    let HTMLTimer = document.createElement('p');
    let timerIcon = document.createElement('i');

    times.id = "timeDiv";
    timerIcon.classList.add('fa-solid', 'fa-stopwatch');
    HTMLTimer.id = "time";
    HTMLTimer.innerHTML = "00:00"

    times.appendChild(timerIcon);
    times.appendChild(HTMLTimer);

    
    let bestTime = document.createElement('p');
    let bestTimeIcon = document.createElement('i');

    bestTimeIcon.classList.add('fa-solid', 'fa-trophy');

    if (localStorage.getItem("bestTime") == null) {
        bestTime.innerHTML = "00:00";
    } else {
        bestTime.innerHTML = localStorage.getItem("bestTime");
    }
    
    times.appendChild(bestTimeIcon);
    times.appendChild(bestTime);

    document.body.appendChild(times);

    startTimer();
}


function setBestTime() {
    if (localStorage.getItem('bestTime') != null) {
        let finalTime = fullTime.split(':');
        let seconds = parseInt(finalTime[1]);
        let minutes = parseInt(finalTime[0]);

        let bestTime = localStorage.getItem('bestTime').split(':');
        let bestSeconds = parseInt(bestTime[1]);
        let bestMinutes = parseInt(bestTime[0]);

        if (minutes < bestMinutes) {
            localStorage.setItem('bestTime', fullTime);
        } else if (minutes == bestMinutes) {
            if (seconds < bestSeconds) {
                localStorage.setItem('bestTime', fullTime);
            }
        }
    } else {
        localStorage.setItem('bestTime', fullTime);
    }
}