import { getNetworkNodes } from "./utils.js";

/** @param {NS} ns **/
export async function main(ns) {

	const corp = eval("ns.corporation")

	ns.tprint(corp.name);


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