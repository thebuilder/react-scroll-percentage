let isMonitoring: boolean = false
let isScrolling: boolean = false
let watchers: Set<Function> = new Set()

function onScroll() {
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

export function watchScroll(callback: Function, enabled: boolean) {
  if (enabled) {
    if (!isMonitoring) start()
    watchers.add(callback)
  } else {
    watchers.delete(callback)
    if (!watchers.size) stop()
  }
}