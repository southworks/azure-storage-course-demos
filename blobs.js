require("dotenv").config();
const storage = require("azure-storage");

const blobService = storage.createBlobService();
const CONTAINER_NAME = "mscontainer-demo";

start();

async function start () {
  await createContainer(CONTAINER_NAME);
  await write(CONTAINER_NAME, "msblob", "Hello World!");

  let blob_value = await read(CONTAINER_NAME, "msblob");

  console.log(`My blob contains the value "${blob_value}"! Yaya!`);
}

async function createContainer(name) {
  return new Promise((resolve, reject) =>
    blobService.createContainerIfNotExists(name, (err, response) => {
      if (!err) resolve(response);
      reject(err);
    })
  );
}

async function write(container, blobname, blobvalue) {
  return new Promise((resolve, reject) =>
    blobService.createBlockBlobFromText(container, blobname, blobvalue, (err, response) => {
      if (!err) resolve(response);
      reject(err);
    })
  );
}

async function read(container, blobname) {
  return new Promise((resolve, reject) =>
    blobService.getBlobToText(container, blobname, (err, value) => {
      if (!err) resolve(value);
      reject(err);
    })
  );
}
