export const validateTask = (req, res, next) => {
  const { title, description, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  const allowedStatus = ["To do", "In progress", "done"];
  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  next();
};
