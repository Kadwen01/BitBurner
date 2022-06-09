/** @param {NS} ns **/
export async function main(ns) {

	ns.clearLog();
	ns.tail(ns.getScriptName);
	
	ns.print(ns.getServer("CSEC").backdoorInstalled);


}