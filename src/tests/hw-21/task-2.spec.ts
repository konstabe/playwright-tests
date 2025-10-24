import test, { Page } from "@playwright/test"

// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

async function getTableRow(page:Page, email: string) {
    const root = page.locator("#table2");

    const cell = root.getByText(email);
    const row = cell.locator("xpath=ancestor::tr[1]");

    const [lastName, firstName, emailCell, dues, webSite] = await Promise.all([
        row.locator(".last-name").textContent(),
        row.locator(".first-name").textContent(),
        row.locator(".email").textContent(),
        row.locator(".dues").textContent(),
        row.locator(".web-site").textContent(),
    ]);

    return {
        lastName: lastName?.trim() ?? "",
        firstName: firstName?.trim() ?? "",
        email: emailCell?.trim() ?? "",
        dues: dues?.trim() ?? "",
        webSite: webSite?.trim() ?? "",
    };
}

test("emailChecker", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/tables")
    await page.locator(".email").first().waitFor({state:"visible"});

    const emails = await Promise.all(
        (await page.locator(".email").all()).map(locator => locator.textContent())
    )

    for (const email of emails.filter(mail=> mail !== null)) {
        const rowData = await getTableRow(page, email);
        console.log(rowData);
    }
});