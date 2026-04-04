import { BasePage } from './base.page';

export class CompleteCheckout extends BasePage {
    constructor(page) {
        super(page);
        this.header = page.locator('.complete-header');
        this.backHomeButton = page.locator('#back-to-products');
    }

    async getCompletionMessage() {
        return await this.header.textContent();
    }
}