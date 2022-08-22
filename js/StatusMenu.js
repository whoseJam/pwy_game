"use strict";
var StatusMenu = new Vue({
	el: "#StatusMenu",
	data: {
		Money: 0,
		Days: 1,
		Energy: 100,
		MarketRate: 1,
		Effects: [0, 0, 0, 0, 0, 0, 0, 0],
		/*instant,energy-explore(small),
		energy-explore(huge),energy-farm(small),
		energy-farm(huge),luck,
		market(small),market(huge)*/
		visible: false,
	},
	methods: {
		spendMoney: function (cost) {
			if (this.Money >= cost) {
				this.Money -= cost;
				return true;
			} else {
				return false;
			}
		},
		exertionEnergy: function (cost) {
			if (this.Energy >= cost) {
				this.Energy -= cost;
				return true;
			} else return false;
		},
		addMoney: function (num) {
			this.Money += num;
		},
		clickMain: function () {
			Mainmenu.visible = true;
			StorageMenu.visible = false;
			ShopMenu.visible = false;
			MapData.visible = false;
			PlantMenu.visible = false;
			CraftMenu.visible = false;
		},
		clickStorage: function () {
			Mainmenu.visible = false;
			StorageMenu.visible = true;
			ShopMenu.visible = false;
			MapData.visible = false;
			PlantMenu.visible = false;
			CraftMenu.visible = false;
		},
		clickShop: function () {
			ShopMenu.visible = true;
			Mainmenu.visible = false;
			StorageMenu.visible = false;
			MapData.visible = false;
			PlantMenu.visible = false;
			CraftMenu.visible = false;
		},
		clickMap: function () {
			Mainmenu.visible = false;
			StorageMenu.visible = false;
			ShopMenu.visible = false;
			MapData.visible = true;
			PlantMenu.visible = false;
			CraftMenu.visible = false;
		},
		clickFarm: function () {
			Mainmenu.visible = false;
			StorageMenu.visible = false;
			ShopMenu.visible = false;
			MapData.visible = false;
			PlantMenu.visible = true;
			CraftMenu.visible = false;
		},
		clickCraft: function () {
			Mainmenu.visible = false;
			StorageMenu.visible = false;
			ShopMenu.visible = false;
			MapData.visible = false;
			PlantMenu.visible = false;
			CraftMenu.visible = true;
		},
		clickNextDay: function () {
			Mainmenu.visible = true;
			StorageMenu.visible = false;
			ShopMenu.visible = false;
			MapData.visible = false;
			PlantMenu.visible = false;
			CraftMenu.visible = false;
			this.Days++;
			this.Energy = 100;
			for (let i = 0; i < this.Effects.length; i++)
				if (this.Effects[i] > 0) this.Effects[i]--;
			for (let i = 0; i < PlantMenu.Pots.length; i++) {
				if (!PlantMenu.Pots[i].available) {
					PlantMenu.Pots[i].growntime++;
					if (PlantMenu.Pots[i].hasgrown()) {
						PlantMenu.value[i] =
							ItemData.Materials[PlantMenu.Pots[i].plantid].name + "\r\n可收获";
					} else {
						PlantMenu.value[i] =
							ItemData.Materials[PlantMenu.Pots[i].plantid].name +
							"\r\n剩余生长时间：" +
							(ItemData.Seeds[PlantMenu.Pots[i].plantid].growtime -
								PlantMenu.Pots[i].growntime);
					}
				}
			}
			let flag = Math.round(Math.random());
			let rate;
			if (this.Effects[6] > 0 || this.Effects[7] > 0) flag = 1;
			if (this.Effects[7] > 0) rate = Math.round(Math.random() * 5);
			else rate = Math.round(Math.random() * 3);
			if (flag === 1 && this.MarketRate <1.3) {
				this.MarketRate += rate / 100;
			} else if(this.MarketRate>0.7){
				this.MarketRate -= rate / 100;
			}
		},
	},
});
