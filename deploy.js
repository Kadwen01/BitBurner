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

export async function main(ns) {
	
    const servers = list_servers(ns);
	const script = 'selfhack.js';
    //const script = 'share-max.js';
	
	for (var host of servers) {
    	ns.killall(host);
    	ns.tprint(`Launching script '${script}' on server '${host}'`);
	    await ns.scp('share.js', host);
	    await ns.scp(script, host);
	    ns.exec(script, host, 1);
    }
}