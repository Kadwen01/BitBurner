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


/** @param {NS} ns **/
export async function main(ns) {

	const servers = list_servers(ns).filter(s => ns.hasRootAccess(s)).concat(['home']);
	const mhl = ns.getHackingLevel() ;
    const script = "selfhack.js";


    for(const server of servers) {

        const minhl = ns.getServerRequiredHackingLevel(server);
        const threads = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / ns.getScriptRam(script));

        if ( mhl > minhl ) {
            ns.tprint(`Stopping script '${script}' on server '${server}'`);
	        await ns.scp(script, ns.getHostname(), server);
	        ns.killall(server);
            ns.rm(script, server);
        }
 	}
}
