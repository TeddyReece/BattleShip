// bug in createShips at [2,9]

function initDomGrid(){
  var grid = document.getElementById("grid")
  var currentRow
  var currentCell
  for (var i = 0; i < 10; i++) {
    currentRow = grid.insertRow(i)
    for (var j = 0; j < 10; j++) {
      currentCell = currentRow.insertCell(j)
      currentCell.setAttribute("id", i+"-"+j)
      currentCell.setAttribute("onclick", "handleClick([" + i + "," + j + "])");
    }
  }
}

function createGridArray(){
  var array = [];
  var currentRow;
  for (var i = 0; i < 10; i++){
    currentRow = [];
    array.push(currentRow);
    for (var j = 0; j < 10; j++){
      currentRow.push("");
    }
  }
  return array;
};

function createShips(){
  var randomRow;
  var randomColumn;
  var shipLocations = [];
  for (var k = 0; k < 5; k++){
    console.log("Loop number " + k);
    randomRow = Math.floor(Math.random() * 10);
    randomColumn = Math.floor(Math.random() * 10);
    while (!isPlacementValid([randomRow, randomColumn], 3).valid){
      randomRow = Math.floor(Math.random() * 10);
      randomColumn = Math.floor(Math.random() * 10);
    }
    console.log("row " + randomRow);
    console.log("column " + randomColumn);
    console.log(isPlacementValid([randomRow, randomColumn], 3));
    if (isPlacementValid([randomRow, randomColumn], 3).direction == "north"){
      for (var i = 0; i < 3; i++){
        shipLocations.push([randomRow - i, randomColumn]);
      }
      console.log("north")
    }
    else if (isPlacementValid([randomRow, randomColumn], 3).direction == "south"){
      for (var i = 0; i < 3; i++){
        shipLocations.push([randomRow + i, randomColumn]);
      }
      console.log("south")
    }
    else if (isPlacementValid([randomRow, randomColumn], 3).direction == "west"){
      for (var i = 0; i < 3; i++){
        shipLocations.push([randomRow, randomColumn - i]);
      }
      console.log("west")
    }
    else {
      for (var i = 0; i < 3; i++){
        shipLocations.push([randomRow, randomColumn + i]);
      }
      console.log("east")
    }

    ships.push(createShip(shipLocations, 3));
    console.log(shipLocations);
    shipLocations = [];
  }
  ships.forEach(function(ship){
    ship.cellsOccupied.forEach(function(location){
      gameState.gridState[location[0]][location[1]] = "s";
      document.getElementById(location[0] + "-" + location[1]).setAttribute("class", "ship");
    });
  });
}

function createShip(shipLocation, shipLength){
  return {
    length: shipLength,
    cellsOccupied: shipLocation,
    // 'contains' returns true if aLocation is within the cellsOccupied array
    contains: function(aLocation){
      for (var i = 0; i < this.cellsOccupied.length; i++){
        if (this.cellsOccupied[i][0] == aLocation[0] && this.cellsOccupied[i][1] == aLocation[1]){
          return true;
        }
      }
      return false;
    }
  }
}

