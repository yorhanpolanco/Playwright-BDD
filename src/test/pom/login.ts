import { Page, Locator, Browser, BrowserContext, expect } from '@playwright/test';

export class LoginPage {
    readonly browser: Browser;
    private context: BrowserContext;
    private page: Page;
    private autentificacion: Locator;
    private header: Locator;
    private mensaje: Locator;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    async insertarCredenciales(usuario: string, contrasena: string): Promise<void> {
        this.context = await this.browser.newContext({
            httpCredentials: {
                username: usuario,
                password: contrasena,
            },
        });
        this.page = await this.context.newPage();
    }

    async navegar(url: string ): Promise<void> {
        await this.page.goto(url);
        await this.cargarElementos();
    }

    private async cargarElementos(): Promise<void> {
        this.autentificacion = this.page.getByRole('link', { name: 'Basic Auth' });
        this.header = this.page.getByRole('heading', { name: 'Basic Auth' });
        this.mensaje = this.page.locator('.example > p');
    }

    async accederAutentificar(): Promise<void> {
        await this.autentificacion.click();
        await this.page.waitForLoadState('load');
    }

    async obtenerHeader(): Promise<string | null> {
        return await this.header.textContent();
    }

    async obtenerMensaje(): Promise<string | null> {
        return await this.mensaje.textContent();
    }

    async obtenerURL(): Promise<string> {
        return this.page.url();
    }

    async cerrarPagina(): Promise<void> {
        if (this.page) await this.page.close();
        if (this.context) await this.context.close();
    }
}
