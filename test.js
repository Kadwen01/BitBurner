/** @param {NS} ns **/
import { formatMoney } from "/helper.js"
export async function main(ns) {

	ns.clearLog();
	ns.tail(ns.getScriptName);
	let cJob = ns.getPlayer().jobs

	ns.print(ns.getPlayer().jobs);
	ns.print(Object.keys(cJob));


	ns.print(' ');
	ns.print(Object.keys(cJob)[0]);
	ns.print(' ');



	ns.print(cJob['ECorp']);

	ns.print(cJob[Object.keys(cJob)[0]]);


	for (let job in cJob) {

		ns.print(job + ': ' + cJob[job]);

	}
}