/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	let script = args._[0]; 
	
	//var list =[
    //    'deploy.js',
    //    'find_coding_contract.js',
    //    'grow.js',
    //    'grow_stop.js',
    //    'new_opened_servers.js',
    //    'opened_serers.js'
    //];

    //for (const script of list){
        ns.tprintf ('Pulling ' + script + ' off gitHub');
    //    await ns.wget('https://raw.githubusercontent.com/Kadwen01/BitBurner/main/find_server.js' + script , script);
    //}
	
	
	
    //await ns.wget('https://raw.githubusercontent.com/Kadwen01/BitBurner/main/find_server.js' + script , script);
	await ns.wget('https://raw.githubusercontent.com/chrisrabe/bitburner-automation/main/_stable/' + script , script);
}