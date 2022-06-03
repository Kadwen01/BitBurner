/** @param {NS} ns */
export async function main(ns) {

	ns.clearLog();

	const sleeveCount = ns.sleeve.getNumSleeves();
	ns.print('Current number of sleeves: ' + sleeveCount);
	ns.tail(ns.getScriptName());

	for (var i = 0; i < sleeveCount; i++) {
		ns.exec("sleeve.js", 'home', 1, i);
	}

}