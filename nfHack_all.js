/** @param {NS} ns */
export function scan(ns, parent, server, list) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent != child) {
            list.push(child);
            scan(ns, server, child, list);
        }
    }
}

export function list_servers(ns) {
    const list = [];
    scan(ns, '', 'home', list);
    return list;
} 

export function getNumCracks(ns, cracks) {
	return Object.keys(cracks).filter(function (file) {
		return ns.fileExists(file, 'home');
	}).length;
}

export async function main(ns) {
    
    var cracks = {
		"BruteSSH.exe": ns.brutessh,
		"FTPCrack.exe": ns.ftpcrack,
		"relaySMTP.exe": ns.relaysmtp,
		"HTTPWorm.exe": ns.httpworm,
		"SQLInject.exe": ns.sqlinject
	};
    
    const ncracks = getNumCracks(ns, cracks);
	const servers = list_servers(ns).filter((x) => !ns.getPurchasedServers().includes(x) && x != 'home' && ns.getServerNumPortsRequired(x) <= ncracks );
	
    for (var serv of servers) {
        const maxMoney = ns.getServerMaxMoney(serv);
        const minSecLv = ns.getServerMinSecurityLevel(serv);
        const hackLv = ns.getHackingLevel();
        
    	if (maxMoney > 0) {
            if ( minSecLv < hackLv ) {
                if (ns.getRunningScript('nfHack.js', 'home', serv)) {
                    ns.tprint(`INFO Already Hacking ` + serv );
                } else {
                    ns.exec ("nfHack.js", 'home', 1, serv);
			        ns.tprintf(`WARN Initilizing Hack on ` + serv);
                }
            } else { ns.tprintf(serv + ": Hacking level is to low. Try agian later.")}   
        }
	}
	await ns.sleep(1000);
}