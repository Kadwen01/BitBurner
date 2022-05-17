/** @param {NS} ns */
export async function main(ns) {

const host = ns.getHostname();

//const script = ns.args._[0];
const script = `hack_target.js`;

const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));

ns.tprint(`Current max threads on '${host}' for '${script}' is '${threads}'`);

//ns.exec(script, host, threads);

}