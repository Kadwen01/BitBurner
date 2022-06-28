/** @param {NS} ns */
export async function main(ns) {

	ns.clearLog();
	ns.disableLog("sleep");
	ns.tail(ns.getScriptName);

	const sing = ns.singularity;

	const ovStats = "ov-stats.js";  // Adds Stats to sidebar
	const ovBB = "ov-bb.js"; // adds BB info to sidebar
	const ovSlv = "ov-sleeve.js"; // adds sleeve info to sidebar
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
	const hackScript = "gimme-more-money.js"; // main hacking script
	const ovButtons = "ov-button.js"; //script buttons  in sidebar
	const ovJobs = "ov-jobs.js"; //current jobs in sidebar
	const ov2 = "overview2.js"; // moves overview to sidebar

	const BASIC = [
		ov2,
		ovStats,
		ovBB,
		ovSlv,
		ovButtons,
		ovJobs,
		infScript,
		gangScript,
		corpScript,
		bbScript,
		csScript,
		sleeveScript,
	];

	const INTERMEDIATE = [
		bombScript,
		pservScript,
		hacknetScript,
		spendHash,
		hackScript,
		bdFac
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
				ns.clearLog();
				if (ns.getPlayer().money > sing.getDarkwebProgramCost(prog)) {
					sing.purchaseProgram(prog);
					ns.print("Purchasing " + prog);
				} else {
					ns.print('Waiting to purchase ' + prog + ': ' + ns.nFormat(ns.getPlayer().money, '0.00a') + '/' + ns.nFormat(sing.getDarkwebProgramCost(prog), '0.00a'));
				}
				await ns.sleep(5);
			}
		}
	};

	launchBasicScripts(ns);
	await buyTor(ns);
	await buyProgs(ns);
	launchSpendingScripts(ns);


	let availableRam = ns.getServerMaxRam('home') - ns.getServerUsedRam('home');
	let scriptRam = ns.getScriptRam("stanek-charge.js");
	let maxThreads = Math.floor(availableRam / scriptRam);
	ns.exec("stanek-charge.js", 'home', maxThreads - 10);

}