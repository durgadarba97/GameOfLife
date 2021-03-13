const canvas = document.querySelector("#gamefield")
const context = canvas.getContext("2d")

const conway = new Conway()

window.onload = () => {

    window.setInterval(() => {
        conway.drawBoard()
        conway.nextGeneration()
    }, 200)
}