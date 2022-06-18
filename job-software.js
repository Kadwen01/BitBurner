/** @param {NS} ns **/
export async function main(ns) {
    ns.disableLog("sleep");
    ns.tail(ns.getScriptName());
    ns.clearLog();
    let cJob = ns.getPlayer().jobs
    //ns.print(ns.getPlayer().jobs);
    //ns.print(Object.keys(job));
    //ns.print(job['ECorp']);
    //ns.print(job[Object.keys(job)[0]]);

    ns.print(cJob);
    while (true) {
        ns.clearLog();
        for (let job in cJob) {
            
            ns.print(job + ': ' + cJob[job]);

            if (cJob[job] != "Chief Technology Officer") {
                ns.singularity.applyToCompany(job, "software");
            }

            ns.print(' ');
        }
        await ns.sleep(60000);
    }
}