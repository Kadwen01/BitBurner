export async function main(ns) { let r;try{r=JSON.stringify(
    Object.fromEntries(JSON.parse(ns.args[0]).map(e => [e, ns.bladeburner.getActionCountRemaining(ns.args[1], e)]))
);}catch(e){r="ERROR: "+(typeof e=='string'?e:e.message||JSON.stringify(e));}
const f="/Temp/bladeburner-getActionCountRemaining-all.txt"; if(ns.read(f)!==r) await ns.write(f,r,'w') }