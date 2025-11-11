import { ICredentials } from "data/types/credentials.types";
import { SalesPortalPage } from "./salesPortal.page";

export class SignInPage extends SalesPortalPage {
    readonly title = this.page.locator(".lead");
    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput");
    readonly loginButton = this.page.locator("button[type='submit']");

    readonly uniqueElement = this.title;

    async fillCredentials(credentials: ICredentials) {
        if (credentials.username) await this.emailInput.fill(credentials.username);
        if (credentials.password) await this.passwordInput.fill(credentials.password);
    };
    async clickOnLogin() {
        await this.loginButton.click()
    };
}