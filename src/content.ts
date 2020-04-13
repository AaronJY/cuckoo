import { TwitterHider } from './hider';
import { Preferences } from './interfaces/preferences';
import { PreferencesRepository } from './preferences-repository';

class Background {
	static async init(): Promise<void> {
		if (await this.checkIfFirstStart()) {
			await this.setup();
		}

		const preferences: Preferences = await PreferencesRepository.get();
		const hider = new TwitterHider(preferences);
		hider.init();
	}

	private static async setup(): Promise<void> {
		await PreferencesRepository.set(PreferencesRepository.DefaultPreferences);
	}

	private static async checkIfFirstStart(): Promise<boolean> {
		return !(await PreferencesRepository.get());
	}
}

Background.init();