/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.tail(ns.getScriptName());

	const fiveBySix = [
		{ "id": 0, "x": 3, "y": 0, "rotation": 0 }, // Hacking Mult
		{ "id": 1, "x": 3, "y": 3, "rotation": 0 }, // Hacking Mult
		{ "id": 5, "x": 4, "y": 1, "rotation": 1 }, // Hacking Speed
		{ "id": 20, "x": 0, "y": 4, "rotation": 0 }, // Hacknet Production
		{ "id": 21, "x": 0, "y": 1, "rotation": 0 }, // Hacknet Cost Reduction
		{ "id": 25, "x": 0, "y": 0, "rotation": 2 }, // Reputation
		{ "id": 102, "x": 0, "y": 2, "rotation": 2 } // Booster
	];

	const sixBySix = [
		{ "id": 0, "x": 0, "y": 2, "rotation": 0 }, // Hacking Mult
		{ "id": 1, "x": 2, "y": 2, "rotation": 1 }, // Hacking Mult
		{ "id": 5, "x": 3, "y": 3, "rotation": 1 }, // Hacking Speed
		{ "id": 20, "x": 5, "y": 2, "rotation": 1 }, // Hacknet Production
		{ "id": 21, "x": 0, "y": 0, "rotation": 0 }, // Hacknet Cost Reduction
		{ "id": 25, "x": 3, "y": 0, "rotation": 2 }, // Reputation
		{ "id": 103, "x": 0, "y": 4, "rotation": 2 }, // Booster
		{ "id": 104, "x": 2, "y": 0, "rotation": 1 } // Booster
	];

	const sixBySeven = [
		{ "id": 0, "x": 1, "y": 1, "rotation": 2 }, // Hacking Mult
		{ "id": 1, "x": 1, "y": 3, "rotation": 2 }, // Hacking Mult
		{ "id": 5, "x": 4, "y": 3, "rotation": 0 }, // Hacking Speed
		{ "id": 6, "x": 2, "y": 0, "rotation": 0 }, // Hack power
		{ "id": 7, "x": 1, "y": 4, "rotation": 0 }, // Grow power
		{ "id": 20, "x": 0, "y": 2, "rotation": 3 }, // Hacknet Production
		{ "id": 21, "x": 0, "y": 0, "rotation": 0 }, // Hacknet Cost Reduction
		{ "id": 25, "x": 5, "y": 0, "rotation": 3 }, // Reputation
		{ "id": 28, "x": 4, "y": 4, "rotation": 0 }, // Crime Money TODO: Find a way to swap this for a booster
		{ "id": 105, "x": 3, "y": 1, "rotation": 2 }, // Booster
	];

	const sevenbySeven = [
		{ "id": 0, "x": 1, "y": 5, "rotation": 2 }, // Hacking Mult
		{ "id": 1, "x": 3, "y": 3, "rotation": 0 }, // Hacking Mult
		{ "id": 5, "x": 0, "y": 4, "rotation": 3 }, // Hacking Speed
		{ "id": 6, "x": 0, "y": 0, "rotation": 1 }, // Hack power
		{ "id": 7, "x": 1, "y": 1, "rotation": 1 }, // Grow power
		{ "id": 20, "x": 1, "y": 0, "rotation": 2 }, // Hacknet Production
		{ "id": 21, "x": 3, "y": 1, "rotation": 0 }, // Hacknet Cost Reduction
		{ "id": 25, "x": 5, "y": 4, "rotation": 3 }, // Reputation
		{ "id": 30, "x": 3, "y": 5, "rotation": 2 }, // Bladeburner Stats
		{ "id": 101, "x": 5, "y": 0, "rotation": 3 }, // Booster
		{ "id": 106, "x": 1, "y": 2, "rotation": 3 }, // Booster
	];

	const sevenByEight = [
		{ "id": 0, "x": 4, "y": 1, "rotation": 0 }, // Hacking Mult
		{ "id": 1, "x": 4, "y": 4, "rotation": 3 }, // Hacking Mult
		{ "id": 5, "x": 0, "y": 2, "rotation": 0 }, // Hacking Speed
		{ "id": 6, "x": 3, "y": 0, "rotation": 2 }, // Hack power
		{ "id": 7, "x": 2, "y": 0, "rotation": 0 }, // Grow power
		{ "id": 14, "x": 0, "y": 3, "rotation": 1 }, // Dexterity
		{ "id": 16, "x": 5, "y": 5, "rotation": 2 }, // Agility
		{ "id": 20, "x": 0, "y": 6, "rotation": 0 }, // Hacknet Production
		{ "id": 21, "x": 0, "y": 0, "rotation": 0 }, // Hacknet Cost Reduction
		{ "id": 25, "x": 6, "y": 0, "rotation": 3 }, // Reputation
		{ "id": 30, "x": 2, "y": 4, "rotation": 0 }, // Bladeburner Stats
		{ "id": 103, "x": 4, "y": 3, "rotation": 0 }, // Booster
		{ "id": 105, "x": 1, "y": 2, "rotation": 0 }, // Booster
	];


	const stanekSize = sevenbySeven;

	for (let frag in stanekSize) {
		ns.stanek.placeFragment(stanekSize[frag].x, stanekSize[frag].y, stanekSize[frag].rotation, stanekSize[frag].id);
	}




}