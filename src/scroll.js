// @flow
let isMonitoring: boolean = false
let isScrolling: boolean = false
let watchers: Set<Function> = new Set()

function onScroll(e) {
  if (!isScrolling) {
    isScrolling = true
    requestAnimationFrame(update)
  }
}

function update() {
  isScrolling = false
  watchers.forEach(cb => cb())
}

function start() {
  if (!isMonitoring) {
    global.window.addEventListener('scroll', onScroll)
    isMonitoring = true
  }
}

function stop() {
  if (isMonitoring) {
    watchers.clear()
    global.window.removeEventListener('scroll', onScroll)
    isMonitoring = false
  }
}

export function watch(cb: Function) {
  if (!isMonitoring) start()
  watchers.add(cb)
}

export function unwatch(cb: Function) {
  watchers.delete(cb)
  if (!watchers.size) stop()
}
