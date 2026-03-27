import { spawnSync } from 'child_process';
import Logs from './src/config/logConfig';
import * as dotenv from 'dotenv';
import * as path from 'path';
import dayjs from 'dayjs';
import fs from 'fs';

function parseArgs() {
    const args = process.argv.slice(2);
    const options: Record<string, string> = {
        // env default is omitted so playwright.config.ts falls back to its default if not passed
    };

    args.forEach(arg => {
        if (arg.includes('=')) {
            const [key, ...rest] = arg.split('=');
            options[key] = rest.join('=');
        }
    });

    return options;
}

async function run() {

    const opts = parseArgs();

    // Inyectar contexto para que playwright.config.ts y otros modulos (como reportes) lo lean
    if (opts.env) process.env.ENV = opts.env;
    if (opts.folder) process.env.FOLDER = opts.folder;
    if (opts.browser) process.env.BROWSER = opts.browser;

    if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
    }

    const fecha = dayjs().format('DD-MM-YYYY_HHmmss');
    const browserStr = opts.browser || 'default';
    const envStr = opts.env || 'dev';
    process.env.RUTA_LOGS = `logs/${browserStr}-${envStr}-logs-${fecha}.txt`;

    await Logs.crearArchivoLogs(process.env.RUTA_LOGS);
    await Logs.imprimirCabecera();

    console.log(`==> Ejecucion controlada por runner.ts`);
    if (opts.env) console.log(`    Entorno: ${opts.env}`);
    if (opts.browser) console.log(`    Navegador: ${opts.browser}`);
    if (opts.tags) console.log(`    Tags: ${opts.tags}`);
    if (opts.workers) console.log(`    Workers: ${opts.workers}`);

    const npxCommand = /^win/.test(process.platform) ? 'npx.cmd' : 'npx';

    // 1. Ejecutar compilacion BDD
    console.log('\n==> Generando archivos de prueba (BDD)...');
    const bddgenResult = spawnSync(npxCommand, ['bddgen'], { stdio: 'inherit', env: process.env, shell: true });
    if (bddgenResult.status !== 0) {
        console.error('Error al compilar BDD con bddgen. Abortando ejecucion.', bddgenResult.error);
        process.exit(1);
    }

    // 2. Ejecutar Playwright
    console.log('\n==> Iniciando ejecucion de Playwright...');
    const pwArgs = ['playwright', 'test'];

    // Playwright soporta filtrar pasando cualquier parte de la ruta o nombre del archivo
    if (opts.folder) pwArgs.push(opts.folder);
    if (opts.feature) pwArgs.push(opts.feature);

    if (opts.browser) pwArgs.push(`--project=${opts.browser}`);
    if (opts.tags) {
        // En spawn, los strings pasados a los args no necesitan comillas adyacentes del cmd, las removemos
        const cleanTags = opts.tags.replace(/^['"]|['"]$/g, '');
        pwArgs.push(`--grep=${cleanTags}`);
    }
    if (opts.workers) pwArgs.push(`--workers=${opts.workers}`);

    const pwResult = spawnSync(npxCommand, pwArgs, { stdio: 'inherit', env: process.env, shell: true });

    if (pwResult.status !== null) {
        process.exit(pwResult.status);
    }
}

run();
