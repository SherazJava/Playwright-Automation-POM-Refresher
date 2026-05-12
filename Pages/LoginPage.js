export class LogInPage {
  constructor(page) {
    this.page = page;

    this.username = page.locator('#user-name');
    this.password = page.locator ('#password');
    this.logInBtn = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.logInBtn.click();

  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}