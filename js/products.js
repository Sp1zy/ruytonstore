/* =========================================================
   SHOP SETTINGS + PRODUCT LIST
   This is the only file you need to edit to change products.
   ---------------------------------------------------------
   - STORE_URL: his live SumUp store (handles basket + payment).
   - url: paste the exact SumUp product page for each item
     (open the product on ruyton.sumupstore.com and copy the
     address bar). Until then it falls back to the products page.
   ========================================================= */

const STORE_URL = "https://ruyton.sumupstore.com";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "butchery", label: "Butchery" },
  { id: "deli", label: "Deli & Cheese" },
  { id: "bundles", label: "Bundles" },
];

const PRODUCTS = [
  {
    name: "Local Breakfast Pack for 2",
    price: 19.99,
    category: "bundles",
    image: "assets/img/breakfast-pack.jpg",
    blurb: "Appleyards bacon & sausages, black pudding, eggs, tomatoes, mushrooms, beans and fresh bread.",
    featured: true,
    url: "",
  },
  {
    name: "Appleyards Cheese Board",
    price: 20.0,
    category: "deli",
    image: "assets/img/cheese-board.jpg",
    blurb: "A selection of Appleyards cheeses, cut and wrapped in store.",
    featured: true,
    url: "",
  },
  {
    name: "28 Day Aged Rib Off Beef Rib",
    price: 58.0,
    category: "butchery",
    image: "assets/img/rib-of-beef.jpg",
    variants: true,
    featured: true,
    url: "",
  },
  {
    name: "21 Day Aged Fillet Joint",
    price: 25.0,
    category: "butchery",
    image: "assets/img/fillet-joint.jpg",
    variants: true,
    featured: true,
    url: "",
  },
  {
    name: "Rolled Sirloin of Beef",
    price: 19.5,
    category: "butchery",
    image: "assets/img/rolled-sirloin.jpg",
    variants: true,
    featured: true,
    url: "",
  },
];

/* Opening hours: [open, close] in 24h, Sunday = 0 */
const HOURS = {
  0: ["10:00", "14:30"],
  1: ["07:30", "20:00"],
  2: ["07:30", "20:00"],
  3: ["07:30", "20:00"],
  4: ["07:30", "20:00"],
  5: ["07:30", "20:00"],
  6: ["07:30", "20:00"],
};
