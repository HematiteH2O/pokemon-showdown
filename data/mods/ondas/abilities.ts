export const BattleAbilities: {[k: string]: ModdedAbilityData} = {
	immunity: {
		shortDesc: "This Pokemon cannot be poisoned. Gaining this Ability while poisoned cures it.",
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox' || pokemon.status === 'bane') {
				this.add('-activate', pokemon, 'ability: Immunity');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox' && status.id !== 'bane') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Immunity');
			}
			return false;
		},
		name: "Immunity",
		rating: 2,
		num: 17,
	},
	merciless: {
		shortDesc: "This Pokemon's attacks are critical hits if the target is poisoned.",
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox', 'bane'].includes(target.status)) return 5;
		},
		name: "Merciless",
		rating: 2,
		num: 196,
	},
	pastelveil: {
		shortDesc: "This Pokemon and its allies cannot be poisoned. On switch-in, cures poisoned allies.",
		onStart(pokemon) {
			for (const ally of pokemon.allies()) {
				if (['psn', 'tox', 'bane'].includes(ally.status)) {
					this.add('-activate', pokemon, 'ability: Pastel Veil');
					ally.cureStatus();
				}
			}
		},
		onUpdate(pokemon) {
			if (['psn', 'tox', 'bane'].includes(pokemon.status)) {
				this.add('-activate', pokemon, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onAllySwitchIn(pokemon) {
			if (['psn', 'tox', 'bane'].includes(pokemon.status)) {
				this.add('-activate', this.effectData.target, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!['psn', 'tox', 'bane'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Pastel Veil');
			}
			return false;
		},
		onAllySetStatus(status, target, source, effect) {
			if (!['psn', 'tox', 'bane'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Pastel Veil', '[of] ' + effectHolder);
			}
			return false;
		},
		name: "Pastel Veil",
		rating: 2,
		num: 257,
	},
	poisonheal: {
		desc: "If this Pokemon is poisoned, it restores 1/8 of its maximum HP, rounded down, at the end of each turn instead of losing HP.",
		shortDesc: "This Pokemon is healed by 1/8 of its max HP each turn when poisoned; no HP loss.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox' || effect.id === 'bane') {
				this.heal(target.baseMaxhp / 8);
				return false;
			}
		},
		name: "Poison Heal",
		rating: 4,
		num: 90,
	},
	toxicboost: {
		desc: "While this Pokemon is poisoned, the power of its physical attacks is multiplied by 1.5.",
		shortDesc: "While this Pokemon is poisoned, its physical attacks have 1.5x power.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox' || attacker.status === 'bane') && move.category === 'Physical') {
				return this.chainModify(1.5);
			}
		},
		name: "Toxic Boost",
		rating: 2.5,
		num: 137,
	},
	flareboost: {
		desc: "While this Pokemon is burned, the power of its special attacks is multiplied by 1.5.",
		shortDesc: "While this Pokemon is burned, its special attacks have 1.5x power.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'blst' || attacker.status === 'brn') && move.category === 'Special') {
				return this.chainModify(1.5);
			}
		},
		name: "Flare Boost",
		rating: 2,
		num: 138,
	},
	heatproof: {
		desc: "The power of Fire-type attacks against this Pokemon is halved, and burn damage taken is halved.",
		shortDesc: "The power of Fire-type attacks against this Pokemon is halved; burn damage halved.",
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && (effect.id === 'brn' || effect.id === 'blst')) {
				return damage / 2;
			}
		},
		name: "Heatproof",
		rating: 2,
		num: 85,
	},
	waterbubble: {
		desc: "This Pokemon's attacking stat is doubled while using a Water-type attack. If a Pokemon uses a Fire-type attack against this Pokemon, that Pokemon's attacking stat is halved when calculating the damage to this Pokemon. This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
		shortDesc: "This Pokemon's Water power is 2x; it can't be burned; Fire power against it is halved.",
		onModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
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
		onUpdate(pokemon) {
			if (pokemon.status === 'brn' || pokemon.status === 'blst') {
				this.add('-activate', pokemon, 'ability: Water Bubble');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn' && status.id !== 'blst') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Bubble');
			}
			return false;
		},
		name: "Water Bubble",
		rating: 4.5,
		num: 199,
	},
	waterveil: {
		shortDesc: "This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
		onUpdate(pokemon) {
			if (pokemon.status === 'brn' || pokemon.status === 'blst') {
				this.add('-activate', pokemon, 'ability: Water Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn' && status.id !== 'blst') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Veil');
			}
			return false;
		},
		name: "Water Veil",
		rating: 2,
		num: 41,
	},
	limber: {
		shortDesc: "This Pokemon cannot be paralyzed. Gaining this Ability while paralyzed cures it.",
		onUpdate(pokemon) {
			if (pokemon.status === 'shk' || pokemon.status === 'par') {
				this.add('-activate', pokemon, 'ability: Limber');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'shk' && status.id !== 'par') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Limber');
			}
			return false;
		},
		name: "Limber",
		rating: 2,
		num: 7,
	},
	parentalbond: {
		desc: "This Pokemon's damaging moves become multi-hit moves that hit twice. The second hit has its damage quartered. Does not affect multi-hit moves or moves that have multiple targets.",
		shortDesc: "This Pokemon's damaging moves hit twice. The second hit has its damage quartered.",
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if (['iceball', 'rollout'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 2;
				move.multihitType = 'parentalbond';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) return this.chainModify(0.25);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.status === 'shk');
			}
		},
		name: "Parental Bond",
		rating: 4.5,
		num: 184,
	},
	stench: {
		shortDesc: "No competitive use.",
		name: "Stench",
		rating: 0,
		num: 1,
	},
	mimicry: {
		shortDesc: "This Pokemon's type changes to match the Terrain. Type reverts when Terrain ends.",
		onStart(pokemon) {
			if (this.field.terrain) {
				pokemon.addVolatile('mimicry');
			} else {
				const types = pokemon.baseSpecies.types;
				if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				this.hint("Transform Mimicry changes you to your original un-transformed types.");
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			delete pokemon.volatiles['mimicry'];
			pokemon.addVolatile('mimicry');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['mimicry'];
		},
		effect: {
			onStart(pokemon) {
				let newType;
				switch (this.field.terrain) {
				case 'electricterrain':
					newType = 'Electric';
					break;
				case 'grassyterrain':
					newType = 'Grass';
					break;
				case 'mistyterrain':
					newType = 'Fairy';
					break;
				case 'psychicterrain':
					newType = 'Psychic';
					break;
				case 'silkyterrain':
					newType = 'Bug';
					break;
				}
				if (!newType || pokemon.getTypes().join() === newType || !pokemon.setType(newType)) return;
				this.add('-start', pokemon, 'typechange', newType, '[from] ability: Mimicry');
			},
			onUpdate(pokemon) {
				if (!this.field.terrain) {
					const types = pokemon.species.types;
					if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
					this.add('-activate', pokemon, 'ability: Mimicry');
					this.add('-end', pokemon, 'typechange', '[silent]');
					pokemon.removeVolatile('mimicry');
				}
			},
		},
		name: "Mimicry",
		rating: 0.5,
		num: 250,
	},
	arenatrap: {
		shortDesc: "No competitive use.",
		name: "Arena Trap",
		rating: 0,
		num: 71,
	},
	cutecharm: {
		shortDesc: "No competitive use.",
		name: "Cute Charm",
		rating: 0,
		num: 56,
	},
	moody: {
		shortDesc: "No competitive use.",
		name: "Moody",
		rating: 0,
		num: 141,
	},
	keeneye: {
		shortDesc: "No competitive use.",
		name: "Keen Eye",
		rating: 0,
		num: 51,
	},
	rivalry: {
		shortDesc: "No competitive use.",
		name: "Rivalry",
		rating: 0,
		num: 79,
	},
	sandveil: {
		shortDesc: "No competitive use.",
		name: "Sand Veil",
		rating: 0,
		num: 8,
	},
	snowcloak: {
		shortDesc: "No competitive use.",
		name: "Snow Cloak",
		rating: 0,
		num: 81,
	},
	wonderskin: {
		desc: "All non-damaging moves that check accuracy miss when used on this Pokémon.",
		shortDesc: "Status moves with accuracy checks miss when used on this Pokémon.",
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Status' && typeof move.accuracy === 'number') {
				this.debug('Wonder Skin - setting accuracy to 0');
				return 0;
			}
		},
		name: "Wonder Skin",
		rating: 3.5,
		num: 147,
	},
	speedboost: {
		desc: "This Pokémon's Speed is raised by 1 stage if it attacks and knocks out another Pokémon.",
		shortDesc: "This Pokémon's Speed is raised by 1 stage if it attacks and KOes another Pokémon.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spe: length}, source);
			}
		},
		name: "Speed Boost",
		rating: 4,
		num: 3,
	},
	shedskin: {
		shortDesc: "This Pokémon has its major status condition cured when it switches out.",
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Shed Skin activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Shed Skin switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				// pokemon not statused
				if (!curPoke || !curPoke.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Shed Skin already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Shed Skin
				if (!Object.values(species.abilities).includes('Shed Skin')) {
					// this.add('-message', "" + curPoke + " skipped: no Shed Skin");
					continue;
				}
				// pokemon's ability is known to be Shed Skin
				if (!species.abilities['1'] && !species.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility('shedskin')) {
					// this.add('-message', "" + curPoke + " confirmed: could be Shed Skin (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Shed Skin (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (const pkmn of cureList) {
					pkmn.showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Shed Skin.)");

				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Shed Skin');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Shed Skin, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		name: "Shed Skin",
		rating: 3,
		num: 61,
	},
	shadowtag: {
		shortDesc: "When the target of the Pokémon's move switches out of battle, the Pokémon also switches out in response. (not implemented)",
		name: "Shadow Tag",
		rating: 2,
		num: 23,
	},
	quickdraw: {
		shortDesc: "Enables the Pokémon to move first on the first turn each time the user enters battle.",
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (pokemon.activeMoveActions > 1) return;
			if (move.category !== "Status") {
				this.add('-activate', pokemon, 'ability: Quick Draw');
				return 0.1;
			}
		},
		name: "Quick Draw",
		rating: 3,
		num: 259,
	},
	justified: {
		shortDesc: "This Pokemon is immune to Dark-type moves and raises its Attack by 1 stage when hit by a Dark-type move.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Justified');
				}
				return null;
			}
		},
		name: "Justified",
		rating: 3,
		num: 154,
	},
	healer: {
		shortDesc: "On switch-in, cures statused allies.",
		onStart(pokemon) {
			for (const ally of pokemon.allies()) {
				if (ally.status) {
					this.add('-activate', pokemon, 'ability: Pastel Veil');
					ally.cureStatus();
				}
			}
		},
		name: "Healer",
		rating: 0,
		num: 131,
	},
};
