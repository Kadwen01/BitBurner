/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("sleep");
	const { hacknetServers } = ns.formulas;
	const { hacknet } = ns;

	const {
		MaxCores,
		MaxLevel,
		MaxRam,
		MaxCache
	} = hacknetServers.constants();

	const maxValues = {
		cores: MaxCores,
		level: MaxLevel,
		ram: MaxRam,
		cache: MaxCache
	};

	const hnet = ns.hacknet;

	if (ns.getPlayer().money > hnet.getPurchaseNodeCost() && hnet.numNodes() < hnet.maxNumNodes()){
		hnet.purchaseNode();
		ns.print('Purchased a new Hacknet-Server');
	}

	while (true){
		var numHacknetServers = hnet.numNodes();
		var curHash = hnet.numHashes();
		var maxHash = hnet.hashCapacity();

		ns.clearLog()

		ns.print('Current Hashes: ' + ns.nFormat(curHash, "0.00a") + '/'+ ns.nFormat(maxHash, "0.00a"));

		if (curHash === maxHash && !ns.getRunningScript("sell-hash.js")){
				ns.exec("sell-hash.js", 'home')
		}	
	
		if (numHacknetServers < hnet.maxNumNodes()){
			ns.print('Cost for a new Hacknet-Server: ' + ns.nFormat(hnet.getPurchaseNodeCost(),"0.00a"));
		} else {
			ns.print('Max Hacknet-Servers reached');
		}

		for (let i = 0; i < numHacknetServers; i++){

			let nodeLevel = hnet.getNodeStats(i).level;
			let nodeRamUsed = hnet.getNodeStats(i).ramUsed;
			let nodeRam = hnet.getNodeStats(i).ram;
			let nodeCores = hnet.getNodeStats(i).cores;
			let nodeCache = hnet.getNodeStats(i).cache;
			let nodeMult = ns.getPlayer()['hacknet_node_money_mult'];
			
			let nodeLevelUp = hnet.getNodeStats(i).level + 1;
			let nodeRamUp = hnet.getNodeStats(i).ram + 1;
			let nodeCoresUp = hnet.getNodeStats(i).cores + 1;

			if (nodeLevel < maxValues.level){
				var costLevelUp = hnet.getLevelUpgradeCost(i,1);
			} else {
				var costLevelUp = 0;  
			}
			
			if (nodeRam < maxValues.ram){
				var costRamUp = hnet.getRamUpgradeCost(i,1);
			} else {
				var costRamUp = 0;
			}
			
			if (nodeCores < maxValues.cores){		
				var costCoreUp = hnet.getCoreUpgradeCost(i,1);
			} else {
				var costCoreUp = 0;
			}

			if (nodeCache < maxValues.cache){		
				var costCacheUp = hnet.getCacheUpgradeCost(i,1);
			} else {
				var costCacheUp = 0;
			}			
			
			
			let curHashSec = ns.formulas.hacknetServers.hashGainRate(nodeLevel,nodeRamUsed,nodeRam,nodeCores,nodeMult);
			let upHashSec = ns.formulas.hacknetServers.hashGainRate(nodeLevelUp,nodeRamUsed,nodeRamUp,nodeCoresUp,nodeMult);

			let costServerUp = costCoreUp + costLevelUp + costRamUp;
	
			ns.print('Node: ' + i + ' - ' + ns.nFormat(upHashSec - curHashSec, "0.000a") + ' for ' + ns.nFormat(costServerUp, "0.00a"));

			if (ns.getPlayer().money > hnet.getPurchaseNodeCost() && numHacknetServers < hnet.maxNumNodes() ){
				hnet.purchaseNode();
				ns.print('Purchased a new Hacknet-Server');
			}

			if (ns.getPlayer().money > costServerUp) {
				hnet.upgradeCore(i,1);
				hnet.upgradeLevel(i,1);
				hnet.upgradeRam(i,1);
				ns.print('Upgraded Hacknet-Server-' + i + ' by one level');
			}

			if (curHash === maxHash){
				hnet.upgradeCache(i,1);
			}

		}
		await ns.sleep(50);
	}
}