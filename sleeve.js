/** @param {NS} ns */
export async function main(ns) {

		ns.disableLog("sleep");
		const gsle = ns.sleeve;
		const slvNo = ns.args[0];


		while (gsle.getSleeveStats(slvNo).shock > 20){
			ns.clearLog();
			gsle.setToShockRecovery(slvNo);
			ns.print('Sleeve ' + slvNo + ' still in recovery');
			ns.print(gsle.getSleeveStats(slvNo).shock);
			await ns.sleep(60000);
		} 

		//while (gsle.getSleeveStats(slvNo).sync < 100){
		//	ns.clearLog();
		//	gsle.setToSynchronize(slvNo);
		//	ns.print('Sleeve ' + slvNo + ' still syncing');
		//	ns.print(gsle.getSleeveStats(slvNo).sync);
		//	await ns.sleep(30000);
		//}

		while (Math.floor(ns.heart.break()) > -54000){
			ns.clearLog();	
			gsle.setToCommitCrime(slvNo, "Homicide");
			ns.print('Sleeve ' + slvNo + ' is commiting a homicide');
			ns.print('Karma: ' + Math.floor(ns.heart.break()));
			await ns.sleep(60000);
		}

		if (slvNo === 0) {
			while (ns.getPlayer().strength < 850 && ns.getPlayer().money > 1e9){
				ns.clearLog();
				gsle.setToGymWorkout(slvNo, "powerhouse gym", "Strength");
				ns.print('Sleeve ' + slvNo + ' is pumping iron');
				ns.print(gsle.getSleeveStats(slvNo).strength);
				await ns.sleep(60000);
			}
		}

		if (slvNo === 1){
			while (ns.getPlayer().defense < 850 && ns.getPlayer().money > 1e9){
				ns.clearLog();
				gsle.setToGymWorkout(slvNo, "powerhouse gym", "Defense");
				ns.print('Sleeve ' + slvNo + ' is getting tougher');
				ns.print(gsle.getSleeveStats(slvNo).defense);
				await ns.sleep(60000);
			}
		}

		if (slvNo === 2){
			while (ns.getPlayer().dexterity < 850 && ns.getPlayer().money > 1e9){
				ns.clearLog();
				gsle.setToGymWorkout(slvNo, "powerhouse gym", "Dexterity ");
				ns.print('Sleeve ' + slvNo + ' is trying to be more nimble');
				ns.print(gsle.getSleeveStats(slvNo).dexterity);
				await ns.sleep(60000);
			}
		}

		if (slvNo === 3 ){
			while (ns.getPlayer().agility < 850 && ns.getPlayer().money > 1e9){
				ns.clearLog();
				gsle.setToGymWorkout(slvNo, "powerhouse gym", "Agility");
				ns.print('Sleeve ' + slvNo + ' is getting quicker');
				ns.print(gsle.getSleeveStats(slvNo).agility);
				await ns.sleep(60000);
			}
		}

		if (slvNo === 4) {
			while (ns.getPlayer().strength < 850 && ns.getPlayer().money > 1e9){
				ns.clearLog();
				gsle.setToGymWorkout(slvNo, "powerhouse gym", "Strength");
				ns.print('Sleeve ' + slvNo + ' is pumping iron');
				ns.print(gsle.getSleeveStats(slvNo).strength);
				await ns.sleep(60000);
			}
		}

		if (slvNo === 5){
			while (ns.getPlayer().defense < 850 && ns.getPlayer().money > 1e9){
				ns.clearLog();
				gsle.setToGymWorkout(slvNo, "powerhouse gym", "Defense");
				ns.print('Sleeve ' + slvNo + ' is getting tougher');
				ns.print(gsle.getSleeveStats(slvNo).defense);
				await ns.sleep(60000);
			}
		}

		if (slvNo === 6){
			while (ns.getPlayer().dexterity < 850 && ns.getPlayer().money > 1e9){
				ns.clearLog();
				gsle.setToGymWorkout(slvNo, "powerhouse gym", "Dexterity ");
				ns.print('Sleeve ' + slvNo + ' is trying to be more nimble');
				ns.print(gsle.getSleeveStats(slvNo).dexterity);
				await ns.sleep(60000);
			}
		}

		if (slvNo === 7 ){
			while (ns.getPlayer().agility < 850 && ns.getPlayer().money > 1e9){
				ns.clearLog();
				gsle.setToGymWorkout(slvNo, "powerhouse gym", "Agility");
				ns.print('Sleeve ' + slvNo + ' is getting quicker');
				ns.print(gsle.getSleeveStats(slvNo).agility);
				await ns.sleep(60000);
			}
		}

		while (ns.getPlayer().hacking < 2500 && ns.getPlayer().money > 1e9){
			ns.clearLog();
			gsle.setToUniversityCourse(slvNo, "rothman university", "algorithms");
			ns.print('Taking Algorithms at Rothman University')
			await ns.sleep(60000);
		}

		ns.clearLog();
		gsle.setToCommitCrime(slvNo, "Heist");
		ns.print('Sleeve ' + slvNo + 'is in a heist');
}