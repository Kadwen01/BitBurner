/** @param {NS} ns **/
export async function main(ns) {

	ns.clearLog();
	ns.tail(ns.getScriptName);

	function shapeData() {

		for (let shape of ns.stanek.activeFragments()) {

			ns.print(shape);
		}

	};

	const sevenBySeven = [
		{ x: 1, y: 5 },
		{ x: 3, y: 3 },
		{ x: 0, y: 4 },
		{ x: 0, y: 0 },
		{ x: 1, y: 1 },
		{ x: 1, y: 0 },
		{ x: 3, y: 1 },
		{ x: 5, y: 4 },
		{ x: 3, y: 5 },
	];


	let frags = ns.stanek.activeFragments();

	ns.print(frags);

	const charge = ns.stanek.chargeFragment;
	for (let loc of frags) {
		if (loc.type === 18) {
			continue;
		} else {
			ns.print(loc.x, loc.y);
			await charge(loc.x, loc.y);
		}
	};
}