class TwitterHider {
	processedAttribute = 'data-twitterhider-processed';
	notProcessedSelector = `:not([${this.processedAttribute}])`;

	selectors = {
		countText: `span.css-901oao.css-16my406.r-1qd0xha.r-ad9z0x.r-bcqeeo.r-qvutc0${this.notProcessedSelector}`,
		replyContainer: `div[data-testid="reply"]${this.notProcessedSelector}`,
		retweetContainer: `div[data-testid="retweet"]${this.notProcessedSelector},div[data-testid="unretweet"]${this.notProcessedSelector}`,
		likeContainer: `div[data-testid="like"]${this.notProcessedSelector},div[data-testid="unlike"]${this.notProcessedSelector}`
	};

	preferences = {};
	
	constructor(preferences) {
		this.preferences = preferences;
	}

	init() {
		const hideLikes = this.getPreference("hideLikes");
		const hideRetweets = this.getPreference("hideRetweets");
		const hideReplies = this.getPreference("hideReplies");

		const run = () => {
			if (hideLikes)
				this.hideLikeCounts();
			if (hideRetweets)
				this.hideRetweetCounts();
			if (hideReplies)
				this.hideReplyCounts();
		};

		if (hideLikes || hideRetweets ||  hideReplies)
			setInterval(() => run(), 500);
	}

	hideLikeCounts() {
		const elements = [
			...document.querySelectorAll(this.selectors.likeContainer),
			...this.findMainTweetCountByLabelText("Likes")
		];

		this.omitElements(elements);
	}

	hideRetweetCounts() {
		const elements = [
			...document.querySelectorAll(this.selectors.retweetContainer),
			...this.findMainTweetCountByLabelText("Retweets")
		];

		this.omitElements(elements);
	}

	hideReplyCounts() {
		const elements = document.querySelectorAll(this.selectors.replyContainer);
		this.omitElements(elements);
	}

	omitElements(elements) {
		elements.forEach((element) => {
			this.markElementAsProcessed(element);

			const textElement = element.querySelector(this.selectors.countText);

			if (textElement !== null)
				this.omitElement(textElement);
		});
	}

	omitElement(element) {
		element.innerHTML = "???";
	}

	markElementAsProcessed(element) {
		element.setAttribute(this.processedAttribute, true);
	}

	getPreference(preference) {
		if (this.preferences[preference] === undefined)
			throw `preference ${preference} wasn't given in the constructor.`;
		return this.preferences[preference];
	}

	findMainTweetCountByLabelText(labelText) {
		return [...document.querySelectorAll(this.selectors.countText)]
			.filter(element => element.innerHTML === labelText)
			.map(element => {
				const wrappingDiv = element.parentElement.parentElement.parentElement;
				const countContainer = wrappingDiv.children[0];
				
				return countContainer;
			});
	}
}