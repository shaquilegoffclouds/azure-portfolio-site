module.exports = async function (context, req) {
  try {
    if (req.method === "GET") {
      let sdkStatus = "not tested";
      try {
        require("@azure/data-tables");
        sdkStatus = "loaded";
      } catch (e) {
        sdkStatus = `load failed: ${e.message}`;
      }

      context.res = {
        status: 200,
        headers: { "Content-Type": "text/plain" },
        body: `Contact API is running. STORAGE_CONNECTION_STRING present: ${!!process.env.STORAGE_CONNECTION_STRING}. SDK: ${sdkStatus}`
      };
      return;
    }

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "text/plain" },
        body: "Name, email, and message are required."
      };
      return;
    }

    const connectionString = process.env.STORAGE_CONNECTION_STRING;

    if (!connectionString) {
      context.res = {
        status: 500,
        headers: { "Content-Type": "text/plain" },
        body: "Missing STORAGE_CONNECTION_STRING."
      };
      return;
    }

    const { TableClient } = require("@azure/data-tables");

    const tableClient = TableClient.fromConnectionString(
      connectionString,
      "contactmessages"
    );

    try {
      await tableClient.createTable();
    } catch (e) {
      if (e.statusCode !== 409) {
        throw e;
      }
    }

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
      headers: { "Content-Type": "text/plain" },
      body: "Message stored successfully."
    };
  } catch (error) {
    context.res = {
      status: 500,
      headers: { "Content-Type": "text/plain" },
      body: `${error.name}: ${error.message}\n${error.stack || ""}`
    };
  }
};