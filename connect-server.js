/** @param {NS} ns */
function recursiveScan(ns, parent, server, target, route) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent == child) {
            continue;
        }
        if (child == target) {
            ns.tprintf(`Connecting to ` + target);
            route.unshift(child);
            route.unshift(server);
            return true;
        }
        if (recursiveScan(ns, server, child, target, route)) {
            route.unshift(server);
            return true;
        }
    }
    return false;
}

export async function main(ns) {
    const args = ns.flags([["help", false]]);
    let route = [];
    let server = args._[0];   
    let phl = ns.getHackingLevel();	
	
    recursiveScan(ns, '', 'home', server, route);
    route.shift();
    for (const i in route) {

        ns.singularity.connect(route[i]);
        await ns.sleep(500);
        //const terminalInput = document.getElementById("terminal-input");
        //terminalInput.value="connect " + route[i];
        //const handler = Object.keys(terminalInput)[1];
        //terminalInput[handler].onChange({target:terminalInput});
        //terminalInput[handler].onKeyDown({key:'Enter',preventDefault:()=>null});
    }

    if (server == "w0r1d_d43m0n"){
        try {ns.brutessh(server)} catch{}
        try {ns.ftpcrack(server)} catch{}
        try {ns.relaysmtp(server)} catch{}
        try {ns.sqlinject(server)} catch{}
        try {ns.httpworm(server)} catch{}
        try {ns.nuke(server)} catch{} 
    }


    var hasBackdoor = ns.getServer(server).backdoorInstalled;
    var mhl = ns.getServerRequiredHackingLevel(ns.getHostname());
    if (!hasBackdoor && phl >= mhl ){  
        await ns.singularity.installBackdoor();
        ns.tprintf("Backdoor installed on " + server);
        ns.singularity.connect('home');
    }


}