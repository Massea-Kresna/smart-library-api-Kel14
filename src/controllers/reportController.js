import { ReportModel } from '../models/reportModel.js';

export const ReportController = {
  async getLibraryStats(req, res) {
    try {
      const stats = await ReportModel.getStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};