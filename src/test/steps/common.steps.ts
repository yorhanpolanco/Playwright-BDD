import { createBdd } from 'playwright-bdd';
import { test } from '../../config/fixtures/index';

const { Given } = createBdd(test);

Given('Cargar datos del archivo {string} para el caso {string}', async ({ worldData }, jsonFile: string, caso: string) => {
    await worldData.cargarDataFeature(jsonFile, caso);
});
