/** @param {NS} ns **/
export async function main(ns) {

	ns.clearLog();
	ns.tail(ns.getScriptName);
	

	function LISTS (gangType){
		let a, rj, cj, tj;
		if (gangType){
			a = [
				"BitWire",
				"Neuralstimulator",
				"DataJack"	
			];

			rj = "Ethical Hacking";
			cj = "Money Laundering";
			tj = "Train Hacking";

		} else {
			a = [
				"Bionic Arms",
				"Bionic Legs",
				"Bionic Spine",
				"BrachiBlades",
				"Nanofiber Weave",
				"Synthetic Heart",
				"Synfibril Muscle",
				"Graphene Bone Lacings"	
			];

			rj = "Vigalantie Justice";
			cj = "Traffick Illegal Arms";
			tj = "Train Combat";
		}
		return {a, rj, cj, tj};
	}

	const gangType = !ns.gang.getGangInformation().isHacking;

	const {a, rj, cj, tj} = LISTS(gangType);


	//ns.print(a);
	//ns.print(tj);
	//ns.print(rj);
	//ns.print(cj);


	const otherGangs = ns.gang.getOtherGangInformation();

	for (let key in otherGangs){
		if (key === ns.gang.getGangInformation().faction){
			continue;
		} else {
		ns.print(key + ': ' + ns.gang.getChanceToWinClash(key));
	
		}
	}


}