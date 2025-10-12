import {test as base} from "@playwright/test";
import { Form } from "./Form";
import { User } from "./types";

export const test = base.extend<{form: Form, defaultUser: User;}>(
    {
        form: async ({ page }, use) => {
            const form = new Form(page);
            await use(form);
        },
        defaultUser: async ({ form }, use) => {
            const user = form.getUser();
            await use(user);
          },
    }
);