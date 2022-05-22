import { 
    getNetworkNodes,
    ColorPrint
} from "./utils.js";

/** @param {NS} ns */
export async function main(ns) {

    function pctColor(pct) {
    	if (pct >= 1) return 'Lime';
	    else if (pct >= 0.9) return 'Green';
	    else if (pct >= 0.75) return 'ForestGreen';
	    else if (pct >= 0.6) return 'GreenYellow';
	    else if (pct >= 0.3) return 'Orange';
	    else if (pct != 0) return 'DarkOrange';
	    return 'Red';
    }

    function padCenter(str, length) {
	    return str.padStart((length + str.length) / 2).padEnd(length);
    }

    const servers = getNetworkNodes(ns).filter((x) => !ns.getPurchasedServers().includes(x) && x != 'home' && x != 'darkweb');
    const phl = ns.getHackingLevel() ;

    ns.tprintf(` `); 
    ns.tprintf(`My Hacking levl is ${phl}`);
    ns.tprintf(` `);

    ColorPrint(
        'white','┌'.padEnd(20, '─') + '┬',
        'white','─'.padEnd(14, '─') + '┬',
        'white','─'.padEnd( 4, '─') + '┬',
        'white','─'.padEnd(15, '─') + '┬',
    );

    ColorPrint(
        'white','| Server'.padEnd(20) + '|',
        'white',padCenter('RAM' , 14) + '│',
        'white',padCenter('MHL' ,  4) + '|',
        'white',padCenter('Cash', 15) + '|', 
    );

    ColorPrint(
        'white','┌'.padEnd(20, '─') + '┼',
        'white','─'.padEnd(14, '─') + '┼',
        'white','─'.padEnd( 4, '─') + '┼',
        'white','─'.padEnd(15, '─') + '┼',
    );        

    // ┼
	// ┴
	// ┬

for(const server of servers) { 

        let so = ns.getServer(server);
        let nserver = server.padEnd(18, ' '); 

	    let used = ns.getServerUsedRam(server).toString().padStart(5, ' ');
        let max = ns.getServerMaxRam(server).toString().padStart(4, ' ');
        
        let minhl = ns.getServerRequiredHackingLevel(server).toString().padStart(4, ' ');

		let money = ns.getServerMoneyAvailable(server.name);
		let moneyMax = ns.getServerMaxMoney(server.name);
		let moneyPct = moneyMax > 0 ? (money / moneyMax * 100).toFixed(0) + '%' : '';
		let moneyString = moneyMax > 0 ? ns.nFormat(money, '0.00a').padStart(8) : ''.padStart(8);
		let moneyColor = pctColor(money / moneyMax);
		let maxMoneyString = moneyMax > 0 ? ns.nFormat(moneyMax, '0.00a').padStart(8) : 'N/A'.padStart(8);
		let maxMoneyColor = moneyMax > 0 ? 'white' : '#555555';

		
		let sec = so.hackDifficulty;
		let minSec = so.minDifficulty;
		let secPct = (sec - minSec) / (99 - minSec);
		let secColor = pctColor(1 - secPct);
            
        if ( phl >= minhl ) {
            ColorPrint(
                'white' ,'| ', 
                'white' ,nserver , 
                'white' ,'|'  , 
                'yellow',used + 'GB/' + max + 'GB' ,
                'white' ,'|',
                'lime'  ,minhl,
                'white' ,'|', 
                'orange',fcash + '/' + fmcash,
                'white' ,'|',
                secColor, maxMoney > 0 ? (sec - minSec).toFixed(2).padStart(6) : ''.padEnd(6),
            );
        }
    }

    ColorPrint('white', '└'.padEnd(70, '─') + '┴');







    ns.exit();



    ns.tprintf(` `);
    ColorPrint('red', `Severs not yet hackable`);
      
    ColorPrint('white',	'┌'.padEnd(67, '─') + '┬'); // 67
    
    for(const server of servers) {
        const nserver = server.padEnd(19, ' '); 
	    const used = ns.getServerUsedRam(server).toString().padStart(4, ' ');
        const max = ns.getServerMaxRam(server).toString().padStart(4, ' ');
        const minhl = ns.getServerRequiredHackingLevel(server).toString().padEnd(4, ' ');
        const cash = ns.getServerMoneyAvailable(server);
        const fcash = ns.nFormat(cash, '0.00a').toString().padStart(7, ' ');
        const mcash = ns.getServerMaxMoney(server);
        const fmcash = ns.nFormat(mcash, '0.00a').toString().padStart(7, ' '); 
        
        if ( phl < minhl ) {
            ColorPrint('white', '| ', 'gray', nserver , 'yellow' , used + 'GB/' + max + 'GB ' , 'lime' , 'MHL: '+ minhl , 'orange' , ' Cash:' + fcash + '/' + fmcash,'white',' |');
           
        }
    }
    ColorPrint('white', '└'.padEnd(70, '─') + '┴');
}