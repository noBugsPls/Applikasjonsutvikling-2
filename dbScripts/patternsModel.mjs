import { create, read, update, purge } from "./database.mjs";

export const getAllPatterns = async (req, res) => {
  const sql = `SELECT * FROM public.patterns`;
  const patterns = await read(sql);
  return patterns ? patterns.rows : [];
};

export const getPatternById = async (id) => {
  const sql = `SELECT * FROM public.patterns WHERE id = $1`;
  const pattern = await read(sql, id);
  return pattern ? pattern.rows[0] : {};
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
  const newPattern = await create(sql, ...values);

  return newPattern ? newPattern.rows[0] : {};
};

 export const deletePattern = async (id) => {
  const sql = `DELETE FROM public.patterns WHERE id = $1
  RETURNING *`;
    const deletePattern = await purge(sql, id);
    console.log("deletePattern", deletePattern);
    return deletePattern ? deletePattern.rows[0] : {};
}; 


export const updatePattern = async (id, data) => {
  try {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      throw new Error("Ingen data å oppdatere");
    }
    //Kode skrevet av chatGPT-----Start-------------
    let setClause = [];
    let values = [];
    let index = 1;
    
    keys.forEach((key) => {
      let value = data[key];
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      setClause.push(`${key} = $${index}`);
      values.push(value);
      index++;
    });
    values.push(id);
    const sql = `UPDATE public.patterns SET ${setClause.join(", ")} WHERE id = $${values.length} RETURNING *`;
    //Kode skrevet av chatGPT-----Slutt-----------------
    
    const updateResult = await update(sql, ...values);
    return updateResult ? updateResult.rows[0] : {};
  } catch (error) {
    console.error("Error updating pattern in model:", error);
    throw error;
  }
};
