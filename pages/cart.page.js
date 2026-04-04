import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartList = page.locator('.cart_list');
    this.cartItem = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async isRightItem(itemName) {
    const item = this.cartItem.filter({ hasText: itemName });
    await expect(item).toHaveText(new RegExp(itemName));
  }
}