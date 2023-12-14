import { type Locator, type Page } from '@playwright/test';

export class MainPage {
	readonly page: Page;
	readonly loginMenu: Locator;
	readonly userName: Locator;
	readonly password: Locator;
	readonly loginButton: Locator;
	readonly openPlexButton: Locator;
	readonly mobileHamburgerMenuButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.loginMenu = page.getByRole('link', { name: 'Sign In' })
		this.userName = page.frameLocator('iframe[name="fedauth-iFrame"]').locator('#email');
		this.password = page.frameLocator('iframe[name="fedauth-iFrame"]').locator('#password');
		this.loginButton = page.frameLocator('iframe[name="fedauth-iFrame"]').getByRole('button', {name: 'Sign In'})
		this.openPlexButton = page.getByRole('link', { name: 'Open Plex' })
		this.mobileHamburgerMenuButton = page.locator('.nav-toggle-mobile')
	}

    async clickLoginMenu() {
        await this.loginMenu.click()
    }

	async enterUserName(userName) {
		await this.userName.click();
		await this.userName.fill(userName);
	}

    async enterPassword(password) {
		await this.password.click();
		await this.password.fill(password);
	}

    async clickLoginButton() {
        await this.loginButton.click()
    }

	async clickOpenPlexButton(){
		await this.openPlexButton.click()
	}

	async clickMobileHamburgerMenuButton(){
		await this.mobileHamburgerMenuButton.click()
	}
}