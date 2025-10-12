import { expect } from "@playwright/test";
import {test} from "./common/fixtures";
import { mandatoryTestFunction } from "./common/factories";

test.describe.parallel(`login`, ()=> {
    test.beforeEach(async ({page, form, defaultUser}) => {
        await page.goto(form.getFormUrl());
        await form.setUserInStorage(defaultUser.name, defaultUser.password);
    });

    test(`success`,{tag: "@smoke"}, async({form, defaultUser})=>{
        await form.fillCredentials("login", defaultUser.name, defaultUser.password);
        await form.submitLogin();

        await expect(form.successMessage, "Login complete").toBeVisible();
    });

    test(`login_mandatory`, {tag: "@smoke"}, async ({form, defaultUser}) => {
        await mandatoryTestFunction({formType: "login", password:defaultUser.password, form});
    });

    test(`password_mandatory`, {tag: "@smoke"}, async ({form, defaultUser}) => {
        await mandatoryTestFunction({formType: "login", login:defaultUser.name, form});
    });

});

test.describe.parallel(`register`, () => {
    test.beforeEach(async ({page, form}) => {
        await page.goto(form.getFormUrl());
        await form.switchFormType();
    });

    test(`success`, {tag: "@smoke"}, async( {form, defaultUser}) => {
        await form.fillCredentials("register", defaultUser.name, defaultUser.password);
        await form.submitRegister();

        expect(await form.getUserFromStorage(defaultUser.name), "User exist in storage").not.toBeNull();
    });

    test(`error_same_data`, {tag: "@smoke"}, async ({form, defaultUser}) => {
        await form.setUserInStorage(defaultUser.name, defaultUser.password);

        await form.fillCredentials("register", defaultUser.name, defaultUser.password);
        await form.submitRegister();

        await expect(form.errorMessageRegister, "User already exist").toBeVisible();
    })

    test(`login_mandatory`, {tag: "@smoke"}, async ({form, defaultUser}) => {
        await mandatoryTestFunction({formType: "register", password:defaultUser.password, form});
    });

    test(`password_mandatory`, {tag: "@smoke"}, async ({form, defaultUser}) => {
        await mandatoryTestFunction({formType: "register", login:defaultUser.name, form});
    });
});