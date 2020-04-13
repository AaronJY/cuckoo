import { Preferences } from './interfaces/preferences';

export class PreferencesRepository {
	static readonly DefaultPreferences: Preferences = {
		hideLikes: true,
		hideRetweets: true,
		hideReplies: true,
		hideFollowers: true
	};

	static get(): Promise<Preferences> {
		const propertyNames: string[] = Object.keys(this.DefaultPreferences);
		return new Promise(resolve => {
			globalThis.chrome.storage.local.get(propertyNames, (data: Preferences) => resolve(data))
		});
	}

	static set(preferences: Preferences): Promise<void> {
		return new Promise(resolve => {
			globalThis.chrome.storage.local.set(preferences, () => resolve());
		});
	}
}