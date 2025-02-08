/** @param {NS} ns */

import { PrintTable, DefaultStyle } from 'tables.js'

export async function main(ns) {

  ns.disableLog("sleep");
  const gsle = ns.sleeve;
  const sleeveCount = ns.sleeve.getNumSleeves();

  ns.print('Current number of sleeves: ' + sleeveCount);
  ns.tail(ns.getScriptName());

  function callSleeves() {
    for (var i = 0; i < sleeveCount; i++) {
      if (ns.getPlayer().inBladeburner) {
        ns.exec("sleeve-bb.js", 'home', 1, i);
      } else {
        ns.exec("sleeve.js", 'home', 1, i);
      }
    }
  }

  function sleeveActvity(slvNo) {
    let task = ns.sleeve.getTask(slvNo).type;


    if (task === "RECOVERY"){
      let shockValue = ns.sleeve.getSleeve(slvNo).shock.toFixed(2);
      ns.print(task + ': Shock Value ' + shockValue + '%');
    }

    if (task === 'CRIME') {
      let activity = ns.sleeve.getTask(slvNo).crimeType;
      ns.print(task + ": " + activity);
    }

    if (task === 'FACTION') {
      let activity = ns.sleeve.getTask(slvNo).factionWorkType;
      let faction = ns.sleeve.getTask(slvNo).factionName;
      ns.print(activity + ' for ' + faction);
    }

    if (task === 'CLASS') {
      let activity = ns.sleeve.getTask(slvNo).classType;
      let location = ns.sleeve.getTask(slvNo).location;
      ns.print(location + ':  ' + activity);
    }

    if (task === 'COMPANY') {
      let location = ns.sleeve.getTask(slvNo).companyName;
      ns.print(task + ':  ' + location);
    }
  }

  callSleeves();

  while (true) {
    ns.clearLog();
    for (var slvNo = 0; slvNo < sleeveCount; slvNo++) {

      const availAugs = gsle.getSleevePurchasableAugs(slvNo);
      let syncValue = gsle.getSleeve(slvNo).sync.toFixed(2);

      ns.print("Sleeve No: " + slvNo);
      sleeveActvity(slvNo);
      ns.print('Sync %: ' + syncValue);
      ns.print('Available Augments to install: ' + availAugs.length);
      ns.print(" ");

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

    await ns.sleep(60000);
  }
}