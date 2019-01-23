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
let maxY = array.length - 1
let maxX = array[0].length - 1
console.log(maxY, maxX)
const snake = [
  { x: 6, y: 0 },
  { x: 5, y: 0 },
  { x: 4, y: 0 },
  { x: 6, y: 0 },
  { x: 5, y: 0 },
  { x: 4, y: 0 }
]

const move = dir => {
  const newSegment = { ...snake[0] }
  const removed = snake.pop()
  array[removed.y][removed.x] = 0
  switch (dir) {
    case 'right':
      newSegment.x += 1
      if (newSegment.x > maxX) {
        newSegment.x = 0
      }
      break
    case 'left':
      newSegment.x -= 1
      if (newSegment.x < 0) {
        newSegment.x = maxX
      }
      break
    case 'up':
      newSegment.y -= 1
      if (newSegment.y < 0) {
        newSegment.y = maxY
      }
      break
    case 'down':
      newSegment.y += 1
      if (newSegment.y > maxY) {
        newSegment.y = 0
      }
      break
  }

  snake.unshift(newSegment)
  snake.forEach(segment => {
    console.log(array[3])
    let x = segment.x
    let y = segment.y
    console.log(x, y)
    array[y][x] = 1
  })
}

function loop () {
  move('right')

  let s = '>'
  s += `🇸🇳🇦🇰🇪🐍`
  s += String.fromCharCode(0x2590)
  s += toBraille(array)
  s += String.fromCharCode(0x258c)
  console.log(s)
  window.location.hash = s

  setTimeout(loop, 150)
}

loop()
