/** @param {NS} ns */
export async function main(ns) {
	var target = ns.args[0];
	
	while (true) {	
		var delay = ns.tFormat(ns.getGrowTime(target));
		await ns.sleep(delay);
		await ns.grow(target);
	}
}