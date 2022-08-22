"use strict";
var StorageMenu = new Vue({
	el: "#StorageMenu",
	data: {
		visible: false,
		MaterialVisible: true,
		SeedVisible: false,
		PotionVisible: false,
		DescriptionShow: "",
		Selection: NaN,
	},
	methods: {
		getMaterials: function () {
			var list = Array();
			for (let i = 0; i < ItemData.Materials.length; i++)
				if (ItemData.Materials[i].storage > 0) list.push(ItemData.Materials[i]);
			return list;
		},
		clickMaterial: function () {
			this.MaterialVisible = true;
			this.SeedVisible = false;
			this.PotionVisible = false;
			this.Selection = NaN;
			this.DescriptionShow = "";
		},
		getSeeds: function () {
			var list = Array();
			for (let i = 0; i < ItemData.Seeds.length; i++)
				if (ItemData.Seeds[i].storage > 0) list.push(ItemData.Seeds[i]);
			return list;
		},
		clickSeed: function () {
			this.SeedVisible = true;
			this.MaterialVisible = false;
			this.PotionVisible = false;
			this.Selection = NaN;
			this.DescriptionShow = "";
		},
		getPotions: function () {
			var list = Array();
			for (let i = 0; i < ItemData.Potions.length; i++)
				if (ItemData.Potions[i].storage > 0) list.push(ItemData.Potions[i]);
			return list;
		},
		clickPotion: function () {
			this.PotionVisible = true;
			this.MaterialVisible = false;
			this.SeedVisible = false;
			this.Selection = NaN;
			this.DescriptionShow = "";
		},
		clickMaterialItem: function (id) {
			this.DescriptionShow =
				ItemData.Materials[id].description +
				"\r\n元素：" +
				Element[ItemData.Materials[id].attribute] +
				"\r\n库存：" +
				ItemData.Materials[id].storage;
			this.Selection = id;
		},
		clickSeedItem: function (id) {
			this.DescriptionShow =
				ItemData.Seeds[id].description +
				"\r\n库存：" +
				ItemData.Seeds[id].storage;
			this.Selection = id;
		},
		clickPotionItem: function (id) {
			this.DescriptionShow =
				ItemData.Potions[id].description +
				"\r\n库存：" +
				ItemData.Potions[id].storage;
			this.Selection = id;
		},
		clickSell: function () {
			if (isNaN(this.Selection)) alert("请选择物品");
			else {
				let num = document.getElementById("Sellnum").value;
				if (isNaN(num)) alert("请输入合法数字");
				else {
					if (this.MaterialVisible) {
						let temp = ItemData.Materials[this.Selection].sell(num);
						if (!temp) alert("物品不足");
						if (ItemData.Materials[this.Selection].storage == 0) {
							this.DescriptionShow = "";
							this.Selection = NaN;
						} else {
							this.DescriptionShow =
								ItemData.Materials[this.Selection].description +
								"\r\n元素：" +
								Element[ItemData.Materials[this.Selection].attribute] +
								"\r\n库存：" +
								ItemData.Materials[this.Selection].storage;
						}
					} else if (this.SeedVisible) {
						let temp = ItemData.Seeds[this.Selection].sell(num);
						if (!temp) alert("物品不足");
						if (ItemData.Seeds[this.Selection].storage == 0) {
							this.DescriptionShow = "";
							this.Selection = NaN;
						} else {
							this.DescriptionShow =
								ItemData.Seeds[this.Selection].description +
								"\r\n元素：" +
								Element[ItemData.Seeds[this.Selection].attribute] +
								"\r\n库存：" +
								ItemData.Seeds[this.Selection].storage;
						}
					} else if (this.PotionVisible) {
						let temp = ItemData.Potions[this.Selection].sell(num);
						if (!temp) alert("物品不足");
						if (ItemData.Potions[this.Selection].storage === 0) {
							this.DescriptionShow = "";
							this.Selection = NaN;
						} else {
							this.DescriptionShow =
								ItemData.Potions[this.Selection].description +
								"\r\n元素：" +
								Element[ItemData.Potions[this.Selection].attribute] +
								"\r\n库存：" +
								ItemData.Potions[this.Selection].storage;
						}
					}
				}
			}
			document.getElementById("Sellnum").value = "0";
		},
		clickUse: function () {
			let temp = ItemData.Potions[this.Selection].consume();
			if (!temp) alert("物品不足");
			else if (ItemData.Potions[this.Selection].effectid === 0) {
				ItemData.Potions[this.Selection].giveEffect();
			}
			if (ItemData.Potions[this.Selection].storage === 0) {
				this.DescriptionShow = "";
				this.Selection = NaN;
			}
		},
	},
});
