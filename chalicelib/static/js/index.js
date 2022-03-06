// const socket = io();

walls = [];
robots = {};
placeholders = {};
selectedRobot = "black";
allDests = ["r1", "r2", "r3", "r4", "b1", "b2", "b3", "b4", "g1", "g2", "g3", "g4", "y1", "y2", "y3", "y4", "x5"];
unvisitedDest = [...allDests];
currentDest = "";
visitedDest = [];

function generateCell(row, col, wallData) {
    var classes = "";
    if(wallData[0]==1){
        classes += " left";
    }
    if(wallData[1]==1){
        classes += " right";
    }
    if(wallData[2]==1){
        classes += " top";
    }
    if(wallData[3]==1){
        classes += " bottom";
    }
    var destination = "";
    if(wallData[4] != "") {
        destination = createDestination(wallData[4][0], wallData[4][1])
    }
    // add classes
    $(`#cell${row}-${col}`).addClass(classes);
    // add destination
    $(`#cell${row}-${col} svg`).append(destination);
}

function createDestination(colorId, shapeId) {
    var color = "";
    var shape = "";
    switch(colorId) {
        case "r":
            color = "red";
            break;
        case "y":
            color = "gold";
            break;
        case "b":
            color = "blue";
            break;
        case "g":
            color = "green"
            break;
    }
    switch(shapeId) {
        case "1":
            shape = `<circle stroke="black" fill-opacity="0.5" cx="10" cy="10" r="9" fill="` + color + `"></circle>`;
            break;
        case "2":
            shape = '<rect stroke="black" fill-opacity="0.5" x="2" y="2" rx="2" ry="2" width="16" height="16" fill="' + color+ '"></rect>';
            break;
        case "3":
            shape = `<path stroke="black" fill-opacity="0.5" fill="` + color + `" d="M 9.5 0 L 19 17 L 0 17 Z M 9.5 0 "></path>`;
            break;
        case "4":
            shape = `<path stroke="black" fill-opacity="0.5" fill="` + color + `" 
            d="M 9.363281 0.0234375 C 9.214844 0.078125 9.097656 0.210938 8.953125 0.480469 C 8.78125 0.804688 8.367188 1.59375 7.832031 2.628906 
            C 7.042969 4.148438 6.65625 4.871094 6.242188 5.609375 L 6.171875 5.738281 L 4.730469 6.023438 C 3.9375 6.179688 2.859375 6.394531 2.332031 6.5 
            C 1.804688 6.605469 1.230469 6.714844 1.050781 6.746094 C 0.542969 6.832031 0.316406 6.902344 0.167969 7.015625 C 0.0234375 7.132812 -0.0390625 7.363281 0.0273438 7.550781 
            C 0.0859375 7.710938 0.0195312 7.632812 1.320312 9.082031 C 2.410156 10.296875 3.457031 11.453125 3.757812 11.777344 C 3.917969 11.949219 4.074219 12.136719 4.109375 12.1875 
            C 4.167969 12.28125 4.171875 12.289062 4.171875 12.410156 C 4.171875 12.488281 4.152344 12.660156 4.125 12.816406 C 4.101562 12.96875 4.039062 13.441406 3.984375 13.871094 
            C 3.808594 15.308594 3.699219 16.203125 3.628906 16.792969 C 3.59375 17.113281 3.539062 17.535156 3.515625 17.734375 C 3.445312 18.289062 3.449219 18.609375 3.535156 18.785156 
            C 3.574219 18.871094 3.667969 18.953125 3.757812 18.976562 C 3.929688 19.03125 4.046875 19.003906 4.414062 18.808594 C 4.570312 18.730469 5 18.515625 5.367188 18.335938 
            C 5.734375 18.15625 6.554688 17.753906 7.191406 17.4375 C 7.828125 17.125 8.453125 16.816406 8.578125 16.753906 C 8.707031 16.691406 8.921875 16.578125 9.058594 16.507812 
            C 9.332031 16.359375 9.445312 16.320312 9.53125 16.332031 C 9.605469 16.339844 9.71875 16.394531 9.953125 16.535156 C 10.160156 16.660156 10.367188 16.765625 12.039062 17.574219 
            C 13.554688 18.308594 14.390625 18.71875 14.597656 18.828125 C 14.84375 18.957031 14.945312 18.992188 15.082031 18.992188 C 15.347656 18.992188 15.492188 18.832031 15.523438 18.496094 
            C 15.542969 18.292969 15.523438 18.035156 15.4375 17.507812 C 15.421875 17.410156 15.363281 16.929688 15.304688 16.441406 C 15.246094 15.953125 15.148438 15.132812 15.089844 14.613281 
            C 14.980469 13.691406 14.820312 12.421875 14.804688 12.339844 C 14.796875 12.300781 14.835938 12.253906 15.148438 11.894531 C 15.585938 11.398438 15.910156 11.035156 16.789062 10.054688 
            C 17.167969 9.628906 17.671875 9.066406 17.90625 8.800781 C 18.144531 8.535156 18.4375 8.207031 18.558594 8.074219 C 18.828125 7.769531 18.890625 7.691406 18.941406 7.570312 
            C 19.0625 7.300781 18.972656 7.082031 18.683594 6.941406 C 18.523438 6.863281 18.390625 6.828125 17.980469 6.757812 C 17.792969 6.722656 17.402344 6.644531 17.109375 6.585938 
            C 16.8125 6.527344 16.191406 6.402344 15.726562 6.3125 C 13.285156 5.835938 12.816406 5.738281 12.800781 5.722656 C 12.777344 5.699219 12.464844 5.109375 11.3125 2.925781 
            C 10.773438 1.894531 10.296875 0.996094 10.265625 0.933594 C 10.230469 0.871094 10.144531 0.695312 10.074219 0.550781 C 9.910156 0.214844 9.847656 0.128906 9.714844 0.0625 
            C 9.601562 0 9.453125 -0.015625 9.363281 0.0234375 Z M 9.363281 0.0234375 "></path></svg>`;
            break;
        case "5":
            shape = `<g id="surface1" style="stroke:black;fill-opacity:0.5">
            <path style="fill-rule:nonzero;fill:rgb(100%,0%,0%);" d="M 10 1.25 C 11.535156 1.25 13.046875 1.652344 14.375 2.421875 L 10 10 Z M 10 1.25 "></path>
            <path style="fill-rule:nonzero;fill:rgb(100%,50.196078%,0%);" d="M 14.375 2.421875 C 15.707031 3.191406 16.808594 4.292969 17.578125 5.625 L 10 10 Z M 14.375 2.421875 "></path>
            <path style="fill-rule:nonzero;fill:rgb(100%,100%,0%);" d="M 17.578125 5.625 C 18.347656 6.953125 18.75 8.464844 18.75 10 L 10 10 Z M 17.578125 5.625 "></path>
            <path style="fill-rule:nonzero;fill:rgb(50.196078%,100%,0%);" d="M 18.75 10 C 18.75 11.535156 18.347656 13.042969 17.578125 14.375 L 10 10 Z M 18.75 10 "></path>
            <path style="fill-rule:nonzero;fill:rgb(0%,100%,0%);" d="M 17.578125 14.375 C 16.808594 15.707031 15.703125 16.808594 14.375 17.578125 L 10 10 Z M 17.578125 14.375 "></path>
            <path style="fill-rule:nonzero;fill:rgb(0%,100%,50.196078%);" d="M 14.375 17.578125 C 13.046875 18.34375 11.535156 18.75 10 18.75 L 10 10 Z M 14.375 17.578125 "></path>
            <path style="fill-rule:nonzero;fill:rgb(0%,100%,100%);" d="M 10 18.75 C 8.464844 18.75 6.957031 18.34375 5.625 17.578125 L 10 10 Z M 10 18.75 "></path>
            <path style="fill-rule:nonzero;fill:rgb(0%,50.196078%,100%);" d="M 5.625 17.578125 C 4.292969 16.808594 3.191406 15.703125 2.421875 14.375 L 10 10 Z M 5.625 17.578125 "></path>
            <path style="fill-rule:nonzero;fill:rgb(0%,0%,100%);" d="M 2.421875 14.375 C 1.652344 13.042969 1.25 11.535156 1.25 10 L 10 10 Z M 2.421875 14.375 "></path>
            <path style="fill-rule:nonzero;fill:rgb(50.196078%,0%,100%);" d="M 1.25 10 C 1.25 8.464844 1.65625 6.953125 2.421875 5.625 L 10 10 Z M 1.25 10 "></path>
            <path style="fill-rule:nonzero;fill:rgb(100%,0%,100%);" d="M 2.421875 5.625 C 3.191406 4.292969 4.292969 3.191406 5.625 2.421875 L 10 10 Z M 2.421875 5.625 "></path>
            <path style="fill-rule:nonzero;fill:rgb(100%,0%,50.196078%);" d="M 5.625 2.421875 C 6.957031 1.652344 8.464844 1.25 10 1.25 L 10 10 Z M 5.625 2.421875 "></path>
            </g>`;
          break;
    }
    return shape;
}

