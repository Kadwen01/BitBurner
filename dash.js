/** @param {NS} ns */
export async function main(ns) {
	const servers = GetAllServers(ns);
	const spacer = 1;
	await GetSymbolAssociations(ns, servers);

	ColorPrint(
		'white',
		'┌'.padEnd(49, '─') + '┬',
		'white',
		''.padEnd(20, '─') + '┬',
		'white',
		''.padEnd(22, '─') + '┬',
		'white',
		''.padEnd(7, '─') + '┬',
		'white',
		''.padEnd(6, '─') + '┬',
	);
	ColorPrint(
		'white', '│ SERVERS'.padEnd(47) + '  │',
		'white', padCenter('RAM', 19) + ' │',
		'white', padCenter('MONEY', 21) + ' │',
		'white', padCenter('SEC', 7) + '│', // 99/99 100%
		'white', padCenter('MHL', 5) + ' │',
	);
	ColorPrint(
		'white',
		'├'.padEnd(49, '─') + '┼',
		'white',
		''.padEnd(20, '─') + '┼',
		'white',
		''.padEnd(22, '─') + '┼',
		'white',
		''.padEnd(7, '─') + '┼',
		'white',
		''.padEnd(6, '─') + '┼',
	);

	// ┼
	// ┴
	// ┬

	for (let i = 0; i < servers.length; i++) {
		const server = servers[i];
		let depth = server.route.length - 1;
		let nextDepth = i >= servers.length - 1 ? -1 : servers[i + 1].route.length - 1;
		let lastRootChild = lastChildAtDepth(servers, i, depth);
		let prefix = '';

		for (let j = 1; j <= depth; j++) {
			if (nextDepth >= depth && j == depth) {
				if (i == lastRootChild) prefix += '└'.padEnd(spacer + 1, '─');
				else prefix += '├'.padEnd(spacer + 1, '─');
			}
			else if (nextDepth < depth && j == depth) prefix += '└'.padEnd(spacer + 1, '─');
			else if (i == servers.length - 1 && i != lastChildAtDepth(servers, i, j)) prefix += '└'.padEnd(spacer + 1, '─');
			else if (j == depth) prefix += '│'.padEnd(spacer + 1, ' ');
			else if (i != lastChildAtDepth(servers, i, j)) prefix += '│'.padEnd(spacer + 1, ' ');
			else prefix += '  ';
		}

		let len = prefix.length + server.name.length;
		let lineColor = i % 2 == 0 ? '#212121' : '#353535';

		let maxRam = ns.getServerMaxRam(server.name);
		let ramColor = maxRam > 0 ? 'white' : '#555555';
		let ramString = maxRam > 0 ? ns.nFormat(maxRam * 1000000000, '0.0b') : 'N/A';

		let freeRam = ns.getServerMaxRam(server.name) - ns.getServerUsedRam(server.name);
		let freeRamColor = freeRam > 0 ? 'white' : '#555555';
		let freeRamString = maxRam > 0 ? ns.nFormat(freeRam * 1000000000, '0.0b') : '';

		let ramPct = maxRam > 0 ? (freeRam / maxRam * 100).toFixed(0) + '%' : '';

		freeRamColor = pctColor(freeRam / maxRam);

		let money = ns.getServerMoneyAvailable(server.name);
		let moneyMax = ns.getServerMaxMoney(server.name);

		let moneyPct = moneyMax > 0 ? (money / moneyMax * 100).toFixed(0) + '%' : '';

		let moneyString = moneyMax > 0 ? ns.nFormat(money, '0.00a').padStart(8) : ''.padStart(8);
		let moneyColor = pctColor(money / moneyMax);

		let maxMoneyString = moneyMax > 0 ? ns.nFormat(moneyMax, '0.00a').padStart(8) : 'N/A'.padStart(8);
		let maxMoneyColor = moneyMax > 0 ? 'white' : '#555555';

		let so = ns.getServer(server.name);
		let sec = so.hackDifficulty;
		let minSec = so.minDifficulty;
		let secPct = (sec - minSec) / (99 - minSec);
		let secColor = pctColor(1 - secPct);

		let mhl = ns.getServerRequiredHackingLevel(server.name).toString();
		let mhlColor = mhl > 0 ? `white` : '#555555';
		mhlColor = hackColor(mhl); 
		
		const output = [
			'white',
			'│ ',
			'gray', prefix,
			'white', server.name,
			lineColor, ''.padEnd(47 - len, '─'),
			'white',
			'│',
			freeRamColor, freeRamString.padStart(7),
			'white', maxRam == 0 ? ' ' : '/',
			ramColor, ramString.padStart(7),
			freeRamColor,
			ramPct.padStart(5),
			'white',
			'│',
			moneyColor,
			moneyString,
			'white',
			moneyMax > 0 ? '/' : ' ',
			maxMoneyColor,
			maxMoneyString,
			moneyColor,
			moneyPct.padStart(5),
			'white',
			'│',
			secColor,
			moneyMax > 0 ? (sec - minSec).toFixed(2).padStart(6) : ''.padEnd(6),
			'white',
			' │',
			'white',
			mhl.padStart(5),  //server.sym ? server.sym.padStart(5) : ''.padStart(5),
			'white',
			' │',
		];

		ColorPrint(...output);
	}

	ColorPrint(
		'white',
		'└'.padEnd(49, '─') + '┴',
		'white',
		''.padEnd(20, '─') + '┴',
		'white',
		''.padEnd(22, '─') + '┴',
		'white',
		''.padEnd(7, '─') + '┴',
		'white',
		''.padEnd(6, '─') + '┴',
	);
}

