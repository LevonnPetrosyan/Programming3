let LivingCreature = require('./livingCreature')
let random = require("./random");

module.exports = class Bomb extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 1;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(ch) {
        this.getNewCoordinates();
        return super.chooseCell(ch);
    }

    eat() {
        let foods = this.chooseCell(3)
        let food = random(foods)
        if (food) {
            this.energy--;
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[food[1]][food[0]] = 5
            this.x = newX
            this.y = newY
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy <= 0) {
                this.die()
            }
        }

    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in bombArr) {
            if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                bombArr.splice(i, 1);
                break;
            }
        }
    }
    poco() {
        matrix[this.y][this.x] = 0
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                matrix[this.y - 1][this.x - 1] = 0
                matrix[this.y - 1][this.x + 1] = 0
                matrix[this.y - 1][this.x] = 0
                matrix[this.y][this.x - 1] = 0
                matrix[this.y][this.x + 1] = 0
                matrix[this.y + 1][this.x - 1] = 0
                matrix[this.y + 1][this.x] = 0
                matrix[this.y + 1][this.x + 1] = 0
            }

        }
    }


}
