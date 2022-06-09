/** @param {NS} ns */
export async function main(ns) {

	ns.disableLog("sleep");
	const gsle = ns.sleeve;
	const sleeveCount = ns.sleeve.getNumSleeves();

	ns.print('Current number of sleeves: ' + sleeveCount);
	ns.tail(ns.getScriptName());

	for (var i = 0; i < sleeveCount; i++) {
		if (ns.getPlayer().inBladeburner) {
			ns.exec("sleeve-bb.js", 'home', 1, i);
		} else {
			ns.exec("sleeve.js", 'home', 1, i);
		}
	}

	while (true) {
		ns.clearLog();
		for (var slvNo = 0; slvNo < sleeveCount; slvNo++) {

			const availAugs = gsle.getSleevePurchasableAugs(slvNo);

			ns.print('Sleeve ' + slvNo);
			ns.print('Available Augments to install: ' + availAugs.length);

			for (let key of availAugs) {
				if (ns.getPlayer().money > key.cost) {
					ns.print('Installing: ' + key.name);
					gsle.purchaseSleeveAug(slvNo, key.name);
				}
			}
		}
		await ns.sleep(60000);
	}
}