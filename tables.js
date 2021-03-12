require("dotenv").config();
const storage = require("azure-storage");

const people = require("./people.json");
const tableService = storage.createTableService();

const TABLE_NAME = "people";

start();

async function start() {
  await createTable(TABLE_NAME);
  await write(TABLE_NAME, people);
  
  let phil = await read(TABLE_NAME, "22222", "5");

  console.log(`Result is "${phil.name._}"`);
}

function addRowPartitionKeyOnData(data) {
  return data.map(item => {
    item["RowKey"] = item["id"].toString();
    item["PartitionKey"] = item["zip"];
    return item;
  });
}

async function createTable(name) {
  // TODO
  return new Promise((resolve, reject) =>
    tableService.createTableIfNotExists(name, (err, response) => {
      if (!err) resolve(response);
      reject (err);
    })
  );
}

async function write(table, people) {
  // TODO
  return new Promise((resolve, reject) => 
    addRowPartitionKeyOnData(people).forEach(item => 
      tableService.insertOrReplaceEntity(table, item, (err, response) => {
        if (!err) resolve(response);
        reject(err);
      })
    )
  );
}

async function read(table, partitionkey, rowkey) {
  // TODO
  return new Promise((resolve, reject) => 
    tableService.retrieveEntity(table, partitionkey, rowkey, (err, response) => {
      if (!err) resolve(response);
      reject(err);
    })
  );
}
