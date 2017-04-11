function initGrid(){
  var grid = document.getElementById("grid")
  var currentRow
  var currentCell
  for (var i = 0; i < 10; i++) {
    currentRow = grid.insertRow(i)
    for (var j = 0; j < 10; j++) {
      currentCell = currentRow.insertCell(j)
      currentCell.setAttribute("id", i+"-"+j)
    }
  }
}
initGrid();

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

var gameState = {
  gridState: createGridArray(),
  createShips: function(){
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
      this.gridState[ships[l][0]][ships[l][1]] = "s";
    }
  },
  render: function(){
    for (var i = 0; i < 10; i++){
      for (var j = 0; j < 10; j++){
        if (this.gridState[i][j] == "s"){
          document.getElementById(i+"-"+j).setAttribute("class", "ship");
        }
        else if (this.gridState[i][j] == "h"){
          document.getElementById(i+"-"+j).setAttribute("class", "hit");
        }
        else if (this.gridState[i][j] == "m"){
          document.getElementById(i+"-"+j).setAttribute("class", "miss");
        }
      }
    }
  }
};
