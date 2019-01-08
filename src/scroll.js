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
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    isMonitoring = true
  }
}

function stop() {
  if (isMonitoring) {
    watchers.clear()
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
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

export function destroy() {
  stop()
}
