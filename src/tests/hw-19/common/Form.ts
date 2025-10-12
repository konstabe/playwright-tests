import { Locator, Page } from "@playwright/test";
import { FormType, User } from "./types";

export class Form {
    private readonly page: Page;

    private readonly loginForm: Locator;
    private readonly registerForm: Locator;

    private readonly formUrl: string;

    constructor(page: Page) {
        this.page = page;

        this.loginForm = page.locator("[class='loginForm']");
        this.registerForm = page.locator("[class='registerForm']");

        this.formUrl = "https://anatoly-karpovich.github.io/demo-login-form/"
    }

    get successMessage () {
        return this.page.locator("#successMessage");
    }

    get errorMessageLogin () {
        return this.page.locator("#errorMessage");
    }

    get errorMessageRegister () {
        return this.page.locator("#errorMessageOnRegister");
    }

    getFormUrl() {
        return this.formUrl;
    }

    getUser() {
        const user: User = {name: "Pavel", password: "Pavel2005"};
        return user;
    }

    async setUserInStorage(login: string, password: string) {
        await this.page.evaluate((({login, password}) => {
            localStorage.setItem(login, `{"name":"${login}","password":"${password}"}`);
        }), {login, password});
    }

    async getUserFromStorage(login: string) {
        const user = await this.page.evaluate(((login)=> {
            return localStorage.getItem(login);
        }),login);

        return user;
    }

    getFormByType (formType: FormType) {
        const formMap = {
            "login": {
                form: this.loginForm,
                inputs: {
                    loginId: "userName",
                    passwordId: "password"
                }
            }, 
            "register": {
                form: this.registerForm,
                inputs: {
                    loginId: "userNameOnRegister",
                    passwordId: "passwordOnRegister"
                }
            } 
        };

        return formMap[formType];
    }

    async fillCredentials (formType: FormType, login: string, password: string) {
        const {form, inputs} =  this.getFormByType(formType);

        await form.locator(`#${inputs.loginId}`).fill(login);
        await form.locator(`#${inputs.passwordId}`).fill(password);
    }

    async submitLogin () {
        await this.loginForm.locator("#submit").click();
    }

    async submitRegister () {
        await this.registerForm.locator("#register").click();
    }

    async formIsHidden (formType: FormType) {
        const {form} = this.getFormByType(formType);
        const isHidden = form.isHidden();

        return isHidden;
    }

    async switchFormType() {
        const loginIsHidden = await this.formIsHidden("login");

        if (loginIsHidden) {
            await this.registerForm.locator("#backOnRegister").click();
        } else {
            await this.loginForm.locator("#registerOnLogin").click();
        }
    }

    static validateUsername(username: string): boolean {
        if (!username) return false;

        //лишние пробелы
        if (username.trim() !== username) return false;

        //длина
        if (username.length < 3 || username.length > 40) return false;

        //не должно состоять только из пробелов
        if (username.trim().length === 0) return false;

        return true;
    }


    static validatePassword(password: string): boolean {
        if (!password) return false;

        if (password.length < 8 || password.length > 20) return false;

        if (password.trim().length === 0) return false;

        //хотя бы одна заглавная буква
        const hasUpper = /[A-Z]/.test(password);
        //хотя бы одна строчная буква
        const hasLower = /[a-z]/.test(password);

        return hasUpper && hasLower;
    }

}