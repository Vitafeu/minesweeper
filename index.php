<?php 

    require_once "php/functions.php";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/style.css" rel="stylesheet">
    <title>Online Minesweeper</title>
    <script src="https://kit.fontawesome.com/c86dd07ff4.js" crossorigin="anonymous"></script>
</head>
<body oncontextmenu="event.preventDefault();">
    <div id="mode">       
        <input type="radio" name="gameMode" value="begginer">
        <label>Begginer</label>
        <input type="radio" name="gameMode" value="intermediate">
        <label>Intermediate</label>
        <input type="radio" name="gameMode" value="expert">
        <label>Expert</label>
        <button onclick="initGame()">Play !</button>
    </div>

    <?php 
    
        $sizeX = 9;
        $sizeY = 9;
        $mines = 10;

        createGrid($sizeY, $sizeX, $mines);

    ?>

    <script src="js/script.js"></script>
</body>
</html>