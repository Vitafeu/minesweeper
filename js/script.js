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
}

function initGame(difficulty) {

    destroyGrid();

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

function showTile (element) {

    if (element.classList.contains("flag")) {
        element.classList.remove("flag");
    } else if (element.classList.contains("tile")) {
        element.classList.remove("tile");

        if (element.textContent == "X") {
            console.log("you lose !")
        }
    }


}

function placeFlag(element) {
    if (element.classList.contains("flag")) {
        element.classList.remove("flag");
    } else if (element.classList.contains("tile")) {
        element.classList.add("flag");
    }
    
}