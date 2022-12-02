/** @param {NS} ns */
export async function main(ns) {

	ns.disableLog("sleep");

	const gslv = eval("ns.sleeve");	
	const slvNo = ns.args[0];
	const bb = eval("ns.bladeburner");

	while (gslv.getSleeveStats(slvNo).shock > 20 && gslv.getTask(slvNo) === "Idle") {
		ns.clearLog();
		gslv.setToShockRecovery(slvNo);
		ns.print('Sleeve ' + slvNo + ' still in recovery');
		ns.print(gslv.getSleeveStats(slvNo).shock);
		await ns.sleep(60000);
	}

	while (Math.floor(ns.heart.break()) > -54000) {
		ns.clearLog();
		gslv.setToCommitCrime(slvNo, "Homicide");
		ns.print('Sleeve ' + slvNo + ' is commiting a homicide');
		ns.print('Karma: ' + Math.floor(ns.heart.break()));
		await ns.sleep(60000);
	}

	while (true) {

		let sTask = gslv.getTask(slvNo);

		if (slvNo === 0) {

			ns.clearLog();
			let sTChance = bb.getActionEstimatedSuccessChance("contract", "Tracking")[0];
			let cTCount = bb.getActionCountRemaining("contract", "Tracking");

			if ( (sTChance > .9 && cTCount > 100) && (sTask == null) )  {
				//	ns.clearLog();
				gslv.setToBladeburnerAction(slvNo, "Take on contracts", "Tracking");
				ns.print('Sleeve ' + slvNo + ' is Tracking.');
			} else if (sTask == null) {
				//	ns.clearLog();
				gslv.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
				ns.print('Sleeve ' + slvNo + ' is infiltrating the Synthoids');
			}
		}

		if (slvNo === 1) {

			ns.clearLog();
			let sBChance = bb.getActionEstimatedSuccessChance("contract", "Bounty Hunter")[1];
			let cBCount = bb.getActionCountRemaining("contract", "Bounty Hunter");

			if ( (sBChance > .9 && cBCount > 100) && (sTask == null) ) {
				//	ns.clearLog();
				gslv.setToBladeburnerAction(slvNo, "Take on contracts", "Bounty Hunter");
				ns.print('Sleeve ' + slvNo + ' is Bounty Hunting.');
			} else if (sTask == null) {
				//	ns.clearLog();
				gslv.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
				ns.print('Sleeve ' + slvNo + ' is infiltrating the Synthoids');
			}
		}

		if (slvNo === 1) {

			ns.clearLog();
			let sRChance = bb.getActionEstimatedSuccessChance("contract", "Retirement")[2];
			let cRCount = bb.getActionCountRemaining("contract", "Retirement");

			if ((sRChance > .9 && cRCount > 100) && (sTask == null)) {
				//	ns.clearLog();
				gslv.setToBladeburnerAction(slvNo, "Take on contracts", "Retirement");
				ns.print('Sleeve ' + slvNo + ' is performing Retirement.');
			} else if (sTask == null) {
				//	ns.clearLog();
				gslv.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
				ns.print('Sleeve ' + slvNo + ' is infiltrating the Synthoids');
			}
		}

		if ((slvNo === 3 || slvNo === 4 || slvNo === 5) && sTask == null) {
			gslv.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
			ns.print('Sleeve ' + slvNo + ' is infiltrating the Synthoids');
		}

		if ((slvNo === 6 || slvNo === 7) && sTask == null) {
			gslv.setToCommitCrime(slvNo, "Heist");
			ns.print('Sleeve ' + slvNo + ' is commiting a Heist');
		}
		await ns.sleep(1000);
	}
}