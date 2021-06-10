export class Scene {
  constructor() {}
  async delay(sec: number) {
    return new Promise((resolve) => setTimeout(resolve, 1000*sec)); //sec to ms 
  }
}
