module.exports = async function (context, req) {
  try {
    if (req.method === "GET") {
      context.res = {
        status: 200,
        body: "Contact API is running."
      };
      return;
    }

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      context.res = {
        status: 400,
        body: "Name, email, and message are required."
      };
      return;
    }

    context.res = {
      status: 200,
      body: "Message received successfully."
    };
  } catch (error) {
    context.log.error("Contact API error:", error);
    context.res = {
      status: 500,
      body: "Server error."
    };
  }
};