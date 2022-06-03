/** @param {NS} ns */
export async function main(ns) {


		const gsle = ns.sleeve;
		const slvNo = ns.args[0];


		while (gsle.getSleeveStats(slvNo).shock > 0){
			ns.clearLog();
			gsle.setToShockRecovery(slvNo);
			ns.print('Sleeve ' + slvNo + ' still in recovery');
			ns.print(gsle.getSleeveStats(slvNo).shock);
			await ns.sleep(1000);
		} 

		while (gsle.getSleeveStats(slvNo).sync < 100){
			ns.clearLog();
			gsle.setToSynchronize(slvNo);
			ns.print('Sleeve ' + slvNo + ' still syncing');
			ns.print(gsle.getSleeveStats(slvNo).sync);
			await ns.sleep(1000);
		}

		while (ns.getPlayer().strength < 850){
			ns.clearLog();
			gsle.setToGymWorkout(slvNo, "powerhouse gym", "Strength");
			ns.print('Sleeve ' + slvNo + ' is pumping iron');
			ns.print(gsle.getSleeveStats(slvNo).strength);
			await ns.sleep(1000);
		}

		while (ns.getPlayer().defense < 850){
			ns.clearLog();
			gsle.setToGymWorkout(slvNo, "powerhouse gym", "Defense");
			ns.print('Sleeve ' + slvNo + ' is getting tougher');
			ns.print(gsle.getSleeveStats(slvNo).defense);
			await ns.sleep(1000);
		}

		while (ns.getPlayer().dexterity < 850){
			ns.clearLog();
			gsle.setToGymWorkout(slvNo, "powerhouse gym", "Dexterity ");
			ns.print('Sleeve ' + slvNo + ' is trying to be more nimble');
			ns.print(gsle.getSleeveStats(slvNo).dexterity);
			await ns.sleep(1000);
		}

		while (ns.getPlayer().agility < 850){
			ns.clearLog();
			gsle.setToGymWorkout(slvNo, "powerhouse gym", "Agility");
			ns.print('Sleeve ' + slvNo + ' is getting quicker');
			ns.print(gsle.getSleeveStats(slvNo).agility);
			await ns.sleep(1000);
		}

		while (Math.floor(ns.heart.break()) > -54000){
			ns.clearLog();		
			gsle.setToCommitCrime(slvNo, "Homicide");
			ns.print('Sleeve ' + slvNo + ' is commiting a homicide');
			ns.print('Karma: ' + Math.floor(ns.heart.break()));
			await ns.sleep(1000);
		}

		while (ns.getPlayer().hacking < 220){
			ns.clearLog();

			if (ns.getPlayer().money < 1e8){
				gsle.setToUniversityCourse(slvNo, "Rothman University", "Study Computer Science");
				ns.print('Sleve ' + slvNo + ' is studying Computer Science');
			} else {
				gsle.setToUniversityCourse(slvNo, "Rothman University", "Algorithms");
				ns.print('Sleve ' + slvNo + ' is studying Algorithms');				
			}
			await ns.sleep(1000);
		}

		
			ns.clearLog();
			gsle.setToCommitCrime(slvNo, "Heist");
			ns.print('Sleeve ' + slvNo + 'is in a heist');
		
		


	




}