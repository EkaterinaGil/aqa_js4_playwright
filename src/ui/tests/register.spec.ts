import test, { expect, Page } from "@playwright/test";

interface ICredentials {
    username: string;
    password: string;
}

const validCredentials: ICredentials = {
    username: "kittygill",
    password: "SuperSecretPassword",
};

enum NOTIFICATIONS {
    REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    REGISTER_ERROR = "Please, provide valid data"
}

async function register(page: Page, username: string, password: string) {
    const usernameInput = page.locator('#userNameOnRegister');
    const passwordInput = page.locator('#passwordOnRegister');
    const registerButton = page.locator('#register');
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await registerButton.click();
}
async function login(page: Page, username: string, password: string) {
    const usernameInput = page.locator('#userName');
    const passwordInput = page.locator('#password');
    const submitButton = page.locator('#submit');
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await submitButton.click();
}

test.describe("Register", () => {

    test.beforeEach(async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        const registerOnLoginButton = page.locator('#registerOnLogin');
        await page.goto(url);
        await registerOnLoginButton.click()
    });

    test("Should register with valid credentials", async ({ page }) => {
        const notification = page.locator('#errorMessageOnRegister')
        await register(page, validCredentials.username, validCredentials.password);
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
    });

    test("Should login with valid credentials", async ({ page }) => {
        const backOnRegisterButton = page.locator('#backOnRegister');
        const notification = page.locator('#successMessage');
        await register(page, validCredentials.username, validCredentials.password);
        await backOnRegisterButton.click();
        await login(page, validCredentials.username, validCredentials.password);
        await expect(notification).toHaveText(`Hello, ${validCredentials.username}!`);
    });
});