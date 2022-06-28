/** @param {NS} ns */

import { createBox, createSidebarItem, confirm, prompt, select, alert } from "/box/box.js";

export let main = async ns => {
	ns.tail(ns.getScriptName());
	ns.clearLog();
	ns.disableLog("sleep");
	ns.atExit(() => item.remove());

	const gslv = ns.sleeve;

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
			ns.print('Sleeve' + i);
			ns.print(gslv.getTask(i));
			ns.print(gslv.getTask(i).task);
		}

		sleeve0.innerText = gslv.getTask(0).task;
		sleeve1.innerText = gslv.getTask(1).task;
		sleeve2.innerText = gslv.getTask(2).task;
		sleeve3.innerText = gslv.getTask(3).task;
		sleeve4.innerText = gslv.getTask(4).task;
		sleeve5.innerText = gslv.getTask(5).task;
		sleeve6.innerText = gslv.getTask(6).task;
		sleeve7.innerText = gslv.getTask(7).task;

		await ns.sleep(1000);
	}
}