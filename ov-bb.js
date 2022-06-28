/** @param {NS} ns */

import { createBox, createSidebarItem, confirm, prompt, select, alert } from "/box/box.js";

export let main = async ns => {
	ns.tail(ns.getScriptName());
	ns.disableLog("sleep");
	ns.clearLog();
	ns.atExit(() => item.remove());

	const gbb = ns.bladeburner;

	let doc = eval("document");

	let item = createSidebarItem("BB Info", `
	<div style="font-size:16px">Tracking:      <span id=track>   </span></div>
	<div style="font-size:16px">Bountys:       <span id=bounty>  </span></div>
	<div style="font-size:16px">Retierment:    <span id=ret>     </span></div> 
	<div style="font-size:16px">BlackOps:      <span id=bo>      </span></div> 
	
	<div> --------------------  </div>
	`);

	let trackElement = document.getElementById("track");
	let bountyElement = document.getElementById("bounty");
	let retElement = document.getElementById("ret");
	let boElement = document.getElementById("bo");


	while (doc.body.contains(item)) {
		ns.clearLog();

		if (ns.getPlayer().inBladeburner) {
			trackElement.innerText = gbb.getActionCountRemaining("contract", "Tracking");
			bountyElement.innerText = gbb.getActionCountRemaining("contract", "Bounty Hunter");
			retElement.innerText = gbb.getActionCountRemaining("contract", "Retirement");

			const blackOpsNames = gbb.getBlackOpNames();
			var bor = 0;
			for (let bop in blackOpsNames) {
				let bopCount = gbb.getActionCountRemaining("blackops", blackOpsNames[bop]);
				if (bopCount === 1) {
					bor++
				}
			}
			boElement.innerText = bor;
		} else {
			trackElement.innerText = 0;
			bountyElement.innerText = 0;
			retElement.innerText = 0;
			boElement.innerText = 0;
		}

		if (bor === 1){
			ns.scriptKill("bladeburner.js", "home");
		}

		await ns.sleep(1000);
	}
}