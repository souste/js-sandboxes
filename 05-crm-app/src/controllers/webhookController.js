const { handleWebhook } = require("../services/webhookService");

const webhookController = async (req, res) => {
  try {
    const result = await handleWebhook(req.body);

    res.status(200).json({
      success: true,
      data: result,
      message: "Webhook processed",
    });
  } catch (err) {
    console.error(err);

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  webhookController,
};
