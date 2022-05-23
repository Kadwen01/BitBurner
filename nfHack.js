/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('ALL');

	// Parameters
	const [target, pct = 0.25] = ns.args;

	// Show usage if no parameters were passed
	if (target == undefined) {
		ns.tprint('ERROR: No server specified!');
		ns.tprint('INFO : Usage: v1.js <server> <pct>');
		ns.tprint('INFO :    <server> is the name of the target server');
		ns.tprint('INFO :    <pct> is the 1-based maximum percentage to hack from the target (Optional, default is 25%)');
		return;
	}

	// This script calls 1-liner worker scripts, the following commands create those scripts on the current host
	await CreateScript(ns, 'hack');
	await CreateScript(ns, 'grow');
	await CreateScript(ns, 'weaken');

	await Exploit(ns, target, pct);
}

async function Exploit(ns, server, pct) {
	while (true) {
		// Security
		const minSec = ns.getServerMinSecurityLevel(server);
		const sec = ns.getServerSecurityLevel(server);
		const tsec = Math.ceil((sec - minSec) / 0.05 /* security decrease per thread */);

		// Money
		let money = ns.getServerMoneyAvailable(server);
		if (money <= 0) money = 1; // division by zero safety
		const maxMoney = ns.getServerMaxMoney(server);
		const tmoney = Math.ceil(ns.growthAnalyze(server, maxMoney / money));

		// Hacking
		const thack = Math.floor(ns.hackAnalyzeThreads(server, money) * pct);

		// Report
		ns.print('');
		ns.print(server);
		ns.print('INFO: Money    : ' + ns.nFormat(money, "$0.00a") + ' / ' + ns.nFormat(maxMoney, "$0.00a") + ' (' + (money / maxMoney * 100).toFixed(2) + '%)');
		ns.print('INFO: Security : ' + (sec - minSec).toFixed(2));
		ns.print('INFO: Weaken   : ' + ns.tFormat(ns.getWeakenTime(server)) + ' (t=' + tsec + ')');
		ns.print('INFO: Grow     : ' + ns.tFormat(ns.getGrowTime(server)) + ' (t=' + tmoney + ')');
		ns.print('INFO: Hack     : ' + ns.tFormat(ns.getHackTime(server)) + ' (t=' + thack + ')');
		ns.print('');

		// Check if security is above minimum
		if (sec > minSec) {
			// We need to lower security
			ns.print('INFO: Security is over minimum, we need ' + tsec + ' threads to floor it');
			let pid = await RunScript(ns, 'weaken-once.script', server, tsec);

			ns.print('WARN: Waiting for script completion (' + ns.tFormat(ns.getWeakenTime(server)) + ')');
			await WaitPids(ns, pid);
		}
		else if (money < maxMoney) {
			// We need to grow the server
			ns.print('INFO: Money is under maximum, we need ' + tmoney + ' threads to max it');
			let pid = await RunScript(ns, 'grow-once.script', server, tmoney);

			ns.print('WARN: Waiting for script completion (' + ns.tFormat(ns.getGrowTime(server)) + ')');
			await WaitPids(ns, pid);
		}
		else {
			// Server is ripe for hacking
			ns.print('INFO: Server is ripe for hacking, full hack would require ' + thack + ' threads');
			let pid = await RunScript(ns, 'hack-once.script', server, thack);

			ns.print('WARN: Waiting for script completion (' + ns.tFormat(ns.getHackTime(server)) + ')');
			await WaitPids(ns, pid);
		}
		await ns.sleep(1000);
	}
}

export async function WaitPids(ns, pids) {
	if (!Array.isArray(pids)) pids = [pids];
	for (; ;) {
		let stillRunning = false;
		for (const pid of pids) {
			const process = ns.getRunningScript(pid);
			if (process != undefined) {
				stillRunning = true;
				break;
			}
			await ns.sleep(0);
		}
		if (!stillRunning) return;
		await ns.sleep(5);
	}
}

async function RunScript(ns, scriptName, target, threads) {
	// Find all servers
	const allServers = RecursiveScan(ns);

	// Sort by maximum memory
	allServers.sort((a, b) => ns.getServerMaxRam(b) - ns.getServerMaxRam(a));

	// Find script RAM usage
	const ramPerThread = ns.getScriptRam(scriptName);

	// Find usable servers
	const usableServers = allServers.filter(p => ns.hasRootAccess(p) && ns.getServerMaxRam(p) > 0);

	// Fired threads counter
	let fired = 0;
	const pids = [];

	for (const server of usableServers) {
		// Determin how many threads we can run on target server for the given script
		const availableRam = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
		let possibleThreads = Math.floor(availableRam / ramPerThread);

		// Check if server is already at max capacity
		if (possibleThreads <= 0)
			continue;

		// Lower thread count if we are over target
		if (possibleThreads > threads)
			possibleThreads = threads;

		// Copy script to the server
		if (server != 'home')
			await ns.scp(scriptName, server);

		// Fire the script with as many threads as possible
		ns.print('INFO: Starting script ' + scriptName + ' on ' + server + ' with ' + possibleThreads + ' threads');
		let pid = ns.exec(scriptName, server, possibleThreads, target);
		if (pid == 0)
			ns.print('WARN: Could not start script ' + scriptName + ' on ' + server + ' with ' + possibleThreads + ' threads');
		else
			pids.push(pid);

		fired += possibleThreads;

		if (fired >= threads) break;
	}

	return pids;
}

async function CreateScript(ns, command) {
	await ns.write(command + '-once.script', command + '(args[0])', 'w');
}

function RecursiveScan(ns, root = 'home', found = []) {
	if (!found.includes(root)) {
		found.push(root);
		for (const server of ns.scan(root))
			if (!found.includes(server))
				RecursiveScan(ns, server, found);
	}
	return found;
}