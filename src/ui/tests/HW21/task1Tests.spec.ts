// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

import notValidTestData from "./testDataForTask1.spec";
import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    const registerOnLoginButton = page.locator('#registerOnLogin');
    await page.goto(url);
    await registerOnLoginButton.click()
});

test.describe("[Demo Login Form] Registration, negative", () => {

    for (const { testCaseTitle, credentials, errorMessage } of notValidTestData) {
        test(testCaseTitle, async ({ page }) => {
            const userNameInput = page.locator('#userNameOnRegister');
            const passwordInput = page.locator('#passwordOnRegister');
            const registerButton = page.locator('#register');
            const message = page.locator('#errorMessageOnRegister')

            await userNameInput.fill(credentials.username);
            await passwordInput.fill(credentials.password);
            await registerButton.click();
            await expect(message).toHaveText(errorMessage);
        });
    };
});
