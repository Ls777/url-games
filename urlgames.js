class Snake {
  constructor (width) {
    this.board = [
      new Array(width).fill(0),
      new Array(width).fill(0),
      new Array(width).fill(0),
      new Array(width).fill(0)
    ]
    this.snake = [{ x: 3, y: 0 }, { x: 2, y: 0 }]
    this.dot = { x: 2, y: 3 }
    this.direction = 'right'
    this.listener = new window.keypress.Listener()
    this.listener.simple_combo('up', () => {
      if (this.direction !== 'down') this.direction = 'up'
    })
    this.listener.simple_combo('down', () => {
      if (this.direction !== 'up') this.direction = 'down'
    })
    this.listener.simple_combo('left', () => {
      if (this.direction !== 'right') this.direction = 'left'
    })
    this.listener.simple_combo('right', () => {
      if (this.direction !== 'left') this.direction = 'right'
    })
    this.gameloop = setInterval(() => this.loop(), 300)
  }

  loop () {
    this.move()
    let s = '>'
    s += `🇸🇳🇦🇰🇪🐍`
    s += String.fromCharCode(0x2590)
    s += toBraille(this.board)
    s += String.fromCharCode(0x258c)
    console.log(s)
    window.location.hash = s
  }

  randomizeDot () {
    do {
      this.dot.x = getRandomInt(0, this.board[0].length)
      this.dot.y = getRandomInt(0, this.board.length)
    } while (this.board[this.dot.y][this.dot.x] === 1)
    console.log(this.dot)
  }

  display () {
    return this.board
  }

  move () {
    const newSegment = { ...this.snake[0] }
    let maxY = this.board.length - 1
    let maxX = this.board[0].length - 1
    switch (this.direction) {
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

    if (newSegment.x === this.dot.x && newSegment.y === this.dot.y) {
      this.randomizeDot()
    } else {
      const removed = this.snake.pop()
      this.board[removed.y][removed.x] = 0
    }

    if (
      this.snake.some(
        segment => segment.x === newSegment.x && segment.y === newSegment.y
      )
    ) {
      this.gameOver()
    }

    this.board[this.dot.y][this.dot.x] = 1
    this.snake.unshift(newSegment)
    this.snake.forEach(segment => {
      this.board[segment.y][segment.x] = 1
    })
  }

  gameOver () {
    clearInterval(this.gameloop)
    setTimeout(() => {
      let s = '>'
      s += `🇸🇳🇦🇰🇪🐍`
      s += String.fromCharCode(0x2590)
      s += 'g̸̛̺̖̰͓̥̜͆́͒͗̽̓̌̉̓͊̓͘͝ͅa̸̛̞̣͖͓̹̫͙̘̥͆̓͜m̷̺͍̼̲̝̱͚͔̑͂̀͑̈́ë̸͇̟̮̪̳̠̺̹̦̙̘̻̘́̀͜͝͠ͅó̷̘͇̲̳̘͕̭͙̍̍̎́͝ͅṽ̴̧̡͓̮̖̩̻̝͓ͅe̸̛̺̓̈̀̅̽͒̽r̶̢̦̭̠͈̳͔̰̞̲͙̾̒̐̌͑̀̎̐̍̓̊̅̀̒̀ͅ'
      s += String.fromCharCode(0x258c)
      console.log(s)
      window.location.hash = s
    }, 300)
  }
}

let snake = new Snake(12)
