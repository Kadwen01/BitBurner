/** @param {NS} ns */
export async function main(ns) {

	const sing = ns.singularity;

	while (true){
		sing.commitCrime("Homicide");
		await ns.sleep(5000);
	}
}