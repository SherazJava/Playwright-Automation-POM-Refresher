
export class InventoryPage {
  constructor(page) {
    this.page = page;

    this.productItems = page.locator('.inventory_item');
    this.pageTitle = page.locator('.title');
    this.addToCartBtns = page.locator('button:has-text("Add to cart")');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  async addFirstItemToCart() {
    await this.addToCartBtns.first().click();
  }

  async getCartCount() {
    return await this.cartBadge.textContent();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

}
