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
}