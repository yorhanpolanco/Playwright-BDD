import { createBdd } from 'playwright-bdd';
import { test } from '../../../config/fixtures/index';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('Usuario accede a la pagina', async ({ page }) => {
    // Implementar navegacion
});

When('El usuario despliega las opciones de herramientas para acceder a tracking', async ({ page }) => {
    // Implementar lógica de despliegue de herramientas
});

Then('El usuario deberia ver los casos', async ({ page }) => {
    // Implementar aserción de que se ven los casos
});
