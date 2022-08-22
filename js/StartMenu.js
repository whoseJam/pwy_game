"use strict";
var StartMenu = new Vue({
	el: "#StartMenu",
	data: {
		visible: true,
		storyvisible: false,
	},
	methods: {
		startGame: function () {
			this.storyvisible = true;
			this.visible = false;
		},
		clickstart: function () {
			this.storyvisible = false;
			StatusMenu.visible = true;
			Mainmenu.visible = true;
			ShopMenu.restocking();
		},
	},
});
