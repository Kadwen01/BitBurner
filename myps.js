/** @param {NS} ns **/
import { PrintTable, DefaultStyle, ColorPrint } from 'tables.js'

export async function main(ns) {
	var processes = ns.ps(ns.getHostname());
	if (ns.args[0] != undefined) {
		processes = processes.filter(p => p.filename.search(ns.args[0]) != -1 || p.args.toString().search(ns.args[0]) != -1);
	}

	const columns = [
		{ header: ' File Name', width: 30 },
		{ header: ' PID', width: 10 },
		{ header: ' Params', width: 70 },
	];

	let data = [];
	for (let process of processes) {
		let fName = process.filename;
		let fPid = process.pid;
		let fArg = process.args
		data.push([fName, fPid, fArg]);
	}

	PrintTable(ns, data, columns, DefaultStyle(), ColorPrint);

}