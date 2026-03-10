module.exports = async function (context, req) {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      context.res = {
        status: 400,
        body: { error: "Name, email, and message are required." }
      };
      return;
    }

    context.log("New contact submission received.", {
      name,
      email
    });

    context.res = {
      status: 200,
      body: { message: "Message received successfully." }
    };
  } catch (error) {
    context.log.error("Contact API error:", error);

    context.res = {
      status: 500,
      body: { error: "Server error." }
    };
  }
};