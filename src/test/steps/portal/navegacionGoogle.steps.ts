import { createBdd } from 'playwright-bdd';
import { test } from '../../../config/fixtures/index';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('Usuario accede a la pagina de google', async ({ page }) => {
  await page.goto('https://www.google.com/', { waitUntil: 'load' });
});

When('El usuario escribe lo que desea buscar en google', async ({ page }) => {
  await page.getByLabel('Buscar', { exact: true }).click();
  await page.getByLabel('Buscar', { exact: true }).fill('casa');
});

Then('El sistema muestra el valor insertado', async ({ page }) => {
  await expect(await page.getByLabel('Buscar', { exact: true })).toHaveValue('casa');
});
