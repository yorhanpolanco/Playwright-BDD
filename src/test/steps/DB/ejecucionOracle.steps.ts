import { createBdd } from 'playwright-bdd';
import { test } from '../../../config/fixtures/index';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('Ejecutar {string} Oracle en {string} usuario {string}', async ({ databaseService, worldData }, consulta: string, nombreBD: string, usuario: string) => {
  const result = await databaseService.executeOracleQuery(nombreBD, usuario, consulta, worldData.dataJson);
  worldData.dataquery = await result;
});

Then('Mostrar resultado del query por consola', async ({ worldData }) => {
  let consulta = await worldData.obtenerDataQuery();
  if (Array.isArray(consulta)) {
    expect(consulta).toBeInstanceOf(Object);
    expect(Object.keys(consulta).length).toBeGreaterThan(0);
  }
  console.log("Valor impreso desde desde ejemplo de reutilizacion " + JSON.stringify(consulta));
});
