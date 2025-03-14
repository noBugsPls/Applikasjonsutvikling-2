import pkg from "pg";
const { Client } = pkg;

const config = {
  connectionString: process.env.DB_CREDENTIALS,
  ssl: process.env.DB_SSL === "true",
};

async function runQuery(query, ...values) {
  const client = new Client(config);

  try {
    await client.connect();
    const result = await client.query(query, values);

    if (result.command !== "DELETE") {
      if (result.rowCount <= 0) {
        throw new Error("No records created");
      }
    }
    return result;
  } catch (error) {
    console.error("Connection error", error);
    return null;
  } finally {
    await client.end();
  }
}

async function create(statement, ...values) {
  return await runQuery(statement, ...values);
}

async function update(statement, ...values) {
  return await runQuery(statement, ...values);
}

async function read(statement, ...values) {
  return await runQuery(statement, ...values);
}

async function purge(statement, ...values) {
  return await runQuery(statement, ...values);
}

export { create, read, update, purge };
