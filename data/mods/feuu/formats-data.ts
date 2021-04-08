const mons = [
// one sec
];

const data: {[k: string]: ModdedSpeciesFormatsData} = {};

for (const mon of mons) {
	if (!data[mon]) data[mon] = {};
	data[mon].isNonstandard = null;
	data[mon].tier = "OU";
	data[mon].doublesTier = "DOU";
}

export const FormatsData = data;
