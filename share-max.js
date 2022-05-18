/** @param {NS} ns */
export async function main(ns) {
    const host = ns.getHostname();
	const availableRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host); 
	const scriptRam = ns.getScriptRam("share.js");
	var maxThreads = Math.floor(availableRam / scriptRam);	 

    while (true) {
        ns.exec("share.js", host, maxThreads);
        await ns.sleep(10001);
    }	
}