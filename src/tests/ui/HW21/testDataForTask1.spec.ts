// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

interface ICredentials {
    username: string;
    password: string;
}

interface IUserData {
    testCaseTitle: string;
    credentials: ICredentials;
    errorMessage: MESSAGES;
}

enum MESSAGES {
    SUCCESS = "Successfully registered! Please, click Back to return on login page",
    SHORT_PASSWORD = "Password should contain at least 8 characters",
    SHORT_USERNAME = "Username should contain at least 3 characters",
    LONG_PASSWORD = "",
    LONG_USERNAME = "",
    SPACES = "Prefix and postfix spaces are not allowed is username",
    NO_UPPERCASE_PASSWORD = "Password should contain at least one character in upper case",
    NO_LOWERCASE_PASSWORD = "Password should contain at least one character in lower case",
    EMPTY_PASSWORD = "Password is required",
    EMPTY_USERNAME = "Username is required"
}

const notValidTestData: IUserData[] = [
    {
        testCaseTitle: 'Register with short password',
        credentials: { username: "Andrei12345678 !@#$", password: "Qwertyu" },
        errorMessage: MESSAGES.SHORT_PASSWORD,
    },
    {
        testCaseTitle: 'Register with short username',
        credentials: { username: "An", password: "Qwertyui" },
        errorMessage: MESSAGES.SHORT_USERNAME,
    },
    {
        testCaseTitle: 'Register with prefixspaces in username',
        credentials: { username: " Andrey", password: "Qwertyui" },
        errorMessage: MESSAGES.SPACES,
    },
    {
        testCaseTitle: 'Register with postfixspaces in username',
        credentials: { username: "Andrey ", password: "Qwertyui" },
        errorMessage: MESSAGES.SPACES,
    },
    {
        testCaseTitle: 'Register with no uppercase in password',
        credentials: { username: "Andrey", password: "qwertyui" },
        errorMessage: MESSAGES.NO_UPPERCASE_PASSWORD,
    },
    {
        testCaseTitle: 'Register with no lowercase in password',
        credentials: { username: "Andrey", password: "QWERTYUI" },
        errorMessage: MESSAGES.NO_LOWERCASE_PASSWORD,
    },
    {
        testCaseTitle: 'Register with empty username',
        credentials: { username: "", password: "Qwertyui" },
        errorMessage: MESSAGES.EMPTY_USERNAME,
    },
    {
        testCaseTitle: 'Register with empty password',
        credentials: { username: "Andrey", password: "" },
        errorMessage: MESSAGES.EMPTY_PASSWORD
    },
];

export default notValidTestData;