// ---------------------------- Constants ----------------------------

const sizeX = 100;
const sizeY = 100;

const mines = 100;

// ---------------------------- Functions ----------------------------

function createTable(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    tableData.forEach(function(rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.body.appendChild(table);
}


// ---------------------------- Code ----------------------------

var grid = new Array(sizeY);

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