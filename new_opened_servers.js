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

export function listServers(ns) {
    const list = [];
    scan(ns, '', 'home', list);
    return list;
}

export function ColorPrint() {
    let findProp = propName => {
       for (let div of eval("document").querySelectorAll("div")) {
          let propKey = Object.keys(div)[1];
          if (!propKey) continue;
          let props = div[propKey];
          if (props.children?.props && props.children.props[propName]) return props.children.props[propName];
          if (props.children instanceof Array) for (let child of props.children) if (child?.props && child.props[propName]) return child.props[propName];
       }
    };
    let term = findProp("terminal");
 
    let out = [];
    for (let i = 0; i < arguments.length; i += 2) {
       out.push(React.createElement("span", { style: { color: `${arguments[i]}` } }, arguments[i + 1]))
    }
    try {
       term.printRaw(out);
    }
    catch { }
 }



/** @param {NS} ns **/
export async function main(ns) {
    
    const servers = listServers(ns).filter((x) => !ns.getPurchasedServers().includes(x) && x != 'home' && x != 'darkweb');
    const phl = ns.getHackingLevel() ;

    ns.tprintf(` `); 
    ns.tprintf(`My Hacking levl is ${phl}`);
    ns.tprintf(` `);

    ColorPrint('white',	'┌'.padEnd(66, '─') + '┬'); // 67

    for(const server of servers) {       
        const nserver = server.padEnd(18, ' '); 
	    const used = ns.getServerUsedRam(server).toString().padStart(5, ' ');
        const max = ns.getServerMaxRam(server).toString().padStart(4, ' ');
        const minhl = ns.getServerRequiredHackingLevel(server).toString().padEnd(4, ' ');
        const cash = ns.getServerMoneyAvailable(server);
        const fcash = ns.nFormat(cash, '0.00a').toString().padStart(7, ' ');
        const mcash = ns.getServerMaxMoney(server);
        const fmcash = ns.nFormat(mcash, '0.00a').toString().padStart(7, ' ');
            
        if ( phl > minhl ) {
            ColorPrint('white', '| ', 'white', nserver , 'yellow' , used + 'GB/' + max + 'GB ' , 'lime' , 'MHL: '+ minhl , 'orange' , ' Cash:' + fcash + '/' + fmcash,'white',' |');
        }
    }

    ColorPrint('white', '└'.padEnd(66, '─') + '┴');

    

    ns.exit();



    ns.tprintf(` `);
    ColorPrint('red', `Severs not yet hackable`);
    var serversi = servers;
    
    ColorPrint('white',	'┌'.padEnd(66, '─') + '┬'); // 67
    
    for(const server of servers) {
        const nserver = server.padEnd(19, ' '); 
	    const used = ns.getServerUsedRam(server).toString().padStart(4, ' ');
        const max = ns.getServerMaxRam(server).toString().padStart(4, ' ');
        const minhl = ns.getServerRequiredHackingLevel(server).toString().padEnd(4, ' ');
        const cash = ns.getServerMoneyAvailable(server);
        const fcash = ns.nFormat(cash, '0.00a').toString().padStart(7, ' ');
        const mcash = ns.getServerMaxMoney(server);
        const fmcash = ns.nFormat(mcash, '0.00a').toString().padStart(7, ' '); 
        
        if ( phl < minhl ) {
            ColorPrint('white', '| ', 'gray', nserver , 'yellow' , used + 'GB/' + max + 'GB ' , 'lime' , 'MHL: '+ minhl , 'orange' , ' Cash:' + fcash + '/' + fmcash,'white',' |');
           
        }
    }
    ColorPrint('white', '└'.padEnd(66, '─') + '┴');
}