/** @param {NS} ns **/
import {formatMoney} from "/helper.js"
export async function main(ns) {

	ns.clearLog();
	ns.tail(ns.getScriptName);

	let karma =Math.floor(ns.heart.break());

	ns.print('karma: ' + karma);
	ns.print('Is karma below -54,000');
	ns.print(karma < -54000) ;


}