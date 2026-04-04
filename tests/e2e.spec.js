import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutInfo } from '../pages/checkout.info.page';
import { CheckoutOverview } from '../pages/checkout.overview.page';
import { CompleteCheckout } from '../pages/checkout.complete.page';

test.describe('Процесс совершения покупки на Sauce Demo @ui', () => {

    test('Successful purchase', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const personalInfo = new CheckoutInfo(page);
        const overview = new CheckoutOverview(page);
        const completeCheckout = new CompleteCheckout(page);

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        const pageTitle = await inventoryPage.getPageTitle();
        await expect(pageTitle).toBe('Products');

        await inventoryPage.addItemToCart("Sauce Labs Fleece Jacket");
        await inventoryPage.openCart();

        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

        await cartPage.isRightItem("Sauce Labs Fleece Jacket");
        await cartPage.goToCheckout();

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

        await personalInfo.fillUserInfo('Test', 'User', '3232');
        await personalInfo.continueToOverview();

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

        await overview.isLoaded();
        await overview.finishCheckout();

        const completionMessage = await completeCheckout.getCompletionMessage();
        await expect(completionMessage).toBe('Thank you for your order!');

    })
})