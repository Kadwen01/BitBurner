/** @param {NS} ns */
export async function main(ns) {

	ns.disableLog("sleep");

	const gsle = ns.sleeve;
	const slvNo = ns.args[0];
	const bb = ns.bladeburner;

	while (gsle.getSleeveStats(slvNo).shock > 20 && ns.sleeve.getTask(slvNo) === "Idle") {
		ns.clearLog();
		gsle.setToShockRecovery(slvNo);
		ns.print('Sleeve ' + slvNo + ' still in recovery');
		ns.print(gsle.getSleeveStats(slvNo).shock);
		await ns.sleep(60000);
	}

	while (Math.floor(ns.heart.break()) > -54000) {
		ns.clearLog();
		gsle.setToCommitCrime(slvNo, "Homicide");
		ns.print('Sleeve ' + slvNo + ' is commiting a homicide');
		ns.print('Karma: ' + Math.floor(ns.heart.break()));
		await ns.sleep(60000);
	}

	while (true) {

		let sTask = ns.sleeve.getTask(slvNo).task;

		if (slvNo === 0) {
			ns.clearLog();
			let sRChance = bb.getActionEstimatedSuccessChance("contract", "Retirement")[0];
			let sBChance = bb.getActionEstimatedSuccessChance("contract", "Bounty Hunter")[0];
			let sTChance = bb.getActionEstimatedSuccessChance("contract", "Tracking")[0];

			let cRCount = bb.getActionCountRemaining("contract", "Retirement");
			let cBCount = bb.getActionCountRemaining("contract", "Bounty Hunter");
			let cTCount = bb.getActionCountRemaining("contract", "Tracking");

			let sTaskL = ns.sleeve.getTask(slvNo).location;
			let sLoc = "This will generate additional contracts and operations";

			if ((sRChance > .9 && cRCount > 10) && (sTask === 'Idle' || sTaskL === sLoc)) {
				//	ns.clearLog();
				gsle.setToBladeburnerAction(slvNo, "Take on contracts", "Retirement");
				ns.print('Sleeve ' + slvNo + ' is performing Retirement.');
			} else if ((sBChance > .9 && cBCount > 10) && (sTask === "Idle" || sTaskL === sLoc)) {
				//	ns.clearLog();
				gsle.setToBladeburnerAction(slvNo, "Take on contracts", "Bounty Hunter");
				ns.print('Sleeve ' + slvNo + ' is Bounty Hunting.');
			} else if ((sTChance > .9 && cTCount > 10) && (sTask === "Idle" || sTaskL === sLoc)) {
				//	ns.clearLog();
				gsle.setToBladeburnerAction(slvNo, "Take on contracts", "Tracking");
				ns.print('Sleeve ' + slvNo + ' is Tracking.');
			} else if (sTask === 'Idle') {
				//	ns.clearLog();
				gsle.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
				ns.print('Sleeve ' + slvNo + ' is infiltrating the Synthoids');
			}
		}

		if ((slvNo === 1 || slvNo === 2 || slvNo === 3 || slvNo === 4 || slvNo === 5) && sTask === "Idle") {
			gsle.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
			ns.print('Sleeve ' + slvNo + ' is infiltrating the Synthoids');
		}

		if ((slvNo === 6 || slvNo === 7) && sTask === "Idle") {
			gsle.setToCommitCrime(slvNo, "Heist");
			ns.print('Sleeve ' + slvNo + ' is commiting a Heist');
		}
		await ns.sleep(1000);
	}
}