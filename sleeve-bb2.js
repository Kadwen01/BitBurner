/** @param {NS} ns */
import { PrintTable, DefaultStyle } from 'tables.js'
export async function main(ns) {

  ns.disableLog("sleep");

  const gslv = eval("ns.sleeve");
  const slvNo = ns.args[0];
  const bb = eval("ns.bladeburner");

  while (true) {

    for (let slvNo = 0; slvNo <= 3; slvNo++) {

      if (gslv.getTask(slvNo) == null) {
        var sTask = 'IDLE';
      } else {
        var sTask = gslv.getTask(slvNo).type;
      }

      while (gslv.getSleeve(slvNo).shock > 50 && gslv.getTask(slvNo) === "Idle") {
        ns.clearLog();
        gslv.setToShockRecovery(slvNo);
        ns.print('Sleeve ' + slvNo + ' still in recovery');
        ns.print(gslv.getSleeve(slvNo).shock);
        await ns.sleep(60000);
      }

      while (Math.floor(ns.heart.break()) > -54000) {
        ns.clearLog();
        gslv.setToCommitCrime(slvNo, "Homicide");
        ns.print('Sleeve ' + slvNo + ' is commiting a homicide');
        ns.print('Karma: ' + Math.floor(ns.heart.break()));
        await ns.sleep(60000);
      }
    }

    // Collecting COntract Data
    let [tlow, thigh] = bb.getActionEstimatedSuccessChance("contract", "Tracking");
    let cTCount = bb.getActionCountRemaining("contract", "Tracking");
    let [blow, bhigh] = bb.getActionEstimatedSuccessChance("contract", "Bounty Hunter");
    let cBCount = bb.getActionCountRemaining("contract", "Bounty Hunter");
    let [rlow, rhigh] = bb.getActionEstimatedSuccessChance("contract", "Retirement");
    let cRCount = bb.getActionCountRemaining("contract", "Retirement");

    //settin table data

    let tableData = [];

    const columns = [
      { header: 'Sleeve #', width: 8 },
      { header: 'Task', width: 20 },
      { header: 'Contracts', width: 9 },
      { header: 'Chance %', width: 8}
    ];

    for (let slvNo = 0; slvNo <= 3; slvNo++) {

      function centerText(text) {
        let padding = Math.max(0, 8 - 1);
        let padLeft = Math.floor(padding / 2);
        let padRight = padding - padLeft;

        return ' '.repeat(padLeft) + text + ' '.repeat(padRight);
      }

      if (gslv.getTask(slvNo) == null) {
        var sTask = 'IDLE';
      } else {
        var sTask = gslv.getTask(slvNo).type;
      }

      if (slvNo === 0) {

        let tcon = ns.formatNumber(cTCount, 2);
        let centeredSlv = centerText(slvNo);
        let chance = (tlow * 100).toFixed(2);

        if ((tlow > .9 && cTCount > 100) && (sTask === 'IDLE' || sTask === "INFILTRATE" || sTask === "CRIME")) {
          gslv.setToBladeburnerAction(slvNo, "Take on contracts", "Tracking");
        } else if (sTask === 'IDLE') {
          gslv.setToCommitCrime(slvNo, "Heist");
        }

        tableData.push([
          { color: 'green', text: String(centeredSlv) },
          { color: 'white', text: String(sTask) },
          { color: tcon > 99 ? 'green' : 'yellow', text: String(" " + tcon) },
          { color: tlow > .9 ? 'green':'red', text: String(" " + chance)}
        ]);

      }

      if (slvNo === 1) {

        let bcon = ns.formatNumber(cBCount, 2);
        let centeredSlv = centerText(slvNo);
        let chance = (blow * 100).toFixed(2);

        if ((blow > .9 && cBCount > 100) && (sTask === 'IDLE' || sTask === "INFILTRATE" || sTask === "CRIME")) {
          gslv.setToBladeburnerAction(slvNo, "Take on contracts", "Bounty Hunter");
        } else if (sTask === 'IDLE') {
          gslv.setToCommitCrime(slvNo, "Heist");
        }

        tableData.push([
          { color: 'green', text: String(centeredSlv) },
          { color: 'white', text: String(sTask) },
          { color: bcon > 99 ? 'green' : 'yellow', text: String(" " + bcon) },
          { color: blow > .9 ? 'green':'red', text: String(" " + chance)}
        ]);
      }

      if (slvNo === 2) {

        let rcon = ns.formatNumber(cRCount, 2);
        let centeredSlv = centerText(slvNo);
        let chance = (rlow * 100).toFixed(2);

        if ((rlow > .9 && cRCount > 100) && (sTask === 'IDLE' || sTask === "INFILTRATE" || sTask === "CRIME")) {
          gslv.setToBladeburnerAction(slvNo, "Take on contracts", "Retirement");
        } else if (sTask === 'IDLE') {
          gslv.setToCommitCrime(slvNo, "Heist");
        }

        tableData.push([
          { color: 'green', text: String(centeredSlv) },
          { color: 'white', text: String(sTask) },
          { color: rcon > 99 ? 'green' : 'yellow', text: String(" " + rcon) },
          { color: rlow > .9 ? 'green':'red', text: String(" " + chance)}
        ]);
      }

      if (slvNo === 3) {

        let centeredSlv = centerText(slvNo);

        gslv.setToBladeburnerAction(slvNo, "Infiltrate synthoids");

        tableData.push([
          { color: 'green', text: String(centeredSlv) },
          { color: 'white', text: String(sTask) },
          { color: 'yellow', text: String("  null") },
          { color: 'red', text: String("  null")}
        ]);

      }
      await ns.sleep(1000);
    }

    ns.clearLog();
    PrintTable(ns, tableData, columns, DefaultStyle(), ns.print);
  }
}