const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function readDb() {
  const dbContacts = await fs.readFile(contactsPath);
  const db = JSON.parse(dbContacts);
  return db;
}

async function writeDB(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 4));
}

async function listContacts() {
  const db = await readDb();
  console.table(db);
  return db;
}

async function getContactById(contactId) {
  const contactsDb = await readDb();
  const findedContact = contactsDb.find((contact) => contact.id === contactId);
  console.log(findedContact);
}

async function removeContact(contactId) {
  const db = await readDb();
  const updatedDb = db.filter((contact) => contact.id !== contactId);
  await writeDB(updatedDb);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };

  const db = await readDb();
  db.push(contact);
  console.log(db);

  await writeDB(db);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
