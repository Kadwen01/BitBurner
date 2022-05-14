/** @param {NS} ns */
export async function main(ns) {
    const servers = (t=[]) => ns.scan(t[t.length-1]).length > 1 ? t.concat(ns.scan(servers[servers.length-1])) : t.push(ns.scan(t[t.length-1]));
    const result = servers(['home']);
    ns.tprint(result);
}