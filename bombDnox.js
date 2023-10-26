let LivingCreature = require('./livingCreature')
let Bomb = require('./bomb')
let random = require("./random");

module.exports = class BombDnox extends LivingCreature{
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

        let foods = this.chooseCell(1)
        let food = random(foods)
        if (food) {
            let newX
            let newY
            if (this.energy % 3 != 0) {
                this.energy++;
                matrix[this.y][this.x] = 0
                newX = food[0]
                newY = food[1]
                matrix[food[1]][food[0]] = 4
                this.x = newX
                this.y = newY
            }
            else {
                this.energy++;
                matrix[this.y][this.x] = 5

                var newBomb = new Bomb(this.x, this.y, 5);
                bombArr.push(newBomb);

                newX = food[0]
                newY = food[1]
                matrix[food[1]][food[0]] = 4
                this.x = newX
                this.y = newY



            }
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }



        }
        else {
            this.move();
        }
    }

    move() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
        }
    }
}
