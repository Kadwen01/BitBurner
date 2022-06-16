/** @param {NS} ns **/
import { formatMoney, formatNumberShort } from './helper.js'

export async function main(ns) {

    ns.tail(ns.getScriptName());

    const doc = eval("document");
    const hook0 = doc.getElementById('overview-extra-hook-0');
    const hook1 = doc.getElementById('overview-extra-hook-1');
    const hook3 = doc.getElementById('overview-extra-hook-1');
    const hook4 = doc.getElementById('overview-extra-hook-1');
    const hook5 = doc.getElementById('overview-extra-hook-1');
   
    const gang = ns.gang;

    while (true) {
        try {
            const headers = []
            const values = [];

            /*Karma*/
            if (!gang.inGang()) {
                headers.push("Karma ");
                values.push(Math.floor(ns.heart.break()));
            }
            /*Karma */

            /*Hash*/
            if (ns.hacknet.numHashes() > 0) {
                headers.push("Hash  ");
                values.push(Math.floor(ns.hacknet.numHashes()));
            }
            /*Hash*/

            /*Script Xp */
            let scriptx = null;
            if (Array.isArray(ns.getScriptExpGain())) {
                scriptx = Math.floor(ns.getScriptExpGain()[0]).toString();
            } else {
                scriptx = Math.floor(ns.getScriptExpGain()).toString();
            }

            headers.push("ScrExp  ");
            values.push(formatNumberShort(scriptx) + '/s');
            /*Script XP */

            /*Script Income */
            let scripti = Math.floor(ns.getScriptIncome()[0]).toString();;

            headers.push("ScrInc  ");
            values.push(formatMoney(scripti) + '/s');
            /*Script Income */

            /*Gang */
            if (gang.inGang()) {
                if (gang.getGangInformation().territoryWarfareEngaged) {
                    headers.push("GangTer ");
                    values.push(formatNumberShort(Math.floor(gang.getGangInformation().territory)) * 100 + '%')
                } else {
                    headers.push("GangMoney ");
                    const gmoneys = Math.floor(gang.getGangInformation().moneyGainRate).toString();
                    values.push(formatMoney(gmoneys) + '/s');
                }
            }
            /*Gang */

            hook0.innerText = headers.join("\n");
            hook1.innerText = values.join("\n");
            hook3.innerText = values.join("\n");
            hook4.innerText = values.join("\n");
            hook5.innerText = values.join("\n");
    
            ns.print(headers);
            ns.print(values);

        } catch (err) {
            ns.print("ERROR: Update Skipped: " + String(err));
        }

        await ns.sleep(1000);
        ns.atExit(() => { hook0.innerHTML = ""; hook1.innerHTML = ""; });
    }
}