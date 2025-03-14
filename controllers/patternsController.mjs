import * as patternsModel from "../dbScripts/patternsModel.mjs";
import HTTP_CODES from "../utils/httpCodes.mjs";

export const getAllPatterns = async (req, res) => {
  try {
    const patterns = await patternsModel.getAllPatterns();

    if (!patterns) {
      return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("No patterns found.");
    }
    res.status(HTTP_CODES.SUCCESS.OK).json(patterns || []);
  } catch (error) {
    res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).send("Error fetching patterns.", error);
  }
};

export const createPattern = async (req, res) => {
  try {
    const newPattern = await patternsModel.createPattern(req.body);
    console.log("newPattern i patternController", newPattern);
    if(!newPattern) {
      res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).json({ error: "Error creating pattern" });
    }
    res.status(HTTP_CODES.SUCCESS.CREATED).json(newPattern);
  } catch (error) {
    res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR)
   .json({ error: "Error creating pattern", details: error.message });
  }
};

export const deletePattern = async (req, res) => {
  try {
    const deletePattern = await patternsModel.deletePattern(req.params.id);
    console.log("deletePattern", deletePattern);
    res.status(HTTP_CODES.SUCCESS.NO_CONTENT).json(deletePattern);
  } catch (error) {
    res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ error: "Error deleting pattern", details: error.message });
  }
};

export const updatePattern = async (req, res) => {
  try {
    const updatePattern = await patternsModel.updatePattern(req.params.id, req.body);
    res.status(HTTP_CODES.SUCCESS.OK).json(updatePattern);
  } catch (error) {
    res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ error: "Error updating pattern", details: error.message });
  }
};
