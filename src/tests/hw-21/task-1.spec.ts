import { test } from "tests/hw-19/common/fixtures"
import { credentialCases, invalidPasswords, invalidUsernames } from "./common/negativeCases"
import { expect } from "@playwright/test"

// Создать тест сьют используя DDT подход с негативными тест-кейсами 
// по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

test.describe.parallel(`register`, () => {
    test.beforeEach(async ({page, form}) => {
        await page.goto(form.getFormUrl());
        await form.switchFormType();
    });


  for (const [caseName, username] of Object.entries(invalidUsernames)) {
    test(`invalid username [${caseName}]: "${username}"`, async ({ form }) => {
      await form.fillCredentials("register", username, "Aa123456");
      await form.submitRegister();
      await expect(form.errorMessageRegister).toBeVisible();
    });
  }

  for (const [type, password] of Object.entries(invalidPasswords)) {
    test(`should reject invalid password (${type})`, async ({ form }) => {
      await form.fillCredentials("register", "Tester", password);
      await form.submitRegister();
      await expect(form.errorMessageRegister, `Expected error for case: ${type}`).toBeVisible();
    });
  }
});

test.describe.parallel(`login`, () => {
    test.beforeEach(async ({page, form}) => {
        await page.goto(form.getFormUrl());
    });

    for (const cred of credentialCases) {
      test(`should reject input ${cred.title}`, async({form}) =>{
        await form.fillCredentials("login", cred.login, cred.pass);
        await form.submitLogin();
        await expect(form.errorMessageLogin, `Expected error for case: ${cred.title}`).toBeVisible();
      });
    }
})