/** @param {NS} ns */
export async function main(ns) {


	while ( ns.hacknet.numHashes() > 4){
		ns.hacknet.spendHashes("Sell for Money")
		//await ns.sleep(5);
	}

}