import { TwitterHider } from "./hider";
import { Preferences } from "./interfaces/preferences";


class Background {
	static async init() {
		if (await this.checkIfFirstStart()) {
			await this.setup();
		}

		this.listen();
	}

	static async listen() {
		const preferences: Preferences = await this.getSavedPreferences();
		const hider = new TwitterHider(preferences);

		hider.init();
	}

	static setup() {
		const defaults = {
			hideLikes: true,
			hideRetweets: true,
			hideReplies: true,
			setup: true
		};

		return new Promise(resolve => {
			globalThis.chrome.storage.local.set(defaults, () => resolve());
		});
	}

	static checkIfFirstStart(): Promise<boolean> {
		return new Promise(resolve => {
			globalThis.chrome.storage.local.get('setup', data => {
				resolve(!data.setup);
			});
		});
	}

	static getSavedPreferences(): Promise<Preferences> {
		return new Promise(resolve => {
			globalThis.chrome.storage.local.get(['hideLikes', 'hideReplies', 'hideRetweets'], (data: Preferences) => {
				resolve(data);
			});
		})
	}
}



Background.init();