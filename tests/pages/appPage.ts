import { type Locator, type Page } from '@playwright/test';

export class AppPage {
	readonly page: Page;
	readonly whatsOnNowChannel: Locator;
    readonly firstWhatsOnNow: Locator;


	constructor(page: Page) {
		this.page = page;
        // not a pretty way to locate this, but....
		this.whatsOnNowChannel = page.getByTestId('hubTitle').filter({hasText:"What's On Now"}).locator('..').locator('..').locator('..').locator('..')
        this.firstWhatsOnNow = this.whatsOnNowChannel.getByTestId('cellItem')
    }

    async getWhatsOnNow(index) {
        return await this.firstWhatsOnNow.nth(index).textContent()
    }

}