import { createBdd } from 'playwright-bdd';
import { test } from '../../../config/fixtures/index';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

When('Ejecutar metodo {string} en {string}{string} con {string}, autorizacion {string} y data {string}', async ({ apiService, worldData }, metodo: string, url: string, endpoint: string, header: string, auth: string, data: string) => {
  const result = await apiService.ejecutarRequest(worldData.dataJson, metodo, url, endpoint, header, auth, data);
  worldData.dataApiResponse = await result;
});

When('Ejecutar metodo {string} en {string}{string} con {string}, autorizacion {string}', async ({ apiService, worldData }, metodo: string, url: string, endpoint: string, header: string, auth: string) => {
  const result = await apiService.ejecutarRequest(worldData.dataJson, metodo, url, endpoint, header, auth);
  worldData.dataApiResponse = await result;
});

When('Ejecutar metodo {string} en {string}{string} con {string}', async ({ apiService, worldData }, metodo: string, url: string, endpoint: string, header: string) => {
  const result = await apiService.ejecutarRequest(worldData.dataJson, metodo, url, endpoint, header);
  worldData.dataApiResponse = await result;
});

Then('Mostrar response del api que se ejecuto', async ({ worldData }) => {
  console.log(worldData.obtenerDataApiResponse());
  expect(worldData.obtenerDataApiResponse('status')).toEqual(200);
});
