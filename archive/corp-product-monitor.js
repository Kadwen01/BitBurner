/** @param {NS} ns */
export async function main(ns) {
	const script = ns.getScriptName;

	const corp = ns.corporation;
	const business = corp.getCorporation;
	const warehouse = corp.getWarehouse;
	const office = corp.getOffice;
	const curDivNum = business().divisions.length;  //Current number of Divisions in the Corp
	const divName = ns.args[0]; // sets what division we are going to be looking at 
	const availFunds = business().funds;
	const prodBudget = ns.args[1]; // sets production budget for new products. 

	//throws an error if no division is set 
	if (!divName || !prodBudget) {
		ns.tprint("ERROR Insufficient arguments\nUsage: run " + script + " <diviName> <prodBudget>");
		return;
	}  

	const MATERIALS = ["Energy", "Hardware", "Robots", "AI Cores", "Real Estate"];
	const ALL_CITIES = ["Aevum", "Chongqing", "Sector-12", "New Tokyo", "Ishima", "Volhaven"];
	const SIMPLEINDUSTRIES = ["Agriculture", "Energy", "Utilities", "Fishing", "Mining", "Chemical", "Pharmaceutical", "Computer", "Robotics", "Software", "RealEstate"];
	const PRODUCTINDUSTRIES = ["Food", "Tobacco", "Pharmaceutical", "Computer", "Robotics", "Software", "Healthcare", "RealEstate"];

	var prodDisco = [];	
	ns.clearLog();
	ns.print(ns.nFormat(availFunds, "0.00a"));
	ns.print(ns.nFormat(prodBudget, "0.00a"));
	for (let i = 0; i < curDivNum; i++){

		let divName = business().divisions[i].name;
		if (PRODUCTINDUSTRIES.includes(business().divisions[i].type)) {
			ns.print(divName + ' products:')
			ns.print("___________________");
			for (let key in business().divisions[i].products) {
				let demand = corp.getProduct(divName, business().divisions[i].products[key]).dmd;
				let compition = corp.getProduct(divName, business().divisions[i].products[key]).cmp;
				let holding = demand / compition;
				ns.print(business().divisions[i].products[key]);
				ns.print("   Demand: " + ns.nFormat(demand, "0.00a"));
				ns.print("   Competition: " + ns.nFormat(compition, "0.00a"));
				ns.print("Market Holding: " + ns.nFormat(holding, "0.00a"));
				ns.print(" ");
				if (holding < 1) {
					prodDisco.push(business().divisions[i].products[key]);
				}
			}
			
			ns.print("Products to recode:");
			
			for (let prod of prodDisco){
				ns.print(` -` + prod);
			}
			
			ns.print(" ");

			if (availFunds > prodBudget && prodDisco.length > 0) {
				corp.discontinueProduct(divName, prodDisco[0]);
				corp.makeProduct(divName, "Aevum", prodDisco[0], prodBudget/2, prodBudget/2);
				ns.print('Recoding: ' + prodDisco[0]);
				corp.sellProduct(divName, city ,prodDisco[0], "MAX", "MP", true); 	//Set sale price of product. 
				corp.setProductMarketTA1(divName, prodDisco[0], true);				//Set market TA 1 for product.
				corp.setProductMarketTA2(divName, prodDisco[0], true);				//Set market TA 2 for product.
			} else {
				ns.print('Not enough funds or no product to recode ' +prodDisco[0]);
			}
		}
	}
	ns.tail();
}