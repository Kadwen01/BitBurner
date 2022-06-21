/** @param {NS} ns */

import { createBox, createSidebarItem, confirm, prompt, select, alert } from "/box/box.js";
import { formatNumberShort, formatMoney } from "/helper.js";

export let main = async ns => {
	ns.disableLog("sleep");
	ns.tail(ns.getScriptName());
	ns.clearLog();

	const doc = eval("document");

	let box = createSidebarItem("Corp Jobs", `
	<div style="font-size:16px">

	<table>
    	<tr>
    		<th>Corp</th>
    		<th>Job</th>
 		</tr>
  		<tr>
   			<td><span style="color:blue" id=corpOne></td>
    		<td><span id=corpOneJob></td>
  		</tr>
  		<tr>
    		<td><span style="color:blue" id=corpTwo></td>
    		<td><span id=corpTwoJob></td>
  		</tr>
		<tr>
    		<td><span style="color:blue" id=corpThree></td>
    		<td><span id=corpThreeJob></td>
  		</tr>
		<tr>
    		<td><span style="color:blue" id=corpFour></td>
    		<td><span id=corpFourJob></td>
  		</tr>
	</table>
	</div>

	<div> --------------------  </div>
	`);

	let corpOneElement = document.getElementById("corpOne");
	let corpOneJobElement = document.getElementById("corpOneJob");

	let corpTwoElement = document.getElementById("corpTwo");
	let corpTwoJobElement = document.getElementById("corpTwoJob");

	let corpThreeElement = document.getElementById("corpThree");
	let corpThreeJobElement = document.getElementById("corpThreeJob");

	let corpFourElement = document.getElementById("corpFour");
	let corpFourJobElement = document.getElementById("corpFourJob");

	while (doc.body.contains(box)) {

		var cJob = ns.getPlayer().jobs;

		let corpOne = Object.keys(cJob)[0];
		let corpTwo = Object.keys(cJob)[1];
		let corpThree = Object.keys(cJob)[2];
		let corpFour = Object.keys(cJob)[3];

		let corpOneJob = cJob[Object.keys(cJob)[0]];
		let corpTwoJob = cJob[Object.keys(cJob)[1]];
		let corpThreeJob = cJob[Object.keys(cJob)[2]];
		let corpFourJob = cJob[Object.keys(cJob)[3]];

		corpOneElement.innerText = corpOne;
		corpOneJobElement.innerText = corpOneJob;

		corpTwoElement.innerText = corpTwo;
		corpTwoJobElement.innerText = corpTwoJob;

		corpThreeElement.innerText = corpThree;
		corpThreeJobElement.innerText = corpThreeJob;

		corpFourElement.innerText = corpFour;
		corpFourJobElement.innerText = corpFourJob;

		await ns.sleep(1000);
	}




}