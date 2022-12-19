<?php

    function createGrid($sizeY, $sizeX, $mines) {
        $grid = array_fill(0, $sizeY, array_fill(0, $sizeX, "0"));

        for ($i = 0; $i < $mines; $i++) {
            $randX = rand(0, $sizeX - 1);
            $randY = rand(0, $sizeY - 1);

            while ($grid[$randY][$randX] == "X") {
                $randX = rand(0, $sizeX - 1);
                $randY = rand(0, $sizeY - 1);
            }

            $grid[$randY][$randX] = "X";
        }

        for ($y = 0; $y < count($grid); $y++) {
            for ($x = 0; $x < count($grid[$y]); $x++) {
                
                if ($grid[$y][$x] != "X") {
                    $nearMines = 0;

                    if ($y != 0) {
                        if ($x != 0) {
                            if ($grid[$y - 1][$x - 1] == "X") {
                                $nearMines += 1;
                            }
                        }
                        
                        if ($grid[$y - 1][$x] == "X") {
                            $nearMines += 1;
                        }
                
                        if ($x != $sizeX) {
                            if ($grid[$y - 1][$x + 1] == "X") {
                                $nearMines += 1;
                            }
                        }
                        
                    }  
                    // --------------------------------
                    if ($x != 0) {
                        if ($grid[$y][$x - 1] == "X") {
                            $nearMines += 1;
                        }
                    }
                    

                    if ($x != $sizeX) {
                        if ($grid[$y][$x + 1] == "X") {
                            $nearMines += 1;
                        }
                    }
                    // --------------------------------
                    if ($y != ($sizeY - 1)) {
                        if ($x != 0) {
                            if ($grid[$y + 1][$x - 1] == "X") {
                                $nearMines += 1;
                            }
                        }
                        
                        if ($grid[$y + 1][$x] == "X") {
                            $nearMines += 1;
                        }

                        if ($x != $sizeX) {
                            if ($grid[$y + 1][$x + 1] == "X") {
                                $nearMines += 1;
                            }    
                        }
                    }
                
                    $grid[$y][$x] = (string)$nearMines;
                }
            } 
        }

        var_dump($grid);
    }

?>