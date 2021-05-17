;(function remSetup(window, document) {
  const docEl = document.documentElement
  const isIOS = window.navigator.appVersion.match(/iphone|ipad|ipod|ios/gi)
  const isAndroid = window.navigator.userAgent.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i)
  const dpr = isIOS || isAndroid ? window.devicePixelRatio : 1

  docEl.setAttribute('data-dpr', `${dpr}`)

  // set 1rem = 50px, 750px / 2x
  docEl.style.fontSize = `${50 * dpr}px`

  // set viewport scale
  const scale = 1 / dpr

  let metaEl = document.querySelector('meta[name="viewport"]')
  if (!metaEl) {
    metaEl = document.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    document.head.appendChild(metaEl)
  }
  metaEl.setAttribute(
    'content',
    `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`
  )
})(window, document)
