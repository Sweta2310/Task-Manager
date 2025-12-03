export const validateTask = (req, res, next) => {
  const { title, description, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title & Description are required" });
  }

  const allowedStatus = ["pending", "in-progress", "completed"];
  if (status && !allowedStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  next();
};
