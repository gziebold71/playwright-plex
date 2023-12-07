import { type Page, expect, test as baseTest, request } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { MainPage } from './pages/mainPage';

dotenvConfig();

async function openUrl({ page }: { page: Page }, subdomain, additionalValues = '') {
    await page.goto(`https://${subdomain}.${process.env.DOMAIN}/${additionalValues}`, {
		waitUntil: 'networkidle'
	});
}

async function login({ page }: { page: Page}, userName, password) {
    const mainPage = new MainPage(page);
    await this.openUrl({page}, 'www')
    await mainPage.clickLoginMenu();
    await mainPage.enterUserName(userName);
    await mainPage.enterPassword(password);
    await mainPage.clickLoginButton()
    await page.waitForLoadState('domcontentloaded')
	};

 async function getAuthToken({ page }: { page: Page}){
    await this.openUrl({page}, 'app')
    const storageState = await page.context().storageState();
    let indexOfAuth;
    for (let x = 0; x < storageState.origins[0].localStorage.length; x ++){
        if (storageState.origins[0].localStorage[x].name == 'plex_tv_auth'){
            indexOfAuth = x;
            break;		
        }
    }
    const authToken =  JSON.parse(storageState.origins[0].localStorage[indexOfAuth].value).authToken;
    return authToken
 }   

    export const helpers = {
        login,
        openUrl,
        getAuthToken
    };    


    export * from '@playwright/test';
    export const test = baseTest.extend<{}, { workerStorageState: string }>({
      storageState: ({ workerStorageState }, use) => use(workerStorageState),
    
      workerStorageState: [async ({ browser }, use) => {
        const id = test.info().parallelIndex;
        const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);
    
        if (fs.existsSync(fileName)) {
          await use(fileName);
          return;
        }
    
        const page = await browser.newPage({ storageState: undefined });
 
        await helpers.login({page}, process.env.USERNAME, process.env.PASSWORD)
        // once the Open Plex button appears we can assume we are fully logged in and proceed
        await page.getByRole('link', { name: 'Open Plex' }).click();
        await page.context().storageState({ path: fileName });
        await page.close();
        await use(fileName);
      }, { scope: 'worker' }],
    });