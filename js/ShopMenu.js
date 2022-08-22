"use strict";
var ShopMenu = new Vue({
	el: "#ShopMenu",
	data: {
		commodity1: NaN,
		commodity2: NaN,
		commodity3: NaN,
		value1: "",
		value2: "",
		value3: "",
		visible: false,
	},
	methods: {
		restocking: function () {
			let num = ItemData.Seeds.length;
			this.commodity1 = Math.round(Math.random() * num);
			this.commodity2 = Math.round(Math.random() * num);
			this.commodity3 = Math.round(Math.random() * num);
			this.value1 =
				ItemData.Seeds[this.commodity1].name +
				" 价格：" +
				ItemData.Seeds[this.commodity1].price;
			this.value2 =
				ItemData.Seeds[this.commodity2].name +
				" 价格：" +
				ItemData.Seeds[this.commodity2].price;
			this.value3 =
				ItemData.Seeds[this.commodity3].name +
				" 价格：" +
				ItemData.Seeds[this.commodity3].price;
		},
		clickShop1: function (event) {
			let el = event.currentTarget;
			if (
				StatusMenu.spendMoney(
					parseInt(
						ItemData.Seeds[this.commodity1].price * StatusMenu.MarketRate
					)
				)
			) {
				ItemData.Seeds[this.commodity1].addtoStorage(1);
				el.value = "售空";
				el.disabled = true;
			} else alert("金钱不足");
		},
		clickShop2: function (event) {
			let el = event.currentTarget;
			if (
				StatusMenu.spendMoney(
					parseInt(
						ItemData.Seeds[this.commodity2].price * StatusMenu.MarketRate
					)
				)
			) {
				ItemData.Seeds[this.commodity2].addtoStorage(1);
				el.value = "售空";
				el.disabled = true;
			} else alert("金钱不足");
		},
		clickShop3: function (event) {
			let el = event.currentTarget;
			if (
				StatusMenu.spendMoney(
					parseInt(
						ItemData.Seeds[this.commodity3].price * StatusMenu.MarketRate
					)
				)
			) {
				ItemData.Seeds[this.commodity3].addtoStorage(1);
				el.value = "售空";
				el.disabled = true;
			} else alert("金钱不足");
		},
	},
});
