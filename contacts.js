const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function readDb() {
  try {
    const dbContacts = await fs.readFile(contactsPath);
    const db = JSON.parse(dbContacts);
    return db;
  } catch (error) {
    console.error(error.message);
  }
}

async function writeDB(db) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(db, null, 4));
  } catch (error) {
    console.error(error.message);
  }
}

async function listContacts() {
  try {
    const db = await readDb();
    console.table(db);
    return db;
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contactsDb = await readDb();
    const findedContact = contactsDb.find(
      (contact) => contact.id === contactId
    );
    console.log(findedContact);
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const db = await readDb();
    const updatedDb = db.filter((contact) => contact.id !== contactId);
    await writeDB(updatedDb);
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = nanoid();
    const contact = { id, name, email, phone };

    const db = await readDb();
    db.push(contact);
    console.log(db);

    await writeDB(db);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
