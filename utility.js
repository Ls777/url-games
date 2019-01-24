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

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // The maximum is exclusive and the minimum is inclusive
}
