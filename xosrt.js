window.onload = function() {
  console.clear();
  console.log('init');


  var allCells = document.getElementsByClassName('cell');
  var matrix = [];
  var winner = 0;
  var isGameOver = false;

  function getTreeMatrix() {
    function m(n) {
      return matrix[n];
    }


    var tree = {
      1: {
        1: m(1),
        2: m(2),
        3: m(3)
      },
      2: {
        4: m(4),
        5: m(5),
        6: m(6)
      },
      3: {
        7: m(7),
        8: m(8),
        9: m(9)
      },
      4: {
        1: m(1),
        4: m(4),
        7: m(7)
      },
      5: {
        2: m(2),
        5: m(5),
        8: m(8)
      },
      6: {
        3: m(3),
        6: m(6),
        9: m(9)
      },
      7: {
        1: m(1),
        5: m(5),
        9: m(9)
      },
      8: {
        3: m(3),
        5: m(5),
        7: m(7)
      }
    };
    return tree;
  }


  function findBestTurn() {


    function getVariants() {
      //Собираем все линии где мы можем победить на данный момент

      var currentTree = getTreeMatrix();
      var variants = {};
      for (var line in currentTree) {
        if (currentTree.hasOwnProperty(line)) {
          var enemyMarkersCounter = 0;
          for (var cell in currentTree[line]) {
            if (currentTree[line].hasOwnProperty(cell) && parseInt(currentTree[line][cell]) === 1) {
              enemyMarkersCounter++;
            }
          }
          if (enemyMarkersCounter < 2) variants[line] = currentTree[line];
        }
      }
      return variants;
    }


    function getIndexToDefence() {
      var lineToDefence;
      var currentTree = getTreeMatrix();
      for (var line in currentTree) {
        if (currentTree.hasOwnProperty(line)) {
          var enemyMarkersCounter = 0;
          var pcMarkerCounter = 0;
          for (var cell in currentTree[line]) {
            if (currentTree[line].hasOwnProperty(cell)) {
              if (currentTree[line][cell] === 1) enemyMarkersCounter++;
            }
            if (currentTree[line][cell] === 2) pcMarkerCounter++;
          }
          if (enemyMarkersCounter === 2 && pcMarkerCounter === 0) {
            lineToDefence = currentTree[line];
            break;
          }
        }
      }

      if (lineToDefence === undefined) return;
      for (var cella in lineToDefence) {
        if (lineToDefence.hasOwnProperty(cella)) {
          if (lineToDefence[cella] === 0) {
            return cella;
          }
        }
      }
    }
    var variants;

    function getGoodVariant() {
      var goodLine;
      for (var line in variants) {
        if (variants.hasOwnProperty(line)) {
          var countOfPCMarkers = 0;
          var countOfFreeCells = 0;
          for (var cell in variants[line]) {
            if (variants[line].hasOwnProperty(cell)) {
              if (variants[line][cell] === 2) countOfPCMarkers++;
              if (variants[line][cell] === 0) countOfFreeCells++;
            }
          }
          if (countOfPCMarkers === 2 && countOfFreeCells === 1) {
            goodLine = variants[line];
            break;
          }
        }
      }
      if (goodLine === undefined) return;
      for (var cella in goodLine) {
        if (goodLine.hasOwnProperty(cella)) {
          if (goodLine[cella] === 0) {
            return cella;
          }
        }
      }
    }


    variants = getVariants();
    var index;
    if (variants.length !== 0) {
      index = getGoodVariant() || getIndexToDefence() || getRandomIndex();
    }


    function getRandomIndex() {
      var fCells = getFreeCells();
      if (fCells.length === 0) {
        return;
      }
      console.log(fCells);
      var rIndex;
      //Gets center cell if that free
      if(fCells.indexOf(5) !== 1) rIndex = fCells[fCells.indexOf(5)];
      if (!rIndex)  rIndex =fCells[Math.floor(Math.random() * (fCells.length - 1))];
      return rIndex;
    }

    return index;
  }


  function fillMatrix() {
    for (var i = 1; i <= allCells.length; i++) {
      matrix[i] = 0;
    }
  }

  function startNewRound() {
    console.log("Starting new round...")
    for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.backgroundColor = 'red';
    }
    fillMatrix();
    winner = 0;
    isGameOver = false;
  }


  function setScore() {
    if (winner === 1) {
      var pScoreEle = document.getElementById("playerscore");
      var currentPscore = parseInt(pScoreEle.textContent);
      currentPscore = currentPscore + 1;
      console.log("Current player score is " + currentPscore);
      pScoreEle.innerHTML = currentPscore;

    } else if (winner === 2) {
      var pcScoreEle = document.getElementById("pcscore");
      var currentPcscore = parseInt(pcScoreEle.textContent);
      currentPcscore = currentPcscore + 1;
      console.log("Current PC score is " + currentPcscore);
      pcScoreEle.innerHTML = currentPcscore;
    }
  }

  function getFreeCells() {
    var tempArr = [];
    for (var i = 1; i <= matrix.length; i++) {
      if (matrix[i] === 0) {
        tempArr.push(i);
      }
    }
    return tempArr;
  }

  function checkWin(m) {

    var tree = getTreeMatrix();

    for (var line in tree) {
      if (tree.hasOwnProperty(line)) {
        var counterToWin = 0;
        for (var cell in tree[line]) {
          if (tree[line][cell] === m) counterToWin++;
        }
        if (counterToWin === 3) {
          winner = m;
          break;
        }
      }
    }

    console.log("current winner is " + winner);
  }


  function pcTurn() {

    var indexInMatrix = findBestTurn();
    if (!indexInMatrix) return;
    matrix[indexInMatrix] = 2;
    console.log("PC turns on id" + indexInMatrix);
    var cell = document.getElementById('id' + (indexInMatrix));
    cell.style.backgroundColor = 'yellow';
  }

  function onClick(e) {
    if (isGameOver) return;
    var currentColor = e.target.style.backgroundColor;
    if (currentColor == 'blue' || currentColor == 'yellow') {
      console.log("this cell is already checked!");
      return;
    }
    var id = e.target.id;
    console.log(e);
    console.log('yep: ' + id);
    e.target.style.backgroundColor = 'blue';
    var index = id.split("id")[1];
    matrix[index] = 1;
    checkWin(1);
    if (winner === 1) {
      isGameOver = true;
      setTimeout(startNewRound, 1500);
      setScore();
      return;
    }
    if (winner !== 1) {
      pcTurn();
      checkWin(2);
      if (winner === 2) {
        isGameOver = true;
        setTimeout(startNewRound, 1500);
        setScore();
        return;
      }
    }
    if (winner === 0 && getFreeCells().length === 0) {
      isGameOver = true;
      setTimeout(startNewRound, 1500);
      return;
    }
  }

  console.log(allCells);
  fillMatrix();
  console.log(matrix);


  for (var i = 0; i < allCells.length; i++) allCells[i].addEventListener('click', function(e) {
    onClick(e);
  }, true);
}