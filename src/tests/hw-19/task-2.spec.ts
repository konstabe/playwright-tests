
import { test, expect } from '@playwright/test';

test('task_2', async ({ page }) => {
  await page.goto('https://anatoly-karpovich.github.io/demo-registration-form/');
  await page.getByRole('textbox', { name: 'First Name' }).fill('Konstsantin');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Green');

  await page.locator('#address').fill('Moscow');

  await page.locator('#email').fill('test@mail.com');
  await page.locator('#phone').fill('88005553535');

  await page.locator('#country').selectOption('Canada');

  await page.getByRole('radio').first().check();

  await page.getByRole('checkbox').nth(1).check();
  await page.getByRole('checkbox').nth(2).check();


  await page.locator('#language').fill('Russian');

  await page.locator('#skills').selectOption('JavaScript');

  await page.locator('#year').selectOption('1970');

  await page.locator('#month').selectOption('January');

  await page.locator('#day').selectOption('1');

  await page.locator('#password').fill('Strong_password_1');
  await page.locator('#password-confirm').fill('Strong_password_1');

  await page.getByRole('button', { name: 'Submit' }).click();

  const formData = await page.evaluate(()=>{
    return localStorage.getItem("formData");
  });
  expect(formData).not.toBeNull();
});