/** @param {NS} ns */
export async function main(ns) {

	ns.clearLog();
	ns.disableLog("sleep");
	ns.tail(ns.getScriptName);

	const sing = ns.singularity;

	const ovScript = "overview.js";  // Adds Karma to Overview Window
	const infScript = "infultrate.js"; // Auto Infultrate companies
	const gangScript = "gang.js"; // Gang manger Script
	const corpScript = "corp-startup.js"; // Corporation Manager Script
	const bbScript = "bladeburner.js"; // BladeBurner management Script
	const csScript = "contract-solver.js"; // Contract solver 
	const bombScript = "bomb.js"; // open all ports and nuke for all servers
	const sleeveScript = "sleeve-manager.js"; // run / rerun after joining BB
	const pservScript = "aps-lite.js"; // auto purchase and upgrade Personal Servers
	const hacknetScript = "hash.js"; // auto purchase and upgrade Hacknet-Servers 
	const spendHash = "sell-hash.js"; // spend hasd's
	const bdFac = "bdFactions.js"; // install backdoors on the 4 faction servers

	const BASIC = [
		ovScript,
		infScript,
		gangScript,
		corpScript,
		bbScript,
		csScript,
		sleeveScript
	];

	const INTERMEDIATE = [
		pservScript,
		hacknetScript,
		spendHash
	];

	const PROGRAMS = [
		"BruteSSH.exe",
		"FTPCrack.exe",
		"relaySMTP.exe",
		"HTTPWorm.exe",
		"SQLInject.exe",
		"ServerProfiler.exe",
		"DeepscanV1.exe",
		"DeepscanV2.exe",
		"AutoLink.exe",
		"Formulas.exe"
	];

	function launchBasicScripts(ns) {
		for (let script of BASIC) {
			ns.exec(script, "home");
		}
	};

	function launchSpendingScripts(ns) {
		for (let script of INTERMEDIATE) {
			ns.exec(script, "home");
		}
	};

	async function buyTor(ns) {
		while (!ns.getPlayer().tor) {
			if (ns.getPlayer().money > 200000) {
				ns.singularity.purchaseTor();
				ns.print('TOR purchased');
			}
			await ns.sleep(1000);
		}
	};

	async function buyProgs(ns) {
		for (let prog of PROGRAMS) {
			while (!ns.fileExists(prog, 'home')) {
				if (ns.getPlayer().money > sing.getDarkwebProgramCost(prog)) {
					sing.purchaseProgram(prog);
					ns.print("Purchasing " + prog);
				} else {
					ns.print('Waiting to purchase ' + prog + ': ' + ns.nFormat(ns.getPlayer().money, '0.00a') + '/' + ns.nFormat(sing.getDarkwebProgramCost(prog), '0.00a'));
				}
				await ns.sleep(10000);
			}
		}
	};

	launchBasicScripts(ns);
	await buyTor(ns);
	await buyProgs(ns);
	ns.exec(bombScript, 'home');
	ns.exec(bdFac, 'home');
	launchSpendingScripts(ns);
	ns.exec('gimme-more-money.js', 'home');

	const availableRam = ns.getServerMaxRam('home') - ns.getServerUsedRam('home');
	const script = "test.js";
	const scriptRam = ns.getScriptRam(script);
	var maxThreads = Math.floor(availableRam / scriptRam);
	ns.exec("test.js", 'home', maxThreads - 4);

}