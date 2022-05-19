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
    
    recursiveScan(ns, '', 'home', server, route);
    route.shift();
    for (const i in route) {
        await ns.sleep(500);
        const terminalInput = document.getElementById("terminal-input");
        terminalInput.value="connect " + route[i];
        const handler = Object.keys(terminalInput)[1];
        terminalInput[handler].onChange({target:terminalInput});
        terminalInput[handler].onKeyDown({key:'Enter',preventDefault:()=>null});
    }
}