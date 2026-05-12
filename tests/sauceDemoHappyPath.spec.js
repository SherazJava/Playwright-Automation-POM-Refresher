import { test, expect } from '@playwright/test';
import { LogInPage } from '../Pages/LoginPage.js';
import { InventoryPage } from '../Pages/InventoryPage.js';
import { CartPage } from '../Pages/CartPage.js';
import { CheckoutPage } from '../Pages/CheckoutPage.js';
import { credentials } from '../test-data/users.js';

test.beforeEach(async ({ page }) => {
  const login = new LogInPage(page);

  await login.goto();
  await login.login(
    credentials.login.valid.username,
    credentials.login.valid.password
  );
});

test('Valid log in', async ({ page }) => {
  const inventory = new InventoryPage(page);

  await expect(page).toHaveURL(/inventory/i);

  const count = await inventory.getProductCount();
  expect(count).toBeGreaterThan(0);
});

test('Add item to cart', async ({ page }) => {
  const inventory = new InventoryPage(page);

  await inventory.addFirstItemToCart();

  const cartCount = await inventory.getCartCount();
  expect(cartCount).toBe('1');
});

test('Cart contains item', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await inventory.addFirstItemToCart();
  await inventory.goToCart();
  
  const cartCount = await cart.getCartItemCount();
  expect(cartCount).toBe(1);

  const title = await cart.getCartTitle();
  expect(title).toBe('Your Cart');

});

test('Successful Checkout', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await inventory.addFirstItemToCart();
  await inventory.goToCart();
  
  await cart.clickCheckout();
 
  const checkoutTitle = await checkout.getCheckoutTitle();
  expect(checkoutTitle).toContain('Checkout: Your Information');

  await checkout.checkoutCreds(
  credentials.checkout.firstName,
  credentials.checkout.lastName,
  credentials.checkout.postcode
  );
  await checkout.continueCheckout();
 
  const overviewTitle = await checkout.getCheckoutTitle();
  expect(overviewTitle).toContain('Checkout: Overview');

  const itemCount = await checkout.validateItemCount();
  expect(itemCount).toBe(1);

  await checkout.finishOrder();

  const successTitle = await checkout.getCheckoutTitle();
  expect(successTitle).toContain('Checkout: Complete!');

  const message = await checkout.getSuccessMessage();
  expect(message).toContain('Thank you for your order!');

  await checkout.backHome();

  await expect(page).toHaveURL(/inventory/i);
});