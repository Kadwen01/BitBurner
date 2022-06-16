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

    ns.tail(ns.getScriptName());

    const hServPrefix = "hacknet"; // hacknet servers
    const servers = list_servers(ns);
    //const script = 'selfhack.js';
    //const script = 'share-max.js';
    //const script = "exp-hack.js";
    const script = "test.js";

    for (var host of servers) {
        if (host.includes(hServPrefix)) {
            continue;
        } else {
            ns.killall(host);
            ns.print(`Launching script '${script}' on server '${host}'`);
            await ns.scp("exp-max.js", host);
            await ns.scp(script, host);
            ns.exec("exp-max.js", host, 1);
        }
    }
}