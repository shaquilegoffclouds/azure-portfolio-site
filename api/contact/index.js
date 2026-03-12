const { TableClient } = require("@azure/data-tables");

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

    const connectionString = process.env.STORAGE_CONNECTION_STRING;

    const tableClient = TableClient.fromConnectionString(
      connectionString,
      "contactmessages"
    );

    const entity = {
      partitionKey: "contact",
      rowKey: Date.now().toString(),
      name,
      email,
      message
    };

    await tableClient.createEntity(entity);

    context.res = {
      status: 200,
      body: "Message stored successfully."
    };

  } catch (error) {
    context.log.error("Storage error:", error);

    context.res = {
      status: 500,
      body: error.message
    };
  }
};