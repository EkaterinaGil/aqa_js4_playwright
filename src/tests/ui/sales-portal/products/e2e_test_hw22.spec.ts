import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { SignInPage } from "ui/pages/sign-in.page";

test.describe("[Sales Portal] [Products - e2e tests]", async () => {
    test("e2e test HW22", async ({ page }) => {
        const homePage = new HomePage(page);
        const signInPage = new SignInPage(page);
        const productsListPage = new ProductsListPage(page);
        const addNewProductPage = new AddNewProductPage(page);

        await homePage.open();
        await expect(signInPage.emailInput).toBeVisible();
        await signInPage.fillCredentials(credentials);
        await signInPage.clickOnLogin();

        await homePage.waitForOpened();
        await homePage.clickOnViewModule("Products");
        await productsListPage.waitForOpened();
        await productsListPage.clickAddNewProduct();
        await addNewProductPage.waitForOpened();
        const productData = generateProductData();
        await addNewProductPage.fillForm(productData);
        await addNewProductPage.clickSave();
        await productsListPage.waitForOpened();
        await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
        await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
        const createdProduct = await productsListPage.tableCellsByName(productData.name).allInnerTexts();
        expect(createdProduct[0]).toBe(productData.name);
        expect(createdProduct[1]).toBe('$' + productData.price);
        expect(createdProduct[2]).toBe(productData.manufacturer);
    });
});