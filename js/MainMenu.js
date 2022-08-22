"use strict";
var Mainmenu = new Vue({
	el: "#MainMenu",
	data: {
		visible: false,
		chatvisible: false,
		show: "",
		talks: [
			"炼金失败的话，材料也会损耗掉。虽然很可惜，但还是很好奇不同材料搭配的效果呢！",
			"去不同的地方就能收集到全新的材料了吧！",
			"啊啊，这个月的房租————",
			"什么时候才能赚够学费呢……",
		],
	},
	methods: {
		clickImage: function () {
			let index = Math.floor(Math.random() * this.talks.length);
			this.show = this.talks[index];
		},
	},
});
