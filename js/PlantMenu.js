"use strict";
class pot {
	constructor(id) {
		this.id = id;
		this.available = true;
		this.growntime = 0;
		this.plantid = NaN;
	}
	hasgrown() {
		if (!isNaN(this.plantid))
			return this.growntime >= ItemData.Seeds[this.plantid].growtime;
		else return false;
	}
	collectMaterial() {
		if (this.hasgrown()) {
			ItemData.Materials[this.plantid].addtoStorage(10);
			this.available = true;
			this.plantid = NaN;
		}
	}
	plant(id) {
		let num = 10;
		if (StatusMenu.Effects[3] > 0) num = 8;
		if (StatusMenu.Effects[4] > 0) num = 5;
		if (StatusMenu.exertionEnergy(num)) {
			this.plantid = id;
			this.available = false;
			return true;
		} else return false;
	}
}
var PlantMenu = new Vue({
	el: "#PlantMenu",
	data: {
		visible: false,
		Pots: [
			new pot(0),
			new pot(1),
			new pot(2),
			new pot(3),
			new pot(4),
			new pot(5),
		],
		value: ["可种植", "可种植", "可种植", "可种植", "可种植", "可种植"],
		Selection: NaN,
		showSeeds: false,
	},
	methods: {
		getSeeds: function () {
			var list = Array();
			for (let i = 0; i < ItemData.Seeds.length; i++)
				if (ItemData.Seeds[i].storage > 0) list.push(ItemData.Seeds[i]);
			return list;
		},
		clickPot: function (event) {
			let el = event.currentTarget;
			let id = el.getAttribute("potid");
			if (this.Pots[id].available) {
				this.showSeeds = true;
				this.Selection = id;
			} else if (this.Pots[id].hasgrown()) {
				this.Pots[id].collectMaterial();
				this.value[id] = "可种植";
			}
		},
		clickSeed: function (id) {
			if (this.Pots[this.Selection].plant(id)) {
				ItemData.Seeds[id].plant();
				this.value[this.Selection] =
					ItemData.Materials[id].name +
					"\r\n剩余生长时间：" +
					(ItemData.Seeds[id].growtime - this.Pots[this.Selection].growntime);
			} else alert("体力不足");
			this.showSeeds = false;
			this.Selection = NaN;
		},
	},
});
