import { expect } from "@playwright/test";
import { AuthProcessForm } from "./Form";
import { FormType } from "./types";


const submitFormAndReturnErrorLocator = async (form: AuthProcessForm, formType: FormType) => {
    if (formType === "login") {
        await form.submitLogin();
        return form.errorMessageLogin;
    } else {
        await form.submitRegister();
        return form.errorMessageRegister;
    }
}

export const mandatoryTestFunction = async (settings: {formType: FormType, form: AuthProcessForm}, credentials: {login?: string, password?: string}) => {
    const {form, formType} = settings;
    const {login = "", password = ""} = credentials;

    await form.fillCredentials(formType, login, password);

    const errorMessageLocator = await submitFormAndReturnErrorLocator(form, formType);

    await expect(errorMessageLocator, "Mandatory error").toBeVisible();
}