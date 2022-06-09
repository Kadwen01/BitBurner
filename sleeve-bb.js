/** @param {NS} ns */
export async function main(ns) {

	ns.disableLog("sleep");

	const gsle = ns.sleeve;
	const slvNo = ns.args[0];
	const bb = ns.bladeburner;

	ns.tail(ns.getScriptName)

	while (gsle.getSleeveStats(slvNo).shock > 0) {
		ns.clearLog();
		gsle.setToShockRecovery(slvNo);
		ns.print('Sleeve ' + slvNo + ' still in recovery');
		ns.print(gsle.getSleeveStats(slvNo).shock);
		await ns.sleep(60000);
	}

	while (gsle.getSleeveStats(slvNo).sync < 100) {
		ns.clearLog();
		gsle.setToSynchronize(slvNo);
		ns.print('Sleeve ' + slvNo + ' still syncing');
		ns.print(gsle.getSleeveStats(slvNo).sync);
		await ns.sleep(30000);
	}

	while (Math.floor(ns.heart.break()) > -54000) {
		ns.clearLog();
		gsle.setToCommitCrime(slvNo, "Homicide");
		ns.print('Sleeve ' + slvNo + ' is commiting a homicide');
		ns.print('Karma: ' + Math.floor(ns.heart.break()));
		await ns.sleep(1000);
	}

	while (true) {

		while (bb.getCityChaos(gsle.getInformation(slvNo).city) > 1) {
			ns.clearLog();
			gsle.setToBladeburnerAction(slvNo, "Diplomacy");
			ns.print('Sleeve ' + slvNo + ' is attempting diplomacy :' + bb.getCityChaos(gsle.getInformation(slvNo).city));
			await ns.sleep(60000);
		}

		if (slvNo === 0) {
			while (bb.getActionEstimatedSuccessChance("contract", "Tracking")[0] > .8) {
				let delay = bb.getActionTime("contract", "Tracking");
				ns.clearLog();
				if (bb.getActionCountRemaining("contract", "Tracking") > 10) {
					gsle.setToBladeburnerAction(slvNo, "Take on contracts", "Tracking");
					ns.print('Sleeve ' + slvNo + ' is Tracking.');
				} else {
					gsle.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
					ns.print('Sleeve ' + slvNo + ' is infiltrating the Synthoids: ' + bb.getActionCountRemaining("contract", "Tracking"));
				}
				await ns.sleep(delay);
			}
		}

		if (slvNo === 1) {
			while (bb.getActionEstimatedSuccessChance("contract", "Bounty Hunter")[0] > .8) {
				let delay = bb.getActionTime("contract", "Bounty Hunter");
				ns.clearLog();
				if (bb.getActionCountRemaining("contract", "Bounty Hunter") > 10) {
					gsle.setToBladeburnerAction(slvNo, "Take on contracts", "Bounty Hunter");
					ns.print('Sleeve ' + slvNo + ' is Bounty Hunting.');
				} else {
					gsle.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
					ns.print('Sleeve ' + slvNo + ' is infiltrating the Synthoids');
				}
				await ns.sleep(delay);
			}
		}

		if (slvNo === 2) {
			while (bb.getActionEstimatedSuccessChance("contract", "Retirement")[0] > .8) {
				let delay = bb.getActionTime("contract", "Retirement");
				ns.clearLog();
				if (bb.getActionCountRemaining("contract", "Retirement") > 10) {
					gsle.setToBladeburnerAction(slvNo, "Take on contracts", "Retirement");
					ns.print('Sleeve ' + slvNo + ' is performing Retirement.');
				} else {
					gsle.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
					ns.print('Sleeve ' + slvNo + ' is infiltrating the Synthoids');
				}
				await ns.sleep(delay);
			}
		}

		if (slvNo === 3 || slvNo === 4 || slvNo === 5 || slvNo === 6 || slvNo === 7) {
			gsle.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
			ns.print('Sleeve ' + slvNo + ' is infiltrating the Synthoids');
		}

		await ns.sleep(1000);
	}
}