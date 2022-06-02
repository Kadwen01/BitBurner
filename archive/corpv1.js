/** @param {NS} ns **/
export async function main(ns) {

	//*****Variable Assignemnts */

	const script = ns.getScriptName;

	const flags = ns.flags([
		['research', false]
	]);	

	const corp = ns.corporation;
	const business = corp.getCorporation;
	const warehouse = corp.getWarehouse;
	const office = corp.getOffice;
	const curDivNum = business().divisions.length;  //Current number of Divisions in the Corp
	const divName = ns.args[0]; // sets what division we are going to be looking at 
	const availFunds = ns.nFormat(business().funds, "0.00a");
	//throws an error if no division is set 
	if (!divName) {
		ns.tprint("ERROR Insufficient arguments\nUsage: run " + script + " <diviName> [<reqEmp>]");
		return;
	}  

	const MATERIALS = ["Energy", "Hardware", "Robots", "AI Cores", "Real Estate"];
	const ALL_CITIES = ["Aevum", "Chongqing", "Sector-12", "New Tokyo", "Ishima", "Volhaven"];
	const SIMPLEINDUSTRIES = ["Agriculture", "Energy", "Utilities", "Fishing", "Mining", "Chemical", "Pharmaceutical", "Computer", "Robotics", "Software", "RealEstate"];
	const PRODUCTINDUSTRIES = ["Food", "Tobacco", "Pharmaceutical", "Computer", "Robotics", "Software", "Healthcare", "RealEstate"];

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
		dronest: "Drones - Transport"
	}

	const JOB_TYPE = {
	ops: "Operations",
	eng: "Engineer",
	bus: "Business",
	mgt: "Management",
	dev: "Research & Development",
	trn: "Training"
	}


	//******Main Logic */

	ns.tprintf(" ");
	ns.tprintf(" ");

	ns.tprintf("Current Funds: " + availFunds);
	ns.tprintf("Revenue: " + ns.nFormat(business().revenue, "0.00a"));
	
	ns.tprintf(" ");

	ns.tprintf('Total Divisions: ' + curDivNum);

	for (let i = 0; i < curDivNum; i++) {
		ns.tprintf(business().divisions[i].type + " Division: " + business().divisions[i].name);
	}	
	
	ns.tprintf(" ");
	ns.tprintf("___________________");
	ns.tprintf("Industries:");
	ns.tprintf(" ");


	var prodDisco = [];	
	for (let i = 0; i < curDivNum; i++){

		let divName = business().divisions[i].name;
		if (PRODUCTINDUSTRIES.includes(business().divisions[i].type)) {
			ns.tprintf(divName + ' products:')
			ns.tprintf("___________________");
			for (let key in business().divisions[i].products) {
				let demand = corp.getProduct(divName, business().divisions[i].products[key]).dmd;
				let compition = corp.getProduct(divName, business().divisions[i].products[key]).cmp;
				let holding = demand / compition;
				ns.tprintf(business().divisions[i].products[key]);
				ns.tprintf("   Demand: " + ns.nFormat(demand, "0.00a"));
				ns.tprintf("   Competition: " + ns.nFormat(compition, "0.00a"));
				ns.tprintf("Market Holding: " + ns.nFormat(holding, "0.00a"));
				ns.tprintf(" ");
				if (holding < 1) {
					prodDisco.push(business().divisions[i].products[key]);
				}
			}
			ns.tprintf("Products to recode:");
			for (let prod of prodDisco){
				ns.tprintf(` -` + prod);
			}
		}
		ns.tprintf(" ");

	}
	ns.tprintf(" ");
	ns.tprintf("___________________");


	ns.tprintf("Suppliers:");
	ns.tprintf(" ");

	for (let i = 0; i < curDivNum; i++){
		let divName = business().divisions[i].name;
		if (SIMPLEINDUSTRIES.includes(business().divisions[i].type)) {
			ns.tprintf(divName)
			ns.tprintf("___________________");
			for (let key in business().divisions[i].products) {

			}
		}
	}




	ns.tprintf(" ");
	ns.tprintf("___________________");

	ns.tprintf("HR Stuff:");
	ns.tprintf(" ");

	// setting Employee Allocation per job type


	for (let city of ALL_CITIES) {
		ns.tprintf('City Name: ' + city);
		let curEmp = office(divName, city).employees.length; // Current number of employees in the division
		let reqEmp = ns.args[1] || curEmp;  // sets the target number of employee's to current number if no new target is set
		let reqSize = Math.max(office(divName, city).size, reqEmp);
		let sizeToBuy = reqEmp - office(divName, city).size;
		let empToHire = reqEmp - curEmp;

		if (office(divName, city).size < reqSize) {
			corp.upgradeOfficeSize(divName, city, sizeToBuy)
		}
		ns.tprint(curEmp);
		if (flags.research) {
				var trnPos = 0;
				var opsPos = 0;
				var engPos = 0;
				var mgtPos = 0;
				var busPos = 0;
				var devPos = curEmp;

		} else if (reqEmp >= 10 && reqEmp < 100) {
				var trnPos = 0;
				var opsPos = Math.floor(reqEmp * 0.5);
				var engPos = Math.floor(reqEmp * 0.3);
				var mgtPos = Math.floor(reqEmp * 0.2);
				var busPos = 0;
				var devPos = 0;
		} else {
				var trnPos = 0;
				var opsPos = Math.floor(reqEmp * 0.55);
				var engPos = Math.floor(reqEmp * 0.2);
				var mgtPos = Math.floor(reqEmp * 0.1);
				var busPos = Math.floor(reqEmp * 0.05);
				var devPos = Math.floor(reqEmp * 0.1);
		}	


		ns.tprintf(`Current Emp: ` + curEmp);
		ns.tprintf(`Open Positions: ` + empToHire);
		ns.print(`pre loop emp: ` + curEmp);	
		while (curEmp < reqEmp){
			corp.hireEmployee(divName,city);
			curEmp++;
			ns.print(`Emp after hire: ` + curEmp);	
			await ns.sleep(200);
		}

		const lazy = office(divName, city).employeeJobs.Unassigned;	
		const train = office(divName, city).employeeJobs.Training;
		ns.tprintf('Lazy: ' + lazy);
		ns.tprintf('In Training: '+ train);
		if (lazy > 0 || train > 0 || flags.research) {
			await corp.setAutoJobAssignment(divName, city, JOB_TYPE.dev, devPos);
			await corp.setAutoJobAssignment(divName, city, JOB_TYPE.trn, trnPos);
			await corp.setAutoJobAssignment(divName, city, JOB_TYPE.ops, opsPos); 
			ns.tprintf(`Successfully allocated ${opsPos} employees to Operations in ${divName}: ${city}`);
			await corp.setAutoJobAssignment(divName, city, JOB_TYPE.eng, engPos);
			ns.tprintf(`Successfully allocated ${engPos} employees to Engineer in ${divName}: ${city}`);
			await corp.setAutoJobAssignment(divName, city, JOB_TYPE.bus, busPos);
			ns.tprintf(`Successfully allocated ${busPos} employees to Business in ${divName}: ${city}`);
			await corp.setAutoJobAssignment(divName, city, JOB_TYPE.mgt, mgtPos);
			ns.tprintf(`Successfully allocated ${mgtPos} employees to Management in ${divName}: ${city}`);
			await corp.setAutoJobAssignment(divName, city, JOB_TYPE.dev, devPos);
			ns.tprintf(`Successfully allocated ${devPos} employees to R&D in ${divName}: ${city}`);
		}
		
		ns.tprintf(" ");
		ns.tprintf('Warehouse level: ' + warehouse(divName,city).level);
		if (warehouse(divName,city).level < 300){
			let neededSpace = 300 - warehouse(divName,city).level;
			corp.upgradeWarehouse(divName, city, neededSpace); 
		}
		ns.tprintf('Warehouse level: ' + warehouse(divName,city).level);
		corp.bulkPurchase(divName, city, "Hardware", "8000");
		corp.bulkPurchase(divName, city, "Robots", "16000");
		corp.bulkPurchase(divName, city, "AI Cores", "8000");
		corp.bulkPurchase(divName, city, "Real Estate", "8000");

		ns.tprintf(" ");


	}



	//		for (let prod of prodDisco){
	//			corp.discontinueProduct(divName, prod);
	//			corp.makeProduct(divName, "Aevum", prod, 1e13, 1e13);
	//		}






	ns.exit();


	for (let key in corp.getProduct("Klei", "Oni").cityData) {
		ns.tprint(key + ": " + corp.getProduct("Klei", "Oni").cityData[key]);
	}



	ns.tprint(corp.getProduct("Klei", "Oni").cityData);
	ns.tprint(corp.getProduct("Klei", "Oni").properties);	

	ns.tprintf(" ");

	
	ns.tprint("ns.tprint(business().divisions[0].makesProducts);");
	ns.tprint(business().divisions[0].makesProducts);
	ns.tprint("");

	
	ns.tprint("ns.tprint(business().divisions[0].products);");
	ns.tprint(business().divisions[0].products);
	ns.tprint("");


	ns.tprint("ns.tprint(business().divisions[0].name)");
	ns.tprint(business().divisions[0].name);

	ns.tprint("");


	ns.tprint("for loop");
	for (let key in business().divisions[1]) {
		ns.tprint(key + ": " + business().divisions[1][key]);
	}

	ns.tprint("");

	ns.tprint("numDiv = business().divisions.length")
	const numDiv = business().divisions.length;
	ns.tprint(numDiv);
	ns.tprint(business().divisions);
	
	ns.tprint("");

	
	ns.tprint(warehouse(business().divisions[0].name, "Sector-12").size)



	ns.tprint("")





	//ns.tprint(business);

	ns.tprint("");

	for (let key in business) {
		ns.tprint(key + ": " + business[key]);
	}


	ns.tprint("");

	//ns.tprint(corp.getWarehouse(divName, city).level);


	//corp.upgradeWarehouse("Klei", "Sector-12");
	
	//ns.tprint(corp.getWarehouse(divName, city));

	ns.print(warehouse("Klei", "Sector-12").level)

	for (let city of ALL_CITIES) {
		ns.tprint('City Name: ' + city);
		
		while (corp.getWarehouse("Klei", city).level < 240 ) {
			ns.clearLog();
			ns.print(city);
			corp.upgradeWarehouse("Klei", city);
			ns.print(warehouse("Klei", city).level);
			ns.print(ns.nFormat(business().funds, "0.00a"));
			ns.print(ns.nFormat(corp.getUpgradeWarehouseCost("Klei", city), "0.00a"));	
			await ns.sleep(10);
		}

		

		ns.tprint("");
		
		for (let key in warehouse(divName, city)){
			ns.tprint(key + ": " + warehouse(divName, city)[key]);
		}

		ns.tprint(corp.getMaterial(divName, city, "AI Cores").qty);
		ns.tprint(corp.getMaterial(divName, city, "Real Estate").qty);

		//corp.bulkPurchase(divName, city, "AI Cores", 5000);
		//corp.bulkPurchase(divName, city, "Real Estate", 10000000);

		//corp.sellMaterial(divName, city, "Real Estate", "0", "0")
		//corp.setMaterialMarketTA1(divName, city, "Real Estate", false);
		//corp.setMaterialMarketTA2(divName, city, "Real Estate", false);

		ns.tprint(corp.getMaterial(divName, city, "AI Cores").qty);
		ns.tprint(corp.getMaterial(divName, city, "Real Estate").qty);


		ns.tprint("");

		//ns.tprint(office(divName, city));

		//for (let key in office(divName, city)) {
		//	ns.tprint(key + ": " + office(divName, city)[key]);
		//}

		const reqEmp = 200;
	    const reqSize = Math.max(office(divName, city).size, reqEmp);
		const sizeToBuy = reqEmp - office(divName, city).size;
		let curEmp = office(divName, city).employees.length;
		let empToHire = reqEmp - curEmp;

		if (office(divName, city).size < reqSize) {
			corp.upgradeOfficeSize(divName, city, sizeToBuy)
		}

		ns.tprint(`Current Emp: ` + curEmp);
		ns.tprint(`Open Positions: ` + empToHire);
		
		while (curEmp < reqEmp){
			corp.hireEmployee(divName,city);	
			await ns.sleep(10)
		}

		const lazy = office(divName, city).employeeJobs.Unassigned;	
		ns.tprint('Lazy: ' + lazy);
		
		if (lazy > 0) {
			await corp.setAutoJobAssignment(divName, city, JOB_TYPE.ops, 110); 
			await corp.setAutoJobAssignment(divName, city, JOB_TYPE.eng, 40);
			await corp.setAutoJobAssignment(divName, city, JOB_TYPE.mgt, 20);
			await corp.setAutoJobAssignment(divName, city, JOB_TYPE.bus, 10);
			await corp.setAutoJobAssignment(divName, city, JOB_TYPE.dev, 20);
		}
		
		ns.tprint("");




		corp.sellMaterial(divName, city, "Energy", "MAX", "MP")
		corp.setMaterialMarketTA1(divName, city, "Energy", true);
		corp.setMaterialMarketTA2(divName, city, "Energy", true);

		//corp.sellProduct(divName, city, "Automation", "MAX", "MP", true);
		//corp.setProductMarketTA1(divName, "Automation", true);
		//corp.setProductMarketTA2(divName, "Automation", true);
	}



	ns.tprint("");

	ns.tprint(ns.nFormat(business().funds, '0.0a'));

	ns.tprint("");

	ns.tprint(corp.getUpgradeLevel("Smart Factories"));

	while (corp.getUpgradeLevel("Smart Factories") < 50) {
		corp.levelUpgrade("Smart Factories");
	}

	ns.tprint(corp.getUpgradeLevel("Smart Factories"));
	

	//for (let key in );


	//const matData = corp.getMaterial("Klei", "Sector-12", "AI Cores");
	//ns.tprint(matData);


	ns.tprint("");



	//const cityName = "Sector-12";

	//for (const mat in MATERIALS) {
	//	ns.tprint(mat);
		//ns.tprint(corp.getMaterial(divName, city, mat));
	//}

	//for (let div in business().divisions[0, 1].name) {
		//ns.tprint(business().divisions[div].name);
	//	ns.tprint(corp.makesProducts)
	//}

	

	//for (const material of MATERIALS) {
	//	business().getMaterial(divName, cityName, material);
	//}




	//	ns.tprint(business().getCorporation());

	//let player = ns.getPlayer();
	//let pmoney = player.money;
	//let fpmoney = ns.nFormat(pmoney, '0.00a');

	//ns.tprint(player);

	//ns.tprintf(" ");

	//for (let key in player){
	//	ns.tprint(key + ": " + player[key]);
	//}




	//ns.tprintf(player.money);
	//ns.tprintf(fpmoney);



	ns.exit()

}