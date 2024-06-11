/*
  @description       : Controller JS file for Recaptcha LWC component.
  @author            : Christian Niro
  @group             : Christian Niro
  @last modified on  : 06-11-2024
  @last modified by  : 
*/

import { LightningElement, api, track } from "lwc";

export default class HawPortalRecaptcha extends LightningElement {
	@track navigateTo = "/apex/portalSmartyAddress";
	@track _url = "";
	@track _height = "";
	@track data;

	@api
	get height() {
		return this._height;
	}

	set height(value) {
		this._height = value;
	}

	@api
	get url() {
		return this._url;
	}

	set url(value) {
		this._url = value;
	}

	@api
	getAddress() {
		return window.address;
	}

	@api
	getValue() {
		return window.data;
	}

	listenMessage(msg) {
		window.data = msg.data;
		this.data = msg.data;
		if (this.data !== "Unlock") {
			window.address = msg.data;
		}
	}
	connectedCallback() {
		if (window.addEventListener) {
			window.addEventListener("message", this.listenMessage, false);
		} else {
			window.attachEvent("onmessage", this.listenMessage);
		}
	}
}
