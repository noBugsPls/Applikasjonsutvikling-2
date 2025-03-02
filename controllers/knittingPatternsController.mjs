const knittingPatterns = [
  {
    name: "Genser med fletter",
    description: "En varm og myk ullgenser med flettemønster.",
    difficulty: "Middels",
    category: "Genser",
    sizes: ["S", "M", "L", "XL"],
    chestWidthInCm: [90, 100, 110, 120],
    gauge: { stitches: 18, lengthInCm: 10 },
    materials: [
      {
        type: "Garn",
        name: "Dale lerke",
        amount: "350g",
      },
      {
        type: "Strikkepinner",
        name: "Rundpinne",
        size: "4.5mm",
      },
    ],
    instructions: [
      { part: "Hals", description: "Legg opp 81 masker og strikk vrangbord i 5 cm." },
      {
        part: "Bolen",
        description:
          "Strikk glattstrikk til arbeidet måler 40 cm. Sett av 20 masker til ermer på hver side. Strikk til arbeidet måler 60 cm og begynn på flette mønster. Flettene strikkes over 12 masker. Gjenta flettemønsteret 5 ganger. Strikk til arbeidet måler 70 cm og fell av.",
      },
      {
        part: "Armer",
        description:
          "Ta opp de 20 maskene på hver side og strikk ermer i glattstrikk til ermet måler 20 cm. Fell av og fest alle tråder.",
      },
    ],
    image:
      "https://www.strikkia.no/media/catalog/product/cache/fbf7815f8fb475bd5fe62b6d2d73b520/d/l/dlg-23-052-3043c-fredrikkes-flettegenser-lysegraa-001.jpg",
    author: "Strikkemor",
  },
];

export const getAllPatterns = (req, res) => {
  res.json(knittingPatterns);
};

export const getPatternById = (req, res) => {
    const id = parseInt(req.params.id);
    const pattern = knittingPatterns.find(pattern => pattern.id === id);
    if (pattern) {
      res.json(pattern);
    } else {
      res.status(404).send(`Oppskrift med id ${id} ble ikke funnet.`);
    }
};

export const createPattern = (req, res) => {
    const newPattern = {
        id: knittingPatterns.length + 1,
        ...req.body,
    }

    knittingPatterns.push(newPattern);
    res.status(201).json(newPattern);
};

export const updatePattern = (req, res) => {
    const id = parseInt(req.params.id);
    const index = knittingPatterns.findIndex(pattern => pattern.id === id);
    
    if(index !== -1) {
        knittingPatterns[index] = {
            ...knittingPatterns[index],
            ...req.body,
            id
        };
        res.json(knittingPatterns[index]);
    } else {
        res.status(404).send(`Oppskrift med id ${id} ble ikke funnet.`);
    };
}

export const deletePattern = (req, res) => {
    const id = parseInt(req.params.id);
    const index = knittingPatterns.findIndex(pattern => pattern.id === id);
    
    if(index !== -1) {
        knittingPatterns.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send(`Oppskrift med id ${id} ble ikke funnet.`);
    };
};