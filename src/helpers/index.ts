export class MovieController {
  getTime(value: string) {
    const timeArr = value.split(":").map(el => parseInt(el))
    timeArr[0] = timeArr[0] * 60 * 60
    timeArr[1] = timeArr[1] * 60
    return timeArr.reduce((acc, value) => acc + value,0)
  }
}