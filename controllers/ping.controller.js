const { catchAsyncErrors } = require("../middlewares");

const pingController = () => {
  const ping = catchAsyncErrors(async (req, res, next) => {
    return res.status(200).json({ success: true, message: "Pong!" });
  });
  return { ping };
};

module.exports = pingController;
