const arrtemp = [
  [0, 0, 0, 1, 0, 1, 0, 0, 1, 1],
  [0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
  [0, 0, 0, 1, 0, 1, 1, 1, 1, 1]
]

const array = [
  new Array(12).fill(0),
  new Array(12).fill(0),
  new Array(12).fill(0),
  new Array(12).fill(0)
]

const toBraille = arr => {
  let str = ''
  for (let offset = 0; offset < arr[0].length; offset += 2) {
    let tempArr = arr.slice(0, -1).reduce((acc, row, idx) => {
      acc.splice(idx, 0, row[offset])
      acc.push(row[offset + 1])
      return acc
    }, [])
    tempArr.push(arr[3][offset])
    tempArr.push(arr[3][offset + 1])

    binaryStr = tempArr.reverse().join('')
    const hex = parseInt(binaryStr, 2)
      .toString(16)
      .padStart(2, '0')

    str += String.fromCharCode(`0x28${hex}`)
  }
  return str
}

let prevX = 0
let prevY = 0
let maxY = array.length
let maxX = array[0].length
const snake = [{ x: 0, y: 0 }]

const move = (dir, snake) => {
  array[snake[snake.length - 1].y][snake[snake.length - 1].x] = 0
  switch (dir) {
    case 'right':
      snake[0].x += 1
      if (snake[0].x >= maxX) {
        snake[0].x = 0
      }
      array[snake[0].y][snake[0].x] = 1
      break
  }
}

function loop () {
  move('right', snake)

  let s = '>'
  s += `🇸🇳🇦🇰🇪🐍`
  s += String.fromCharCode(0x2590)
  s += toBraille(array)
  s += String.fromCharCode(0x258c)
  console.log(s)
  console.log(array)
  window.location.hash = s

  setTimeout(loop, 150)
}

loop()
