/**
 * Auto purchase server (lite version) with upgrade support
 * Uses upgradePurchasedServer() instead of deleting servers
 * @param {NS} ns 
 **/
export async function main(ns) {
	ns.disableLog("ALL");
	var homeServ = "home";
	var pRam = 8; // starting purchased ram
	var servPrefix = "pserv-";

	var maxRam = ns.getPurchasedServerMaxRam();
	var maxServers = ns.getPurchasedServerLimit();

	function canPurchaseServer() {
		return ns.getServerMoneyAvailable(homeServ) > ns.getPurchasedServerCost(pRam);
	}

	async function waitForMoney() {
		while (!canPurchaseServer()) {
			await ns.sleep(10000); // wait 10s
		}
	}

	async function upgradeServer(server) {
		var sRam = ns.getServerMaxRam(server);
		if (sRam < pRam) {
			await waitForMoney();
			if (ns.upgradePurchasedServer(server, pRam)) {
				ns.print(`WARN ⬆️ UPGRADED ${server} @ ${pRam}GB`);
			} else {
				ns.print(`ERROR ❌ FAILED TO UPGRADE ${server} @ ${pRam}GB`);
			}
		}
	}

	async function purchaseServer(server) {
		await waitForMoney();
		ns.purchaseServer(server, pRam);
		ns.print(`WARN 💰 PURCHASED ${server} @ ${pRam}GB`);
	}

	async function autoUpgradeServers() {
		var i = 0;
		while (i < maxServers) {
			var server = servPrefix + i;
			if (ns.serverExists(server)) {
				await upgradeServer(server);
			} else {
				await purchaseServer(server);
			}
			i++;
			await ns.sleep(5);
		}
	}

	while (true) {
		ns.print(`INFO Upgrading all servers to ${pRam}GB`);
		await autoUpgradeServers();
		ns.tprintf("SUCCESS Upgraded all servers to " + pRam + "GB");
		if (pRam === maxRam) {
			break;
		}
		// Move up to next tier
		var newRam = pRam * 2;
		pRam = Math.min(newRam, maxRam);
		await ns.sleep(5);
	}

	ns.tprintf('SUCCESS All Servers at max RAM');
}
