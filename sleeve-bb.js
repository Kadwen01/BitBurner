/** @param {NS} ns */
export async function main(ns) {

	ns.disableLog("sleep");

	const gsle = ns.sleeve;
	const slvNo = ns.args[0];
	const bb = ns.bladeburner;

	while (gsle.getSleeveStats(slvNo).shock > 20) {
		ns.clearLog();
		gsle.setToShockRecovery(slvNo);
		ns.print('Sleeve ' + slvNo + ' still in recovery');
		ns.print(gsle.getSleeveStats(slvNo).shock);
		await ns.sleep(60000);
	}

	//while (gsle.getSleeveStats(slvNo).sync < 100) {
	//	ns.clearLog();
	//	gsle.setToSynchronize(slvNo);
	//	ns.print('Sleeve ' + slvNo + ' still syncing');
	//	ns.print(gsle.getSleeveStats(slvNo).sync);
	//	await ns.sleep(30000);
	//}

	while (Math.floor(ns.heart.break()) > -54000) {
		ns.clearLog();
		gsle.setToCommitCrime(slvNo, "Homicide");
		ns.print('Sleeve ' + slvNo + ' is commiting a homicide');
		ns.print('Karma: ' + Math.floor(ns.heart.break()));
		await ns.sleep(60000);
	}

	while (true) {

		while (bb.getCityChaos(gsle.getInformation(slvNo).city) > 1) {
			ns.clearLog();
			gsle.setToBladeburnerAction(slvNo, "Diplomacy");
			ns.print('Sleeve ' + slvNo + ' is attempting diplomacy :' + bb.getCityChaos(gsle.getInformation(slvNo).city));
			await ns.sleep(60000);
		}

		if (slvNo === 0) {
			while (bb.getActionEstimatedSuccessChance("contract", "Retirement")[0] > .9 && bb.getActionCountRemaining("contract", "Retirement") > 10) {
				ns.clearLog();
				let rdelay = bb.getActionTime("contract", "Retirement");
				bb.getActionEstimatedSuccessChance("contract", "Retirement")
				gsle.setToBladeburnerAction(slvNo, "Take on contracts", "Retirement");
				ns.print(rdelay + 2000);
				ns.print('Sleeve ' + slvNo + ' is performing Retirement.');
				await ns.sleep(rdelay * 1.25);
			}
			while (bb.getActionEstimatedSuccessChance("contract", "Bounty Hunter")[0] > .9 && bb.getActionCountRemaining("contract", "Bounty Hunter") > 10) {
				ns.clearLog();
				let bhdelay = bb.getActionTime("contract", "Bounty Hunter");
				bb.getActionEstimatedSuccessChance("contract", "Bounty Hunter")
				gsle.setToBladeburnerAction(slvNo, "Take on contracts", "Bounty Hunter");
				ns.print('Sleeve ' + slvNo + ' is Bounty Hunting.');
				await ns.sleep(bhdelay * 1.25);
			}
			while (bb.getActionEstimatedSuccessChance("contract", "Tracking")[0] > .9 && bb.getActionCountRemaining("contract", "Tracking") > 10) {
				ns.clearLog();
				let tdelay = bb.getActionTime("contract", "Tracking");
				bb.getActionEstimatedSuccessChance("contract", "Tracking")
				gsle.setToBladeburnerAction(slvNo, "Take on contracts", "Tracking");
				ns.print('Sleeve ' + slvNo + ' is Tracking.');
				await ns.sleep(tdelay *1.25);
			}
			gsle.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
			ns.print('Sleeve ' + slvNo + ' is infiltrating the Synthoids');
			await ns.sleep(30000);
		}

		if (slvNo === 1 || slvNo === 2 || slvNo === 3 || slvNo === 4 || slvNo === 5) {
			gsle.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
			ns.print('Sleeve ' + slvNo + ' is infiltrating the Synthoids');
			await ns.sleep(30000);
		}

		if (slvNo === 6 || slvNo === 7) {
			gsle.setToCommitCrime(slvNo, "Heist");
			ns.print('Sleeve ' + slvNo + ' is commiting a Heist');
			await ns.sleep(60000)
		}
		await ns.sleep(1000);
	}
}