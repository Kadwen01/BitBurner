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

		if (ns.sleeve.getTask(0) == null) {
			sleeve0.innerText = 'Idle';
		} else if ((ns.sleeve.getTask(0).type == 'INFILTRATE') || (ns.sleeve.getTask(0).type == 'RECOVERY')) {
			sleeve0.innerText = ns.sleeve.getTask(0).type;
		} else if (ns.sleeve.getTask(0).type == 'COMPANY') {
			sleeve0.innerText = ns.sleeve.getTask(0).companyName;
		} else if (ns.sleeve.getTask(0).actionType == 'General') {
			sleeve0.innerText = ns.sleeve.getTask(0).actionName;
		} else if (ns.sleeve.getTask(0).actionType == 'Contracts') {
			sleeve0.innerText = ns.sleeve.getTask(0).actionName;
		} else {
			sleeve0.innerText = ns.sleeve.getTask(0);
		}

		if (ns.sleeve.getTask(1) == null) {
			sleeve1.innerText = 'Idle';
		} else if ((ns.sleeve.getTask(1).type == 'INFILTRATE') || (ns.sleeve.getTask(1).type == 'RECOVERY')) {
			sleeve1.innerText = ns.sleeve.getTask(1).type;
		} else if (ns.sleeve.getTask(1).type == 'COMPANY') {
			sleeve1.innerText = ns.sleeve.getTask(1).companyName;
		} else if (ns.sleeve.getTask(1).actionType == 'General') {
			sleeve1.innerText = ns.sleeve.getTask(1).actionName;
		} else if (ns.sleeve.getTask(1).actionType == 'Contracts') {
			sleeve1.innerText = ns.sleeve.getTask(1).actionName;
		} else {
			sleeve1.innerText = ns.sleeve.getTask(1);
		}

		if (ns.sleeve.getTask(2) == null) {
			sleeve2.innerText = 'Idle';
		} else if ((ns.sleeve.getTask(2).type == 'INFILTRATE') || (ns.sleeve.getTask(2).type == 'RECOVERY')) {
			sleeve2.innerText = ns.sleeve.getTask(2).type;
		} else if (ns.sleeve.getTask(2).type == 'COMPANY') {
			sleeve2.innerText = ns.sleeve.getTask(2).companyName;
		} else if (ns.sleeve.getTask(2).actionType == 'General') {
			sleeve2.innerText = ns.sleeve.getTask(2).actionName;
		} else if (ns.sleeve.getTask(2).actionType == 'Contracts') {
			sleeve2.innerText = ns.sleeve.getTask(2).actionName;
		} else {
			sleeve2.innerText = ns.sleeve.getTask(2);
		}

		if (ns.sleeve.getTask(3) == null) {
			sleeve3.innerText = 'Idle';
		} else if ((ns.sleeve.getTask(3).type == 'INFILTRATE') || (ns.sleeve.getTask(3).type == 'RECOVERY')) {
			sleeve3.innerText = ns.sleeve.getTask(3).type;
		} else if (ns.sleeve.getTask(3).type == 'COMPANY') {
			sleeve3.innerText = ns.sleeve.getTask(3).companyName;
		} else if (ns.sleeve.getTask(3).actionType == 'General') {
			sleeve3.innerText = ns.sleeve.getTask(3).actionName;
		} else if (ns.sleeve.getTask(3).actionType == 'Contracts') {
			sleeve3.innerText = ns.sleeve.getTask(3).actionName;
		} else {
			sleeve3.innerText = ns.sleeve.getTask(3);
		}

		if (ns.sleeve.getTask(4) == null) {
			sleeve4.innerText = 'Idle';
		} else if ((ns.sleeve.getTask(4).type == 'INFILTRATE') || (ns.sleeve.getTask(4).type == 'RECOVERY')) {
			sleeve4.innerText = ns.sleeve.getTask(4).type;
		} else if (ns.sleeve.getTask(4).type == 'COMPANY') {
			sleeve4.innerText = ns.sleeve.getTask(4).companyName;
		} else if (ns.sleeve.getTask(4).actionType == 'General') {
			sleeve4.innerText = ns.sleeve.getTask(4).actionName;
		} else if (ns.sleeve.getTask(4).actionType == 'Contracts') {
			sleeve4.innerText = ns.sleeve.getTask(4).actionName;
		} else {
			sleeve4.innerText = ns.sleeve.getTask(4);
		}

		if (ns.sleeve.getTask(5) == null) {
			sleeve5.innerText = 'Idle';
		} else if ((ns.sleeve.getTask(5).type == 'INFILTRATE') || (ns.sleeve.getTask(5).type == 'RECOVERY')) {
			sleeve5.innerText = ns.sleeve.getTask(5).type;
		} else if (ns.sleeve.getTask(5).type == 'COMPANY') {
			sleeve5.innerText = ns.sleeve.getTask(5).companyName;
		} else if (ns.sleeve.getTask(5).actionType == 'General') {
			sleeve5.innerText = ns.sleeve.getTask(5).actionName;
		} else if (ns.sleeve.getTask(5).actionType == 'Contracts') {
			sleeve5.innerText = ns.sleeve.getTask(5).actionName;
		} else {
			sleeve5.innerText = ns.sleeve.getTask(5);
		}

		if (ns.sleeve.getTask(6) == null) {
			sleeve6.innerText = 'Idle';
		} else if ((ns.sleeve.getTask(6).type == 'INFILTRATE') || (ns.sleeve.getTask(6).type == 'RECOVERY')) {
			sleeve6.innerText = ns.sleeve.getTask(6).type;
		} else if (ns.sleeve.getTask(6).type == 'COMPANY') {
			sleeve6.innerText = ns.sleeve.getTask(6).companyName;
		} else if (ns.sleeve.getTask(6).actionType == 'General') {
			sleeve6.innerText = ns.sleeve.getTask(6).actionName;
		} else if (ns.sleeve.getTask(6).actionType == 'Contracts') {
			sleeve6.innerText = ns.sleeve.getTask(6).actionName;
		} else {
			sleeve6.innerText = ns.sleeve.getTask(6);
		}

		if (ns.sleeve.getTask(7) == null) {
			sleeve7.innerText = 'Idle';
		} else if ((ns.sleeve.getTask(7).type == 'INFILTRATE') || (ns.sleeve.getTask(7).type == 'RECOVERY')) {
			sleeve7.innerText = ns.sleeve.getTask(7).type;
		} else if (ns.sleeve.getTask(7).type == 'COMPANY') {
			sleeve7.innerText = ns.sleeve.getTask(7).companyName;
		} else if (ns.sleeve.getTask(7).actionType == 'General') {
			sleeve7.innerText = ns.sleeve.getTask(7).actionName;
		} else if (ns.sleeve.getTask(7).actionType == 'Contracts') {
			sleeve7.innerText = ns.sleeve.getTask(7).actionName;
		} else {
			sleeve7.innerText = ns.sleeve.getTask(7);
		}

		await ns.sleep(1000);
	}
}
