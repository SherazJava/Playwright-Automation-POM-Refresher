export class CartPage {
    constructor(page) {
        this.page = page;

        this.cartTitle = page.locator('.title');
        this.checkoutBtn = page.getByRole('button', { name: /checkout/i});
        this.cartItems = page.locator('.cart_item');
    }

    async getCartItemCount() {
        return await this.cartItems.count();
    }

    async getCartTitle() {
        return await this.cartTitle.textContent();
    }

    async clickCheckout() {
        await this.checkoutBtn.click();
    }
}