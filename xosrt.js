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



function pcTurn() {
	var fCells = getFreeCells();
	console.log(fCells);
	var randomIndex = Math.floor(Math.random() * (fCells.length - 1));
	matrix[fCells[randomIndex]] = 2;
	console.log("PC turns on " + randomIndex);


}

function onClick(e) {
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