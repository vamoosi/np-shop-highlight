export type ShopId = number;

export interface ShopDetails {
  readonly id: ShopId;
  readonly name: string;
}

const tags = new Map<string, Array<ShopId>>([
  [ "food", [ 1, 15, 18, 20, 22, 30, 35, 46, 47 ] ],
  [ "magic", [ 2, 9, 10 ] ],
  [ "toys", [ 3, 74 ] ],
  [ "clothes", [ 4 ] ],
  [ "wearables", [ 4, 117 ] ],
  [ "books", [ 7, 38, 70, 77, 114 ] ],
  [ "petpets", [ 25, 26, 27, 31, 40, 44, 50, 57, 61, 69, 88, 89, 97, 113 ] ],
  [ "weapons", [ 23, 45, 59, 93, 100 ] ],
  [ "funiture", [ 41, 43, 60, 75 ] ],
]);

const ids = new Map<number, ShopDetails>([
  [ 1, { id: 1, name: "Neopian Fresh Foods" } ],
  [ 2, { id: 2, name: "Kauvara's Magic Shop" } ],
  [ 3, { id: 3, name: "Toy Shop" } ],
  [ 4, { id: 4, name: "Unis Clothing Shop" } ],
  [ 5, { id: 5, name: "Grooming Parlour" } ],
  // 6 is skipped
  [ 7, { id: 7, name: "Magical Bookshop" } ],
  [ 8, { id: 8, name: "Collectable Card Shop" } ],
  [ 9, { id: 9, name: "Battle Magic" } ],
  [ 10, { id: 10, name: "Defence Magic" } ],
  // 11 is skipped
  [ 12, { id: 12, name: "Neopian Garden Centre" } ],
  [ 13, { id: 13, name: "Neopian Pharmacy" } ],
  [ 14, { id: 14, name: "Chocolate Factory" } ],
  [ 15, { id: 15, name: "The Bakery" } ],
  [ 16, { id: 16, name: "Neopian Health Foods" } ],
  [ 17, { id: 17, name: "Neopian Gift Shop" } ],
  [ 18, { id: 18, name: "Smoothie Store" } ],
  // 19 is skipped
  [ 20, { id: 20, name: "Tropical Food Shop" } ],
  [ 21, { id: 21, name: "Tiki Tack" } ],
  [ 22, { id: 22, name: "Grundos Cafe" } ],
  [ 23, { id: 23, name: "Space Weaponry" } ],
  [ 24, { id: 24, name: "Space Armour" } ],
  [ 25, { id: 25, name: "The Neopian Petpet Shop" } ],
  [ 26, { id: 26, name: "The Robo-Petpet Shop" } ],
  [ 27, { id: 27, name: "The Rock Pool" } ],
  // 28 is skipped
  // 29 is skipped
  [ 30, { id: 30, name: "Spooky Food" } ],
  [ 31, { id: 31, name: "Spooky Petpets" } ],
  // 32 is skipped
  // 33 is skipped
  [ 34, { id: 34, name: "The Coffee Cave" } ],
  [ 35, { id: 35, name: "Slushie Shop" } ],
  [ 36, { id: 36, name: "Ice Crystal Shop" } ],
  [ 37, { id: 37, name: "Super Happy Icy Fun Snow Shop" } ],
  [ 38, { id: 38, name: "Faerieland Bookshop" } ],
  [ 39, { id: 39, name: "Faerieland Foods" } ],
  [ 40, { id: 40, name: "Faerieland Petpets" } ],
  [ 41, { id: 41, name: "Neopian Furniture" } ],
  [ 42, { id: 42, name: "Tyrannian Foods" } ],
  [ 43, { id: 43, name: "Tyrannian Furniture" } ],
  [ 44, { id: 44, name: "Tyrannian Petpets" } ],
  [ 45, { id: 45, name: "Tyrannian Weaponry" } ],
  [ 46, { id: 46, name: "Hubert's Hotdogs" } ],
  [ 47, { id: 47, name: "Pizzaroo" } ],
  [ 48, { id: 48, name: "Usukiland" } ],
  [ 49, { id: 49, name: "Lost Desert Foods" } ],
  [ 50, { id: 50, name: "Peopatras Petpets" } ],
  [ 51, { id: 51, name: "Suteks Scrolls" } ],
  [ 53, { id: 53, name: "Neopian School Supplies" } ],
  // 52 is skipped
  [ 54, { id: 54, name: "Sakhmet Battle Supplies" } ],
  [ 55, { id: 55, name: "Osiris Pottery" } ],
  [ 56, { id: 56, name: "Merifoods" } ],
  [ 57, { id: 57, name: "Ye Olde Petpets" } ],
  [ 58, { id: 58, name: "Neopian Post Office" } ],
  [ 59, { id: 59, name: "Haunted Weaponry" } ],
  [ 60, { id: 60, name: "Spooky Furniture" } ],
  [ 61, { id: 61, name: "Wintery Petpets" } ],
  [ 62, { id: 62, name: "Jelly Foods" } ],
  [ 63, { id: 63, name: "Disney Theatre" } ],
  // 64 is skipped
  // 65 is skipped
  [ 66, { id: 66, name: "Kiko Lake Treats" } ],
  [ 67, { id: 67, name: "Kiko Lake Carpentry" } ],
  [ 68, { id: 68, name: "Collectable Coins" } ],
  [ 69, { id: 69, name: "Petpet Supplies" } ],
  [ 70, { id: 70, name: "Booktastic Books" } ],
  [ 71, { id: 71, name: "Kreludan Homes" } ],
  [ 72, { id: 72, name: "Cafe Kreludor" } ],
  [ 73, { id: 73, name: "Kayla's Potion Shop" } ],
  [ 74, { id: 74, name: "Darigan Toys" } ],
  [ 75, { id: 75, name: "Faerie Furniture" } ],
  [ 76, { id: 76, name: "Roo Island Souvenirs" } ],
  [ 77, { id: 77, name: "Brightvale Books" } ],
  [ 78, { id: 78, name: "The Scrollery" } ],
  [ 79, { id: 79, name: "Brightvale Glaziers" } ],
  [ 80, { id: 80, name: "Brightvale Armoury" } ],
  [ 81, { id: 81, name: "Brightvale Fruits" } ],
  [ 82, { id: 82, name: "Brightvale Motery" } ],
  [ 83, { id: 83, name: "Royal Potionery" } ],
  [ 84, { id: 84, name: "Neopian Music Shop" } ],
  [ 85, { id: 85, name: "Lost Desert Medicine" } ],
  [ 86, { id: 86, name: "Collectable Sea Shells" } ],
  [ 87, { id: 87, name: "Maractite Marvels" } ],
  [ 88, { id: 88, name: "Maraquan Petpets" } ],
  [ 89, { id: 89, name: "Geraptiku Petpets" } ],
  [ 90, { id: 90, name: "Qasalan Delights" } ],
  [ 91, { id: 91, name: "Desert Arms" } ],
  [ 92, { id: 92, name: "Words OF Antiquity" } ],
  [ 93, { id: 93, name: "Faerie Weapon Shop" } ],
  [ 94, { id: 94, name: "Illustrious Armoury" } ],
  [ 95, { id: 95, name: "Exquisite Ambrosia" } ],
  [ 96, { id: 96, name: "Magical Marvels" } ],
  [ 97, { id: 97, name: "Legendary Petpets" } ],
  [ 98, { id: 98, name: "Plushie Palace" } ],
  // 99 is skipped
  [ 100, { id: 100, name: "Wonderous Weaponry" } ],
  [ 101, { id: 101, name: "Exotic Foods" } ],
  [ 102, { id: 102, name: "Remarkable Restoratives" } ],
  [ 103, { id: 103, name: "Fanciful Fauna" } ],
  [ 104, { id: 104, name: "Chesterdrawers Antiques" } ],
  [ 105, { id: 105, name: "The Crumpetmonger" } ],
  [ 106, { id: 106, name: "Neovian Printing Press" } ],
  [ 107, { id: 107, name: "Prigpant's & Swolthy Tailors" } ],
  [ 108, { id: 108, name: "Mystical Surroundings" } ],
  // 109 is skipped
  [ 110, { id: 110, name: "Lampwyck's Lights Fantastic" } ],
  [ 111, { id: 111, name: "Cog's Togs" } ],
  [ 112, { id: 112, name: "Molten Morsels" } ],
  [ 113, { id: 113, name: "Moltaran Petpets" } ],
  [ 114, { id: 114, name: "Moltaran Books" } ],
  // 115 is skipped
  [ 116, { id: 116, name: "Springy Things" } ],
  [ 117, { id: 117, name: "Shops 2" } ],
]);

export default {
  get byId() { return ids; },
  get byTag() { return tags; },

  get filterName() { return filterNames; },
  get list() { return list; },
};

function filterNames(name: string, results: number = 10): Array<ShopDetails> {
  const out = new Set<ShopDetails>();
  name = name.toLowerCase();

  let i = 0;
  for (const n of ids.values()) {
    if (n.name.toLowerCase().startsWith(name)) {
      out.add(n);
      if (out.size >= results)
        return Array.from(out);
    }
  }
  if (i < results) {
    for (const n of ids.values()) {
      const t = n.name.split(' ');
      for (let i = 1; i < t.length; i++) {
        if (t[i].toLowerCase().startsWith(name)) {
          out.add(n);
          if (out.size >= results)
            return Array.from(out);
          break;
        }
      }
    }
  }
  return Array.from(out);
}

function list(results: number = 10): Array<ShopDetails> {
  results = Math.min(results, ids.size);
  const out: ShopDetails[] = new Array(results);
  let i = 0;
  for (const val of ids.values()) {
    out[i++] = val;
    if (i >= results)
      break;
  }
  return out;
}