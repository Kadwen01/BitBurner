/** @param {NS} ns **/
export async function main(ns) {

	const availEquip = [
		"NUKE Rootkit",
		"Soulstealer Rootkit",
		"Demon Rootkit",
		"Hmap Node",
		"Jack the Ripper"
	]	

	const augList = [
		"BitWire",
		"Neuralstimulator",
		"DataJack"	
	]

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

	

while (true){	
	
	while (ns.getPlayer().hacking < ns.getServer('avmnite-02h').requiredHackingSkill){
		ns.clearLog();
		ns.print('Hacking level to low for avmnite-02h');
		ns.print(ns.getPlayer().hacking + '/' + ns.getServer('avmnite-02h').requiredHackingSkill)
		await ns.sleep(60000);
	}

	if (!ns.getServer("avmnite-02h").backdoorInstalled){
		if (ns.getPlayer().hacking > ns.getServer('avmnite-02h').requiredHackingSkill) {
			ns.exec('connect-server.js', 'home', 1, 'avmnite-02h');
			await ns.sleep (5000);
			ns.singularity.connect('home');
		}		
	}

	if (!ns.gang.inGang()){
		while (!ns.singularity.checkFactionInvitations().includes("NiteSec")){
			await ns.sleep(5000);
		}
	}

	if (ns.singularity.checkFactionInvitations().includes("NiteSec")){
		ns.singularity.joinFaction("NiteSec");
	}


	if (!ns.gang.inGang()){
		ns.gang.createGang("NiteSec");
	}

	ns.clearLog();



	ns.print(" ");


	if (ns.gang.canRecruitMember()){

		for (let gmName in nameList){
			
			if (ns.gang.getMemberNames().includes(nameList[gmName])){
				continue;
			} else if (ns.gang.canRecruitMember()){
				ns.gang.recruitMember(nameList[gmName]);
				ns.print(nameList[gmName] + ' joined');
				ns.gang.setMemberTask(nameList[gmName],"Train Hacking");
			}
		}
	}
	
	var memberList = ns.gang.getMemberNames();

	for (let key in memberList) {
		
		
		if (ns.gang.getMemberInformation(memberList[key]).task === "Territory Warfare" || ns.gang.getMemberInformation(memberList[key]).task === "Train Hacking" || ns.gang.getMemberInformation(memberList[key]).task === "Unassigned"){
			if (ns.gang.getMemberInformation(memberList[key]).name === "Wedge") {
				if (ns.gang.getMemberInformation(memberList[key]).hack > 2000){
				ns.gang.setMemberTask(memberList[key],"Ethical Hacking");
				} else {
					ns.gang.setMemberTask(memberList[key],"Train Hacking");
				}
			} else {			
				if (ns.gang.getMemberInformation(memberList[key]).hack > 2000){
				ns.gang.setMemberTask(memberList[key],"Money Laundering");
				} else {
					ns.gang.setMemberTask(memberList[key],"Train Hacking");
				}
			}
		}

		//ns.gang.setMemberTask(memberList[key],"Train Combat");


		let currentUpgrades = ns.gang.getMemberInformation(memberList[key]).upgrades;
		let currentAugments = ns.gang.getMemberInformation(memberList[key]).augmentations;
		ns.print(memberList[key] + ': Task: ' + ns.gang.getMemberInformation(memberList[key]).task + ' | CHL: ' + ns.nFormat(ns.gang.getMemberInformation(memberList[key]).hack, "0.00a") + ' | CCL: ' + ns.nFormat(ns.gang.getMemberInformation(memberList[key]).str, "0.00a"));


		if (ns.gang.getMemberInformation(memberList[key])?.hack > 100) {
			ns.print('AHack: ' + ns.nFormat(ns.gang.getAscensionResult(memberList[key]).hack, "0.00a"));
		}

		if (ns.gang.getMemberInformation(memberList[key])?.str > 100) {
			ns.print('AStr: ' + ns.nFormat(ns.gang.getAscensionResult(memberList[key]).str, "0.00a"));
		}		

		if (ns.getPlayer().money > 3e8 && currentUpgrades.length < 5){
			for (let gear in availEquip){
				if (availEquip[gear].includes(currentUpgrades)) {
					ns.gang.purchaseEquipment(memberList[key], availEquip[gear]);
				}
			}
		}

		if (ns.getPlayer().money > 16e9  && currentAugments < 3)
			for (let augs in augList){
				if (augList[augs].includes(currentUpgrades)){
					ns.gang.purchaseEquipment(memberList[key], augList[augs]);
				}
			}
			
		if (ns.gang.getMemberInformation(memberList[key])?.hack > 100) {
			if (ns.gang.getAscensionResult(memberList[key]).hack > 2 || ns.gang.getAscensionResult(memberList[key]).str > 2){
				ns.gang.ascendMember(memberList[key]);
			}
		}

		ns.print(" ");
	}
	await ns.sleep(5000)
}
	
}