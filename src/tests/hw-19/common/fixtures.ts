import {test as base} from "@playwright/test";
import { AuthProcessForm } from "./Form";
import { User } from "./types";
import { getUser } from "./users";

export const test = base.extend<{form: AuthProcessForm, defaultUser: User;}>(
    {
        form: async ({ page }, use) => {
            const form = new AuthProcessForm(page);
            await use(form);
        },
        defaultUser: async ({ }, use) => {
            const user = getUser();
            await use(user);
          },
    }
);