import { createBdd } from 'playwright-bdd';
import { test } from '../../../config/fixtures/index';
import { consultaRNCPOM } from '../../pom/consultaRNC';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

let consultaRNC: consultaRNCPOM;

Given('Usuario accede a la pagina de la DGII', async ({ page, browser }) => {
  consultaRNC = new consultaRNCPOM(page, browser);
  await consultaRNC.goto();
});

When('El usuario despliega las opciones de herramientas para acceder a consulta RNC', async () => {
  await consultaRNC.cerrarAlerta();
  await consultaRNC.deplegarMenuHerramientas();
  await consultaRNC.accederConsultas();
  await consultaRNC.accederConsultaRNC();
});

When('El usuario realiza una consulta utilizando el {string}', async ({ worldData }, string: string) => {
  if (worldData.dataquery && worldData.dataquery.length > 0) {
    const rnc = await worldData.obtenerDataQuery('RGE_RUC', 1);
    await consultaRNC.buscarPorRnc(rnc);
  } else {
    const rnc = await worldData.obtenerDataJson(string);
    await consultaRNC.buscarPorRnc(rnc);
  }
});

When('El usuario realiza una consulta utilizando el rnc obtenido del query', async () => {
  await consultaRNC.buscarPorRnc();
});

Then('El usuario deberia ver los {string} de la consulta', async ({ worldData }, string: string) => {
  await consultaRNC.scrollHastaTabla(await consultaRNC.etiquetasTabla, worldData.obtenerDataJson(string));
  await expect(await consultaRNC.etiquetasTabla).toHaveText(await worldData.obtenerDataJson(string));
});

Then('El usuario deberia ver los {string} del rnc consultado', async ({ worldData }, string: string) => {
  await consultaRNC.scrollHastaTabla(await consultaRNC.respuesta, worldData.obtenerDataJson(string));
  await expect(await consultaRNC.respuesta).toHaveText(await worldData.obtenerDataJson(string));
});

When('Hacer captura de pantalla', async ({ page }) => {
  await page.screenshot({ fullPage: true });
});
