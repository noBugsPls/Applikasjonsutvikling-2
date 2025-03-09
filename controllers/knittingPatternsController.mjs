import knittingPatterns from "../data/knittingPatternsDatastructure.mjs";
import { create, update, read, purge } from "../data/database.js";

 export const getAllPatterns = async function (req, res) {
  try{
    const result = await read("SELECT * FROM public.patterns");

    console.log("result", result);

    if(!result){
      throw new Error("No patterns found");
    }

    const patterns = result.rows;
    console.log("patterns", patterns);

    return res.status(200).json(patterns || []);
  }catch(error){
    console.error(error);
    res.status(500).send({error: "Noe gikk galt"});
  }
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
        ...req.body,
    }

    console.log("pattern", newPattern); 

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
    } else {
        res.status(404).send(`Oppskrift med id ${id} ble ikke funnet.`);
    };
}; 

