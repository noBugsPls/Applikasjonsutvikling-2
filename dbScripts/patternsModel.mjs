import { create, read, update, purge } from "./database.mjs";

export const getAllPatterns = async (req, res) => {
  const sql = `SELECT * FROM public.patterns`;
  const patterns = await read(sql);
  return patterns ? patterns.rows : [];
};

export const createPattern = async (data) => {
  const sql = `INSERT INTO public.patterns (name, description, difficulty, category, sizes, chest_width_in_cm, gauge, materials, instructions, image, author) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *`;
  const values = [
    data.name,
    data.description,
    data.difficulty,
    data.category,
    JSON.stringify(data.sizes),
    JSON.stringify(data.chest_width_in_cm),
    JSON.stringify(data.gauge),
    JSON.stringify(data.materials),
    JSON.stringify(data.instructions),
    data.image,
    data.author,
  ];
  console.log("Request body:", data);
console.log("Values som sendes:", ...values);

  const newPattern = await create(sql, ...values);
  console.log("newPattern in patternModel", newPattern);
  return newPattern ? newPattern.rows[0] : {};
};

 export const deletePattern = async (id) => {
  const sql = `DELETE FROM public.patterns WHERE id = $1
  RETURNING *`;
    const deletePattern = await purge(sql, id);
    console.log("deletePattern", deletePattern);
    return deletePattern ? deletePattern.rows[0] : {};
}; 


export const updatePattern = async (req, res) => {
  const sql = `UPDATE public.patterns SET name = $1, description = $2, difficulty = $3, category = $4, sizes = $5, chest_width_in_cm = $6, gauge = $7, materials = $8, instructions = $9, image = $10, author = $11 WHERE id = $12`;
  const values = [
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
    req.body.author,
    req.params.id,
  ];
  const updatePattern = await update(sql, values);
  return updatePattern ? updatePattern.rows[0] : {};
};
