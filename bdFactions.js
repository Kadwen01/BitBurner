/** @param {NS} ns */
export async function main(ns) {

	ns.disableLog("sleep");

	const facServers = [
		"CSEC",
		"avmnite-02h",
		"I.I.I.I",
		"run4theh111z"
	];

	for (let server of facServers) {
		while (!ns.getServer(server).backdoorInstalled) {
			ns.clearLog();
			ns.print('Waiting to backdoor ' + server + " : " + ns.getPlayer().hacking + '/' + ns.getServer(server).requiredHackingSkill);
			if (ns.getPlayer().hacking > ns.getServer(server).requiredHackingSkill) {
				ns.exec("connect-server.js", "home", 1, server);
				await ns.sleep(10000);
				ns.singularity.connect("home");
			};
			await ns.sleep(60000);
		};
	};
}