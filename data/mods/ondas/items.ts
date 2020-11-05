export const BattleItems: {[itemid: string]: ItemData} = {
	cheriberry: {
		name: "Cheri Berry",
		spritenum: 63,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fire",
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'shk' || pokemon.status === 'par') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'shk' || pokemon.status === 'par') {
				pokemon.cureStatus();
			}
		},
		num: 149,
		gen: 3,
		desc: "Holder cures itself if it is paralyzed. Single use.",
	},
	destinyknot: {
		name: "Destiny Knot",
		spritenum: 95,
		fling: {
			basePower: 10,
		},
		onBoost(boost, target, source, effect) {
			// Don't bounce self stat changes, or boosts that have already bounced
			if (target === source || !boost || effect.id === 'mirrorarmor' || effect.id === 'destinyknot') return;
			let b: BoostName;
			for (b in boost) {
				if (boost[b]! < 0) {
					if (target.boosts[b] === -6) continue;
					const negativeBoost: SparseBoostsTable = {};
					negativeBoost[b] = boost[b];
					delete boost[b];
					this.add('-item', target, 'Destiny Knot');
					this.boost(negativeBoost, source, target, null, true);
				}
			}
		},
		num: 280,
		gen: 4,
		desc: "When one of this Pokemon's stat stages would be lowered by another Pokemon, that Pokemon's stat stage is lowered instead. This effect does not happen if this Pokemon's stat stage was already -6.",
	},
	heavydutyboots: {
		name: "Heavy-Duty Boots",
		spritenum: 715,
		fling: {
			basePower: 80,
		},
		num: 1120,
		gen: 8,
		desc: "When switching in, the holder is unaffected by grounded hazards on its side of the field.",
		// Hazard Immunity implemented in moves.js
	},
	kingsrock: {
		name: "King's Rock",
		spritenum: 236,
		fling: {
			basePower: 30,
			status: 'shk',
		},
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.status === 'shk') return;
				}
				move.secondaries.push({
					chance: 10,
					status: 'shk',
				});
			}
		},
		num: 221,
		gen: 2,
		desc: "Holder's attacks without a chance to shock gain a 10% chance to shock. Evolves Poliwhirl into Politoed and Slowpoke into Slowking when traded.",
		shortDesc: "Holder's attacks without a chance to shock gain a 10% chance to shock.",
	},
	lightball: {
		name: "Light Ball",
		spritenum: 251,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(2);
			}
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric' && ['pichu', 'pikachu', 'raichu'].includes(attacker.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric' && ['pichu', 'pikachu', 'raichu'].includes(attacker.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Pichu", "Pikachu", "Raichu"],
		num: 236,
		gen: 2,
		desc: "If held by a Pichu, Pikachu or Raichu, its Attack and Sp. Atk are doubled when using Electric-type moves.",
	},
	metalpowder: {
		name: "Metal Powder",
		fling: {
			basePower: 10,
		},
		spritenum: 287,
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.species.name === 'Ditto') {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.species.name === 'Ditto') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Ditto"],
		num: 257,
		gen: 2,
		desc: "If held by a Ditto, its Defense and Special Defense are increased by 3/2, even when transformed.",
	},
	pechaberry: {
		name: "Pecha Berry",
		spritenum: 333,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Electric",
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox' || pokemon.status === 'bane') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox' || pokemon.status === 'bane') {
				pokemon.cureStatus();
			}
		},
		num: 151,
		gen: 3,
		desc: "Holder is cured if it is poisoned. Single use.",
	},
	quickclaw: {
		onFractionalPriorityPriority: -2,
		onFractionalPriority(priority, pokemon) {
			if (priority <= 0 && pokemon.useItem()) {
				return 0.1;
			}
		},
		name: "Quick Claw",
		spritenum: 373,
		fling: {
			basePower: 80,
		},
		num: 217,
		gen: 2,
		desc: "The holder's first move will always go first. This item is consumed after use.",
	},
	quickpowder: {
		name: "Quick Powder",
		spritenum: 374,
		fling: {
			basePower: 10,
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.species.name === 'Ditto') {
				return spe + 1;
			}
		},
		itemUser: ["Ditto"],
		num: 274,
		gen: 4,
		desc: "If held by a Ditto, its Speed is increased by 1 point, even when transformed.",
	},
	rawstberry: {
		name: "Rawst Berry",
		spritenum: 381,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Grass",
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn' || pokemon.status === 'blst') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'brn' || pokemon.status === 'blst') {
				pokemon.cureStatus();
			}
		},
		num: 152,
		gen: 3,
		desc: "Holder is cured if it is burned. Single use.",
	},
	razorfang: {
		name: "Razor Fang",
		spritenum: 383,
		fling: {
			basePower: 30,
			status: 'shk',
		},
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.status === 'shk') return;
				}
				move.secondaries.push({
					chance: 10,
					status: 'shk',
				});
			}
		},
		num: 327,
		gen: 4,
		isNonstandard: "Past",
		desc: "Holder's attacks without a chance to shock gain a 10% chance to shock. Evolves Gligar into Gliscor when held and leveled up during the night.",
		shortDesc: "Holder's attacks without a chance to shock gain a 10% chance to shock.",
	},
	weaknesspolicy: {
		name: "Weakness Policy",
		spritenum: 609,
		fling: {
			basePower: 80,
		},
		onHitPriority: 1,
		onHit(target, source, move) {
			if (
				target.hp && move.category !== 'Status' && !move.damage &&
				!move.damageCallback && target.getMoveHitData(move).typeMod > 0 &&
        target.side !== source.side
			) {
				target.useItem();
			}
		},
		boosts: {
			atk: 2,
			spa: 2,
		},
		num: 639,
		gen: 6,
		desc: "If holder is hit super effectively, raises Attack, Sp. Atk by 2 stages. Single use.",
	},
