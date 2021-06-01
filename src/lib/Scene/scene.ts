export class Scene {
  constructor() {}
  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
