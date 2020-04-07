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
		if (
			!this.preferences.hideLikes 
			&& this.preferences.hideRetweets 
			&& this.preferences.hideReplies
		) {
			return;
		}
		
		setInterval(() => this.run(), 500);
	}

	run() {
		if (this.preferences.hideLikes)		this.hideLikeCounts();
		if (this.preferences.hideRetweets) 	this.hideRetweetCounts();
		if (this.preferences.hideReplies)	this.hideReplyCounts();
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