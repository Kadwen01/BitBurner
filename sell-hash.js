/** @param {NS} ns */
export async function main(ns) {

	const hnet = ns.hacknet;
	const maxValuesCache = ns.formulas.hacknetServers.constants().MaxCache;

	function upgradeHash(ns) {

		var numHacknetServers = hnet.numNodes();

		for (let i = 0; i < numHacknetServers; i++) {

			let nodeCache = hnet.getNodeStats(i).cache;

			if (nodeCache < maxValuesCache) {
				var costCacheUp = hnet.getCacheUpgradeCost(i, 1);
			} else {
				var costCacheUp = 0;
			}

			if (ns.getPlayer().money > costCacheUp) {
				hnet.upgradeCache(i, 1);
				ns.print('Upgraded Hacknet-Server-' + i + ' Cache storage by one level');
			}
		}
	}


	async function sellForBB(ns) {

		while (ns.hacknet.numHashes() > ns.hacknet.hashCost("Exchange for Bladeburner SP") && ns.getPlayer().inBladeburner) {
			ns.clearLog();
			ns.print('Purchasing Bladeburner SP')
			ns.hacknet.spendHashes("Exchange for Bladeburner SP")
			await ns.sleep(5);
		}

		while (ns.hacknet.numHashes() > ns.hacknet.hashCost("Exchange for Bladeburner Rank") && ns.getPlayer().inBladeburner) {
			ns.clearLog();
			ns.print('Purchasing Bladeburner Rank')
			ns.hacknet.spendHashes("Exchange for Bladeburner Rank")
			await ns.sleep(5);
		}

		if (ns.hacknet.numHashes() > ns.hacknet.hashCost("Exchange for Bladeburner Rank") || ns.hacknet.numHashes() > ns.hacknet.hashCost("Exchange for Bladeburner SP")) {
			ns.clearLog();
			ns.hacknet.spendHashes("Sell for Money")
			ns.print('Spending Hashs on money');
		}

		if (curHash > maxHash * 0.9) {
			upgradeHash(ns);
		}
		await ns.sleep(5);
	}

	async function sellForCash(ns) {
		while (ns.hacknet.numHashes() > 4) {
			ns.hacknet.spendHashes("Sell for Money")
			await ns.sleep(5);
		}
	}

	while (true) {

		var curHash = hnet.numHashes();
		var maxHash = hnet.hashCapacity();
    var prodHash = 0;
    var numHacknetServers = hnet.numNodes();
    
    for (let i = 0; i < numHacknetServers; i++) {
      prodHash += hnet.getNodeStats(i).production;
    }

		ns.disableLog("sleep");
		ns.clearLog();
    ns.print('Current Number of Nodes: ' + numHacknetServers);
    ns.print('Current Hash gain rate: ' + ns.formatNumber(prodHash,3) + '/s');
		ns.print('Current Hashes: ' + ns.formatNumber(curHash, 3) + '/' + ns.formatNumber(maxHash, 2));

		if (ns.getPlayer().inBladeburner) {
			await sellForBB(ns);
		} else {
			await sellForCash(ns);
		}
		await ns.sleep(5);
	}

}