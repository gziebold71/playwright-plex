import { expect, type Page, request } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';


dotenvConfig();

import { test, helpers } from './testingFixtures';
import { AccountPage } from './pages/accountPage';
import { todo } from 'node:test';
import exp from 'node:constants';
const { describe } = test;
const { env } = process;

describe('Home page', () => {

	test('Verify on the account page that user is able to add and delete profile image', async ({
		page
	}) => {
		const accountPage = new AccountPage(page);
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
		await helpers.openUrl({page}, 'app', 'desktop/#!/settings/account')
		await accountPage.clickEditProfileImage();
        await accountPage.chooseProfilePhotoButton.setInputFiles('./jupiter.jpg');
		await accountPage.clickSaveChangesButton();
		expect (await accountPage.saveChangesButtonHidden()).toEqual(true);
		// look into haveing a more implicit wait instead of the explict on the new image being fully updated on screen
		await page.waitForTimeout(1000);
		expect (await page.screenshot()).toMatchSnapshot('profileImageAdded.png')

		await accountPage.clickEditProfileImage();
		await accountPage.clickDeleteProfilePhoto();
		await accountPage.clickConfirmDeleteButton();
		expect (await accountPage.dialogBogClosed()).toEqual(true);
		// look into haveing a more implicit wait instead of the explict on the new image being fully deleted
		await page.waitForTimeout(1000);
		expect (await page.screenshot()).toMatchSnapshot('profileImageDeleted.png')
	});

	test('Verify on the account page that user is able to update their user name', async ({
		page
	}) => {
		const accountPage = new AccountPage(page);
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
		const newUserName = Date.now().toString()
		await helpers.openUrl({page}, 'app', 'desktop/#!/settings/account');
		await accountPage.clickUpdateUserNameButton();
		await accountPage.enterUserName(newUserName);
		await accountPage.clickSaveChangesButton();
		expect (await accountPage.saveChangesButtonHidden()).toEqual(true);
		expect (await accountPage.getUserName()).toContain(newUserName);
	});
});
