export async function main(ns) { let r;try{r=JSON.stringify(
    ns.stock.getSymbols()
);}catch(e){r="ERROR: "+(typeof e=='string'?e:e.message||JSON.stringify(e));}
const f="/Temp/stock-symbols.txt"; if(ns.read(f)!==r) await ns.write(f,r,'w') }