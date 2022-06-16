/** @param {NS} ns */
export async function main(ns) {
    const host = ns.getHostname();
	const availableRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host); 
    const script = "test.js";
    const scriptRam = ns.getScriptRam(script);
	var maxThreads = Math.floor(availableRam / scriptRam);	 
    ns.exec("test.js", host, maxThreads);
    //ns.exec("exp-hack.js", host, maxThreads, "joesguns");
}