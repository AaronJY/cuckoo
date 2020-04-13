import { PreferencesRepository } from './preferences-repository';
import { Preferences } from './interfaces/preferences';

class Popup {
	private static hideLikesCheckbox: HTMLInputElement;
	private static hideRepliesCheckbox: HTMLInputElement;
	private static hideRetweetsCheckbox: HTMLInputElement;
	private static hideFollowersCheckbox: HTMLInputElement;
	private static saveButton: HTMLButtonElement;
	private static saveChangesMessage: HTMLElement;

	static async init(): Promise<void> {
		const preferences: Preferences = await PreferencesRepository.get();

		this.bind();

		this.hideLikesCheckbox.checked = preferences.hideLikes;
		this.hideRepliesCheckbox.checked = preferences.hideReplies;
		this.hideRetweetsCheckbox.checked = preferences.hideRetweets;
		this.hideFollowersCheckbox.checked = preferences.hideFollowers;
	}

	static bind(): void {
		this.hideLikesCheckbox = document.getElementById('hideLikes') as HTMLInputElement;
		this.hideRepliesCheckbox = document.getElementById('hideReplies') as HTMLInputElement;
		this.hideRetweetsCheckbox = document.getElementById('hideRetweets') as HTMLInputElement;
		this.hideFollowersCheckbox = document.getElementById('hideFollowers') as HTMLInputElement;

		this.saveChangesMessage = document.getElementById('savedChanges');

		this.saveButton = document.getElementById('saveButton') as HTMLButtonElement;
		this.saveButton.addEventListener('click', async () => {
			await this.saveChanges();
			this.saveChangesMessage.style.display = 'block';
		});
	}

	static async saveChanges(): Promise<void> {
		return new Promise(resolve => {
			const updatedPreferences: Preferences = {
				hideLikes: this.hideLikesCheckbox.checked,
				hideRetweets: this.hideRetweetsCheckbox.checked,
				hideReplies: this.hideRepliesCheckbox.checked,
				hideFollowers: this.hideFollowersCheckbox.checked
			};

			PreferencesRepository.set(updatedPreferences);

			resolve();
		});
	}
}

window.onload = (): void => {
	Popup.init();
};