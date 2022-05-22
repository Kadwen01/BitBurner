/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	let script = args._[0]; 
	
	var list =[
        'corp-division-manager.js',
        'corp-marketer.js',
        'corp-product-manager.js',
        'corp-recruiter.js',
        'corp-researcher.js',
        'weaken-pirate.js',
        'kill-network-scripts.js',
        'hack-pirate.js',
        'grow-pirate.js',
        'launch-fleets.js',
        'ap-hacknet-node.js'
    ];

    for (const script of list){
        ns.tprintf ('Pulling ' + script + ' off gitHub');
        await ns.wget('https://raw.githubusercontent.com/chrisrabe/bitburner-automation/main/_stable/'+ script , script);
    }
	
	
	
    //await ns.wget('https://raw.githubusercontent.com/Kadwen01/BitBurner/main/find_server.js' + script , script);
	//await ns.wget('https://raw.githubusercontent.com/chrisrabe/bitburner-automation/main/_stable/' + script , script);
}