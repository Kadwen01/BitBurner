/** @param {NS} ns **/
import { PrintTable, DefaultStyle, ColorPrint } from 'tables.js'
import { GetAllServers } from 'utils2.js';
import { formatMoney } from 'helper.js';

export async function main(ns) {

	let pServ = 'pserv';
	let hServ = 'hacknet';

	let servers = GetAllServers(ns).filter(s => (ns.hasRootAccess(s) && ns.getServerRequiredHackingLevel(s) < ns.getHackingLevel() && ns.getServerMaxMoney(s) > 0 && !(s.includes(pServ) || s.includes(hServ) || s === 'darkweb'))).sort((a, b) => ns.getServerMaxMoney(b) - ns.getServerMaxMoney(a))

	const columns = [
		{ header: ' Server', width: 22 },
		{ header: ' Money', width: 10 },
		{ header: ' Max Money', width: 10 },
	];

	let data = [];
	for (let s of servers) {
		let maxMoney = formatMoney(ns.getServerMaxMoney(s));
		let curMoney = formatMoney(ns.getServerMoneyAvailable(s))
		data.push([s, curMoney, maxMoney])
	}

	PrintTable(ns, data, columns, DefaultStyle(), ColorPrint);

}