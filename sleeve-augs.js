/** @param {NS} ns */
export async function main(ns) {
	
	const gsle = ns.sleeve;
	const slvNo = ns.args[0];
	const availAugs = gsle.getSleevePurchasableAugs(slvNo);


	ns.clearLog();

	
	for (let key of availAugs){
		
		if (ns.getPlayer().money > key.cost){
			ns.print(key.name);
		}
	}
	
	ns.print(" ");

	ns.tail(ns.getScriptName());	

}