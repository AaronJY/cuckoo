import { Preferences } from "./interfaces/preferences";

export class TwitterHider {
	private preferences: Preferences;
	
	constructor(preferences: Preferences) {
		this.preferences = preferences;
	}

	public init() {
		this.setLikesVisibility(this.preferences.hideLikes);
		this.setRetweetsVisibility(this.preferences.hideRetweets);
		this.setRepliesVisibility(this.preferences.hideReplies);
	}

	private setLikesVisibility(visiblity: boolean) {
		this.setAttributeOrRemoveIfNull(document.body, "data-hidelikes", this.trueStringOrNull(visiblity));
	}

	private setRetweetsVisibility(visiblity: boolean) {
		this.setAttributeOrRemoveIfNull(document.body, "data-hideretweets", this.trueStringOrNull(visiblity));
	}

	private setRepliesVisibility(visiblity: boolean) {
		this.setAttributeOrRemoveIfNull(document.body, "data-hidereplies", this.trueStringOrNull(visiblity));
	}

	private setAttributeOrRemoveIfNull(element: HTMLElement, attributeName: string, value: string) {
		if (!value) {
			element.removeAttribute(attributeName);
			return;
		}

		element.setAttribute(attributeName, value);
	}

	private trueStringOrNull(value: boolean) {
		return value ? "true" : null;
	}

	// hideRetweetCounts() {
	// 	const elements = [
	// 		...document.querySelectorAll(this.selectors.retweetContainer),
	// 		...this.findMainTweetCountByLabelText("Retweets")
	// 	];

	// 	this.omitElements(elements);
	// }

	// hideReplyCounts() {
	// 	const elements = document.querySelectorAll(this.selectors.replyContainer);
	// 	this.omitElements(elements);
	// }

	// omitElements(elements) {
	// 	elements.forEach((element) => {
	// 		this.markElementAsProcessed(element);

	// 		const textElement = element.querySelector(this.selectors.countText);

	// 		if (textElement !== null)
	// 			this.omitElement(textElement);
	// 	});
	// }

	// omitElement(element) {
	// 	element.innerHTML = "???";
	// }

	// markElementAsProcessed(element) {
	// 	element.setAttribute(this.processedAttribute, true);
	// }

	// findMainTweetCountByLabelText(labelText) {
	// 	return [...document.querySelectorAll(this.selectors.countText)]
	// 		.filter(element => element.innerHTML === labelText)
	// 		.map(element => {
	// 			const wrappingDiv = element.parentElement.parentElement.parentElement;
	// 			const countContainer = wrappingDiv.children[0];
				
	// 			return countContainer;
	// 		});
	// }
}