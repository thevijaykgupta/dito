const Report = require("../models/Report");

// Submit a report
exports.submitReport = async (req, res) => {
  try {
    const { targetType, targetId, reason, details } = req.body;

    const report = await Report.create({
      reporter: req.user.id,
      targetType,
      targetId,
      reason,
      details
    });

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get reports (admin only)
exports.getReports = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const reports = await Report.find(query)
      .populate("reporter", "name email")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update report status (admin only)
exports.updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, adminNote, resolution } = req.body;

    const report = await Report.findByIdAndUpdate(
      reportId,
      {
        status,
        adminNote,
        resolution,
        reviewedBy: req.user.id,
        reviewedAt: new Date()
      },
      { new: true }
    );

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user's reports
exports.getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ reporter: req.user.id })
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};