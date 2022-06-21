/**
 * Polyfill for requestAnimationFrame
 * @borrows https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js
 */
let lastTime = 0
function fallback(callback: (timestamp: number) => void) {
  const now = Date.now()
  const nextTime = Math.max(lastTime + 16, now)

  return setTimeout(function () {
    callback((lastTime = nextTime))
  }, nextTime - now)
}

export function requestAnimFrame(callback: (timestamp: number) => void): number {
  return (window.requestAnimationFrame || fallback)(callback)
}

export function cancelAnimFrame(id: number): void {
  ;(window.cancelAnimationFrame || window.clearTimeout)(id)
}
