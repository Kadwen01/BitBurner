/** @param {NS} ns */
import { PrintTable, DefaultStyle } from 'tables.js';

function handleShockRecovery(ns, gslv) {
  ns.clearLog();
  for (let slvNo = 0; slvNo <= 6; slvNo++) {
    let sleeve = gslv.getSleeve(slvNo);
    let task = gslv.getTask(slvNo);
    let ntask = task ? (task.type === "BLADEBURNER" ? task.actionName : task.type) : "IDLE";

    if (sleeve.shock > 50 && ntask === "IDLE") {
      gslv.setToShockRecovery(slvNo);
      ns.print(`Sleeve ${slvNo} still in recovery`);
      ns.print(`Shock: ${sleeve.shock}`);
    }
  }
}

function handleKarma(ns, gslv) {
  ns.clearLog();
  for (let slvNo = 0; slvNo <= 6; slvNo++) {
    if (Math.floor(ns.heart.break()) > -54000) {
      gslv.setToCommitCrime(slvNo, "Homicide");
      ns.print(`Sleeve ${slvNo} is committing a homicide`);
    }
  }
  ns.print(`Karma: ${Math.floor(ns.heart.break())}`);
}

function handleBladeburnerCrime(ns, gslv, bb) {
  let contractTypes = ["Tracking", "Bounty Hunter", "Retirement"];
  let contractData = contractTypes.map((type, i) => ({
    type,
    chance: bb.getActionEstimatedSuccessChance("contract", type, i)[0] * 100,
    count: bb.getActionCountRemaining("contract", type)
  }));

  let tableData = [];
  const columns = [
    { header: 'Sleeve #', width: 8 },
    { header: 'Task', width: 31 },
    { header: 'Contracts', width: 9 },
    { header: 'Chance %', width: 8 }
  ];

  for (let slvNo = 0; slvNo <= 6; slvNo++) {
    let task = gslv.getTask(slvNo);
    let ntask = task ? (task.type === "BLADEBURNER" ? task.actionName : task.type) : "IDLE";

    let contract = contractData[slvNo] || { type: "None", chance: 0, count: 0 };
    let formattedCount = ns.formatNumber(contract.count, 0);
    let chanceColor = contract.chance > 90 ? 'green' : 'red';

    if (slvNo < 3) {
      if (contract.chance > 90 && contract.count > 100 && ["IDLE", "INFILTRATE", "CRIME"].includes(ntask)) {
        gslv.setToBladeburnerAction(slvNo, "Take on contracts", contract.type);
      } else if (ntask === 'IDLE') {
        gslv.setToCommitCrime(slvNo, "Heist");
      }
    } else if (slvNo === 3 || slvNo === 4) {
      if (ntask != "INFILTRATE") {
        gslv.setToBladeburnerAction(slvNo, "Infiltrate synthoids");
      }
    } else if (slvNo === 5) {
      if (ntask != "Training") {
        gslv.setToBladeburnerAction(slvNo, "Training");
      }
    } else if (slvNo === 6) {
      if (ntask != "Hyperbolic Regeneration Chamber") {
        gslv.setToBladeburnerAction(slvNo, "Hyperbolic Regeneration Chamber");
      }
    } else {
      gslv.setToCommitCrime(slvNo, "Heist");
    }

    tableData.push([
      { color: 'green', text: ` ${slvNo} ` },
      { color: 'white', text: ntask },
      { color: contract.count > 99 ? 'green' : 'yellow', text: ` ${formattedCount} ` },
      { color: chanceColor, text: ` ${contract.chance.toFixed(2)} ` }
    ]);
  }

  ns.clearLog();
  PrintTable(ns, tableData, columns, DefaultStyle(), ns.print);
}


async function gatherBladeburnerInfo(ns) {
  let bb = ns.bladeburner;

  const blackOpsNames = bb.getBlackOpNames();
  
  // Retrieve rank for each BlackOp
  let blackOpsRanks = {};
  for (let name of blackOpsNames) {
    blackOpsRanks[name] = bb.getBlackOpRank(name);
  }

  // Retrieve remaining actions correctly
  let blackOpsToBeDone = {};
  for (let name of blackOpsNames) {
    blackOpsToBeDone[name] = bb.getActionCountRemaining("blackops", name);
  }

  let remainingBlackOpsNames = blackOpsNames
    .filter(n => blackOpsToBeDone[n] === 1)
    .sort((b1, b2) => blackOpsRanks[b1] - blackOpsRanks[b2]);

  ns.print('There are ' + remainingBlackOpsNames.length + ' remaining Black Ops.');
}

export async function main(ns) {
  ns.disableLog("sleep");

  const gslv = ns.sleeve;
  const bb = ns.bladeburner;
  
  while (true) {
    handleShockRecovery(ns, gslv);
    handleKarma(ns, gslv);

    if (Math.floor(ns.heart.break()) < -54000) {
      handleBladeburnerCrime(ns, gslv, bb);
      gatherBladeburnerInfo(ns); // 
    }

    await ns.sleep(1000);
  }
}
