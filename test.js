/** @param {NS} ns **/
export async function main(ns) {



    var player = ns.getPlayer();
    var pmoney = player.money;
    const fpmoney = ns.nFormat(pmoney, '0.00a');
    ns.tprint(player);
    ns.tprintf(player.money);
    ns.tprintf(fpmoney);

}