/** @param {NS} ns */

export async function main(ns) {

	const flags = ns.flags([
		['install', false]
	]);

	const sing = ns.singularity;
	const corp = eval("ns.corporation");
	const factionInvites = sing.checkFactionInvitations();
	let playerMoney = ns.getPlayer().money;
	let playerMoneyFormated = ns.nFormat(playerMoney, "0.00a");
	let ramUpCost = sing.getUpgradeHomeRamCost();
	let ramUpCostFormated = ns.nFormat(ramUpCost, "0.00a");
	let homeRam = ns.getServerMaxRam("home");
	let homeRamFormated = ns.nFormat(homeRam * 1e9, "0.00b");
	
	const FACTIONS = [
		"Sector-12",
		"CyberSec",
		"The Black Hand",
		"NiteSec",
		"BitRunners",
		"Netburners",
		"Tian Di Hui",
		"Daedalus"
	]

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
	]




	ns.tprintf(" ");

	if (!ns.getPlayer().tor && ns.getPlayer().money > 200000 ){ 
		ns.tprintf("Purchasing TOR browser")
		sing.purchaseTor();
	};

	for ( let prog of PROGRAMS){
		if (!ns.fileExists(prog, 'home')) {
		sing.purchaseProgram(prog);
		ns.tprintf("Purchasing " + prog);
		}
	}




	if (!ns.getPlayer().hasWseAccount && ns.getPlayer().money > 200000000){
		ns.tprintf("Purchasing WSE Account");
		ns.stock.purchaseWseAccount();
	}	

	if (!ns.getPlayer().hasTixApiAccess && ns.getPlayer().money > 5e9){
		ns.tprintf("Purchasing Tix Api");
		ns.stock.purchaseTixApi();
	}

	if (!ns.getPlayer().has4SData && ns.getPlayer().money > 1e9){
		ns.tprintf("Purchasing 4SData");
		ns.stock.purchase4SMarketData();
	}

	if (!ns.getPlayer().has4SDataTixApi && ns.getPlayer().money > 25e9){
		ns.tprintf("Purchasing 4SDataTix Api");
		ns.stock.purchase4SMarketDataTixApi();
	}

	ns.tprintf(" ");

	
	for ( let faction of factionInvites) {
		sing.joinFaction(faction);
		ns.tprintf("Joining: " + faction);
	}

	ns.tprintf(" ");




	if (homeRam < 1073741824) {
	
		ns.tprintf('Currnet home ram: ' + homeRamFormated);

		while (ns.getPlayer().money > sing.getUpgradeHomeRamCost() && ns.getServerMaxRam("home") < 1073741824){
			sing.upgradeHomeRam();
			ns.tprintf('Upgrading ram to: ' + ns.nFormat(ns.getServerMaxRam("home") * 1e9, "0.00b"));			
			await ns.sleep(100);
		}

	} else {
		ns.tprintf("Home ram at max");
	}

	ns.tprintf(" ");

	if (ns.getServer('home').cpuCores < 8) {
		
		ns.tprintf('Current home Cores: ' + ns.getServer('home').cpuCores);

		while  (ns.getServer('home').cpuCores < 8 && ns.getPlayer().money > sing.getUpgradeHomeCoresCost() ){
			sing.upgradeHomeCores();
			ns.tprintf('Upgrading home cores to: ' + ns.getServer('home').cpuCores);
		}
	} else {
		ns.tprintf("Home cores at max");
		ns.tprintf(" ");
	}
	




	ns.tprintf(" ");

	
	ns.tprintf('Currently owned Augments:');
	var ownedAugs = sing.getOwnedAugmentations(true);
	for (let augs of ownedAugs){
		ns.tprintf(' -' + augs);		
	}

	ns.tprintf(" ");

	let joinedFactions = ns.getPlayer().factions;

	for (let fact of joinedFactions.filter((x) => x != "Shadows of Anarchy")){

		var availAugs = sing.getAugmentationsFromFaction(fact);
		let factionRep = sing.getFactionRep(fact);

		ns.tprintf(fact + ': ' + ns.nFormat(factionRep, "0.00a"));
		
		if (factionRep < 1e6 &&  ns.getPlayer().hasCorporation){
			let bribeMill = 1e6*2.5e9;   //  1e9 = 1 faction rep
			corp.bribe(fact, bribeMill, 0);
			ns.tprintf("Bribing " + fact);
		}

		for (let augs of availAugs){
			let augCost = sing.getAugmentationPrice(augs);
			let augRep = sing.getAugmentationRepReq(augs);
			let neededRep = augRep - factionRep;
			if (ownedAugs.includes(augs)){
				continue;
			} else {		
				ns.tprintf(' -' + augs + ' | ' + ns.nFormat(augCost, "0.00a") + ' | ' + ns.nFormat(neededRep, "0.00a" ));
			}

			if (ownedAugs.includes(augs) || playerMoney < augCost || factionRep < augRep){
				continue;
			} else {
				sing.purchaseAugmentation(fact, augs)
				ns.tprintf('Aquireing: ' + augs);
			}
		}
		ns.tprintf(" ");
	}

	if (flags.install) { 
		sing.installAugmentations();
	}

	//sing.destroyW0r1dD43m0n("5.2");	
	
	//sing.workForFaction("Tian Di Hui", "Hacking Contracts", false);

}