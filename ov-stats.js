/** @param {NS} ns */

import { createBox, createSidebarItem, confirm, prompt, select, alert } from "/box/box.js";
import { formatNumberShort, formatMoney } from "/helper.js";

export let main = async ns => {
	ns.disableLog("sleep");
	ns.tail(ns.getScriptName());
	ns.clearLog();

	let doc = eval("document");

	let item = createSidebarItem("Stats", `
	<div style="font-size:16px">Hashes:      <span id=hashes> </span></div>
	<div style="font-size:16px">Karma:       <span id=karma>  </span></div>
	<div style="font-size:16px">Script Inc:  <span id=si>     </span></div> 
	<div style="font-size:16px">Script Exp:  <span id=se>     </span></div> 
	<div> --------------------  </div>
	 `);

	let hashElement = document.getElementById("hashes");
	let karmaElement = document.getElementById("karma");
	let siElement = document.getElementById("si");
	let seElement = document.getElementById("se");

	while (doc.body.contains(item)) {
	
		let scriptx = null;

		if (Array.isArray(ns.getScriptExpGain())) {
			scriptx = Math.floor(ns.getScriptExpGain()[0]).toString();
		} else {
			scriptx = Math.floor(ns.getScriptExpGain()).toString();
		}

		hashElement.innerText = Math.floor(ns.hacknet.numHashes());
		karmaElement.innerText = Math.floor(ns.heart.break());
		siElement.innerText = formatMoney(Math.floor(ns.getScriptIncome()[0]).toString()) + '/s';
		seElement.innerText = formatNumberShort(scriptx) + '/s';

		await ns.sleep(1000);
	}
}