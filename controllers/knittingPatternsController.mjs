import knittingPatterns from '../data/knittingPatternsDatastructure.mjs';

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