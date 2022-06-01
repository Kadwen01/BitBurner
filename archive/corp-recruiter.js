const MIN_EMPLOYEES = 10;

const JOB_TYPE = {
	operations: "Operations",
	engineer: "Engineer",
	business: "Business",
	management: "Management",
	development: "Research & Development"
}

/** @param {NS} ns **/
export async function main(ns) {
	const divisionName = ns.args[0];
	const cityName = ns.args[1];
	const reqEmployees = ns.args[2] || MIN_EMPLOYEES;

	const flags = ns.flags([
		['research', false]
	]);

	const corp = eval("ns.corporation");
	const office = corp.getOffice(divisionName, cityName);
	const reqSize = Math.max(office.size, reqEmployees);

	const getJobDistribution = (officeSize) => {
		if (flags.research) {
			return {
				[JOB_TYPE.operations]: 0,
				[JOB_TYPE.engineer]: 0,
				[JOB_TYPE.management]: 0,
				[JOB_TYPE.business]: 0,
				[JOB_TYPE.development]: 1,
			}
		}
		if (officeSize >= 10 && officeSize < 100) {
			return {
				[JOB_TYPE.operations]: 0.5,
				[JOB_TYPE.engineer]: 0.3,
				[JOB_TYPE.management]: 0.2
			}
		} else {
			return {
				[JOB_TYPE.operations]: 0.55,
				[JOB_TYPE.engineer]: 0.2,
				[JOB_TYPE.management]: 0.1,
				[JOB_TYPE.business]: 0.05,
				[JOB_TYPE.development]: 0.1,
			}
		}
	}

	const getEmployeeDistribution = (jobDistrib) => {
		let assigned = 0;
		const employeeDistrib = Object.keys(jobDistrib).reduce((acc, key) => {
			const amount = Math.floor(reqSize * jobDistrib[key]);
			acc[key] = amount;
			assigned += amount;
			return acc;
		}, {});

		if (assigned != reqSize) {
			const leftOver = reqSize - assigned;
			employeeDistrib[JOB_TYPE.operations] += leftOver;
		}

		return employeeDistrib;
	}

	const allocateEmployees = async () => {
		const jobDistrib = getJobDistribution(reqSize);
		const employeeDistrib = getEmployeeDistribution(jobDistrib);

		const ascEmployeeDistrib = Object.entries(employeeDistrib).sort((a, b) => a[1] - b[1]);

		for (const [job, amount] of ascEmployeeDistrib) {
			const success = await corp.setAutoJobAssignment(divisionName, cityName, job, amount);
			if (success) {
				ns.print(`Successfully allocated ${amount} employees to ${job} in ${divisionName}: ${cityName}`);
			}
		}
	}

	const hireEmployees = (numToHire) => {
		let numHired = 0;
		ns.print(`Hiring ${numHired} employees...`);
		while (numHired < numToHire) {
			corp.hireEmployee(divisionName, cityName);
			numHired++;
		}
		ns.print(`Done`);
	}

	const upgradeOffice = async () => {
		const business = corp.getCorporation();
		const sizeToBuy = reqEmployees - office.size;
		ns.print(`Opening ${sizeToBuy} employee positions...`);
		const upgradeCost = corp.getOfficeSizeUpgradeCost(divisionName, cityName, sizeToBuy);

		if (business.funds < upgradeCost) {
			let moneyTillUpgrade = (upgradeCost - business.funds);
			let fmoneyTillUpgrade = ns.nFormat(moneyTillUpgrade, "0a"); 
			ns.print(ns.nFormat(business.funds, '0a'));
			ns.print(ns.nFormat(upgradeCost, '0a'));
			ns.print(`Money needed to hire new employees: ${fmoneyTillUpgrade}`);
			//ns.exit;
		} else {
			corp.upgradeOfficeSize(divisionName, cityName, sizeToBuy);
			hireEmployees(reqEmployees);
		}

//		while (business.funds < upgradeCost) {
//			let moneyTillUpgrade = (business.funds - upgradeCost);
//			let fmoneyTillUpgrade = ns.nFormat(moneyTillUpgrade, "0a"); 
//			ns.print(ns.nFormat(business.funds, '0a'));
//			ns.print(ns.nFormat(upgradeCost, '0a'));
//			ns.print(`Money till able to upgrade: ${fmoneyTillUpgrade}`);
//			await ns.sleep(1000); // wait until we have enough money
//		}

	}

	if (office.size != reqSize) {
		await upgradeOffice();
	}

	await allocateEmployees();
}