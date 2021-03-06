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


	ns.print(servers[0] + ': ' + formatMoney(ns.getServerMaxMoney(servers[0])))

	for (let s of servers) {
		ns.print(s + ': ' + formatMoney(ns.getServerMaxMoney(s)));
	}



}