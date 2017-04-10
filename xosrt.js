window.onload = function () {
    console.clear();
    console.log('init');


    var allCells = document.getElementsByClassName('cell');
    var matrix = [];
    var winner = 0;
    var isGameOver = false;


    function findBestTurn() {

        function getTreeMatrix() {
            function m(n) {
                return matrix[n];
            }

            var tree = {
                0: {
                    0: m(0),
                    1: m(1),
                    2: m(2)
                },
                1: {
                    3: m(3),
                    4: m(4),
                    5: m(5)
                },
                2: {
                    6: m(6),
                    7: m(7),
                    8: m(8)
                },
                3: {
                    0: m(0),
                    3: m(3),
                    6: m(6)
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
                    0: m(0),
                    4: m(4),
                    8: m(8)
                },
                7: {
                    2: m(2),
                    4: m(4),
                    6: m(6)
                }
            };
            return tree;
        }

        function getVariants() {
            //Собираем все линии где мы можем победить на данный момент

            var currentTree = getTreeMatrix();
            var variants = {};
            for (var line in currentTree) {
                var enemyMarkersCounter = 0;
                if (currentTree.hasOwnProperty(line)) {
                    for (var cell in line) {
                        if (line.hasOwnProperty(cell) && parseInt(line[cell]) === 1) {
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
                var enemyMarkersCounter = 0;
                if (currentTree.hasOwnProperty(line)) {
                    for (var cell in line) {
                        if (line.hasOwnProperty(cell) && parseInt(line[cell]) === 1) {
                            enemyMarkersCounter++;
                        }
                    }
                    if (enemyMarkersCounter === 2) lineToDefence = line;
                }
            }
            for (var cella in lineToDefence) {
                if (lineToDefence.hasOwnProperty(cella)) {
                    if (line[cella] === 0) {
                        return line[cella];
                    }
                }
            }

        }
        var variants;
        function getGoodVariant() {
            var goodLine;
            for (var line in variants) {
               var countOfPCMarkers = 0;
                if (variants.hasOwnProperty(line)) {
                    for ( var cell in line) {
                        if (line.hasOwnProperty(cell)) {
                            if (cell === 2) countOfPCMarkers++;
                        }
                    }
                }
                if (countOfPCMarkers === 2) {
                    goodLine = line;
                    break;
                }
            }
            for (var cella in line) {
                if (line.hasOwnProperty(cella)) {
                    if (line[cella] === 0) {
                        return line[cella];
                    }
                }
            }
        }

       
        var index = getIndexToDefence();
        if (index === undefined) {
            variants = getVariants();
            if (variants.length !== 0) {
                index = getGoodVariant();
                if (index === undefined) {
                    var fCells = getFreeCells();
                    if (fCells.length === 0) {
                        return;
                    }
                    console.log(fCells);
                    index = Math.floor(Math.random() * (fCells.length - 1));
                }
                return index;
            }
        }
    }


    function fillMatrix() {
        for (var i = 0; i < allCells.length; i++) {
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
        for (var i = 0; i < matrix.length; i++) {
            if (matrix[i] === 0) {
                tempArr.push(i);
            }
        }
        return tempArr;
    }

    function checkWin(m) {
        if (matrix[0] == m && matrix[1] == m && matrix[2] == m) {
            winner = m;
        } else if (matrix[3] == m && matrix[4] == m && matrix[5] == m) {
            winner = m;
        } else if (matrix[6] == m && matrix[7] == m && matrix[8] == m) {
            winner = m;
        } else if (matrix[0] == m && matrix[3] == m && matrix[6] == m) {
            winner = m;
        } else if (matrix[1] == m && matrix[4] == m && matrix[7] == m) {
            winner = m;
        } else if (matrix[2] == m && matrix[5] == m && matrix[8] == m) {
            winner = m;
        } else if (matrix[0] == m && matrix[4] == m && matrix[8] == m) {
            winner = m;
        } else if (matrix[2] == m && matrix[4] == m && matrix[6] == m) {
            winner = m;
        }

        console.log("current winner is " + winner);
    }


    function pcTurn() {

        // 		var fCells = getFreeCells();
        // 		if (fCells.length === 0) {
        // 			return;
        // 		}
        // 		console.log(fCells);
        // 		var randomIndex = Math.floor(Math.random() * (fCells.length - 1));
        var indexInMatrix = findBestTurn();

        // indexInMatrix = fCells[randomIndex];
        matrix[indexInMatrix] = 2;
        console.log("PC turns on id" + (indexInMatrix + 1));
        var cell = document.getElementById('id' + (indexInMatrix + 1));
        cell.style.backgroundColor = 'yellow';
    }

    function onClick(e) {
        if (isGameOver) {
            return;
        }
        var currentColor = e.target.style.backgroundColor;
        if (currentColor == 'blue' || currentColor == 'yellow') {
            console.log("this cell is already checked!");
            return;
        }
        var id = e.target.id;
        console.log(e);
        console.log('yep: ' + id);
        e.target.style.backgroundColor = 'blue';
        var index = id.split("id")[1] - 1;
        matrix[index] = 1;
        checkWin(1);
        if (winner === 1) {
            isGameOver = true;
            setTimeout(startNewRound, 1500);
            setScore();
            return;
        }
        if (winner !== 1) {
            findBestTurn();
            pcTurn();
            checkWin(2);
            if (winner === 2) {
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
    }


    console.log(allCells);
    fillMatrix();
    console.log(matrix);


    for (var i = 0; i < allCells.length; i++) allCells[i].addEventListener('click', function (e) {
        onClick(e);
    }, true);
}
