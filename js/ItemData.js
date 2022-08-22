"use strict";
class item {
	constructor(id, name, description, price) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.storage = 1;
	}
	addtoStorage(num) {
		this.storage += num;
	}
	sell(num) {
		if (this.storage >= num) {
			this.storage -= num;
			StatusMenu.addMoney(parseInt(num * this.price * StatusMenu.MarketRate));
			return true;
		} else return false;
	}
}
class material extends item {
	constructor(id, name, description, price, attribute, point) {
		super(id, name, description, price);
		this.attribute = attribute; // attribute:1-chrysos 2-dendro 3-hydro 4-pryo 5-gi
		this.point = point;
	}
	consume(num) {
		if (this.storage >= num) {
			this.storage -= num;
			return true;
		} else {
			this.storage = 0;
			return false;
		}
	}
	getAttribute() {
		return Element[this.attribute];
	}
}
class seed extends item {
	constructor(id, name, description, price, growtime) {
		super(id, name, description, price);
		this.growtime = growtime;
	}
	plant() {
		if (this.storage > 0) {
			this.storage--;
			return true;
		} else {
			return false;
		}
	}
}
class potion extends item {
	constructor(id, name, description, price, lasttime, effectid, ...recipe) {
		super(id, name, description, price);
		this.lasttime = lasttime;
		this.effectid = effectid;
		this.recipe = [0, 0, 0, 0, 0, 0];
		for (let i = 0; i < recipe.length; i += 2)
			this.recipe[recipe[i]] = recipe[i + 1];
	}
	consume() {
		if (this.storage > 0) {
			this.storage--;
			StatusMenu.Effects[this.effectid] = this.lasttime;
			return true;
		} else return false;
	}
}
var Element = [null, "金", "木", "水", "火", "土"];
var ItemData = new Vue({
	el: "",
	data: {
		Materials: [
			new material(0, "铜矿", "常见的矿物", 5, 1, 1),
			new material(1, "树枝", "随处可见的材料", 2, 2, 1),
			new material(2, "河水", "略显浑浊", 1, 3, 1),
			new material(3, "纸片", "常常被作为燃料", 1, 4, 1),
			new material(4, "土块", "满地都是", 1, 5, 1),
			new material(5, "铁矿", "常见的矿物，用途更多", 7, 1, 3),
			new material(6, "松果", "有时能在树下见到", 3, 2, 3),
			new material(7, "泉水", "山脚下涌出的泉水，十分清澈", 2, 3, 3),
			new material(8, "煤炭", "比较容易开采", 4, 4, 3),
			new material(9, "石块", "矿场里常见的石材", 3, 5, 3),
			new material(10, "金矿", "十分珍贵的矿物", 10, 1, 7),
			new material(11, "木材", "很重，需要费一番功夫才能带回来", 7, 2, 7),
			new material(
				12,
				"露水",
				"清晨树叶上滴下来的露水，很适合用于炼金",
				9,
				3,
				7
			),
			new material(13, "火药", "似乎是矿工们用来炸矿的，好危险！", 8, 4, 7),
			new material(14, "松露", "十分罕见的材料", 10, 5, 7),
		],
		Seeds: [
			new seed(0, "铜矿种子", "可以种出铜矿，问就是魔法", 25, 5),
			new seed(1, "树枝种子", "可以种出树枝，问就是魔法", 10, 5),
			new seed(2, "河水种子", "可以种出河水，问就是魔法", 5, 5),
			new seed(3, "纸片种子", "可以种出纸片，问就是魔法", 5, 5),
			new seed(4, "土块种子", "可以种出土块，问就是魔法", 5, 5),
			new seed(5, "铁矿种子", "可以种出铁矿，问就是魔法", 35, 7),
			new seed(6, "松果种子", "可以种出松果，问就是魔法", 15, 7),
			new seed(7, "泉水种子", "可以种出泉水，问就是魔法", 10, 7),
			new seed(8, "煤炭种子", "可以种出煤炭，问就是魔法", 20, 7),
			new seed(9, "石块种子", "可以种出石块，问就是魔法", 15, 7),
			new seed(10, "金矿种子", "可以种出金矿，问就是魔法", 50, 10),
			new seed(11, "木材种子", "可以种出木材，问就是魔法", 35, 10),
			new seed(12, "露水种子", "可以种出露水，问就是魔法", 45, 10),
			new seed(13, "火药种子", "可以种出火药，问就是魔法", 40, 10),
			new seed(14, "松露种子", "可以种出松露，问就是魔法", 50, 10),
		],
		Potions: [
			new potion(
				0,
				"体力药水a（小）",
				"浅绿色的药剂，微苦，可以小幅度减少探索地图需要的体力，持续三天",
				250,
				3,
				1,
				2,
				1,
				3,
				1,
				4,
				1
			),
			new potion(
				1,
				"体力药水b（小）",
				"土壤的气息，可以小幅度减少种植需要的体力，持续三天。",
				200,
				3,
				3,
				3,
				1,
				4,
				1,
				5,
				1
			),
			new potion(
				2,
				"体力药水c（小）",
				"浅棕色的药剂，有浓郁的香气，可以立即回复少量的体力。",
				300,
				0,
				0,
				2,
				1,
				4,
				1,
				5,
				1
			),
			new potion(
				3,
				"金色药水（小）",
				"小幅度提高物价指数，作用原理不明，持续三天。",
				500,
				3,
				6,
				1,
				1,
				3,
				1,
				4,
				1
			),
			new potion(
				4,
				"红茶",
				"从坩埚里意外地飘来了红茶的香气，这东西真的能喝么？",
				150,
				0,
				0,
				1,
				1,
				2,
				1,
				5,
				1
			),
			new potion(
				5,
				"幸运药水（小）",
				"好像融化的金子一般，可以为探索带来好运气，持续三天。",
				350,
				3,
				5,
				1,
				1,
				2,
				1,
				3,
				1
			),
			new potion(
				6,
				"体力药水a（中）",
				"浅绿色的药剂，微苦，可以小幅度减少探索地图需要的体力，持续五天",
				300,
				5,
				1,
				2,
				2,
				3,
				2,
				4,
				2
			),
			new potion(
				7,
				"体力药水b（中）",
				"土壤的气息，可以小幅度减少种植需要的体力，持续五天。",
				250,
				5,
				3,
				3,
				2,
				4,
				2,
				5,
				2
			),
			new potion(
				8,
				"体力药水c（大）",
				"浅棕色的药剂，有浓郁的香气，可以立即回复大量的体力。",
				350,
				0,
				0,
				2,
				4,
				4,
				4,
				5,
				5
			),
			new potion(
				9,
				"金色药水（中）",
				"小幅度提高物价指数，作用原理不明，持续五天。",
				550,
				5,
				6,
				1,
				2,
				3,
				2,
				4,
				2
			),
			new potion(
				10,
				"幸运药水（大）",
				"好像融化的金子一般，可以为探索带来好运气，持续五天。",
				350,
				5,
				5,
				1,
				2,
				2,
				3,
				3,
				1
			),
			new potion(
				11,
				"体力药水a（大）",
				"浅绿色的药剂，微苦，可以大幅度减少探索地图需要的体力，持续五天",
				500,
				5,
				2,
				2,
				4,
				3,
				3,
				4,
				3
			),
			new potion(
				12,
				"体力药水b（大）",
				"土壤的气息，可以大幅度减少种植需要的体力，持续五天。",
				400,
				5,
				4,
				3,
				2,
				4,
				2,
				5,
				6
			),
			new potion(
				13,
				"金色药水（大）",
				"大幅度提高物价指数，作用原理不明，持续五天。",
				700,
				4,
				7,
				1,
				6,
				3,
				2,
				4,
				2
			),
		],
	},
});
ItemData.Potions[2].giveEffect = function () {
	StatusMenu.Energy += 20;
	if (StatusMenu.Energy >= 100) Energy = 100;
};
ItemData.Potions[4].giveEffect = function () {
	StatusMenu.clickNextDay();
};
ItemData.Potions[8].giveEffect = function () {
	StatusMenu.Energy += 50;
	if (StatusMenu.Energy >= 100) Energy = 100;
};
