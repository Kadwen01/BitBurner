export async function main(ns) { let r;try{r=JSON.stringify(
    ns.stock.sellShort(ns.args[0], ns.args[1])
);}catch(e){r="ERROR: "+(typeof e=='string'?e:e.message||JSON.stringify(e));}
const f="/Temp/stock-sellShort.txt"; if(ns.read(f)!==r) await ns.write(f,r,'w') }