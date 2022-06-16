/** @param {NS} ns **/
export async function main(ns) {

	ns.clearLog();
	ns.tail(ns.getScriptName);


	function LISTS(gangType) {
		let a, rj, cj, tj;
		if (gangType) {
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
		return { a, rj, cj, tj };
	}

	const gangType = !ns.gang.getGangInformation().isHacking;

	const { a, rj, cj, tj } = LISTS(gangType);


	//ns.print(a);
	//ns.print(tj);
	//ns.print(rj);
	//ns.print(cj);


	let slumSnakes = ns.gang.getChanceToWinClash("Slum Snakes");
	let tetrads = ns.gang.getChanceToWinClash("Tetrads");
	let theSyndicate = ns.gang.getChanceToWinClash("The Syndicate");
	let theDarkArmy = ns.gang.getChanceToWinClash("The Dark Army");
	let speakersfortheDead = ns.gang.getChanceToWinClash("Speakers for the Dead");
	let theBlackHand = ns.gang.getChanceToWinClash("The Black Hand");

	let gangWarChance = slumSnakes > .85 && tetrads > .85 && theSyndicate > .85 && theDarkArmy > .85 && speakersfortheDead > .85 && theBlackHand > .85;

	if (gangWarChance) {
		ns.print(slumSnakes);
		ns.print(tetrads);
		ns.print(theSyndicate);
		ns.print(theDarkArmy);
		ns.print(speakersfortheDead);
		ns.print(theBlackHand);
	}
}