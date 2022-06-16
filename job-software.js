/** @param {NS} ns **/
export async function main(ns) {
    ns.disableLog("sleep");
    ns.tail(ns.getScriptName());

    let job = ns.getPlayer().jobs

    //ns.print(ns.getPlayer().jobs);
    //ns.print(Object.keys(job));
    //ns.print(job['ECorp']);
    //ns.print(job[Object.keys(job)[0]]);

    while (job[Object.keys(job)[0]] != "Chief Technology Officer") {
        ns.clearLog();
        ns.singularity.applyToCompany(Object.keys(job)[0], "software"); 
    }
}