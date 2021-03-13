class Conway {

    constructor() {
        this.deadcolor = '#666666'
        this.alivecolor = '#F88379'

        this.size = 10
        this.width = 100
        this.height = 100
        this.board = []

        // initializes the game board
        for(var i = 0; i < this.height; i++) {
            this.board[i] = []
            for(var j = 0; j < this.width; j++) {
                // random 20% probabilty of each cell being alive.
                var probabilty = Math.random()
                // console.log(probabilty)
                if(probabilty > .80) {
                    this.board[i][j] = true
                } else {
                    this.board[i][j] = false
                }
            }
        }

        // console.log(this.board)
    }

    // helper method to get each cells neighbors
    getNeighborCount(i, j) {
        var count = 0
        var nexti = this.nextCell(i)
        var nextj = this.nextCell(j)
        var previ = this.prevCell(i)
        var prevj = this.prevCell(j)
        // console.log("nextx " + nextx + "nexty " + nexty)
        // console.log("prevx " + prevx + "prevy " + prevy)

        if(this.board[i][nextj]){
            count++
        }
        if(this.board[nexti][j])  {
            count++
        }
        if(this.board[nexti][nextj]) {
            count++
        }

        if(this.board[i][prevj]) {
            count++
        }
        if(this.board[previ][j]) {
            count++
        }
        if(this.board[previ][prevj]) {
            count++
        }

        if(this.board[previ][nextj]) {
            count++
        }
        if(this.board[nexti][prevj]) {
            count++
        }

        // console.log(count)
        
        return count
    }

    testcount(x, y) {
        console.log("x:" + x + "y" + y)
    }

    // rolls over to the other side fo the world.
    // works because game world is a square
    nextCell(i) {
        // will return values between 0 and this.width
        // console.log(Math.floor((i+1)% this.width))
        // return Math.floor((i+1)% this.width)
        if(i >= this.width-1) {
            return 0
        } else {
            return i + 1
        }

    }

    prevCell(i) {
        if(i <= 0) {
            return this.width-1
        } else {
            return i - 1
        }
    }

    // draws the board to the screen.
    drawBoard() {
        // for every element in the game board, draw a square
        for(var i = 0; i < this.height; i++) {
            for(var j = 0; j < this.width; j++) {
                if(this.board[i][j]) {
                    context.fillStyle = this.alivecolor
                } else {
                    context.fillStyle = this.deadcolor
                }

                context.fillRect(j * this.size, i * this.size, this.size, this.size)
            }
        }
    }

    nextGeneration() {
// 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// 2. Any live cell with two or three live neighbours lives on to the next generation.
// 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.  
        var nextgenboard = []
        for(var i = 0; i < this.height; i++) {
            nextgenboard[i] = []
            for(var j = 0; j < this.width; j++) {
                var neighborcount = this.getNeighborCount(i,j)
                // nextgenboard[i][j] = false
                // 1, 2, 3
                if(this.board[i][j]) {
                    if(neighborcount < 2) {
                        nextgenboard[i][j] = false
                    } else if(neighborcount == 2 || neighborcount == 3) {
                        nextgenboard[i][j] = true
                    } else if(neighborcount > 3) {
                        nextgenboard[i][j] = false
                    }
                // 4
                } else {
                    if(neighborcount == 3) {
                        nextgenboard[i][j] = true
                    }
                }
            }
        }
        console.log(nextgenboard)
        this.board = nextgenboard
        
    }
}