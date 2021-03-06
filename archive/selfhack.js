/** @param {NS} ns */
export async function main(ns) {
	var target	= ns.getHostname();
	var secThresh = ns.getServerMinSecurityLevel(target) +5;
	var moneyThresh = ns.getServerMaxMoney(target) * 0.75;

	while(true) {
		if (ns.getServerSecurityLevel(target) > secThresh) {
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			await ns.grow(target);
		} else {
			await ns.hack(target);
		}
	}

}