//Requires access to the TIX API and the 4S Mkt Data API
const THRESHOLD_CASH_GOAL = 0.4; // Fraction of cash to aim to keep in hand
const THRESHOLD_CASH_LOW = 0.1; // Fraction of cash in hand sale back to goal threshold

// Probability stock will increase is a value between 0 and 1.
const THRESHOLD_SELL = 0.5; // Probability we should start sell at if under. 
const THRESHOLD_BUY = 0.5; // Probability we should start buying at if over

const COMMISSION = 100000; //Buy or sell commission
const REFRESH = 5200; // time to wait between stock price refreshes

/** @param {NS} ns **/
export async function main(ns) {
    let rollingProfit = 0;
    if (ns.args[0] == "sellall") {
        ns.tprint("selling all stocks");
        const allStocks = refreshStocks(ns);
        allStocks.filter((stk) => stk.shares > 0).forEach((stk) =>{
            rollingProfit += sell(ns, stk, stk.shares, true);
        });
        ns.tprint(`made ~${format(rollingProfit)}`);
        return;
    }
    //Initialise
    ns.disableLog("ALL");
    while (true) {
        // get current stock info with highest return chance first.
        const allStocks = refreshStocks(ns);
        // get my stocks but sorted by weakest return chance
        const myStocks = allStocks.filter((stock) => stock.shares > 0).sort(function (a, b) { return a.prob - b.prob });
        const holdingPrice = allStocks.reduce((prev, stock) => prev += (stock.price * stock.shares), 0);
        const boughtPrice = allStocks.reduce((prev, stock) => prev += (stock.avgBuyPrice * stock.shares), 0);
        const homeMoney = ns.getServerMoneyAvailable("home");
        //ns.clearLog();
        ns.print(`________________________`);
        ns.print(`INFO Stock Value: ${format(holdingPrice)} for current gain of ${format(holdingPrice - boughtPrice)}`);
        let corpus = ns.getServerMoneyAvailable("home") + holdingPrice;
        ns.print(`INFO Total Assest: ${format(corpus)}`);
        ns.print(`INFO Liquid Assest: ${format(homeMoney)}`);
        ns.print(`INFO Actual Profit: ${format(rollingProfit)}`);
        //Sell underperforming shares
        myStocks.forEach((stock) => {
            if (stock.prob < THRESHOLD_SELL) {
                rollingProfit += sell(ns, stock, stock.shares);
                corpus -= COMMISSION;
            }
        });

        // Sell shares if not enough cash in hand (start lowest return);
        myStocks.forEach((stock) => {
            const homeMoney = ns.getServerMoneyAvailable("home");
            if (homeMoney < (THRESHOLD_CASH_LOW * corpus)) {
                ns.print(`WARN need money, selling stocks`);
                let cashNeeded = (corpus * THRESHOLD_CASH_GOAL - homeMoney + COMMISSION);
                let numShares = Math.floor(cashNeeded / stock.price);
                rollingProfit += sell(ns, stock, numShares);
                corpus -= COMMISSION;
            }
        });

        //Buy shares with cash remaining in hand
        let cashToSpend = ns.getServerMoneyAvailable("home") - (corpus * THRESHOLD_CASH_GOAL);
        allStocks.filter((stock)=> (stock.prob > THRESHOLD_BUY && stock.remainingShares > 0)).forEach((stock)=>{
            let numShares = Math.min(Math.floor((cashToSpend - COMMISSION) / stock.price), stock.remainingShares);
            if (numShares > 0) {
                const spent = buy(ns, stock, numShares);
                cashToSpend -= spent;
            }
        });
        await ns.sleep(REFRESH);
    }
}

/** @param {NS} ns **/
function refreshStocks(ns) {
    return ns.stock.getSymbols().map((sym)=> {
        const position = ns.stock.getPosition(sym);
        const price = ns.stock.getPrice(sym);
        const shares = position[0];
        const avgBuyPrice = position[1];
        const prob = ns.stock.getForecast(sym);
        const remainingShares = ns.stock.getMaxShares(sym) - shares;
        return {
            sym,
            price,
            shares,
            avgBuyPrice,
            prob,
            remainingShares
        };
    }).sort(function (a, b) { return b.prob - a.prob });
}

/** @param {NS} ns **/
function buy(ns, stock, numShares) {
    const price = ns.stock.buy(stock.sym, numShares);
    ns.print(`SUCCSESS Bought ${stock.sym} for ${format(numShares * stock.price)}`);
    //ns.alert(`Bought ${stock.sym} for ${format(numShares * stock.price)}`);
    return price * numShares + COMMISSION;
}

/** @param {NS} ns **/
function sell(ns, stock, numShares, isSellAll) {
    let profit = numShares * (stock.price - stock.avgBuyPrice) - 2 * COMMISSION;
    if (!isSellAll) {
        ns.print(`WARN Sold ${stock.sym} for profit of ${format(profit)}`);
        //ns.alert(`Sold ${stock.sym} for profit of ${format(profit)}`);
    } else {
        ns.tprint(`WARN Sold ${stock.sym} for profit of ${format(profit)}`);
        //ns.alert(`Sold ${stock.sym} for profit of ${format(profit)}`);
    }
    ns.stock.sell(stock.sym, numShares);
    return profit;
}

function format(num) {
    let symbols = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc"];
    let i;
    for (i = 0; (Math.abs(num) >= 1000) && (i < symbols.length); i++) {
        num /= 1000;
    } 
    return ((Math.sign(num) < 0) ? "-$" : "$") + Math.abs(num.toFixed(3)) + symbols[i];
}