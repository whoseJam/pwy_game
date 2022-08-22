"use strict";
var CraftMenu = new Vue({
	el: "#CraftMenu",
	data: {
		Selection: [NaN, NaN, NaN],
		value: ["可选择", "可选择", "可选择"],
		buttonSelection: NaN,
		showMaterials: false,
		visible: false,
	},
	methods: {
		selectMaterial1: function (id) {
			this.showMaterials = true;
			this.buttonSelection = id;
		},
		getMaterials: function () {
			var list = Array();
			for (let i = 0; i < ItemData.Materials.length; i++)
				if (ItemData.Materials[i].storage > 0) list.push(ItemData.Materials[i]);
			return list;
		},
		selectMaterial2: function (id) {
			if (this.Selection.includes(id)) alert("材料重复");
			else {
				this.Selection[this.buttonSelection] = id;
				this.value[this.buttonSelection] = ItemData.Materials[id].name;
				this.buttonSelection = NaN;
				this.showMaterials = false;
			}
		},
		clickCraft: function () {
			let elements = [0, 0, 0, 0, 0, 0];
			for (let i = 0; i < 3; i++) {
				if (!isNaN(this.Selection[i])) {
					elements[ItemData.Materials[this.Selection[i]].attribute] =
						ItemData.Materials[this.Selection[i]].point;
				} else {
					alert("请选择三种材料");
					return;
				}
			}
			let num = document.getElementById("craftnum").value;
			if (isNaN(num)) {
				alert("请输入合法数字");
				return;
			} else {
				let craftpotion = NaN;
				for (let i = ItemData.Potions.length - 1; i >= 0; i--) {
					let flag = 0;
					for (let j = 1; j < 6; j++) {
						if (elements[j] < ItemData.Potions[i].recipe[j]) {
							flag = 1;
							break;
						}
					}
					if (flag === 0) {
						craftpotion = i;
						break;
					}
				}
				if (isNaN(craftpotion)) alert("炼金失败");
				else {
					for (let j = 0; j < num; j++) {
						let flag = 0;
						for (let i = 0; i < 3; i++) {
							if (!ItemData.Materials[this.Selection[i]].consume(1)) {
								if (flag === 0) alert("材料不足");
								flag = 1;
							}
						}
						if (flag === 0) ItemData.Potions[craftpotion].addtoStorage(1);
						else break;
					}
				}
			}
			for (let i = 0; i < 3; i++) {
				this.Selection[i] = NaN;
				this.value[i] = "可选择";
				document.getElementById("craftnum").value = 0;
			}
		},
	},
});