function isPlacementValid(anArray, shipLength){
  var validDirections = [];
  var row = anArray[0];
  var column = anArray[1];
  var length = shipLength;
  var locationsToCheck = [];

  var isNorthValid = true;
  // check north direction
  // if there's not enough room to the north, set isNorthValid to false
  if (row < length - 1){
    isNorthValid = false;
  }
  else {
    // check gameState.gridState to see if we will overlap any ships
    for (var i = 0; i < length; i++){
      locationsToCheck.push([row - i, column])
    }
    ships.forEach(function(ship){
      locationsToCheck.forEach(function(location){
        if (ship.contains(location)){
          isNorthValid = false;
        }
      });
    });
  }
  locationsToCheck = [];

  var isEastValid = true;
  // check east direction
  // if there's not enough room to the east, set isEastValid to false
  if (column + length > 9){
    isEastValid = false;
  }
  else {

    // check gameState.gridState to see if we will overlap any ships
    for (var i = 0; i < length; i++){
      locationsToCheck.push([row, column + i])
    }
    ships.forEach(function(ship){
      locationsToCheck.forEach(function(location){
        if (ship.contains(location)){
          isEastValid = false;
        }
      });
    });
  }
  locationsToCheck = [];

  var isSouthValid = true;
  // check south direction
  // if there's not enough room to the east, set isSouthValid to false
  if (row + length > 9){
    isSouthValid = false;
  }
  else {
    // check gameState.gridState to see if we will overlap any ship
    for (var i = 0; i < length; i++){
      locationsToCheck.push([row + i, column])
    }
    ships.forEach(function(ship){
      locationsToCheck.forEach(function(location){
        if (ship.contains(location)){
          isSouthValid = false;
        };
      });
    });
  }
  locationsToCheck = [];

  var isWestValid = true;
  // check west direction
  // if there's not enough room to the west, set isWestValid to false
  if (column < length - 1){
    isWestValid = false;
  }
  else {
    // check gameState.gridState to see if we will overlap any ships
    for (var i = 0; i < length; i++){
      locationsToCheck.push([row, column - i])
    }
    ships.forEach(function(ship){
      locationsToCheck.forEach(function(location){
        if (ship.contains(location)){
          isWestValid = false;
        }
      });
    });
  }

  if (isNorthValid){
    validDirections.push("north");
  }
  if (isEastValid){
    validDirections.push("east");
  }
  if (isSouthValid){
    validDirections.push("south");
  }
  if (isWestValid){
    validDirections.push("west");
  }
  return {
    valid: isNorthValid || isEastValid || isSouthValid || isWestValid,
    direction: validDirections[Math.floor(Math.random() * validDirections.length)]
  }
}

function createSingleShips(){
  var numbers = []
  var shipNums = []
  var ships = []
  var index
  for (var i = 0; i<100; i++){
    numbers.push(i)
  }
  for (var j = 0; j<5; j++){
    index = Math.floor(Math.random() * (100 - j))
    shipNums.push(numbers[index]);
    numbers.splice(index, 1);
  }
  for (var k = 0; k < 5; k++){
    ships.push([Math.floor(shipNums[k] / 10), shipNums[k] % 10])
  }
  for (var l = 0; l < 5; l++){
    gameState.gridState[ships[l][0]][ships[l][1]] = "s";
  }
  return ships;
}

var gameState = {
  gridState: createGridArray(),
  torpedoCount: 25,
  hits: 0,
  shipLocations: [],
  render: function(){
    for (var i = 0; i < 10; i++){
      for (var j = 0; j < 10; j++){
        if (this.gridState[i][j] == "h"){
          document.getElementById(i+"-"+j).setAttribute("class", "hit");
        }
        else if (this.gridState[i][j] == "m"){
          document.getElementById(i+"-"+j).setAttribute("class", "miss");
        }
      }
    }
  }
};

function handleClick(cellLocation){
  if (gameState.gridState[cellLocation[0]][cellLocation[1]] == ""){
    gameState.gridState[cellLocation[0]][cellLocation[1]] = "m";
    gameState.torpedoCount--;
    document.getElementById("torpedoCount").innerHTML = "Torpedoes remaining: " + gameState.torpedoCount;
    document.getElementById("messageBox").innerHTML = "Miss!";
  }
  else if (gameState.gridState[cellLocation[0]][cellLocation[1]] == "s"){
    gameState.gridState[cellLocation[0]][cellLocation[1]] = "h";
    gameState.torpedoCount--;
    document.getElementById("torpedoCount").innerHTML = "Torpedoes remaining: " + gameState.torpedoCount;
    document.getElementById("messageBox").innerHTML = "Hit!";
    gameState.hits++;
  }
  else if (gameState.gridState[cellLocation[0]][cellLocation[1]] == "h"){
    document.getElementById("messageBox").innerHTML = "You already sunk this ship!";
  }
  else {
    document.getElementById("messageBox").innerHTML = "You already shot here!";
  }
  gameState.render();
  if (gameState.hits == 5 || gameState.torpedoCount == 0){
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        document.getElementById(i + "-" + j).removeAttribute("onclick");
      }
    }
    if (gameState.hits == 5){
      document.getElementById("messageBox").innerHTML = "You win!"
    }
    else{
      document.getElementById("messageBox").innerHTML = "You lose!";
      for (var i = 0; i < 5; i++){
        document.getElementById(gameState.shipLocations[i][0] + "-" + gameState.shipLocations[i][1]).setAttribute("class", "ship");
      }

    }
  }
}

var ships = [];

initDomGrid();
// createShips();
// gameState.shipLocations = createSingleShips();
// gameState.render();
