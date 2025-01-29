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

	const hackingAugs = [
		"nickofolas Congruity Implant",
		"QLink",
		"ECorp HVMind Implant",
		"BitRunners Neurolink",
		"Neuroreceptor Management Implant",
		"Neuregen Gene Modification",
		"OmniTek InfoLoad",
		"Neural Accelerator",
		"Neuronal Densification",
		"Xanipher",
		"nextSENS Gene Modification",
		"SPTN-97 Gene Modification",
		"Artificial Bio-neural Network Implant",
		"Enhanced Myelin Sheathing",
		"Embedded Netburner Module",
		"Embedded Netburner Module Core Implant",
		"Embedded Netburner Module Core V2 Upgrade",
		"Embedded Netburner Module Core V3 Upgrade",
		"PC Direct-Neural Interface",
		"PC Direct-Neural Interface Optimization Submodule",
		"PC Direct-Neural Interface NeuroNet Injector",
		"The Black Hand",
		"Cranial Signal Processors - Gen I",
		"Cranial Signal Processors - Gen II",
		"Cranial Signal Processors - Gen III",
		"Cranial Signal Processors - Gen IV",
		"Cranial Signal Processors - Gen V",
		"CRTX42-AA Gene Modification",
		"Power Recirculation Core",
		"Embedded Netburner Module Analyze Engine",
		"Embedded Netburner Module Direct Memory Access Upgrade",
		"SmartJaw",
		"PCMatrix",
		"ADR-V2 Pheromone Gene",
		"The Shadow's Simulacrum",
		"Social Negotiation Assistant (S.N.A)",
		"ADR-V1 Pheromone Gene",
		"Neurotrainer III",
		"Neurotrainer II",
		"Neurotrainer I"
	];



	ns.tprintf(" ");

	for (let faction of factionInvites) {
		sing.joinFaction(faction);
		ns.tprintf("Joining: " + faction);
	}

	ns.tprintf(" ");

	if (flags.install) {
		ns.kill('aps.js', 'home');
		ns.kill('hash.js', 'home');
		ns.exec('stonks.js', 'home', 1, 'l');
	}


	if (homeRam < 1073741824) {
		ns.tprintf('Currnet home ram: ' + homeRamFormated);
		while (ns.getPlayer().money > sing.getUpgradeHomeRamCost() && ns.getServerMaxRam("home") < 1073741824) {
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
		while (ns.getServer('home').cpuCores < 8 && ns.getPlayer().money > sing.getUpgradeHomeCoresCost()) {
			sing.upgradeHomeCores();
			ns.tprintf('Upgrading home cores to: ' + ns.getServer('home').cpuCores);
		}
	} else {
		ns.tprintf("Home cores at max");
	}

	ns.tprintf(" ");


	ns.tprintf('Currently owned Augments:');
	var ownedAugs = sing.getOwnedAugmentations(true);
	for (let augs of ownedAugs) {
		ns.tprintf(' -' + augs);
	}

	ns.tprintf(" ");

	let joinedFactions = ns.getPlayer().factions;

	for (let fact of joinedFactions.filter((x) => x != "Shadows of Anarchy")) {

		var availAugs = sing.getAugmentationsFromFaction(fact);
		let factionRep = sing.getFactionRep(fact);

		ns.tprintf(fact + ': ' + ns.nFormat(factionRep, "0.00a"));

		if (factionRep < 1e6 && ns.getPlayer().hasCorporation) {

			if (fact === "Daedalus") {
				let bribeMill = 1e6 * 5e9;   //  1e9 = 1 faction rep
				corp.bribe(fact, bribeMill, 0);
				ns.tprintf("Bribing " + fact);
			} else {
				let bribeMill = 1e6 * 2.5e9;   //  1e9 = 1 faction rep
				corp.bribe(fact, bribeMill, 0);
				ns.tprintf("Bribing " + fact);
			}

			for (let augs of availAugs) {
				let augCost = sing.getAugmentationPrice(augs);
				let augRep = sing.getAugmentationRepReq(augs);
				let neededRep = augRep - factionRep;
				if (ownedAugs.includes(augs)) {
					continue;
				} else {
					ns.tprintf(' -' + augs + ' | ' + ns.nFormat(augCost, "0.00a") + ' | ' + ns.nFormat(neededRep, "0.00a"));
				}

				if (ownedAugs.includes(augs) || playerMoney < augCost || factionRep < augRep) {
					continue;
				} else {
					if (augs.includes(hackingAugs)) {
						sing.purchaseAugmentation(fact, augs)
						ns.tprintf('Aquireing: ' + augs);
					}
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
}