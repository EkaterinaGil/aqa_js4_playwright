// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

import test, { expect, Page } from "@playwright/test";

test("Dynamic loading test", async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/test-automation-sandbox";
    const dynamicLoadingButton = page.locator('#dynamic-loading');
    const manipulateElementButton = page.locator('button[data-testid="start-button"]');
    const header = page.locator('header');
    const dynamicCheckbox = page.locator('div[data-testid="dynamic-element"] input');
    const statusMessage = page.locator('p[data-testid="status-message"]');

    await page.goto(url);
    await dynamicLoadingButton.click();
    await manipulateElementButton.waitFor({ state: 'visible' });
    await expect(header).toContainText('Automation Sandbox');
    await dynamicCheckbox.check();
    await manipulateElementButton.click();
    await dynamicCheckbox.waitFor({ state: 'hidden' });
    await expect(manipulateElementButton).toBeVisible();
    await statusMessage.waitFor({ state: 'visible' });
    await expect(statusMessage).toHaveText('The element has disappeared.');
    await manipulateElementButton.click();
    await dynamicCheckbox.waitFor({ state: 'visible' });
    await statusMessage.waitFor({ state: 'visible' });
    await expect(statusMessage).toHaveText('The element has returned.');
});