// Selects a color based on a 1-based percentage
function pctColor(pct) {
	if (pct >= 1) return 'Lime';
	else if (pct >= 0.9) return 'Green';
	else if (pct >= 0.75) return 'ForestGreen';
	else if (pct >= 0.6) return 'GreenYellow';
	else if (pct >= 0.3) return 'Orange';
	else if (pct != 0) return 'DarkOrange';
	return 'Red';
}

function hackColor(ns, mhl) {
	var phl = ns.getHackingLevel;
	if (mhl > phl) return 'Red';
	else if (phl >= mhl) return 'Green';
	return 'White';
}



// Centers text in a padded string of "length" long
function padCenter(str, length) {
	return str.padStart((length + str.length) / 2).padEnd(length);
}

// Finds the last child in the server list that is at the specified depth (for line closure)
function lastChildAtDepth(servers, start, depth) {
	let last = start;
	for (let i = start; i < servers.length; i++) {
		let currentDepth = servers[i].route.length - 1;
		if (currentDepth > depth)
			continue;
		if (currentDepth == depth) {
			last = i;
			continue;
		}
		if (currentDepth < depth)
			return last;
	}
	return last;
}

export function GetAllServers(ns, root = 'home', found = new Array(), route = new Array()) {
	if (!found.find(p => p.name == root)) {
		let entry = { name: root, route: route };
		entry.route.push(root);
		found.push(entry);
	}

	for (const server of ns.scan(root)) {
		if (!found.find(p => p.name == server)) {
			let newRoute = route.map(p => p);
			GetAllServers(ns, server, found, newRoute);
		}
	}

	return [...found];
}

function ColorPrint() {
	let findProp = propName => {
		for (let div of eval("document").querySelectorAll("div")) {
			let propKey = Object.keys(div)[1];
			if (!propKey) continue;
			let props = div[propKey];
			if (props.children?.props && props.children.props[propName]) return props.children.props[propName];
			if (props.children instanceof Array) for (let child of props.children) if (child?.props && child.props[propName]) return child.props[propName];
		}
	};
	let term = findProp("terminal");

	let out = [];
	for (let i = 0; i < arguments.length; i += 2) {
		out.push(React.createElement("span", { style: { color: `${arguments[i]}` } }, arguments[i + 1]))
	}
	try {
		term.printRaw(out);
	}
	catch { }
}

export async function GetSymbolAssociations(ns, servers) {
	let data = [];

	// Load symbols if we already have them
	const filename = 'symbol-servers.txt';
	if (ns.fileExists(filename)) {
		data = JSON.parse(await ns.read(filename));
	}

	if (data.length == 0) {
		// Get source code enum data
		await ns.wget('https://raw.githubusercontent.com/danielyxie/bitburner/master/src/Locations/data/LocationNames.ts', 'locations.txt');;
		await ns.wget('https://raw.githubusercontent.com/danielyxie/bitburner/master/src/StockMarket/data/StockSymbols.ts', 'stocksymbols.txt');

		let location = "";
		let company = "";
		let locations = ns.read('locations.txt');
		let locationMap = {};
		for (let line of locations.split("\n")) {
			if (line.includes('=')) {
				location = line.split(" = ")[0];
				company = line.split(" = ")[1];
				while (company.includes('"')) { company = company.replace('"', '').replace(",", ""); }
				while (location.includes(' ')) { location = location.replace(' ', ''); }
			}
			locationMap[location] = company;
		}

		let companies = ns.read('stocksymbols.txt');
		for (let line of companies.split("\n")) {
			let location;
			let sym;
			let serverName;

			if (line.includes("LocationName")) {
				for (let line2 of Object.keys(locationMap)) {
					if (line2.length > 3 && line.includes(line2)) {
						location = locationMap[line2];
						sym = line.split("=")[1].replace(";", "").replace('\"', '').replace('\"', '').replace(' ', '');
					}
				}
			} else {
				if (line.includes("StockSymbols") && !line.includes("LocationName") && !line.includes("export")) {
					location = line.substring(14, line.indexOf(']') - 1);
					sym = line.substring(line.indexOf('=') + 3, line.length - 2);
				}
			}

			for (let server of servers) {
				let so = ns.getServer(server.name);
				if (so.organizationName == location)
					serverName = server.name;
			}

			if (location != undefined && serverName != undefined) {
				data.push({ location: location, sym: sym, server: serverName });
			}
		}

		// Remove temporary files
		ns.rm('locations.txt');
		ns.rm('stocksymbols.txt');

		// Save data to a file so we don't need to fetch every time
		await ns.write(filename, JSON.stringify(data));
	}

	// Assign symbols to our server list
	for (let server of servers) {
		let match = data.find(s => s.server == server.name);
		if (match != undefined)
			server.sym = match.sym;
		else
			server.sym= '';
	}

	// Future use maybe?
	return data;
}