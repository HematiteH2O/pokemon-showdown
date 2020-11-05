export const BattleMovedex: {[k: string]: ModdedMoveData} = {

// Normal
	fakeout: {
		num: 252,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		desc: "Has a 100% chance to shock the target. Fails unless it is the user's first turn on the field.",
		shortDesc: "Hits first. First turn out only. 100% shock chance.",
		name: "Fake Out",
		pp: 10,
		priority: 3,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(pokemon, target) {
			if (pokemon.activeMoveActions > 1) {
				this.attrLastMove('[still]');
				this.add('-fail', pokemon);
				this.hint("Fake Out only works on your first turn out.");
				return null;
			}
		},
		secondary: {
			chance: 100,
			status: 'shk',
		},
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	headbutt: {
		num: 29,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Has a 30% chance to shock the target.",
		shortDesc: "30% chance to shock the target.",
		name: "Headbutt",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	hyperfang: {
		num: 158,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		desc: "Has a 10% chance to shock the target.",
		shortDesc: "10% chance to shock the target.",
		isNonstandard: "Past",
		name: "Hyper Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'shk',
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	snore: {
		num: 173,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		desc: "Has a 30% chance to shock the target. Fails if the user is not asleep.",
		shortDesc: "User must be asleep. 30% chance to shock target.",
		name: "Snore",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		sleepUsable: true,
		onTryHit(target, source) {
			if (source.status !== 'slp' && !source.hasAbility('comatose')) return false;
		},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	stomp: {
		num: 23,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		desc: "Has a 30% chance to shock the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "30% chance to shock the target.",
		name: "Stomp",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	camouflage: {
		num: 293,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user's type changes based on the battle terrain. Normal type on the regular Wi-Fi terrain, Electric type during Electric Terrain, Fairy type during Misty Terrain, Grass type during Grassy Terrain, and Psychic type during Psychic Terrain. Fails if the user's type cannot be changed or if the user is already purely that type.",
		shortDesc: "Changes user's type by terrain (default Normal).",
		isNonstandard: "Past",
		name: "Camouflage",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onHit(target) {
			let newType = 'Normal';
			if (this.field.isTerrain('electricterrain')) {
				newType = 'Electric';
			} else if (this.field.isTerrain('grassyterrain')) {
				newType = 'Grass';
			} else if (this.field.isTerrain('mistyterrain')) {
				newType = 'Fairy';
			} else if (this.field.isTerrain('psychicterrain')) {
				newType = 'Psychic';
			} else if (this.field.isTerrain('silkyterrain')) {
				newType = 'Bug';
			}

			if (target.getTypes().join() === newType || !target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {boost: {evasion: 1}},
		contestType: "Clever",
	},
	naturepower: {
		num: 267,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "This move calls another move for use based on the battle terrain. Tri Attack on the regular Wi-Fi terrain, Thunderbolt during Electric Terrain, Moonblast during Misty Terrain, Energy Ball during Grassy Terrain, and Psychic during Psychic Terrain.",
		shortDesc: "Attack depends on terrain (default Tri Attack).",
		name: "Nature Power",
		pp: 20,
		priority: 0,
		flags: {},
		onTryHit(target, pokemon) {
			let move = 'triattack';
			if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'moonblast';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			} else if (this.field.isTerrain('silkyterrain')) {
				move = 'bugbuzz';
			}
			this.useMove(move, pokemon, target);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	secretpower: {
		num: 290,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Has a 30% chance to cause a secondary effect on the target based on the battle terrain. Causes paralysis on the regular Wi-Fi terrain, causes paralysis during Electric Terrain, lowers Special Attack by 1 stage during Misty Terrain, causes sleep during Grassy Terrain, lowers Speed by 1 stage during Psychic Terrain and lowers Attack by 1 stage during Silky Terrain.",
		shortDesc: "Effect varies with terrain. (30% paralysis chance)",
		isNonstandard: "Past",
		name: "Secret Power",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('')) return;
			move.secondaries = [];
			if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			} else if (this.field.isTerrain('silkyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						atk: -1,
					},
				});
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
// Fire
	ember: {
		num: 52,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "Has a 30% chance to blister the target.",
		shortDesc: "30% chance to blister the target.",
		name: "Ember",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'blst',
		},
		target: "normal",
		type: "Fire",
		contestType: "Cute",
	},
	firefang: {
		num: 424,
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		desc: "Has a 10% chance to burn the target and a 10% chance to shock it.",
		shortDesc: "10% chance to burn. 10% chance to shock.",
		name: "Fire Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondaries: [
			{
				chance: 10,
				status: 'brn',
			}, {
				chance: 10,
				status: 'shk',
			},
		],
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	flamewheel: {
		num: 172,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Has a 100% chance to blister the target.",
		shortDesc: "100% chance to blister the target. Thaws user.",
		name: "Flame Wheel",
		pp: 25,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, defrost: 1},
		secondary: {
			chance: 100,
			status: 'blst',
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	hotspot: {
		num: -1003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, burning each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be used up to two times before failing. Opposing Pokemon become blistered with one layer and burned with two layers. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, is hit by Defog, or a grounded Fire-type Pokémon switches in. Safeguard prevents the opposing party from being burned on switch-in, but a substitute does not.",
		shortDesc: "Burns grounded foes on switch-in. Max 2 layers.",
		name: "Hotspot",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'hotspot',
		onTryHitSide(side, target) {
			if (target.side.getSideCondition('toxicspikes')) return false;
			if (target.side.getSideCondition('wirecross')) return false;
		},
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Hotspot');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Hotspot');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Fire')) {
					this.add('-sideend', pokemon.side, 'move: Hotspot', '[of] ' + pokemon);
					this.heal(pokemon.baseMaxhp / 8, pokemon, pokemon);
					pokemon.side.removeSideCondition('hotspot');
				} else if (pokemon.hasType('Water') || pokemon.hasItem('heavydutyboots') || pokemon.hasItem('heavydutyvest') || this.field.isTerrain('silkyterrain')) {
					return;
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('brn', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('blst', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Fire",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
// Water
	waterfall: {
		num: 127,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 20% chance to shock the target.",
		shortDesc: "20% chance to shock the target.",
		name: "Waterfall",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'shk',
		},
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
// Electric
	electricterrain: {
		num: 604,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Electric Terrain. During the effect, the power of Electric-type attacks made by grounded Pokemon is multiplied by 4/3 for STAB users and 3/2 for non-STAB users, and grounded Pokemon cannot fall asleep; Pokemon already asleep do not wake up. Camouflage transforms the user into an Electric type, Nature Power becomes Thunderbolt, and Secret Power has a 30% chance to cause paralysis. Fails if the current terrain is Electric Terrain.",
		shortDesc: "5 turns. Grounded: +Electric power, can't sleep.",
		name: "Electric Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'electricterrain',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Electric Terrain');
					}
					return false;
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Electric Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('electric terrain boost');
					if (attacker.hasType('Electric')) {
						return this.chainModify([0x1547, 0x1000]);
					} else {
						return this.chainModify(1.5);
					}
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Electric",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	thunderfang: {
		num: 422,
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		desc: "Has a 10% chance to paralyze the target and a 10% chance to shock it.",
		shortDesc: "10% chance to paralyze. 10% chance to shock.",
		name: "Thunder Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondary: [
			{
				chance: 10,
				status: 'par',
			}, {
				chance: 10,
				status: 'shk',
			},
		],
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	zingzap: {
		num: 716,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 30% chance to shock the target.",
		shortDesc: "30% chance to shock the target.",
		name: "Zing Zap",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	zippyzap: {
		num: 729,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 100% chance to raise the user's Speed by 1 stage.",
		shortDesc: "Goes first. Raises user's Speed by 1.",
		isNonstandard: "LGPE",
		name: "Zippy Zap",
		pp: 10,
		priority: 2,
		flags: {contact: 1, protect: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	magnetrise: {
		num: 393,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user is immune to Ground-type attacks and the effects of Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability as long as it remains active. If the user uses Baton Pass, the replacement will gain the effect. Ingrain, Smack Down, Thousand Arrows, and Iron Ball override this move if the user is under any of their effects. Fails if the user is already under this effect or the effects of Ingrain, Smack Down, or Thousand Arrows.",
		shortDesc: "For 5 turns, the user has immunity to Ground.",
		name: "Magnet Rise",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, gravity: 1},
		volatileStatus: 'magnetrise',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('magnet')) {
					return 8;
				}
				return 5;
			},
			onStart(target) {
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Magnet Rise');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'Magnet Rise');
			},
		},
		secondary: null,
		target: "self",
		type: "Electric",
		zMove: {boost: {evasion: 1}},
		contestType: "Clever",
	},
	wirecross: {
		num: -1002,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, shocking each opposing Pokémon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be used up to two times before failing. Opposing Pokemon become shocked with one layer and paralyzed with two layers. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, is hit by Defog, or a grounded Electric-type Pokémon switches in. Safeguard prevents the opposing party from being shocked on switch-in, but a substitute does not.",
		shortDesc: "Paralyzes grounded foes on switch-in. Max 2 layers.",
		name: "Wire Cross",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'wirecross',
		onTryHitSide(side, target) {
			if (target.side.getSideCondition('hotspot')) return false;
			if (target.side.getSideCondition('toxicspikes')) return false;
		},
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Wire Cross');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Wire Cross');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Electric')) {
					this.add('-sideend', pokemon.side, 'move: Wire Cross', '[of] ' + pokemon);
					this.heal(pokemon.baseMaxhp / 8, pokemon, pokemon);
					pokemon.side.removeSideCondition('wirecross');
				} else if (pokemon.hasType('Ground') || pokemon.hasItem('heavydutyboots') || pokemon.hasItem('heavydutyvest') || this.field.isTerrain('silkyterrain')) {
					return;
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('par', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('shk', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Electric",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
// Grass
	grassyterrain: {
		num: 580,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Grassy Terrain. During the effect, the power of Grass-type attacks used by grounded Pokemon is multiplied by 4/3 for STAB users and 3/2 for non-STAB users, the power of Bulldoze, Earthquake, and Magnitude used against grounded Pokemon is multiplied by 0.5, and grounded Pokemon have 1/16 of their maximum HP, rounded down, restored at the end of each turn, including the last turn. Camouflage transforms the user into a Grass type, Nature Power becomes Energy Ball, and Secret Power has a 30% chance to cause sleep. Fails if the current terrain is Grassy Terrain.",
		shortDesc: "5 turns. Grounded: +Grass power, +1/16 max HP.",
		name: "Grassy Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'grassyterrain',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
				if (weakenedMoves.includes(move.id)) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					if (attacker.hasType('Grass')) {
						return this.chainModify([0x1547, 0x1000]);
					} else {
						return this.chainModify(1.5);
					}
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
			},
			onTerrain(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.debug('Pokemon is grounded, healing through Grassy Terrain.');
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				}
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},
	needlearm: {
		num: 302,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Has a 30% chance to shock the target.",
		shortDesc: "30% chance to shock the target.",
		isNonstandard: "Past",
		name: "Needle Arm",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
// Ice
	icefang: {
		num: 423,
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		desc: "Has a 10% chance to freeze the target and a 10% chance to shock it.",
		shortDesc: "10% chance to freeze. 10% chance to shock.",
		name: "Ice Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondaries: [
			{
				chance: 10,
				status: 'frz',
			}, {
				chance: 10,
				status: 'shk',
			},
		],
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	iciclecrash: {
		num: 556,
		accuracy: 90,
		basePower: 85,
		category: "Physical",
		desc: "Has a 30% chance to shock the target.",
		shortDesc: "30% chance to shock the target.",
		name: "Icicle Crash",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
// Fighting
	brickbreak: {
		num: 280,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated.",
		shortDesc: "Destroys screens, unless the target is immune.",
		name: "Brick Break",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		thawsTarget: true,
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Fighting')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	rollingkick: {
		num: 27,
		accuracy: 85,
		basePower: 60,
		category: "Physical",
		desc: "Has a 30% chance to shock the target.",
		shortDesc: "30% chance to shock the target.",
		isNonstandard: "Past",
		name: "Rolling Kick",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
// Poison
	venomdrench: {
		num: 599,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's Attack, Special Attack, and Speed by 1 stage if the target is poisoned. Fails if the target is not poisoned.",
		shortDesc: "Lowers Atk/Sp. Atk/Speed of poisoned foes by 1.",
		name: "Venom Drench",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onHit(target, source, move) {
			if (target.status === 'psn' || target.status === 'tox') {
				return !!this.boost({atk: -1, spa: -1, spe: -1}, target, source, move);
			}
			return false;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	venoshock: {
		num: 474,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Power doubles if the target is poisoned.",
		shortDesc: "Power doubles if the target is poisoned.",
		name: "Venoshock",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'psn' || target.status === 'tox') {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
	toxicspikes: {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, poisoning each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be used up to two times before failing. Opposing Pokemon become poisoned with one layer and badly poisoned with two layers. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, is hit by Defog, or a grounded Poison-type Pokemon switches in. Safeguard prevents the opposing party from being poisoned on switch-in, but a substitute does not.",
		shortDesc: "Poisons grounded foes on switch-in. Max 2 layers.",
		name: "Toxic Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'toxicspikes',
		onTryHitSide(side, target) {
			if (target.side.getSideCondition('hotspot')) return false;
			if (target.side.getSideCondition('wirecross')) return false;
		},
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					this.heal(pokemon.baseMaxhp / 8, pokemon, pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.hasItem('heavydutyvest') || this.field.isTerrain('silkyterrain')) {
					return;
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
// Ground
	boneclub: {
		num: 125,
		accuracy: 85,
		basePower: 65,
		category: "Physical",
		desc: "Has a 10% chance to shock the target.",
		shortDesc: "10% chance to shock the target.",
		isNonstandard: "Past",
		name: "Bone Club",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'shk',
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	spikes: {
		num: 191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be used up to three times before failing. Opponents lose 1/8 of their maximum HP with one layer, 1/6 of their maximum HP with two layers, and 1/4 of their maximum HP with three layers, all rounded down. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts grounded foes on switch-in. Max 3 layers.",
		name: "Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'spikes',
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasItem('heavydutyvest') || this.field.isTerrain('silkyterrain')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Ground",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
// Flying
	airslash: {
		num: 403,
		accuracy: 95,
		basePower: 75,
		category: "Special",
		desc: "Has a 30% chance to shock the target.",
		shortDesc: "30% chance to shock the target.",
		name: "Air Slash",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
	floatyfall: {
		num: 731,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		desc: "Has a 30% chance to shock the target.",
		shortDesc: "30% chance to shock the target.",
		isNonstandard: "LGPE",
		name: "Floaty Fall",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, gravity: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	skyattack: {
		num: 143,
		accuracy: 90,
		basePower: 140,
		category: "Physical",
		desc: "Has a 30% chance to shock the target and a higher chance for a critical hit. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Charges, then hits turn 2. 30% shock. High crit.",
		name: "Sky Attack",
		pp: 5,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, distance: 1},
		critRatio: 2,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
// Psychic
	extrasensory: {
		num: 326,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 10% chance to shock the target.",
		shortDesc: "10% chance to shock the target.",
		name: "Extrasensory",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'shk',
		},
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	heartstamp: {
		num: 531,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Has a 30% chance to shock the target.",
		shortDesc: "30% chance to shock the target.",
		isNonstandard: "Past",
		name: "Heart Stamp",
		pp: 25,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Psychic",
		contestType: "Cute",
	},
	psychicfangs: {
		num: 706,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated.",
		shortDesc: "Destroys screens, unless the target is immune.",
		name: "Psychic Fangs",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		thawsTarget: true,
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Psychic')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	psychicterrain: {
		num: 678,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Psychic Terrain. During the effect, the power of Psychic-type attacks made by grounded Pokemon is multiplied by 4/3 for STAB users and 3/2 for non-STAB users, and grounded Pokemon cannot be hit by moves with priority greater than 0, unless the target is an ally. Camouflage transforms the user into a Psychic type, Nature Power becomes Psychic, and Secret Power has a 30% chance to lower the target's Speed by 1 stage. Fails if the current terrain is Psychic Terrain.",
		shortDesc: "5 turns. Grounded: +Psychic power, priority-safe.",
		name: "Psychic Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'psychicterrain',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onTryHitPriority: 4,
			onTryHit(target, source, effect) {
				if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
					return;
				}
				if (target.isSemiInvulnerable() || target.side === source.side) return;
				if (!target.isGrounded()) {
					const baseMove = this.dex.getMove(effect.id);
					if (baseMove.priority > 0) {
						this.hint("Psychic Terrain doesn't affect Pokémon immune to Ground.");
					}
					return;
				}
				this.add('-activate', target, 'move: Psychic Terrain');
				return null;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Psychic' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('psychic terrain boost');
					if (attacker.hasType('Psychic')) {
						return this.chainModify([0x1547, 0x1000]);
					} else {
						return this.chainModify(1.5);
					}
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Psychic Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Psychic Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Psychic Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	zenheadbutt: {
		num: 428,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		desc: "Has a 20% chance to shock the target.",
		shortDesc: "20% chance to shock the target.",
		name: "Zen Headbutt",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'shk',
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
// Bug
	steamroller: {
		num: 537,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		desc: "Has a 30% chance to shock the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "30% chance to shock the target.",
		isNonstandard: "Past",
		name: "Steamroller",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Bug",
		contestType: "Tough",
	},
	stickyweb: {
		num: 564,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, lowering the Speed by 1 stage of each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Lowers Speed of grounded foes by 1 on switch-in.",
		name: "Sticky Web",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'stickyweb',
		effect: {
			onStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasItem('heavydutyvest') || this.field.isTerrain('silkyterrain')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectData.source, this.dex.getActiveMove('stickyweb'));
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Bug",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	silkyterrain: {
		num: -1001,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Silky Terrain. During the effect, the power of Bug-type attacks made by grounded Pokémon is multiplied by 4/3 for STAB users and 3/2 for non-STAB users, and grounded Pokémon are immune to entry hazards. Camouflage transforms the user into a Bug-type, Nature Power becomes Bug Buzz, and Secret Power has a 30% chance to lower Attack. Fails if the current terrain is Silky Terrain.",
		shortDesc: "5 turns. Grounded: +Bug power, hazard immunity.",
		name: "Silky Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'silkyterrain',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Bug' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('electric terrain boost');
					if (attacker.hasType('Bug')) {
						return this.chainModify([0x1547, 0x1000]);
					} else {
						return this.chainModify(1.5);
					}
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Silky Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Silky Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Silky Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Bug",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
// Rock
	rockslide: {
		num: 157,
		accuracy: 90,
		basePower: 75,
		category: "Physical",
		desc: "Has a 30% chance to shock the target.",
		shortDesc: "30% chance to shock the foe(s).",
		name: "Rock Slide",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Tough",
	},
	stealthrock: {
		num: 446,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Fails if the effect is already active on the opposing side. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Rock type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts foes on switch-in. Factors Rock weakness.",
		name: "Stealth Rock",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'stealthrock',
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyvest') || (this.field.isTerrain('silkyterrain') && pokemon.isGrounded())) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Rock",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
// Ghost
	astonish: {
		num: 310,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		desc: "Has a 30% chance to shock the target.",
		shortDesc: "30% chance to shock the target.",
		name: "Astonish",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Cute",
	},
// Dragon
	dragonrush: {
		num: 407,
		accuracy: 75,
		basePower: 100,
		category: "Physical",
		desc: "Has a 20% chance to shock the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "20% chance to shock the target.",
		name: "Dragon Rush",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'shk',
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	twister: {
		num: 239,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "Has a 20% chance to shock the target. Power doubles if the target is using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop.",
		shortDesc: "20% chance to shock the foe(s).",
		name: "Twister",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'shk',
		},
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Cool",
	},
// Dark
	bite: {
		num: 44,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Has a 30% chance to shock the target.",
		shortDesc: "30% chance to shock the target.",
		name: "Bite",
		pp: 25,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	darkpulse: {
		num: 399,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 20% chance to shock the target.",
		shortDesc: "20% chance to shock the target.",
		name: "Dark Pulse",
		pp: 15,
		priority: 0,
		flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
		secondary: {
			chance: 20,
			status: 'shk',
		},
		target: "any",
		type: "Dark",
		contestType: "Cool",
	},
// Steel
	doubleironbash: {
		num: 742,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. Has a 30% chance to shock the target.",
		shortDesc: "Hits twice. 30% chance to shock.",
		name: "Double Iron Bash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		multihit: 2,
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Steel",
		zMove: {basePower: 180},
		maxMove: {basePower: 140},
		contestType: "Clever",
	},
	ironhead: {
		num: 442,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 30% chance to shock the target.",
		shortDesc: "30% chance to shock the target.",
		name: "Iron Head",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'shk',
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	gmaxsteelsurge: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Power is equal to the base move's Max Move power. If this move is successful, it sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Steel type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Base move affects power. Foes: Steel hazard.",
		name: "G-Max Steelsurge",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Copperajah",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxsteelsurge');
			},
		},
		effect: {
			onStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || (this.field.isTerrain('silkyterrain') && pokemon.isGrounded())) return;
				// Ice Face and Disguise correctly get typed damage from Stealth Rock
				// because Stealth Rock bypasses Substitute.
				// They don't get typed damage from Steelsurge because Steelsurge doesn't,
				// so we're going to test the damage of a Steel-type Stealth Rock instead.
				const steelHazard = this.dex.getActiveMove('Stealth Rock');
				steelHazard.type = 'Steel';
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Cool",
	},
// Fairy
	mistyterrain: {
		num: 581,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Misty Terrain. During the effect, the power of Dragon-type attacks used against grounded Pokemon is multiplied by 0.5 and grounded Pokemon cannot be inflicted with a major status condition nor confusion. Camouflage transforms the user into a Fairy type, Nature Power becomes Moonblast, and Secret Power has a 30% chance to lower Special Attack by 1 stage. Fails if the current terrain is Misty Terrain.",
		shortDesc: "5 turns. Can't status,-Dragon power vs grounded.",
		name: "Misty Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'mistyterrain',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if ((move.type === 'Dragon' || move.type === 'Dark' || move.type === 'Fighting' || move.type === 'Bug') && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain weaken');
					if (defender.hasType('Fairy')) {
						return this.chainModify([0x0AAA, 0x1000]);
					} else {
						return this.chainModify(0.5);
					}
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Fairy",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
}
