window.onload = function () {
	console.clear();
	console.log('init');

	var allCells = document.getElementsByClassName('cell');
	var matrix = [];

	function fillMatrix() {
		for (var i = 0; i < allCells.length; i++) {
			matrix[i] = 0;
		}
	}

	function getFreeCells() {
		var tempArr = [];
		for (var i = 0; i < matrix.length; i++) {
			if (matrix[i] == 0) {
				tempArr.push(i);
			}
		}
		return tempArr;
	}

	// function checkWin(m){
	// 	if(matrix[0]==m && matrix[1] == m && matrix[2] == m){
	// 		return m;
	// 	}else if(matrix[3]==m && matrix[4] == m && matrix[5] == m){
	// 		return m;
	// 	}else if(matrix[6]==m && matrix[7] == m && matrix[8] == m){
	// 		return m;
	// 	}else if(matrix[0] == m && matrix[3] == m && matrix[6] == m){
	// 		return m;
	// 	}else if(matrix[1] == m && matrix[4] == m && matrix[7] == m){
	// 		return m;
	// 	}else if(matrix[2] == m && matrix[5] == m && matrix[8] == m){
	// 		return m;
	// }



	function pcTurn() {
		var fCells = getFreeCells();
		console.log(fCells);
		var randomIndex = Math.floor(Math.random() * (fCells.length - 1));
		var indexInMatrix = fCells[randomIndex];
		matrix[indexInMatrix] = 2;
		console.log("PC turns on id" + (indexInMatrix+1));
	 var cell =	document.getElementById('id' + (indexInMatrix+1));
	 cell.style.backgroundColor='yellow';
	}

	function onClick(e) {
		var currentColor = e.target.style.backgroundColor;
		if(currentColor == 'blue' || currentColor == 'yellow' ){
			console.log("this cell is already checked!");
			return;
		}
		var id = e.target.id;
		console.log(e);
		console.log('yep: ' + id);
		e.target.style.backgroundColor = 'blue';
		var index = id.split("id")[1] - 1;
		console.log(index);
		matrix[index] = 1;

		pcTurn();
	}


	console.log(allCells);
	fillMatrix();
	console.log(matrix);



	for (var i = 0; i < allCells.length; i++) allCells[i].addEventListener('click', function (e) {
		onClick(e);
	}, true);
};