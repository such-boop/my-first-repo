import { BasePage } from './base.page';

export class CheckoutOverview extends BasePage {
    constructor(page) {
        super(page);
        this.summaryInfo = page.locator('.summary_info');
        this.priceTotal = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');
    }

    async isLoaded() {
    await this.summaryInfo.waitFor({ state: 'visible' });
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}