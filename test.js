/** @param {NS} ns **/
export async function main(ns) {

    var list =[
        'deploy.js',
        'find_coding_contract.js',
        'grow.js',
        'grow_stop.js',
        'new_opened_servers.js',
        'opened_serers.js'
    ];

    for (const script of list){
        ns.tprintf(script);
    }


    var player = ns.getPlayer();
    var pmoney = player.money;
    const fpmoney = ns.nFormat(pmoney, '0.00a');
    //ns.tprint(player);
    ns.tprintf(player.money);
    ns.tprintf(fpmoney);

}