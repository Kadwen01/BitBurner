export async function main(ns) { let r;try{r=JSON.stringify(
    ns.bladeburner.getCurrentAction()
);}catch(e){r="ERROR: "+(typeof e=='string'?e:e.message||JSON.stringify(e));}
const f="/Temp/bladeburner-getCurrentAction.txt"; if(ns.read(f)!==r) await ns.write(f,r,'w') }