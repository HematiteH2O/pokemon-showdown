const mons = [
	"volquag", "toxalure", "kingtsar", "tanette", "slowton", "flaant", "umbat", "chomplim", "chomplimmega", "xotalion", "miemie", "dusking",
	"jelliswine", "pigapult", "silvino", "silvinomega", "lycanserkerdusk", "tapulop", "tapulopmega", "dragontler", "eternabat", "grimmlurk", "manicunogalar",
	"yaciancrowned", "cryogolem", "stoudrago", "dongoro", "slurpum", "grousle", "grousleprimal", "corveot", "corveotmega", "igglyzentacrowned", "arctresgalar",
	"garborude", "noicity", "ferros", "landmaldotherian", "tentoxysdefense", "strikadosgalar", "hooporant", "silvinobug", "silvinobugmega", "silvinodark",
	"silvinodarkmega", "silvinodragon", "silvinodragonmega", "silvinoelectric", "silvinoelectricmega", "silvinofairy", "silvinofairymega", "silvinofighting",
	"silvinofightingmega", "silvinofire", "silvinofiremega", "silvinoflying", "silvinoflyingmega", "silvinoghost", "silvinoghostmega", "silvinograss",
	"silvinograssmega", "silvinoground", "silvinogroundmega", "silvinoice", "silvinoicemega", "silvinopoison", "silvinopoisonmega", "silvinopsychic",
	"silvinopsychicmega", "silvinorock", "silvinorockmega", "silvinosteel", "silvinosteelmega", "silvinowater", "silvinowatermega",
];

const data: {[k: string]: ModdedSpeciesFormatsData} = {};

for (const mon of mons) {
	if (!data[mon]) data[mon] = {};
	data[mon].isNonstandard = null;
	data[mon].tier = "OU";
	data[mon].doublesTier = "DOU";
}

export const FormatsData = data;
