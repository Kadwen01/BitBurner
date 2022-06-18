/** @param {NS} ns **/
export async function main(ns) {

	ns.clearLog();
	ns.tail(ns.getScriptName);

	const gstanek = ns.stanek;
	const charge = gstanek.chargeFragment;
	let frags = ns.stanek.activeFragments();

	//while (ns.singularity.getFactionRep("Church of the Machine God") < 1e8) {
	while (true) {
		ns.clearLog();
		ns.print(ns.singularity.getFactionRep("Church of the Machine God"));
		for (let loc of frags) {
			if (loc.type === 18) {
				continue;
			} else {
				await charge(loc.x, loc.y);
			}
		};
		ns.print(ns.singularity.getFactionRep("Church of the Machine God"));
		await ns.sleep(5);
	}
}