export async function main(ns) { let r;try{r=JSON.stringify(
    ns.bladeburner.getContractNames()
);}catch(e){r="ERROR: "+(typeof e=='string'?e:e.message||JSON.stringify(e));}
const f="/Temp/bladeburner-getContractNames.txt"; if(ns.read(f)!==r) await ns.write(f,r,'w') }