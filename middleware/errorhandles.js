const errorhandles = (err, req, res, next) => {
  console.error("Error:", err);
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
};

export default errorhandles;

