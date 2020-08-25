;(function flexible(window, document) {
  const docEl = document.documentElement
  const isIOS = window.navigator.appVersion.match(/iphone|ipad|ipod|ios/gi)
  const isAndroid = window.navigator.userAgent.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i)
  const dpr = (isIOS && isAndroid && window.devicePixelRatio) || 1

  docEl.setAttribute('data-dpr', dpr)

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  // set 1rem = 50px, 750px / 2x
  function setRemUnit() {
    docEl.style.fontSize = 50 * dpr + 'px'
  }
  setRemUnit()

  // set viewport scale
  function setViewportScale() {
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
  }
  setViewportScale()
})(window, document)
