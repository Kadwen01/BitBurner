/** @param {NS} ns **/
import { GetAllServers } from 'utils2.js';
import { formatMoney } from 'helper.js';
export async function main(ns) {

	ns.disableLog("ALL");

	ns.tail(ns.getScriptName());
	ns.clearLog();

	let pServ = 'pserv';
	let hServ = 'hacknet';

	let servers = GetAllServers(ns).filter(s => (ns.hasRootAccess(s) && ns.getServerRequiredHackingLevel(s) < ns.getHackingLevel() && ns.getServerMaxMoney(s) > 0 && !(s.includes(pServ) || s.includes(hServ) || s === 'darkweb'))).sort((a, b) => ns.getServerMaxMoney(b) - ns.getServerMaxMoney(a))
	ns.clearLog();



	const sleeveCount = ns.sleeve.getNumSleeves();

	for (var slvNo = 0; slvNo < sleeveCount; slvNo++) {

		let gslv = ns.sleeve;
		let sleeveJob = ns.sleeve.getTask(slvNo);


		if (sleeveJob == null) {
			ns.print('Sleeve ' + slvNo + ': Idle');
		} else if ((sleeveJob.type == 'INFILTRATE') || (sleeveJob.type == 'RECOVERY') || (sleeveJob.type == 'SUPPORT')) {
			ns.print('Sleeve ' + slvNo + ': ' + gslv.getTask(slvNo).type);
		} else if (sleeveJob.type == 'COMPANY') {
			ns.print('Sleeve ' + slvNo + ': Working for ' + sleeveJob.companyName);
		} else if (sleeveJob.actionType == 'General') {
			ns.print('Sleeve ' + slvNo + ': ' + sleeveJob.actionName);
		} else if (sleeveJob.actionType == 'Contracts') {
			ns.print('Sleeve ' + slvNo + ': Contract type ' + sleeveJob.actionName);
		} else {
			ns.print(sleeveJob);
		}




	}

	ns.sleeve.setToBladeburnerAction(0, "Take on contracts", "Tracking");
	ns.sleeve.setToBladeburnerAction(1, "Take on contracts", "Bounty Hunter");
	ns.sleeve.setToBladeburnerAction(2, "Take on contracts", "Retirement");



}