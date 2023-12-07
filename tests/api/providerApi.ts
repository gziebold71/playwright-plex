import { APIRequestContext } from '@playwright/test';

const baseUrl = 'https://epg.provider.' + process.env.DOMAIN;

export class ProviderApi {
	private apiContext: APIRequestContext;
	constructor(apiContext: APIRequestContext) {
		this.apiContext = apiContext;
	}

	async getWhatsOnNow(token, directoryId) {
		const whatsOnNowResponse = await this.apiContext.get(
			baseUrl + '/hubs/sections/home/whatsOnNow',
			{
                params: {
                    contentDirectoryID: directoryId,
                    includeMeta: 1,
                    'X-Plex-Token': token
                },
  				headers: {
					'Accept': 'application/json',
				}
			}
		);
		return whatsOnNowResponse;
	}
}