function initBoard() {
    // clear board
    $("td svg :first-child").remove();
    $("td").removeClass("top bottom left right");
    clearPathHighlights();
    unvisitedDest = [...allDests];
    visitedDest = [];
    currentDest = "";
    $("#dest_remaining").text("17");
    // populate board
    jQuery.getJSON("board").then( function(data) {
        var board = $("#board")[0];
        walls = data["board"];
        robots = data["robots"];
        placeholders = data["robots"];

        for(var r = 0; r < walls.length; r++) { 
            for(var c = 0; c < walls[r].length; c++) {
                generateCell(r, c, walls[r][c]);
            }
        }
        $("table").html($("table").html());
        Object.entries(robots).forEach(([color, coords]) => {
            placeRobot(color, coords[0], coords[1]);
        });
        setDestination();
    });
}

function placeRobot(robotColor, newRow, newColumn) {
    $("#" + robotColor + "-robot").remove();
    var robotElem = `<path class="robot" id="` + robotColor + `-robot" tabindex=0 style="stroke:black;fill-rule:nonzero;fill:` + robotColor + `;fill-opacity:0.5;" d="M 10 1.667969 C 10.921875 1.667969 11.667969 2.414062 11.667969 3.332031 C 11.667969 3.949219 11.332031 4.492188 10.832031 4.773438 L 10.832031 5.832031 L 11.667969 5.832031 C 14.886719 5.832031 17.5 8.445312 17.5 11.667969 L 18.332031 11.667969 C 18.792969 11.667969 19.167969 12.039062 19.167969 12.5 L 19.167969 15 C 19.167969 15.460938 18.792969 15.832031 18.332031 15.832031 L 17.5 15.832031 L 17.5 16.667969 C 17.5 17.585938 16.753906 18.332031 15.832031 18.332031 L 4.167969 18.332031 C 3.246094 18.332031 2.5 17.585938 2.5 16.667969 L 2.5 15.832031 L 1.667969 15.832031 C 1.207031 15.832031 0.832031 15.460938 0.832031 15 L 0.832031 12.5 C 0.832031 12.039062 1.207031 11.667969 1.667969 11.667969 L 2.5 11.667969 C 2.5 8.445312 5.113281 5.832031 8.332031 5.832031 L 9.167969 5.832031 L 9.167969 4.773438 C 8.667969 4.492188 8.332031 3.949219 8.332031 3.332031 C 8.332031 2.414062 9.078125 1.667969 10 1.667969 M 6.25 10.832031 C 5.097656 10.832031 4.167969 11.765625 4.167969 12.917969 C 4.167969 14.066406 5.097656 15 6.25 15 C 7.402344 15 8.332031 14.066406 8.332031 12.917969 C 8.332031 11.765625 7.402344 10.832031 6.25 10.832031 M 13.75 10.832031 C 12.597656 10.832031 11.667969 11.765625 11.667969 12.917969 C 11.667969 14.066406 12.597656 15 13.75 15 C 14.902344 15 15.832031 14.066406 15.832031 12.917969 C 15.832031 11.765625 14.902344 10.832031 13.75 10.832031 Z M 13.75 10.832031 "></path>`;
    $("#cell" + String(newRow) + "-" + String(newColumn) + " svg").append(robotElem);
    $("#cell" + String(newRow) + "-" + String(newColumn) + " svg").html($("#cell" + String(newRow) + "-" + String(newColumn) + " svg").html());
    $(`#${robotColor}-robot`).bind('click touchstart', function(e){
        selectedRobot = e.target.style.fill;
        clearPathHighlights();
        highlightPaths(selectedRobot);
    });
}

