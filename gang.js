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
	]

	while (true) {

		if (!ns.gang.inGang()) {
			while (ns.getPlayer().hacking < ns.getServer('avmnite-02h').requiredHackingSkill) {
				ns.clearLog();
				ns.print('Hacking level to low for avmnite-02h');
				ns.print(ns.getPlayer().hacking + '/' + ns.getServer('avmnite-02h').requiredHackingSkill)
				await ns.sleep(60000);
			}
		}

		if (!ns.gang.inGang() && !ns.getServer("avmnite-02h").backdoorInstalled) {
			if (ns.getPlayer().hacking >= ns.getServer('avmnite-02h').requiredHackingSkill) {
				ns.exec('connect-server.js', 'home', 1, 'avmnite-02h');
				await ns.sleep(5000);
				ns.singularity.connect('home');
			}
		}

		if (!ns.gang.inGang()) {
			while (!ns.singularity.checkFactionInvitations().includes("NiteSec")) {
				await ns.sleep(5000);
			}
		}

		if (!ns.gang.inGang() && ns.singularity.checkFactionInvitations().includes("NiteSec")) {
			ns.singularity.joinFaction("NiteSec");
		}

		while (Math.floor(ns.heart.break()) > -54000) {
			if (!ns.gang.inGang()) {
				ns.gang.createGang("NiteSec");
			}
			await ns.sleep(1000);
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
			ns.gang.setTerritoryWarfare(true);
			

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

				ns.print(memberList[key] + ': Task: ' + ns.gang.getMemberInformation(memberList[key]).task + ' | CHL: ' + ns.nFormat(ns.gang.getMemberInformation(memberList[key]).hack, "0.00a") + ' | CCL: ' + ns.nFormat(ns.gang.getMemberInformation(memberList[key]).str, "0.00a"));

				if (ns.gang.getMemberInformation(memberList[key])?.hack > 100) {
					ns.print('AHack: ' + ns.nFormat(ns.gang.getAscensionResult(memberList[key]).hack, "0.00a"));
				}

				if (ns.gang.getMemberInformation(memberList[key])?.str > 100) {
					ns.print('AStr: ' + ns.nFormat(ns.gang.getAscensionResult(memberList[key]).str, "0.00a"));
				}

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
					if (ns.gang.getAscensionResult(memberList[key]).hack > 2 || ns.gang.getAscensionResult(memberList[key]).str > 2) {
						ns.gang.ascendMember(memberList[key]);
						await ns.sleep(5000);
					}
				}
				ns.print(" ");
			}
		}
		await ns.sleep(5000)
	}
}