import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.locator('.title');
        this.shoppingCartIcon = page.locator('.shopping_cart_container');
        this.inventory = page.locator('.inventory_list');
        this.inventoryItem = page.locator('.inventory_item');
        this.addToCartButton = page.locator('//button[contains(@data-test,"add-to-cart")]');
    }

    async addItemToCart(itemName) {
        const item = this.inventoryItem.filter({ hasText: itemName });
        await item.getByRole('button', { name: 'Add to cart' }).click();
    }

    async openCart() {
        await this.shoppingCartIcon.click();
    }

    async getPageTitle() {
        return await this.pageTitle.textContent();
    }
}