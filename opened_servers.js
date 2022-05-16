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

/** @param {NS} ns **/
export async function main(ns) {

    const servers = list_servers(ns).filter(s => ns.hasRootAccess(s)).concat(['home']);
    const mhl = ns.getHackingLevel() ;

    ns.tprint(`My Hacking levl is ${mhl}`);

    ns.tprint(`Servers that are hackable`);
    for(const server of servers) {        
	const used = ns.getServerUsedRam(server);
        const max = ns.getServerMaxRam(server);
        const minhl = ns.getServerRequiredHackingLevel(server);
        const cash = ns.getServerMoneyAvailable(server);
        const fcash = ns.nFormat(cash, '0.00a');
        const mcash = ns.getServerMaxMoney(server);
        const fmcash = ns.nFormat(mcash, '0.00a'); 
        
        if ( mhl > minhl ) {
            ns.tprint(`${server}: ${used} GB/${max} GB (${(100*used/max).toFixed(2)}%) MHL: ${minhl} Cash: ${fcash}/${fmcash}`);
        }
    }
    ns.tprint(``);
    ns.tprint(`Severs not yet hackable`);
    for(const server of servers) {
        const used = ns.getServerUsedRam(server);
        const max = ns.getServerMaxRam(server);
        const minhl = ns.getServerRequiredHackingLevel(server);
        const cash = ns.getServerMoneyAvailable(server);
        const fcash = ns.nFormat(cash, '0.00a');
        const mcash = ns.getServerMaxMoney(server);
        const fmcash = ns.nFormat(mcash, '0.00a'); 
        
        if ( mhl < minhl ) {
            ns.tprint(`${server}: ${used} GB/${max} GB (${(100*used/max).toFixed(2)}%) MHL: ${minhl} Cash: ${fcash}/${fmcash}`);
        }
    }
}
