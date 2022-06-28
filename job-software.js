/** @param {NS} ns **/
export async function main(ns) {
    ns.disableLog("sleep");
    ns.tail(ns.getScriptName());
    ns.clearLog();

    //ns.print(ns.getPlayer().jobs);
    //ns.print(Object.keys(job));
    //ns.print(job['ECorp']);
    //ns.print(job[Object.keys(job)[0]]);

    while (true) {

        if (ns.getPlayer().hacking > 249) {

            if (!(Object.keys(ns.getPlayer().jobs).includes('ECorp'))) {
                ns.singularity.applyToCompany("ECorp", "software");
                ns.sleeve.setToCompanyWork(4, 'ECorp');
                ns.print('Setting Sleeve 4 to work for ECorp')
            } 

            if (!(Object.keys(ns.getPlayer().jobs).includes('MegaCorp'))) {
                ns.singularity.applyToCompany("MegaCorp", "software");
                ns.sleeve.setToCompanyWork(5, 'MegaCorp');
                ns.print('Setting Sleeve 5 to work for MegaCorp')
            } 

            if (!(Object.keys(ns.getPlayer().jobs).includes('Fulcrum Technologies'))) {
                ns.singularity.applyToCompany("Fulcrum Technologies", "software");
                ns.sleeve.setToCompanyWork(6, 'Fulcrum Technologies');
                ns.print('Setting Sleeve 6 to work for Fulcrum Technologies')
            } 

            if (!(Object.keys(ns.getPlayer().jobs).includes('NWO'))) {
                ns.singularity.applyToCompany("NWO", "software");
                ns.sleeve.setToCompanyWork(7, 'NWO');
                ns.print('Setting Sleeve 7 to work for NWO')
            } 
        }

        ns.clearLog();
        
        let cJob = ns.getPlayer().jobs

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