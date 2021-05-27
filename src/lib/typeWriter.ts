export function typeWriter(...args: any[]) {
  //arguments : sentence, n, x, y, speed
  // TODO: implement this

  const sentence = args[0]
  let n = args[1]
  const x = args[2]
  const y = args[3]
  const speed = args[4]

  fill(237, 34, 93)
  textSize(98)
  noStroke()
  if (n < sentence.length) {
    text(sentence.substring(0, n + 1), x, y)
    n += 1
    setTimeout(function () {
      typeWriter(sentence, n, x, y, speed)
    }, speed)
    noLoop()
  }
}
