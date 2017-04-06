window.onload = function() {
	console.clear();
	console.log('init');


	var allCells = document.getElementsByClassName('cell');
	var matrix = [];
	var winner = 0;
	var isGameOver = false;


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
		var fCells = getFreeCells();
		if (fCells.length === 0) {
			return;
		}
		console.log(fCells);
		var randomIndex = Math.floor(Math.random() * (fCells.length - 1));
		var indexInMatrix = fCells[randomIndex];
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