const socket = io()
let side = 30
function setup() {
    createCanvas(1500, 1500);
    background('#acacac');
}
count = 0


season.onclick = function () {
    count++
    if (count % 2 == 0) {
        season.innerHTML = 'Amar'
    }
    else {
        season.innerHTML = 'Dzmer'
    }
    socket.emit("update season", count);

}

function drawful(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1 && season.innerHTML == 'Amar') {
                fill("green");
            }
            else if (matrix[y][x] == 1 && season.innerHTML == 'Dzmer') {
                fill("whitesmoke");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 4) {
                fill("purple")
            }
            else if (matrix[y][x] == 5) {
                fill("black")
            }
            else if (matrix[y][x] == 6) {
                fill("brown")
            }
            rect(x * side, y * side, side, side);
        }
    }
}



socket.on('update matrix', drawful)