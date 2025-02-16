/** @param {NS} ns */

import { PrintTable, DefaultStyle } from 'tables.js'

export async function main(ns) {

  ns.disableLog("sleep");
  const gsle = ns.sleeve;
  const sleeveCount = ns.sleeve.getNumSleeves();

  ns.print('Current number of sleeves: ' + sleeveCount);
  ns.tail(ns.getScriptName());

  function callSleevesOld() {
    for (var i = 0; i < sleeveCount; i++) {
      if (ns.getPlayer().inBladeburner) {
        ns.exec("sleeve-bb.js", 'home', 1, i);
      } else {
        ns.exec("sleeve.js", 'home', 1, i);
      }
    }
  }

  function callSleeves() {
    for (let i = 0; i < sleeveCount; i++) {
      ns.kill("sleeve-bb.js", "home", i);
      ns.kill("sleeve.js", "home", i);
      ns.print(`Restarting sleeve script for ${i}`);

      if (ns.getPlayer().inBladeburner) {
        ns.exec("sleeve-bb.js", 'home', 1, i);
      } else {
        ns.exec("sleeve.js", 'home', 1, i);
      }
    }
  }

  callSleeves();

  async function manage(ns, gsle) {
    ns.clearLog();

    let tableData = [];

    const columns = [
      { header: 'Sleeve #', width: 8 },
      { header: 'Task', width: 14 },
      { header: 'Sync', width: 6 },
      { header: 'Shock', width: 6 }
    ];

    for (let slvNo = 0; slvNo < sleeveCount; slvNo++) {

      let availAugs = gsle.getSleevePurchasableAugs(slvNo);
      let syncValue = gsle.getSleeve(slvNo).sync.toFixed(2);
      let shockValue = ns.sleeve.getSleeve(slvNo).shock.toFixed(2);

      let taskInfo = ns.sleeve.getTask(slvNo) || {};
      let activity = "IDLE";

      if (taskInfo.type === 'CRIME') {
        activity = taskInfo.crimeType;
      } else if (taskInfo.type === 'FACTION') {
        activity = taskInfo.factionName;
      } else if (taskInfo.type === 'CLASS') {
        activity = taskInfo.classType;
      } else if (taskInfo.type === 'COMPANY') {
        activity = taskInfo.companyName;
      } else if (taskInfo.type === 'RECOVERY' || taskInfo.type === 'SYNCHRO') {
        activity = taskInfo.type;
      }

      tableData.push([
        { color: 'white', text: String(slvNo) },
        { color: 'cyan', text: String(activity) },
        { color: 'yellow', text: String(syncValue) },
        { color: 'red', text: String(shockValue) }
      ]);

      if (gsle.getSleeve(slvNo).shock > 0) {
        continue;
      } else {
        for (let key of availAugs) {
          if (ns.getPlayer().money > key.cost) {
            ns.print('Installing: ' + key.name);
            gsle.purchaseSleeveAug(slvNo, key.name);
          }
        }
      }
    }

    if (ns.getPlayer().inBladeburner && !ns.scriptRunning("sleeve-bb.js", "home")) {
      for (var slvNo = 0; slvNo < sleeveCount; slvNo++) {
        ns.kill("sleeve.js", "home", slvNo);
      }
      callSleeves();
    }

    PrintTable(ns, tableData, columns, DefaultStyle(), ns.print);
  }

  while (true) {
    await manage(ns, gsle);
    await ns.sleep(60000);
  }

}