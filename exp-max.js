/** @param {NS} ns */
export async function main(ns) {
    const host = ns.getHostname();
	const availableRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host); 
    const script = "exp-hack.js";
    const scriptRam = ns.getScriptRam(script);
	var maxThreads = Math.floor(availableRam / scriptRam);	 
    ns.exec("exp-hack.js", host, maxThreads, "joesguns");
}