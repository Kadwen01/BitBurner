/** @param {NS} ns */
//export async function main(ns) {
    //const servers = (t=[]) => ns.scan(t[t.length-1]).length > 1 ? t.concat(ns.scan(servers[servers.length-1])) : t.push(ns.scan(t[t.length-1]));
    //const result = servers(['home']);
    //ns.tprint(result);
//}

//export function list_animals(ns) {
//    const animals = ['dog', 'cat', 'pig', ns.getHostname(), ns.getScriptName(), ];
//    animals.push('cow');
//    return animals;
//}

export async function main(ns){
//    var animals = list_animals(ns);
//    ns.tprint(animals);
//    animals.push('bird');
//    ns.tprint(animals);


    const car = {type:"Fiat", model:"500", color:"white"};
    const truck = {type:"Ford", model:"F-150", color:"black"};
    var offer = [car, truck];
    ns.tprint(offer); // initial offer before pop

    for ( i of offer ) {
        
        var i = offer.pop();
        
        ns.tprint (i);   
        ns.tprint("The car is a " ,i.color + " " + i.type + " model " + i.model);
        ns.tprint (offer);
    
    }
}