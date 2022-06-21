import { createSidebarItem, doc } from "box/box"
export async function main(ns) {

  let box = createSidebarItem("Scripts", `
  <div style="font-size:16px"><button id=dash>Dashboard</button>  <button id=npos>npos</button>  <button id=pos>pos</button></div> 
  <div style="font-size:16px"><button id=augs>Augs</button> <button id=augsBuy>buy</button></div>
	<div style="font-size:16px"><button id=job>Jobs</button></div>

  `, "\ueb36");

  box.querySelector("#dash").addEventListener("click", () => ns.run("dash.js"));
  box.querySelector("#npos").addEventListener("click", () => ns.run("dash.js", 1, "npos"));
  box.querySelector("#pos").addEventListener("click", () => ns.run("dash.js", 1, "pos"));

  box.querySelector("#augs").addEventListener("click", () => ns.run("augs.js"));
  box.querySelector("#augsBuy").addEventListener("click", () => ns.run("augs.js",1 , "buy"));

  box.querySelector("#job").addEventListener("click", () => ns.run("job-software.js"));

  while (doc.body.contains(box)) await ns.asleep(1000);

}