/** @param {NS} ns **/
export async function main(ns) {
    const doc = eval("document"); 
    const gang = ns.gang;
    const hook0 = doc.getElementById('overview-extra-hook-0');
    const hook1 = doc.getElementById('overview-extra-hook-1');
	const hook3 = doc.getElementById('overview-extra-hook-1');
    const hook4 = doc.getElementById('overview-extra-hook-1');
    while (true) {
        try {  
            const headers = []
            const values = [];
            /*Karma*/
            if(!gang.inGang()){   
            headers.push("Karma ");
            values.push(Math.floor(ns.heart.break()));
            }
            /*Karma */
            /*Script Xp */
            let scriptx = null;
            if(Array.isArray(ns.getScriptExpGain())){
                 scriptx = Math.floor(ns.getScriptExpGain()[0]).toString();
            }else{
                 scriptx = Math.floor(ns.getScriptExpGain()).toString();
            }
            const xnum = scriptx.length;
            headers.push("ScrExp  ");
          
            if(xnum >= 12){
                values.push(scriptx.slice(0,1)+','+scriptx.slice(1,3)+'t/sec');
            }else if(xnum >= 11){
                values.push(scriptx.slice(0,2)+','+scriptx.slice(2,3)+'b/sec');
            }else if(xnum >= 10){
                values.push(scriptx.slice(0,1)+','+scriptx.slice(1,3)+'b/sec');
            }else if(xnum >= 9){
                values.push(scriptx.slice(0,4)+'k/sec');
            }else if(xnum >= 8){
                values.push(scriptx.slice(0,3)+'k/sec');
            }else if(xnum >= 7){
                values.push(scriptx.slice(0,2)+'k/sec');
            }else{
                values.push(scriptx+'/sec');
            }
            /*Script XP */
            /*Script Income */
            let scripti = Math.floor(ns.getScriptIncome()[0]).toString();;
            const snum = scripti.length;
           
			headers.push("ScrInc  ");
            if(snum >= 12){
                values.push(scripti.slice(0,1)+','+scripti.slice(1,3)+'t/sec');
            }else if(snum >= 11){
                values.push(scripti.slice(0,2)+','+scripti.slice(2,3)+'b/sec');
            }else if(snum >= 10){
                values.push(scripti.slice(0,1)+','+scripti.slice(1,3)+'b/sec');
            }else if(snum >= 9){
                values.push(scripti.slice(0,4)+'k/sec');
            }else if(snum >= 8){
                values.push(scripti.slice(0,3)+'k/sec');
            }else if(snum >= 7){
                values.push(scripti.slice(0,2)+'k/sec');
            }else{
                values.push(scripti+'/sec');
            }
            /*Script Income */
            /*Gang Money */
            if(gang.inGang()){  
            headers.push("GangMoney ");
            const gmoneys = Math.floor(gang.getGangInformation().moneyGainRate).toString();
            const gnum = gmoneys.length;
            if(gnum >= 12){
                values.push(gmoneys.slice(0,1)+','+gmoneys.slice(1,3)+'t/sec');
            }else if(gnum >= 11){
                values.push(gmoneys.slice(0,2)+','+gmoneys.slice(2,3)+'b/sec');
            }else if(gnum >= 10){
                values.push(gmoneys.slice(0,1)+','+gmoneys.slice(1,3)+'b/sec');
            }else if(gnum >= 9){
                values.push(gmoneys.slice(0,4)+'k/sec');
            }else if(gnum >= 8){
                values.push(gmoneys.slice(0,3)+'k/sec');
            }else if(gnum >= 7){
                values.push(gmoneys.slice(0,2)+'k/sec');
            }else if(gnum >= 6){
                values.push(gmoneys+'/sec');
            }
            }else{

            }
             /*Gang Money */
            hook0.innerText = headers.join("\n");
            hook1.innerText = values.join("\n");
			hook3.innerText = values.join("\n");
            hook4.innerText = values.join("\n");
          
        } catch (err) { 
            ns.print("ERROR: Update Skipped: " + String(err));
        }
        await ns.sleep(1000);
        ns.atExit(() => { hook0.innerHTML = ""; hook1.innerHTML = ""; });
    }
}