/** @param {NS} ns */
export async function main(ns) {
	
	const args = ns.flags([["help", false]]);
	const host = ns.getHostname();
	const script = args._[0];
	//const script = `hack_target.js`;
	const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
	ns.tprintf(`Current max threads on '${host}' for '${script}' is '${threads}'`);
	//ns.exec(script, host, threads);

}