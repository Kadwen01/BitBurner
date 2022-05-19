/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	let script = args._[0]; 
	ns.tprintf ('Pulling ' + script + ' off gitHub')
    //await ns.wget('https://raw.githubusercontent.com/Kadwen01/BitBurner/main/find_server.js', 'find_server.js');
	await ns.wget('https://raw.githubusercontent.com/chrisrabe/bitburner-automation/main/_stable/' + script , script);
}