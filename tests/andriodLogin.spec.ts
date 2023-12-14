import { test, expect, type Page, request } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';
const { _android: android } = require('playwright');
const { describe } = test;
import { MainPage } from './pages/mainPage';
import { helpers } from './testingFixtures';
dotenvConfig();
const { env } = process;

describe('Home page', () => {

test('Android test', async ({
	page
}) => {
	const [device] = await android.devices();
	console.log(`Model: ${device.model()}`);
	console.log(`Serial: ${device.serial()}`);
	  {
		await device.shell('am force-stop com.android.chrome');
		const context = await device.launchBrowser();
	
		// Use BrowserContext as usual.
		const page = await context.newPage();
		const mainPage = new MainPage(page);
		await helpers.openUrl({page}, 'www')
		await mainPage.clickMobileHamburgerMenuButton();
		await mainPage.clickLoginMenu();
		await mainPage.enterUserName(process.env.USERNAME);
		await mainPage.enterPassword(process.env.PASSWORD);
		await mainPage.clickLoginButton()
		await page.waitForLoadState('domcontentloaded')
		await mainPage.clickMobileHamburgerMenuButton();
		expect(await page.getByRole('link', { name: 'Account Settings' }).isVisible()).toEqual(true)
		await context.close();
	  }
	
	  // Close the device.
	  await device.close();

});
});