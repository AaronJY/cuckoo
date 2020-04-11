import { Preferences } from './interfaces/preferences';

export class TwitterHider {
	private preferences: Preferences;

	private readonly hideLikesToggleAttr = 'data-hidelikes';
	private readonly hideRetweetsToggleAttr = 'data-hideretweets';
	private readonly HideRepliesToggleAttr = 'data-hidereplies';

	constructor(preferences: Preferences) {
		this.preferences = preferences;
	}

	public init(): void {
		this.setLikesVisibility(this.preferences.hideLikes);
		this.setRetweetsVisibility(this.preferences.hideRetweets);
		this.setRepliesVisibility(this.preferences.hideReplies);
	}

	private setLikesVisibility(visiblity: boolean): void {
		this.setAttributeOrRemoveIfNull(document.body, this.hideLikesToggleAttr, this.trueStringOrNull(visiblity));
	}

	private setRetweetsVisibility(visiblity: boolean): void {
		this.setAttributeOrRemoveIfNull(document.body, this.hideRetweetsToggleAttr, this.trueStringOrNull(visiblity));
	}

	private setRepliesVisibility(visiblity: boolean): void {
		this.setAttributeOrRemoveIfNull(document.body, this.HideRepliesToggleAttr, this.trueStringOrNull(visiblity));
	}

	private setAttributeOrRemoveIfNull(element: HTMLElement, attributeName: string, value: string): void {
		if (!value) {
			element.removeAttribute(attributeName);
			return;
		}

		element.setAttribute(attributeName, value);
	}

	private trueStringOrNull(value: boolean): string {
		return value ? 'true' : null;
	}
}