/** @param {NS} ns */
function scan(ns, parent, server, list) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent == child) {
            continue;
        }
        list.push(child);
        scan(ns, server, child, list);
    }
}

export function list_servers(ns) {
    const list = [];
    scan(ns, '', 'home', list);
    return list;
}


export function vals(ns, nserver, used, max, minhl, fcash, fmcash) {
    const servers = list_servers(ns).filter((x) => !ns.getPurchasedServers().includes(x) && x != 'home'.length && x != `darkweb`);

    for(const server of servers) {       
        const nserver = server.padEnd(18, ' '); 
	    const used = ns.getServerUsedRam(server).toString().padStart(3, ' ');
        const max = ns.getServerMaxRam(server).toString().padStart(3, ' ');
        const minhl = ns.getServerRequiredHackingLevel(server).toString().padEnd(4, ' ');
        const cash = ns.getServerMoneyAvailable(server);
        const fcash = ns.nFormat(cash, '0.00a').toString().padStart(7, ' ');
        const mcash = ns.getServerMaxMoney(server);
        const fmcash = ns.nFormat(mcash, '0.00a').toString().padStart(7, ' '); 
    }
}


/** @param {NS} ns **/
export async function main(ns) {
    
    const servers = list_servers(ns).filter((x) => !ns.getPurchasedServers().includes(x) && x != 'home'.length && x != 'darkweb');
    const phl = ns.getHackingLevel() ;

    ns.tprint(`My Hacking levl is ${phl}`);
    ns.tprint("");
    ns.tprint(`Servers that are hackable`);

    for(const server of servers) {       
        const nserver = server.padEnd(18, ' '); 
	    const used = ns.getServerUsedRam(server).toString().padStart(3, ' ');
        const max = ns.getServerMaxRam(server).toString().padStart(3, ' ');
        const minhl = ns.getServerRequiredHackingLevel(server).toString().padEnd(4, ' ');
        const cash = ns.getServerMoneyAvailable(server);
        const fcash = ns.nFormat(cash, '0.00a').toString().padStart(7, ' ');
        const mcash = ns.getServerMaxMoney(server);
        const fmcash = ns.nFormat(mcash, '0.00a').toString().padStart(7, ' '); 
        
        if ( phl > minhl ) {
            ns.tprint(`${nserver} ${used} GB/${max} GB  MHL: ${minhl} Cash: ${fcash}/${fmcash}`);
        }
    }
    ns.tprint(``);
    ns.tprint(`Severs not yet hackable`);

    for(const server of servers) {
        const nserver = server.padEnd(18, ' '); 
	    const used = ns.getServerUsedRam(server).toString().padStart(3, ' ');
        const max = ns.getServerMaxRam(server).toString().padStart(3, ' ');
        const minhl = ns.getServerRequiredHackingLevel(server).toString().padEnd(4, ' ');
        const cash = ns.getServerMoneyAvailable(server);
        const fcash = ns.nFormat(cash, '0.00a').toString().padStart(7, ' ');
        const mcash = ns.getServerMaxMoney(server);
        const fmcash = ns.nFormat(mcash, '0.00a').toString().padStart(7, ' '); 
        
        if ( phl < minhl ) {
            ns.tprint(`${nserver} ${used} GB/${max} GB  MHL: ${minhl} Cash: ${fcash}/${fmcash}`);
        }
    }
}