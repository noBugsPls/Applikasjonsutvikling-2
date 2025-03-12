import knittingPatterns from "../data/knittingPatternsDatastructure.mjs";
import { create, update, read, purge } from "../data/database.js";

export const getAllPatterns = async (req, res) => {
  try {
    const result = await read("SELECT * FROM public.patterns");

    console.log("result", result);

    if (!result) {
      throw new Error("No patterns found");
    }

    const patterns = result.rows;
    console.log("patterns", patterns);

    return res.status(200).json(patterns || []);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Noe gikk galt i henting av alle oppskrifter" });
  }
};

export const createPattern = async (req, res) => {
  try {
    const result = await create(
      "INSERT INTO public.patterns (name, description, difficulty, category, sizes, chest_width_in_cm, gauge, materials, instructions, image, author) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      req.body.name,
      req.body.description,
      req.body.difficulty,
      req.body.category,
      JSON.stringify(req.body.sizes),
      JSON.stringify(req.body.chestWidthInCm),
      JSON.stringify(req.body.gauge),
      JSON.stringify(req.body.materials),
      JSON.stringify(req.body.instructions),
      req.body.image,
      req.body.author
    );
    console.log("result", result);
    console.log("req.body", req.body);

    if (!result) {
      throw new Error("No patterns created");
    }

    return res.status(201).json(result.rows[0] || req.body);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Noe gikk galt med å legge til ny oppskrift." });
  }
};

export const deletePattern = async (req, res) => {
  try {
    const result = await purge("DELETE FROM public.patterns WHERE id = $1", req.params.id);
    console.log("result", result);

    if (!result) {
      throw new Error("No patterns deleted");
    }

    return res.status(200).json(result.rows[0] || req.body);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Noe gikk galt med å slette oppskrift." });
  }
};

//-------------------- IKKE FERDIG --------------------
export const getPatternById = (req, res) => {
  const id = parseInt(req.params.id);
  const pattern = knittingPatterns.find((pattern) => pattern.id === id);
  if (pattern) {
    res.json(pattern);
  } else {
    res.status(404).send(`Oppskrift med id ${id} ble ikke funnet.`);
  }
};

//-------------------- IKKE FERDIG --------------------
export const updatePattern = (req, res) => {
  const id = parseInt(req.params.id);
  const index = knittingPatterns.findIndex((pattern) => pattern.id === id);

  if (index !== -1) {
    knittingPatterns[index] = {
      ...knittingPatterns[index],
      ...req.body,
      id,
    };
    res.json(knittingPatterns[index]);
  } else {
    res.status(404).send(`Oppskrift med id ${id} ble ikke funnet.`);
  }
};
