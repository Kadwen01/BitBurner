export async function main(ns) { let r;try{r=JSON.stringify(
    Object.fromEntries(ns.args.map(sym => [sym, ns.stock.getAskPrice(sym)]))
);}catch(e){r="ERROR: "+(typeof e=='string'?e:e.message||JSON.stringify(e));}
const f="/Temp/stock-getAskPrice.txt"; if(ns.read(f)!==r) await ns.write(f,r,'w') }