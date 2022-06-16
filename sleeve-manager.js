/** @param {NS} ns */
export async function main(ns) {

	ns.disableLog("sleep");
	const gsle = ns.sleeve;
	const sleeveCount = ns.sleeve.getNumSleeves();

	ns.print('Current number of sleeves: ' + sleeveCount);
	ns.tail(ns.getScriptName());

	function callSleeves() {
		for (var i = 0; i < sleeveCount; i++) {
			if (ns.getPlayer().inBladeburner) {
				ns.exec("sleeve-bb.js", 'home', 1, i);
			} else {
				ns.exec("sleeve.js", 'home', 1, i);
			}
		}
	}

	callSleeves();

	while (true) {
		ns.clearLog();
		for (var slvNo = 0; slvNo < sleeveCount; slvNo++) {

			const availAugs = gsle.getSleevePurchasableAugs(slvNo);
			let sleeveJob = gsle.getTask(slvNo).task;

			ns.print('Sleeve ' + slvNo + ': ' + sleeveJob);
			ns.print('Available Augments to install: ' + availAugs.length);


			if (gsle.getSleeveStats(slvNo).shock > 0) {
				continue;
			} else {
				for (let key of availAugs) {
					if (ns.getPlayer().money > key.cost) {
						ns.print('Installing: ' + key.name);
						gsle.purchaseSleeveAug(slvNo, key.name);
					}
				}
			}
		}

		if (ns.getPlayer().inBladeburner && !ns.scriptRunning("sleeve-bb.js", "home")) {
			for (var slvNo = 0; slvNo < sleeveCount; slvNo++) {
				ns.kill("sleeve.js", "home", slvNo);
			}
			callSleeves();
		}

		await ns.sleep(60000);
	}
}