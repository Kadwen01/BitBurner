/** @param {NS} ns */
export function scan(ns, parent, server, list) {
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




export async function main(ns) {
	const servers = list_servers(ns).filter((x) => !ns.getPurchasedServers().includes(x) && x != 'home'.length);
	for (var serv of servers) {
    	if (ns.getServerMaxMoney(serv) > 0) {
            if (ns.getRunningScript('nfHack.js', 'home', serv)) {
            ns.tprint(`INFO Already Hacking ` + serv );
            continue;
            } else {
			    ns.exec ("nfHack.js", 'home', 1, serv);
			    ns.tprint (`WARN Initilizing Hack on ` + serv);
            }
		}
	}
	await ns.sleep(1000);
}