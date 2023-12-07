import { expect, type Page, request } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';


dotenvConfig();

import { test, helpers } from './testingFixtures';
import { AppPage } from './pages/appPage';
import { ProviderApi } from './api/providerApi';

const { describe } = test;
const { env } = process;

function getTitle(titleMetadata) {
    // since I don't have access to the api docs here I'm just guessing that if the first item is a TV show it 
    // has a `grandparentTitle` and if it is a movie it just has a `title`.  There maybe others, but for the 
    // purpose of this exercise I'm just going with the assumption these are the only 2 options
    let tileTitle
    try {
        if (typeof titleMetadata.grandparentTitle !== 'undefined'){
            tileTitle = titleMetadata.grandparentTitle
        }
        else if (typeof titleMetadata.title !== 'undefined'){
            tileTitle = titleMetadata.title
        }
    }
    catch (e: any){
        console.log(e)
    }
    return tileTitle
}

describe('Home page', () => {

	test('Verify on the home page that the Whats on Now section shows the correct content', async ({
		page
	}) => {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const providerApi = await new ProviderApi(apiContext)
        const appPage = await new AppPage(page);
		const authToken = await helpers.getAuthToken({page})
        const whatsOnNowResponse = await providerApi.getWhatsOnNow(authToken, 'home')
        const whatsOnNowResponseJson = await whatsOnNowResponse.json()
        let whatsOnNow1FromApi = getTitle(whatsOnNowResponseJson.MediaContainer.Directory[0].Metadata);
        let whatsOnNow2FromApi = getTitle(whatsOnNowResponseJson.MediaContainer.Directory[1].Metadata)
        const firstWhatsOnNowFromUi = await appPage.getWhatsOnNow(0)
        expect(firstWhatsOnNowFromUi).toContain(whatsOnNow1FromApi)
        const secondWhatsOnNowFromUi = await appPage.getWhatsOnNow(1)
        expect(secondWhatsOnNowFromUi).toContain(whatsOnNow2FromApi)
	});
});