// new items
	heavydutyvest: {
		name: "Heavy-Duty Boots",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.getMove(moveSlot.move).category === 'Status') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		num: -1000,
		gen: 8,
		desc: "When switching in, the holder is completely unaffected by hazards on its side of the field, but it can only select damaging moves.",
		// Hazard Immunity implemented in moves.js
	},
	electromagnet: {
		name: "Electromagnet",
		spritenum: 273,
		fling: {
			basePower: 60,
		},
		onUpdate(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('electricterrain') && !this.field.getPseudoWeather('gravity')) {
				this.add('-item', pokemon, 'Electromagnet');
				pokemon.addVolatile('magnetrise');
			} else {
				pokemon.deleteVolatile('magnetrise');
			}
		},
		num: -1001,
		gen: 7,
		desc: "Holder floats in the air during Electric Terrain.",
	},
	steadfaststone: {
		name: "Steadfast Stone",
		spritenum: 193,
		fling: {
			basePower: 60,
		},
		num: -1002,
		gen: 7,
		desc: "Holder's field effects last until it leaves the field instead of 5 turns.",
	},
	sunscreen: {
		name: "Sunscreen",
		spritenum: 662,
		fling: {
			basePower: 60,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire' && this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify([0x0555, 0x1000]);
			}
		},
		num: -1003,
		gen: 8,
		desc: "Fire-type moves used on the holder in sunlight are significantly weakened.",
	},
	raincoat: {
		name: "Raincoat",
		spritenum: 718,
		fling: {
			basePower: 60,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water' && this.field.isWeather(['raindance', 'desolateland'])) {
				return this.chainModify([0x0555, 0x1000]);
			}
		},
		num: -1004,
		gen: 8,
		desc: "Water-type moves used on the holder in rain are significantly weakened.",
	},
	snowshoes: {
		name: "Snowshoes",
		spritenum: 715,
		fling: {
			basePower: 80,
		},
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['hail'])) {
				return this.chainModify(1.5);
			}
		},
		num: -1005,
		gen: 8,
		desc: "Holder's Speed is 1.5x in hail.",
	},
	cleats: {
		name: "Cleats",
		spritenum: 715,
		fling: {
			basePower: 80,
		},
		onAfterHit(target, source, move) {
			if (!this.canSwitch(source.side) || source.forceSwitchFlag || source.switchFlag || !this.field.isTerrain('grassyterrain')) return;
			for (const side of this.sides) {
				for (const target of side.target) {
					target.switchFlag = false;
				}
			}
			source.switchFlag = true;
			this.add('-activate', target, 'item: Cleats');
		},
		num: -1006,
		gen: 8,
		desc: "The holder switches out after using a move in Grassy Terrain.",
	},
	silkyseed: {
		name: "Silky Seed",
		spritenum: 667,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('silkyterrain')) {
				pokemon.useItem();
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			if (this.field.isTerrain('silkyterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			def: 1,
		},
		num: -1007,
		gen: 8,
		desc: "If the terrain is Silky Terrain, raises holder's Defense by 1 stage. Single use.",
	},
	pickpocketspouch: {
		name: "Pickpocket's Pouch",
		spritenum: 691,
		fling: {
			basePower: 10,
		},
		onAfterHit(target, source, move) {
			if (!move || !target || !move.flags['contact']) return;
			const yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (!this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem) ||
				!source.useItem() || !source.setItem(yourItem)) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.add('-enditem', target, yourItem, '[silent]', '[from] item: pickpocketspouch', '[of] ' + source);
			this.add('-item', source, yourItem, '[from] move: pickpocketspouch', '[of] ' + target);
		},
		num: -1008,
		gen: 8,
		desc: "After making contact with any target, the holder uses this item to steal the target's item in its place.",
	},
	earmuffs: {
		name: "Earmuffs",
		spritenum: 604,
		fling: {
			basePower: 80,
		},
		onImmunity(type, pokemon) {
			if (type === 'sound') return false;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['sound']) {
				return this.chainModify(0.5);
			}
		},
		num: -1009,
		gen: 8,
		desc: "Holder is immune to sound-based moves.",
	},
	toadstool: {
		name: "Toadstool",
		fling: {
			basePower: 30,
		},
		spritenum: 292,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Fairy') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		num: -1010,
		gen: 8,
		desc: "Holder's Fairy-type attacks have 1.2x power.",
	},
	trainingbelt: {
		name: "Training Belt",
		spritenum: 132,
		fling: {
			basePower: 10,
		},
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod < 0) {
				return this.chainModify([1.5]);
			}
		},
		num: -1011,
		gen: 8,
		desc: "Holder's attacks that are not very effective against the target do 1.5x damage.",
	},
	lastresortsnack: {
		name: "Last Resort Snack",
		spritenum: 242,
		fling: {
			basePower: 10,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return;
			if (pokemon.hp <= pokemon.maxhp / 2) {
				this.heal(pokemon.baseMaxhp / 8);
			} else {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
		onTerrain(pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			if (pokemon.hp <= pokemon.maxhp / 2) {
				this.heal(pokemon.baseMaxhp / 8);
			} else {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
		num: -1012,
		gen: 8,
		desc: "At the end of every turn, holder either restores or loses 1/8 of its max HP, depending whether it is below half or above half.",
	},
};
