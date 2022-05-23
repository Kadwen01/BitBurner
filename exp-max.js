/** @param {NS} ns */
export async function main(ns) {
    const host = ns.getHostname();
	const availableRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host); 
    const scriptRam = ns.getScriptRam("exp-hack.js");
	var maxThreads = Math.floor(availableRam / scriptRam) - 3;	 
    ns.exec("exp-hack.js", host, maxThreads, "n00dles");
}