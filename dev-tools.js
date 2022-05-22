/** @param {NS} ns */
export async function main(ns) {
	const boxes = Array.from(eval("document").querySelectorAll("[class*=MuiBox-root]"));
	const boxProps = boxes.map(box => Object.entries(box)[1][1].children.props);
	const props = boxProps.find(el => el?.player);
	//ns.tprint(props[9]['router']);
	props.router.toDevMenu();
	
}