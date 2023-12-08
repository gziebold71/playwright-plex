import { test, expect, type Page, request } from '@playwright/test';

import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

import { MainPage } from './pages/mainPage';
import { helpers } from './testingFixtures';

const { describe } = test;
const { env } = process;

describe('Login page', () => {

	test('Verify a Plex user can successfully login into their account using valid user name and password', async ({
		page
	}) => {
		const mainPage = new MainPage(page)
		const newTabPromise = page.waitForEvent("popup");
		let indexOfAuth;
		await helpers.login({page}, process.env.USERNAME, process.env.PASSWORD)
		await mainPage.clickOpenPlexButton();
		const newTab = await newTabPromise;
		await newTab.waitForLoadState();
		await expect(newTab).toHaveURL(/.*app.plex.tv/, { timeout: 500 });
		const authToken = await helpers.getAuthToken({page})
		console.log(authToken)
	});
});

test.afterEach(async ({ page }, testInfo) => {
	if (testInfo.status !== testInfo.expectedStatus) {
	  const screenshotPath = testInfo.outputPath(`failure.png`);
	  testInfo.attachments.push({ name: 'screenshot', path: screenshotPath, contentType: 'image/png' });
	  await page.screenshot({ path: screenshotPath, timeout: 5000 });
	}
  });
