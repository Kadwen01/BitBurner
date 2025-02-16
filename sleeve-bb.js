/** @param {NS} ns */
export async function main(ns) {

	ns.disableLog("sleep");
  
	const gslv = eval("ns.sleeve");
	const slvNo = ns.args[0];
	const bb = eval("ns.bladeburner");
  
	ns.print('start');
  
	while (gslv.getSleeve(slvNo).shock > 50 && gslv.getTask(slvNo) === "Idle") {
	  ns.clearLog();
	  gslv.setToShockRecovery(slvNo);
	  ns.print('Sleeve ' + slvNo + ' still in recovery');
	  ns.print(gslv.getSleeve(slvNo).shock);
	  await ns.sleep(60000);
	}
	ns.print('no shock');
	while (Math.floor(ns.heart.break()) > -54000) {
	  ns.clearLog();
	  gslv.setToCommitCrime(slvNo, "Homicide");
	  ns.print('Sleeve ' + slvNo + ' is commiting a homicide');
	  ns.print('Karma: ' + Math.floor(ns.heart.break()));
	  await ns.sleep(60000);
	}
  
	ns.print('heart broke');
  
	while (true) {
  
	  if (gslv.getTask(slvNo) == null) {
		var sTask = 'IDLE';
	  } else {
		var sTask = gslv.getTask(slvNo).type;
	  }
  
	  if (slvNo === 0) {
  
		ns.clearLog();
  
		let [tlow, thigh] = bb.getActionEstimatedSuccessChance("contract", "Tracking");
		let cTCount = bb.getActionCountRemaining("contract", "Tracking");
  
		ns.print(`Contract: "Tracking" | Success Chance: ${(tlow * 100).toFixed(2)}% - ${(thigh * 100).toFixed(2)}%`);
		ns.print('Tracking Contracts: ' + ns.formatNumber(cTCount, 2));
  
		if ((tlow > .9 && cTCount > 100) && (sTask === 'IDLE' || sTask === "INFILTRATE" || sTask === "CRIME")) {
		  //	ns.clearLog();
		  gslv.setToBladeburnerAction(slvNo, "Take on contracts", "Tracking");
		} else if (sTask === 'IDLE') {
		  //	ns.clearLog();
		  gslv.setToCommitCrime(slvNo, "Heist");
		}
		ns.print('Sleeve Task: ' + sTask);
	  }
  
	  if (slvNo === 1) {
  
		ns.clearLog();
  
		let [blow, bhigh] = bb.getActionEstimatedSuccessChance("contract", "Bounty Hunter");
		let cBCount = bb.getActionCountRemaining("contract", "Bounty Hunter");
  
		ns.print(`Contract: "Bounty Hunter" | Success Chance: ${(blow * 100).toFixed(2)}% - ${(bhigh * 100).toFixed(2)}%`);
		ns.print('Hunter Contracts: ' + ns.formatNumber(cBCount, 2));
  
		if ((blow > .9 && cBCount > 100) && (sTask === 'IDLE' || sTask === "INFILTRATE" || sTask === "CRIME")) {
		  //	ns.clearLog();
		  gslv.setToBladeburnerAction(slvNo, "Take on contracts", "Bounty Hunter");
		} else if (sTask === 'IDLE') {
		  //	ns.clearLog();
		  gslv.setToCommitCrime(slvNo, "Heist");
		}
		ns.print('Sleeve Task: ' + sTask);
	  }
  
	  if (slvNo === 2) {
  
		ns.clearLog();
		let [rlow, rhigh] = bb.getActionEstimatedSuccessChance("contract", "Retirement");
		let cRCount = bb.getActionCountRemaining("contract", "Retirement");
  
		ns.print(`Contract: "Retirement" | Success Chance: ${(rlow * 100).toFixed(2)}% - ${(rhigh * 100).toFixed(2)}%`);
		ns.print('Ret Contracts: ' + ns.formatNumber(cRCount, 2));
  
		if ((rlow > .9 && cRCount > 100) && (sTask === 'IDLE' || sTask === "INFILTRATE" || sTask === "CRIME")) {
		  //	ns.clearLog();
		  gslv.setToBladeburnerAction(slvNo, "Take on contracts", "Retirement");
		} else if (sTask === 'IDLE') {
		  //	ns.clearLog();
		  gslv.setToCommitCrime(slvNo, "Heist");
		}
		ns.print('Sleeve Task: ' + sTask);
	  }
  
	  if (slvNo === 3) {
  
		ns.clearLog();
			  
		gslv.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
		
		ns.print('Sleeve Task: ' + sTask);
  
		ns.kill(ns.getScriptName()[3]);
  
	  }
  
	  await ns.sleep(1000);
	}
  }