function clearPathHighlights() {
    $("td").removeClass("red green blue gold black");
}

function highlightPaths(selectedRobot) {
    var coords = robots[selectedRobot];
    var row = coords[0];
    var col = coords[1];
    var leftDestCol = checkDirection(row, col, "left")[1];
    var rightDestCol = checkDirection(row, col, "right")[1];
    var upDestRow = checkDirection(row, col, "up")[0];
    var downDestRow = checkDirection(row, col, "down")[0];
    var highlightCells = []

    //right
    highlightCells = highlightCells.concat(range(col, rightDestCol, true).map((newCol, _) => [row, newCol]));
    //down
    highlightCells = highlightCells.concat(range(row, downDestRow, true).map((newRow, _) => [newRow, col]));
    //left
    highlightCells = highlightCells.concat(range(leftDestCol, col, false).map((newCol, _) => [row, newCol]));
    //up
    highlightCells = highlightCells.concat(range(upDestRow, row, false).map((newRow, _) => [newRow, col]));
    highlightCells.forEach(function ([newRow, newCol]) {
        $(`#cell${newRow}-${newCol}`).addClass(selectedRobot);
    });
}

// shift when start is current cell
function range(start, end, shifted) {
    return Array(end - start).fill().map((_, idx) => start + idx + Number(shifted));
}

