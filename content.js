class Background {
	static async init() {
		if (await this.checkIfFirstStart()) {
			await this.setup();
		}

		this.listen();
	}

	static async listen() {
		console.log("LISTENING")
		
		const preferences = await this.getSavedPreferences();
		const hider = new TwitterHider(preferences);

		hider.init();
	}

	static checkIfFirstStart(callback) {
		console.log("CHECKING IF FIRST START");
		return new Promise(resolve => {
			chrome.storage.local.get('setup', data => {
				resolve(!data.setup);
			});
		});
	}

	static setup() {
		console.log("SETUP");

		const defaults = {
			hideLikes: true,
			hideRetweets: true,
			hideReplies: true,
			setup: true
		};

		return new Promise(resolve => {
			chrome.storage.local.set(defaults, () => resolve());
		});
	}

	static getSavedPreferences() {
		return new Promise(resolve => {
			chrome.storage.local.get(['hideLikes', 'hideReplies', 'hideRetweets'], data => {
				resolve(data);
			});
		})
	}
}



Background.init();