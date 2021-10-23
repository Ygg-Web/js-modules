const board = document.querySelector('#board')
const SQUARES_NUMBER = 450

const colors = ['#FF6347', '#FF7F50', '#DC143C', '#B8860B', '#CD853F', '#778899', '#2F4F4F', '#FAEBD7', '#7B68EE', '#191970', '#7CFC00', '#98FB98', '#FF00FF']


for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div')
    square.classList.add('square')

    square.addEventListener('mouseover', () => {
        setColor(square)
    })

    square.addEventListener('mouseleave', () => {
        removeColor(square)
    })

    board.append(square)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color
    element.style.boxShadow = `0  0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element) {
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = `0  0 2px #000`

}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}