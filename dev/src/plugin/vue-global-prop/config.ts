export class Config {
  static get version() {
    return process.env.VUE_APP_VERSION;
  }
}
