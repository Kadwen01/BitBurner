/** @param {NS} ns */

import { createBox, createSidebarItem, confirm, prompt, select, alert } from "/box/box.js";
import { formatNumberShort, formatMoney } from "/helper.js";

export let main = async ns => {
	ns.disableLog("sleep");
	ns.tail(ns.getScriptName());
	ns.clearLog();

	const doc = eval("document");
	const ecorp = eval("ns.corporation");

	let item = createSidebarItem("Stats", `
	<div style="font-size:16px">Hashes:      <span id=hashes> </span></div>
	<div style="font-size:16px">Karma:       <span id=karma>  </span></div>
	<div style="font-size:16px">Script Inc:  <span id=si>     </span></div> 
	<div style="font-size:16px">Script Exp:  <span id=se>     </span></div>
	<div style="font-size:16px">Gang Money:  <span id=ga>     </span></div>
	<div style="font-size:16px">Corp Money:  <span id=cm>     </span></div>
	<div style="font-size:16px">Corp Profit: <span id=cp>     </span></div>
	<div> --------------------  </div>
	`);

	let hashElement = document.getElementById("hashes");
	let karmaElement = document.getElementById("karma");
	let siElement = document.getElementById("si");
	let seElement = document.getElementById("se");
	let gaElement = document.getElementById("ga");
	let cmElement = document.getElementById("cm");
	let cpElement = document.getElementById("cp");


	while (doc.body.contains(item)) {

		let scriptx = null;

		if (Array.isArray(ns.getScriptExpGain())) {
			scriptx = Math.floor(ns.getScriptExpGain()[0]).toString();
		} else {
			scriptx = Math.floor(ns.getScriptExpGain()).toString();
		}

		if (ns.getPlayer().hasCorporation) {
			var corpProfit = ecorp.getCorporation().revenue - ecorp.getCorporation().expenses;
			var corpFunds = ecorp.getCorporation().funds;
		} else {
			var corpProfit = 0;
			var corpFunds = 0;
		}

		if (ns.gang.inGang()) {
			var gangMoney = Math.floor(ns.gang.getGangInformation().moneyGainRate) * 5;
		} else {
			var gangMoney = 0;
		}

		hashElement.innerText = Math.floor(ns.hacknet.numHashes());
		karmaElement.innerText = Math.floor(ns.heart.break());
		siElement.innerText = formatMoney(Math.floor(ns.getScriptIncome()[0]).toString()) + '/s';
		seElement.innerText = formatNumberShort(scriptx) + '/s';
		gaElement.innerText = formatMoney(gangMoney) + '/s';
		cmElement.innerText = formatMoney(corpFunds);
		cpElement.innerText = formatMoney(corpProfit);

		await ns.sleep(1000);
	}
}