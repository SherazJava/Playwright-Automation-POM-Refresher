export class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postCode = page.locator('#postal-code');
        this.checkoutTitle = page.locator('.title');
        this.continueBtn = page.getByRole('button', { name: /continue/i});
        this.finishBtn = page.getByRole('button', { name: /finish/i});
        this.successMessage = page.locator('.complete-header');
        this.backHomeBtn = page.getByRole('button', { name: 'Back Home'});
        this.overviewItem = page.locator('.cart_item');
    }

    async validateItemCount(){
        return await this.overviewItem.count();
    }

    async getCheckoutTitle() {
        return await this.checkoutTitle.textContent();
    }

    async checkoutCreds(firstName, lastName, postCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postCode.fill(postCode);
    }

    async continueCheckout(){
        await this.continueBtn.click();
    }

    async finishOrder() {
        await this.finishBtn.click();
    }

    async getSuccessMessage(){
        return await this.successMessage.textContent();
    }

    async backHome(){
        await this.backHomeBtn.click();
    }
};