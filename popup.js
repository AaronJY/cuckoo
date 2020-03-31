class Popup {
	static async init() {
		this.bind();

		const preferences = await this.getPreferences();
		this.hideLikesCheckbox.checked = preferences.hideLikes;
		this.hideRepliesCheckbox.checked = preferences.hideReplies;
		this.hideRetweetsCheckbox.checked = preferences.hideRetweets;
	}

	static bind() {
		this.hideLikesCheckbox = document.getElementById("hideLikes");
		this.hideRepliesCheckbox = document.getElementById("hideReplies");
		this.hideRetweetsCheckbox = document.getElementById("hideRetweets");
		this.saveButton = document.getElementById("saveButton");
		this.saveChangesMessage = document.getElementById("savedChanges");

		saveButton.addEventListener("click", async () => {
			await this.saveChanges();
			this.saveChangesMessage.style.display = "block";
		});
	}

	static saveChanges() {
		return new Promise(resolve => {
			chrome.storage.local.set({
				hideLikes: this.hideLikesCheckbox.checked,
				hideRetweets: this.hideRetweetsCheckbox.checked,
				hideReplies: this.hideRepliesCheckbox.checked
			}, () => resolve());
		});
	}

	static getPreferences() {
		return new Promise(resolve => {
			chrome.storage.local.get([
				'hideLikes', 
				'hideRetweets', 
				'hideReplies'
			], data => {
				resolve(data);
			});
		});
	}
	
}

window.onload = () => {
	Popup.init();
};