import test, { expect, Page } from "@playwright/test";

interface ICredentials {
    fullname: {
        firstname: string;
        lastname: string;
    };
    address: string;
    email: string;
    phone: string;
    country: string;
    gender: string;
    hobbies: string;
    language: string;
    skills: string;
    dateofbirth: {
        year: string;
        month: string;
        day: string;
    };
    password: string;
    confirmpassword: string;
};

const validCredentials: ICredentials = {
    fullname: {
        firstname: "Ami",
        lastname: "Smith",
    },
    address: "USA, CA, Someroad, 12345",
    email: "ami_smith@gmail.com",
    phone: "+11231234567",
    country: "USA",
    gender: "female",
    hobbies: "Sports",
    language: "english",
    skills: "JavaScript",
    dateofbirth: {
        year: "1990",
        month: "November",
        day: "3"
    },
    password: "SuperSecretPassword",
    confirmpassword: "SuperSecretPassword",
};

test("Should register with valid credentials", async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
    const firstNameInput = page.locator('#firstName');
    const lastNameInput = page.locator('#lastName');
    const addressInput = page.locator('#address');
    const emailInput = page.locator('#email');
    const phoneInput = page.locator('#phone');
    const countryDropdown = page.locator('#country');
    const genderRadioBtn = page.locator('input[value="' + validCredentials.gender + '"]');
    const hobbiesCheckBox = page.locator('input[value="' + validCredentials.hobbies + '"]');
    const languageInput = page.locator('#language');
    const skillsInput = page.locator('#skills');
    const yearOfbirthInput = page.locator('#year');
    const monthOfbirthInput = page.locator('#month');
    const dayOfbirthInput = page.locator('#day');
    const passwordInput = page.locator('#password');
    const confirmPasswordInput = page.locator('#password-confirm');
    const submitButton = page.locator('button[type="submit"]');

    const fullNameRegistered = page.locator('#fullName');
    const addressRegistered = page.locator('#address');
    const emailRegistered = page.locator('#email');
    const phoneRegistered = page.locator('#phone');
    const countryRegistered = page.locator('#country');
    const genderRegistered = page.locator('#gender');
    const languageRegistered = page.locator('#language');
    const skillsRegistered = page.locator('#skills');
    const hobbiesRegistered = page.locator('#hobbies');
    const dateofbirthRegistered = page.locator('#dateOfBirth');
    const textCenterOnRegistered = page.locator('h2.text-center');

    await page.goto(url);
    await firstNameInput.fill(validCredentials.fullname.firstname);
    await lastNameInput.fill(validCredentials.fullname.lastname);
    await addressInput.fill(validCredentials.address);
    await emailInput.fill(validCredentials.email);
    await phoneInput.fill(validCredentials.phone);
    await countryDropdown.selectOption(validCredentials.country);
    await genderRadioBtn.click();
    await hobbiesCheckBox.check();
    await languageInput.fill(validCredentials.language);
    await skillsInput.selectOption(validCredentials.skills);
    await yearOfbirthInput.selectOption(validCredentials.dateofbirth.year);
    await monthOfbirthInput.selectOption(validCredentials.dateofbirth.month);
    await dayOfbirthInput.selectOption(validCredentials.dateofbirth.day);
    await passwordInput.fill(validCredentials.password);
    await confirmPasswordInput.fill(validCredentials.confirmpassword);
    await submitButton.click();

    await expect.soft(textCenterOnRegistered).toHaveText('Registration Details');
    await expect.soft(fullNameRegistered).toHaveText(validCredentials.fullname.firstname + ' ' + validCredentials.fullname.lastname);
    await expect.soft(addressRegistered).toHaveText(validCredentials.address);
    await expect.soft(emailRegistered).toHaveText(validCredentials.email);
    await expect.soft(phoneRegistered).toHaveText(validCredentials.phone);
    await expect.soft(countryRegistered).toHaveText(validCredentials.country);
    await expect.soft(genderRegistered).toHaveText(validCredentials.gender);
    await expect.soft(languageRegistered).toHaveText(validCredentials.language);
    await expect.soft(skillsRegistered).toHaveText(validCredentials.skills);
    await expect.soft(hobbiesRegistered).toHaveText(validCredentials.hobbies);
    await expect.soft(dateofbirthRegistered).toHaveText(validCredentials.dateofbirth.day + ' ' + validCredentials.dateofbirth.month + ' ' + validCredentials.dateofbirth.year);
});