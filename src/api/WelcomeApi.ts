import BaseApi from "./BaseApi";

export default class WelcomeApi extends BaseApi {
  private static instance: WelcomeApi;
  private readonly apiUrl = `${this.apiRootUrl}/welcome`;

  private constructor() {
    super();
  }

  public static getInstance(): WelcomeApi {
    if (!WelcomeApi.instance) {
      WelcomeApi.instance = new WelcomeApi();
    }
    return WelcomeApi.instance;
  }

  public async welcome(): Promise<{ value: string }> {
    return this.getRequest(this.apiUrl);
  }
}
