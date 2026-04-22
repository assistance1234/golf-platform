import { generateDraw } from "../utils/drawEngine.js";

export const runDraw = async (req, res) => {
  const result = generateDraw();
  res.json({ draw: result });
};