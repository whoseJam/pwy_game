"use strict";
class map {
	constructor(id, name, price, ...drops) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.available = false;
		this.drops = [].concat(drops);
	}
	getItems() {
		let num = 10;
		if (StatusMenu.Effects[1] > 0) num = 8;
		if (StatusMenu.Effects[2] > 0) num = 5;
		if (StatusMenu.exertionEnergy(num)) {
			for (let i = 0; i < this.drops.length; i += 2) {
				if (StatusMenu.Effects[5] > 0) {
					ItemData.Materials[this.drops[i]].addtoStorage(
						Math.round(Math.random() * (this.drops[i + 1] + 3))
					);
				} else {
					ItemData.Materials[this.drops[i]].addtoStorage(
						Math.round(Math.random() * this.drops[i + 1])
					);
				}
			}
		} else alert("体力不足");
	}
}
var MapData = new Vue({
	el: "#ExploreMenu",
	data: {
		Maps: [
			new map(0, "树林", 0, 1, 5, 2, 5, 4, 5),
			new map(1, "山洞", 400, 0, 5, 3, 5, 7, 3),
			new map(2, "森林", 800, 4, 5, 6, 3, 7, 3),
			new map(3, "矿场", 1200, 5, 3, 9, 3),
			new map(4, "雨林", 1600, 11, 3, 12, 3, 14, 3),
			new map(5, "矿山", 2000, 10, 3, 13, 3),
		],
		visible: false,
	},
	methods: {
		clickMap: function (id) {
			if (!this.Maps[id].available) {
				if (StatusMenu.spendMoney(this.Maps[id].price)) {
					this.Maps[id].available = true;
					this.Maps[id].price += "（已解锁）";
				} else alert("金钱不足");
			} else this.Maps[id].getItems();
		},
	},
});
