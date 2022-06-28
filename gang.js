/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("sleep");

	function LISTS(gangType) {
		let availEquip, augList, rj, cj, tj;

		if (gangType) {

			augList = [
				"BitWire",
				"Neuralstimulator",
				"DataJack"
			];

			availEquip = [
				"NUKE Rootkit",
				"Soulstealer Rootkit",
				"Demon Rootkit",
				"Hmap Node",
				"Jack the Ripper"
			];

			rj = "Ethical Hacking";
			cj = "Money Laundering";
			tj = "Train Hacking";

		} else {

			augList = [
				"Bionic Arms",
				"Bionic Legs",
				"Bionic Spine",
				"BrachiBlades",
				"Nanofiber Weave",
				"Synthetic Heart",
				"Synfibril Muscle",
				"Graphene Bone Lacings"
			];

			availEquip = [
				"Baseball Bat",
				"Katana",
				"Glock 18C",
				"P90C",
				"Steyr AUG",
				"AK-47",
				"M15A10 Assault Rifle",
				"AWM Sniper Rifle",
				"Bulletproof Vest",
				"Full Body Armor",
				"Liquid Body Armor",
				"Graphene Plating Armor",
				"Ford Flex V20",
				"ATX1070 Superbike",
				"Mercedes-Benz S9001",
				"White Ferrari"
			];

			rj = "Vigilante Justice";
			cj = "Traffick Illegal Arms";
			tj = "Train Combat";
		}
		return { augList, availEquip, rj, cj, tj };
	}

	const nameList = [
		"Wedge",
		"Biggs",
		"Kadwen",
		"NuNu",
		"Shepard",
		"Rand",
		"Matt",
		"Perin",
		"Jeb",
		"Obi-Wan",
		"Stoogie",
		"Forest"
	];

	while (true) {

		if (!ns.gang.inGang()) {

			while (ns.getPlayer().hacking < ns.getServer('avmnite-02h').requiredHackingSkill) {
				ns.clearLog();
				ns.print('Hacking level to low for avmnite-02h');
				ns.print(ns.getPlayer().hacking + '/' + ns.getServer('avmnite-02h').requiredHackingSkill)
				await ns.sleep(60000);
			}

			ns.exec('connect-server.js', 'home', 1, 'avmnite-02h');
			await ns.sleep(5000);
			ns.singularity.connect('home');

			if (!ns.getPlayer().factions.includes('NiteSec')) {
				while (!ns.singularity.checkFactionInvitations().includes("NiteSec")) {
					ns.clearLog();
					ns.print('Waiting on NitSec invite');
					await ns.sleep(5000);
				}
				ns.clearLog();
				ns.singularity.joinFaction("NiteSec");
				ns.print('Joining NiteSec');
			}

			while (Math.floor(ns.heart.break()) > -54000) {
				ns.clearLog();
				ns.print(Math.floor(ns.heart.break()) + '/-54,000');
				ns.print('Need more Karam to create the gang with NiteSec');
				await ns.sleep(1000);
			}

			ns.gang.createGang('NiteSec');
			ns.print('Joining NiteSec Gang');
		}

		ns.clearLog();

		const gangType = ns.gang.getGangInformation().isHacking;
		const fact = ns.gang.getGangInformation().faction;
		const { augList, availEquip, rj, cj, tj } = LISTS(gangType);

		if (ns.gang.canRecruitMember()) {
			for (let gmName in nameList) {
				if (ns.gang.getMemberNames().includes(nameList[gmName])) {
					continue;
				} else if (ns.gang.canRecruitMember()) {
					ns.gang.recruitMember(nameList[gmName]);
					ns.print(nameList[gmName] + ' joined');
					ns.gang.setMemberTask(nameList[gmName], tj);
				}
			}
		}

		var memberList = ns.gang.getMemberNames();

		if (memberList.length === 12 && ns.gang.getGangInformation().territory < 0.99) {
			ns.print('Preparing for war');
			var otherGangs = ns.gang.getOtherGangInformation();

			for (let gangName in otherGangs) {
				if (gangName === fact || otherGangs[gangName].territory === 0) {
					continue
				} else {
					ns.print(gangName + ': power: ' + otherGangs[gangName].power + ' territory: ' + otherGangs[gangName].territory);
				}
			}

			for (let key in memberList) {
				if (ns.gang.getMemberInformation(memberList[key]).task === "Territory Warfare") {
					continue;
				} else {
					ns.gang.setMemberTask(memberList[key], "Territory Warfare");
				}
			}

			let slumSnakes = ns.gang.getChanceToWinClash("Slum Snakes");
			let tetrads = ns.gang.getChanceToWinClash("Tetrads");
			let theSyndicate = ns.gang.getChanceToWinClash("The Syndicate");
			let theDarkArmy = ns.gang.getChanceToWinClash("The Dark Army");
			let speakersfortheDead = ns.gang.getChanceToWinClash("Speakers for the Dead");
			let theBlackHand = ns.gang.getChanceToWinClash("The Black Hand");

			let gangWarChance = slumSnakes > .85 && tetrads > .85 && theSyndicate > .85 && theDarkArmy > .85 && speakersfortheDead > .85 && theBlackHand > .85;

			if (gangWarChance) {
				ns.print("Gearing Up...")
				ns.gang.setTerritoryWarfare(true);
			}

		} else {
			ns.gang.setTerritoryWarfare(false);
			for (let key in memberList) {
				if (ns.gang.getMemberInformation(memberList[key]).task === "Territory Warfare" || ns.gang.getMemberInformation(memberList[key]).task === "Train Hacking" || ns.gang.getMemberInformation(memberList[key]).task === "Train Combat" || ns.gang.getMemberInformation(memberList[key]).task === "Unassigned") {
					if (ns.gang.getMemberInformation(memberList[key]).name === "Wedge") {
						if (ns.gang.getMemberInformation(memberList[key]).hack > 4000 || ns.gang.getMemberInformation(memberList[key]).str > 4000) {
							ns.gang.setMemberTask(memberList[key], rj);
						} else {
							ns.gang.setMemberTask(memberList[key], tj);
						}
					} else {
						if (ns.gang.getMemberInformation(memberList[key]).hack > 4000 || ns.gang.getMemberInformation(memberList[key]).str > 4000) {
							ns.gang.setMemberTask(memberList[key], cj);
						} else {
							ns.gang.setMemberTask(memberList[key], tj);
						}
					}
				}

				let currentUpgrades = ns.gang.getMemberInformation(memberList[key]).upgrades;
				let currentAugments = ns.gang.getMemberInformation(memberList[key]).augmentations;

				let curCCL = (ns.gang.getMemberInformation(memberList[key]).str + ns.gang.getMemberInformation(memberList[key]).agi + ns.gang.getMemberInformation(memberList[key]).dex + ns.gang.getMemberInformation(memberList[key]).dex) / 4;

				ns.print(memberList[key] + ': Task: ' + ns.gang.getMemberInformation(memberList[key]).task + ' | CHL: ' + ns.nFormat(ns.gang.getMemberInformation(memberList[key]).hack, "0.00a") + ' | CCL: ' + ns.nFormat(curCCL, "0.00a"));

				if (ns.getPlayer().money > 3e8 && currentUpgrades.length < 16) {
					for (let gear in availEquip) {
						if (availEquip[gear].includes(currentUpgrades)) {
							ns.gang.purchaseEquipment(memberList[key], availEquip[gear]);
						}
					}
				}

				if (ns.getPlayer().money > 16e9 && currentAugments < 8)
					for (let augs in augList) {
						if (augList[augs].includes(currentUpgrades)) {
							ns.gang.purchaseEquipment(memberList[key], augList[augs]);
						}
					}

				if (ns.gang.getMemberInformation(memberList[key])?.hack > 100 || ns.gang.getMemberInformation(memberList[key])?.str > 100) {

					function CalculateAscendTreshold(ns, member) {
						let metric = gangType ? 'hack_asc_mult' : 'str_asc_mult';
						let mult = ns.gang.getMemberInformation(member)[metric];
						if (mult < 1.632) return 1.6326;
						if (mult < 2.336) return 1.4315;
						if (mult < 2.999) return 1.284;
						if (mult < 3.363) return 1.2125;
						if (mult < 4.253) return 1.1698;
						if (mult < 4.860) return 1.1428;
						if (mult < 5.455) return 1.1225;
						if (mult < 5.977) return 1.0957;
						if (mult < 6.496) return 1.0869;
						if (mult < 7.008) return 1.0789;
						if (mult < 7.519) return 1.073;
						if (mult < 8.025) return 1.0673;
						if (mult < 8.513) return 1.0631;
						return 1.0591;
					}

					const ascensionResult = ns.gang.getAscensionResult(memberList[key]);

					if (memberList.length > 11) {
						let threshold = CalculateAscendTreshold(ns, memberList[key]);
						ns.print(ascensionResult?.hack + '/' + threshold);
						if (gangType && ascensionResult?.hack >= threshold ||
							(!gangType && (ascensionResult?.agi >= threshold || ascensionResult?.str >= threshold || ascensionResult?.def >= threshold || ascensionResult?.dex >= threshold))) {
							ns.gang.ascendMember(memberList[key]);
							ns.print(`Ascending ${memberList[key]}!`);
						}
					} else {
						ns.print(ascensionResult?.hack + '/2');

						if (ascensionResult?.hack > 2 || ascensionResult?.str > 2) {
							ns.gang.ascendMember(memberList[key]);
							await ns.sleep(50);
						}
					}
				}
				ns.print(" ");
			}
		}
		await ns.sleep(500)
	}
}