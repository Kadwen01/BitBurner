/** @param {NS} ns */

import { createBox, createSidebarItem, confirm, prompt, select, alert } from "/box/box.js";

export let main = async ns => {
	ns.tail(ns.getScriptName());
	ns.disableLog("sleep");
	ns.clearLog();

	const gbb = ns.bladeburner;

	let doc = eval("document");

	let item = createSidebarItem("BB Info", `
	<div style="font-size:16px">Tracking:      <span id=track>   </span></div>
	<div style="font-size:16px">Bountys:       <span id=bounty>  </span></div>
	<div style="font-size:16px">Retierment:    <span id=ret>     </span></div> 
	<div> --------------------  </div>
	`);

	let trackElement = document.getElementById("track");
	let bountyElement = document.getElementById("bounty");
	let retElement = document.getElementById("ret");

	while (doc.body.contains(item)) {
		ns.clearLog();

		trackElement.innerText = gbb.getActionCountRemaining("contract", "Tracking");
		bountyElement.innerText = gbb.getActionCountRemaining("contract", "Bounty Hunter");
		retElement.innerText = gbb.getActionCountRemaining("contract", "Retirement");

		await ns.sleep(1000);
	}
}