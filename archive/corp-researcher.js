/** 
 * Researches all the essential researches for a division
 * @param {NS} ns 
 */
 export async function main(ns) {
	ns.disableLog('ALL');
	const divisionName = ns.args[0];
	const corp = eval("ns.corporation");
	const business = corp.getCorporation;
	const divType = () => {
		const division = corp.getDivision(divisionName);
		return division.type;
	}
	

	const SIMPLEINDUSTRIES = ["Agriculture", "Energy", "Utilities", "Fishing", "Mining", "Chemical", "Pharmaceutical", "Computer", "Robotics", "Software", "RealEstate"];
	const PRODUCTINDUSTRIES = ["Food", "Tobacco", "Pharmaceutical", "Computer", "Robotics", "Software", "Healthcare", "RealEstate"];


	if (!divisionName) {
		throw new Error("Division name not defined.");
	}

	const researchNames = {
		lab: 'Hi-Tech R&D Laboratory',
		bluk: 'Bulk Purchasing',
		marketTA1: 'Market-TA.I',
		marketTA2: 'Market-TA.II',
		fulcrum: 'uPgrade: Fulcrum',
		capacity1: 'uPgrade: Capacity.I',
		capacity2: 'uPgrade: Capacity.II',
		dashboard: 'uPgrade: Dashboard',
		overclock: 'Overclock',
		scassemb: "Self-Correcting Assemblers",
		drones: "Drones",
		dronesa: "Drones - Assembly",
		dronest: "Drones - Transport",
		ada: "Automatic Drug Administration",
		goj: "Go-Juice",
		cph4: "CPH4 Injections",
		joy: "JoyWire",
		stim: "Sti.mu",
		apm: "AutoPartyManager",
		abrew: "AutoBrew"
	}



	//set a Simple research and a Production reasearch
	//set logic to pick research order based on division type


	if (PRODUCTINDUSTRIES.includes(divType())){
		var researchOrder = [
			researchNames.lab,
			researchNames.bluk,
			researchNames.marketTA1,
			researchNames.marketTA2,
			researchNames.fulcrum,
			researchNames.capacity1,
			researchNames.capacity2,
			researchNames.dashboard,
			researchNames.overclock,
			researchNames.scassemb,
			researchNames.drones,
			researchNames.dronesa,
			researchNames.dronest,
			researchNames.ada,
			researchNames.goj,
			researchNames.cph4,
			researchNames.joy,
			researchNames.stim,
			researchNames.apm,
			researchNames.abrew
		]
	} else {
		var researchOrder = [
			researchNames.lab,
			researchNames.bluk,
			researchNames.marketTA1,
			researchNames.marketTA2,
			researchNames.overclock,
			researchNames.scassemb,
			researchNames.drones,
			researchNames.dronesa,
			researchNames.dronest,
			researchNames.ada,
			researchNames.goj,
			researchNames.cph4,
			researchNames.joy,
			researchNames.stim,
			researchNames.apm,
			researchNames.abrew
		]
	}	



	const getResearchPoints = () => {
		const division = corp.getDivision(divisionName);
		return division.research;
	}

	const getResearchLeft = () => 
		researchOrder.filter(researchName => !corp.hasResearched(divisionName, researchName));
	
	const interval = 1000;

	while(true) {
		const researchLeft = getResearchLeft();
		if (researchLeft.length < 1) {
			ns.tprint(`All essential research complete for division: ${divisionName}`);
			return;
		}

		const curPoints = getResearchPoints();
		const pendingResearch = researchLeft[0];
		const researchCost = corp.getResearchCost(divisionName, pendingResearch);

		if (curPoints >= researchCost) {
			ns.clearLog();
			ns.print(`SUCCESS Researching ${pendingResearch} @ ${divisionName}`);
			corp.research(divisionName, pendingResearch);
		} else {
			ns.clearLog();
			ns.print(`WARNING Pending ${pendingResearch} @ ${divisionName}`);
		}

		await ns.sleep(interval);
	}
}