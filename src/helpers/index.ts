export class MovieController {
  getTime(value: string) {
    const timeArr = value.split(":").map(el => parseInt(el))
    timeArr[0] = timeArr[0] * 60 * 60
    timeArr[1] = timeArr[1] * 60
    return timeArr.reduce((acc, value) => acc + value,0)
  }
}

export const throttle = (fn: Function, wait: number = 300) => {
  let inThrottle: boolean, lastFn: ReturnType<typeof setTimeout>, lastTime: number
  return function (this: any) {
    const context = this,
      args = arguments
    if (!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}