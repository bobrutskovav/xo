window.onload = function() {
	console.clear();
	console.log('init');


	var allCells = document.getElementsByClassName('cell');
	var matrix = [];
	var winner = 0;
	var isGameOver = false;

<<<<<<< HEAD




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
			}
			return tree;
		}

		function getVariants() {
			//Собираем все линии где мы можем победить на данный момент

			var currentTree = getTreeMatrix();
			var variants = {};
			for (var line in currentTree) {
				if (currentTree.hasOwnProperty(line)) {
					var isGoodLine = true;
					for (var cell in line) {
						if (line.hasOwnProperty(cell)) {
							if (parseInt(line[cell]) === 1) {
								isGoodLine = false;
								break;
							}
						}
					}
					if (isGoodLine) {
								variants.line = currentTree[line];
							}
				}
			}
			return variants;
		}

		var variants = getVariants();

		function getBestLine() {
			var bestLine;
			for (var i = 0; i < variants.length; i++) {
				if (bestLine !== undefined) {
					break;
				}
				var line = variants[i];
				for (var y = 0; y < line.length; y++) {
					if (y === 0) {
						if (line[y] !== 1 && line[(y + 1)] !== 1) {
							bestLine = line;
							break;
						}
					} else if (y === 2) {
						if (line[y] !== 1 && line[(y - 1)] !== 1) {
							bestLine = line;
							break;
						}
					} else {
						continue;
					}
				}
			}
			if (bestLine === undefined) {
				var randomIndex = Math.floor(Math.random() * (variants.length - 1));
				bestLine = variants[randomIndex];
			}
			return bestLine;

		}

		var bLine = getBestLine();

		function getFreeCellFromLine() {
			for (var i = 0; i < bLine.length; i++) {
				if (bLine[i] === 0) {
					return bLine[i];
				}
			}
		}

		var index = getFreeCellFromLine();
		return index;
	}




=======
>>>>>>> 3cf256b60509f265328b5b53daa183f7eb7d6171

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
<<<<<<< HEAD
		// 		var fCells = getFreeCells();
		// 		if (fCells.length === 0) {
		// 			return;
		// 		}
		// 		console.log(fCells);
		// 		var randomIndex = Math.floor(Math.random() * (fCells.length - 1));
		var indexInMatrix = findBestTurn();
=======
		var fCells = getFreeCells();
		if (fCells.length === 0) {
			return;
		}
		console.log(fCells);
		var randomIndex = Math.floor(Math.random() * (fCells.length - 1));
		var indexInMatrix = fCells[randomIndex];
>>>>>>> 3cf256b60509f265328b5b53daa183f7eb7d6171
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
<<<<<<< HEAD
			findBestTurn();
			pcTurn();
			checkWin(2);
			if (winner === 2) {

=======
			pcTurn();
			checkWin(2);
			if (winner === 2) {
				
>>>>>>> 3cf256b60509f265328b5b53daa183f7eb7d6171
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