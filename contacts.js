const path = require("path");
const fs = require("fs/promises");
const { default: ObjectID } = require("bson-objectid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateContacts = async (items) => {
  await fs.writeFile(contactsPath, JSON.stringify(items, null, 2));
};

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);

  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const element = contacts.find((item) => item.id === contactId);
  if (!element) {
    return null;
  }

  console.log(element);
  return element;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  const [result] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: ObjectID(),
  };

  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
