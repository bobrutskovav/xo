window.onload = function() {
	console.clear();
	console.log('init');


	var allCells = document.getElementsByClassName('cell');
	var matrix = [];
	var winner = 0;

	function fillMatrix() {
		for (var i = 0; i < allCells.length; i++) {
			matrix[i] = 0;
		}
	}

	function startNewRound() {
		console.log("Starting new round...")
		for(var i = 0;i < allCells.length;i++){
			allCells[i].style.backgroundColor = 'red';
		}
		fillMatrix();
		winner = 0;
	}

	function setScore() {
		if (winner === 1) {
			var pScoreEle = document.getElementById("playerscore");
			console.log("Определяю элемент...\n " + pScoreEle);
			var currentPscore = parseInt(pScoreEle.textContent);
			currentPscore = currentPscore + 1;
			console.log("Current player score is " + currentPscore);
			pScoreEle.innerHTML = currentPscore;
			startNewRound();
		} else if (winner === 2) {
			var pcScoreEle = document.getElementById("pcscore");
			var currentPcscore = parseInt(pcScoreEle.textContent);
			currentPcscore = currentPcscore + 1;
			console.log("Current PC score is " + currentPcscore);
			pcScoreEle.innerHTML = currentPcscore;
			startNewRound();
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
		var fCells = getFreeCells();
		if(fCells.length === 0 && winner === 0){
			setTimeout(startNewRound(),1000);
			return;
		}
		console.log("current winner is " + winner);
		if(winner !== 0){
			setScore();
		}
	}



	function pcTurn() {
		var fCells = getFreeCells();
		console.log(fCells);
		var randomIndex = Math.floor(Math.random() * (fCells.length - 1));
		var indexInMatrix = fCells[randomIndex];
		matrix[indexInMatrix] = 2;
		console.log("PC turns on id" + (indexInMatrix + 1));
		var cell = document.getElementById('id' + (indexInMatrix + 1));
		cell.style.backgroundColor = 'yellow';

	}

	function onClick(e) {
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
		if(winner !== 1){
			setTimeout(pcTurn,1000);
			setTimeout(checkWin(2),2000);
		}
	}


	console.log(allCells);
	fillMatrix();
	console.log(matrix);



	for (var i = 0; i < allCells.length; i++) allCells[i].addEventListener('click', function(e) {
		onClick(e);
	}, true);
}