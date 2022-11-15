/** @param {NS} ns */

import { createBox, createSidebarItem, confirm, prompt, select, alert } from "/box/box.js";

export let main = async ns => {
	ns.tail(ns.getScriptName());
	ns.clearLog();
	ns.disableLog("sleep");
	ns.atExit(() => item.remove());

	let doc = eval("document");

	let item = createSidebarItem("Sleeve Info", `
	<div style="font-size:16px">Sleeve 0: <span id=slvNo0></span></div>
	<div style="font-size:16px">Sleeve 1: <span id=slvNo1></span></div>
	<div style="font-size:16px">Sleeve 2: <span id=slvNo2></span></div>
	<div style="font-size:16px">Sleeve 3: <span id=slvNo3></span></div>
	<div style="font-size:16px">Sleeve 4: <span id=slvNo4></span></div>
	<div style="font-size:16px">Sleeve 5: <span id=slvNo5></span></div>
	<div style="font-size:16px">Sleeve 6: <span id=slvNo6></span></div>
	<div style="font-size:16px">Sleeve 7: <span id=slvNo7></span></div>
	<div> --------------------  </div>

	 `);

	let sleeve0 = document.getElementById("slvNo0");
	let sleeve1 = document.getElementById("slvNo1");
	let sleeve2 = document.getElementById("slvNo2");
	let sleeve3 = document.getElementById("slvNo3");
	let sleeve4 = document.getElementById("slvNo4");
	let sleeve5 = document.getElementById("slvNo5");
	let sleeve6 = document.getElementById("slvNo6");
	let sleeve7 = document.getElementById("slvNo7");

	while (doc.body.contains(item)) {
		ns.clearLog();

		for (let i = 0; i <= 7; i++) {
			ns.print('Sleeve ' + i);
			ns.print(ns.sleeve.getTask(i));
		}

		if (ns.sleeve.getTask(0) === null) {
			sleeve0.innerText = 'Idle';
		} else if ( ns.sleeve.getTask(0).type.length > 0) {
			sleeve0.innerText = ns.sleeve.getTask(0).tpye;
		} else {
			sleeve0.innerText = ns.sleeve.getTask(0);
		}

		if (ns.sleeve.getTask(1) === null) {
			sleeve1.innerText = 'Idle';
		} else if (ns.sleeve.getTask(1).tpye.length > 0) {
			sleeve1.innerText = ns.sleeve.getTask(1).tpye;
		} else {
			sleeve1.innerText = ns.sleeve.getTask(1);
		}

		if (ns.sleeve.getTask(2) === null) {
			sleeve2.innerText = 'Idle';
		} else if (ns.sleeve.getTask(2).tpye.length > 0) {
			sleeve2.innerText = ns.sleeve.getTask(2).tpye;
		} else {
			sleeve2.innerText = ns.sleeve.getTask(2);
		}

		if (ns.sleeve.getTask(3) === null) {
			sleeve3.innerText = 'Idle';
		} else if (ns.sleeve.getTask(3).tpye.length > 0) {
			sleeve3.innerText = ns.sleeve.getTask(3).tpye;
		} else {
			sleeve3.innerText = ns.sleeve.getTask(3);
		}

		if (ns.sleeve.getTask(4) === null) {
			sleeve4.innerText = 'Idle';
		} else if (ns.sleeve.getTask(4).tpye.length > 0) {
			sleeve4.innerText = ns.sleeve.getTask(4).tpye;
		} else {
			sleeve4.innerText = ns.sleeve.getTask(4);
		}

		if (ns.sleeve.getTask(5) === null) {
			sleeve5.innerText = 'Idle';
		} else if (ns.sleeve.getTask(5).tpye.length > 0) {
			sleeve5.innerText = ns.sleeve.getTask(5).tpye;
		} else {
			sleeve5.innerText = ns.sleeve.getTask(5);
		}

		if (ns.sleeve.getTask(6) === null) {
			sleeve6.innerText = 'Idle';
		} else if (ns.sleeve.getTask(6).tpye.length > 0) {
			sleeve6.innerText = ns.sleeve.getTask(6).tpye;
		} else {
			sleeve6.innerText = ns.sleeve.getTask(6);
		}

		if (ns.sleeve.getTask(7) === null) {
			sleeve7.innerText = 'Idle';
		} else if (ns.sleeve.getTask(7).tpye.length > 0) {
			sleeve7.innerText = ns.sleeve.getTask(7).tpye;
		} else {
			sleeve7.innerText = ns.sleeve.getTask(7);
		}

		await ns.sleep(1000);
	}
}