function moveRobot(robotColor, direction) {
    var coords = robots[robotColor];
    var row = coords[0];
    var col = coords[1];
    var newCell = checkDirection(row, col, direction);
    if(newCell[0] != row || newCell[1] != col) {
        placeRobot(robotColor, newCell[0], newCell[1]);
        robots[robotColor] = newCell;
        clearPathHighlights();
        highlightPaths(robotColor);
        $(`#${robotColor}-robot`).focus();
        if(reachedDestination(robotColor)) {
            setDestination();
        }
    }
}

function reachedDestination(color) {
    var colorId = '';
    switch(color) {
        case "red":
            colorId = "r";
            break;
        case "blue":
            colorId = "b";
            break;
        case "green":
            colorId = "g";
            break;
        case "gold":
            colorId = "y";
            break;
    }
    var coords = robots[color];
    var row = coords[0];
    var col = coords[1];
    var cellDest = walls[row][col][4];
    if(cellDest != "" && 
        cellDest == currentDest &&
        [colorId, "x"].includes(cellDest[0])) {
        return true;
    }
    else {
        return false;
    }
}

function checkDirection(row, col, direction) {
    switch(direction){
        case "right":
            if(walls[row][col][1]==1 || walls[row][col+1][0]==1 || checkBlockingRobot(row, col+1)) {
                return [row, col]
            }
            else {
                return checkDirection(row, col + 1, direction);
            }
            break;
        case "left":
            if(walls[row][col][0]==1 || walls[row][col-1][1]==1 || checkBlockingRobot(row, col-1)) {
                return [row, col]
            }
            else {
                return checkDirection(row, col - 1, direction);
            }
            break;
        case "down":
            if(walls[row][col][3]==1 || walls[row + 1][col][2]==1 || checkBlockingRobot(row+1, col)) {
                return [row, col]
            }
            else {
                return checkDirection(row + 1, col, direction);
            }
            break;
        case "up":
            if(walls[row][col][2]==1 || walls[row - 1][col][3]==1 || checkBlockingRobot(row-1, col)) {
                return [row, col]
            }
            else {
                return checkDirection(row - 1, col, direction);
            }
            break;
    }
}

function checkBlockingRobot(row, col) {
    var result = false;
    Object.entries(robots).forEach(([color, coords]) => {
        if(coords[0] == row && coords[1] == col) {
            result = true;
        }
    });
    return result;
}

function setDestination() {
    if(unvisitedDest.length > 0) {
        $("#center svg :first-child").remove();
        if(currentDest != ""){
            visitedDest.push(currentDest);
            $("#dest_remaining").text(String(unvisitedDest.length));
        }
        currentDest = unvisitedDest[Math.floor(Math.random() * unvisitedDest.length)];
        var shape = createDestination(currentDest[0], currentDest[1]);
        $("#center svg").append(shape);
        $("#center svg").html($("#center svg").html());
        var index = unvisitedDest.indexOf(currentDest);
        if (index !== -1) {
            unvisitedDest.splice(index, 1);
        }
    }
}

$("#reset").click(function() {
    initBoard();
});

initBoard();


$(document).keydown(function(e){
    switch(e.originalEvent.key){
        case "ArrowRight":
            moveRobot(selectedRobot, "right");
            break;
        case "ArrowLeft":
            moveRobot(selectedRobot, "left");
            break;
        case "ArrowUp":
            moveRobot(selectedRobot, "up");
            break;
        case "ArrowDown":
            moveRobot(selectedRobot, "down");
            break;
    }
    e.preventDefault();
});


var startX,
    startY,
    dist,
    threshold = 40, //required min distance traveled to be considered swipe
    restraint = 30, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 500, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    swipedir;

$("#board-content").bind('touchstart', function(e) {
    var touchobj = e.changedTouches[0];
    swipedir = "None";
    dist = 0;
    startX = touchobj.pageX;
    startY = touchobj.pageY;
    startTime = new Date().getTime(); // record time when finger first makes contact with surface
    e.preventDefault();
});

$("#board-content").bind('touchend', function(e) {
    var touchobj = e.changedTouches[0];
    distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
    distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
    elapsedTime = new Date().getTime() - startTime; // get time elapsed
    if (elapsedTime <= allowedTime){ // first condition for awipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
            swipedir = (distX < 0)? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
        }
        else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
            swipedir = (distY < 0)? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
        }
    }
    if(swipedir != "None"){
        moveRobot(selectedRobot, swipedir);
    }
    e.preventDefault();
});