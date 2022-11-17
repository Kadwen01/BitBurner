import { createSidebarItem, doc } from "box/box"
export async function main(ns) {
	ns.atExit(() => box.remove());

  let box = createSidebarItem("Scripts", `
  <div style="font-size:16px"><button id=dash>Dash</button>  <button id=npos>npos</button>  <button id=pos>pos</button></div> 
  <div style="font-size:16px"><button id=augs>Augs</button>  <button id=augsBuy>buy</button> <button id=job>Jobs</button></div>
	<div style="font-size:16px"><button id=pid>Pid</button>  <button id=ram>Ram</button> <button id=money>Max Money</button> </div> 

  `, "\ueb36");

  box.querySelector("#dash").addEventListener("click", () => ns.run("xtree.js"));
  box.querySelector("#npos").addEventListener("click", () => ns.run("xtree.js", 1, "npos"));
  box.querySelector("#pos").addEventListener("click", () => ns.run("xtree.js", 1, "pos"));

  box.querySelector("#augs").addEventListener("click", () => ns.run("augs.js"));
  box.querySelector("#augsBuy").addEventListener("click", () => ns.run("augs.js",1 , "buy"));

  box.querySelector("#job").addEventListener("click", () => ns.run("job-software.js"));
  box.querySelector("#pid").addEventListener("click", () => ns.run("mypid.js"));
  box.querySelector("#ram").addEventListener("click", () => ns.run("ram.js"));
  box.querySelector("#money").addEventListener("click", () => ns.run("find-money.js"));




  while (doc.body.contains(box)) await ns.asleep(1000);

}