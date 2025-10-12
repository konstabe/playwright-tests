import { expect, Locator } from "@playwright/test";
import { Form } from "./Form";
import { FormType } from "./types";

export const mandatoryTestFunction = async (settings: {formType: FormType, form: Form, login?: string, password?: string}) => {
    const {form, formType, login = "", password = ""} = settings;

    await form.fillCredentials(formType, login, password);

    let errorMessageLocator: Locator;
    formType === "login"
        ?   (
                await form.submitLogin(),
                errorMessageLocator = form.errorMessageLogin
            )
        :   (
                await form.submitRegister(),
                errorMessageLocator = form.errorMessageRegister
            )

    await expect(errorMessageLocator, "Mandatory error").toBeVisible();
}