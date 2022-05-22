import { getNetworkNodes } from "./utils.js";

/** @param {NS} ns **/
export async function main(ns) {



    	let factions = [
         "CSEC",
			"avmnite-02h",
			"I.I.I.I",
			"run4theh111z"
       ];

    ns.tprint(factions);

   let check = "CSEC" in factions ;
   ns.tprint(check);

   let server = "joes"
   let check2 = factions.includes(server);
   ns.tprint("check2" + check2);
   
   let check3 = factions.includes("run4theh111z");
   ns.tprint("check3" + check3);

    let player = ns.getPlayer();
    let pmoney = player.money;
    let fpmoney = ns.nFormat(pmoney, '0.00a');
    
    //ns.tprint(player);
    
    ns.tprintf(" ");

    for (let key in player){
        
       //ns.tprint(key + ": " + player[key]);
    }

  

    
    //ns.tprintf(player.money);
    //ns.tprintf(fpmoney);



    ns.exit()



//    let player = ns.getPlayer();
//	function stonks() {
//		if (player.hasWseAccount && player.hasTixApiAccess && player.has4SData && player.has4SDataTixApi === true){
//			if (ns.isRunning(stockmarketScript, homeServ) != true){
//				ns.tprintf(`WARN Stonks can be automated`);
//				ns.exec(stockmarketScript, homeServ);
//			} else {ns.tprintf("not yet")}
//        }
//	}





//    export function scan(ns, parent, server, list) {
//    const children = ns.scan(server);
//    for (let child of children) {
//        if (parent != child) {
//            list.push(child);
//            scan(ns, server, child, list);
//        }
//    }

//    export function listServers(ns) {
//    const list = [];
//    scan(ns, '', 'home', list);
//    return list;
//    }

//    let twoFunc = listServers(ns).filter((x) => !ns.getPurchasedServers().includes(x) && x != 'home' && x != 'darkweb');
//    ns.tprintf('Two Function');
//    ns.tprintf(twoFunc);

//    ns.tprintf(' ');

//    let utils = getNetworkNodes(ns).filter((x) => !ns.getPurchasedServers().includes(x) && x != 'home' && x != 'darkweb');
//    ns.tprintf('From Utils.js');
     
//    ns.tprintf(utils);

}