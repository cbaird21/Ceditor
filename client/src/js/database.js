import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // create a connection to the database and version we want to use
  const jateDb = await openDB('jate', 1);
  // create a new transaction and specify the database and date privlidges.
  const tx = jateDb.transaction('jate', 'readwrite');
  // open up the desired object store
  const store = tx.objectStore('jate');
  // use .add() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });
  // const request = store.add({ note: content });
  // // get confirmation of the request
  const result = await request;

  console.log('🚀 - data saved to the database', result);
  console.error('putDb not implemented');

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  // const request = store.getAll();
  // const request = store.put({ id: 1, value: content });
  // Get confirmation of the request.

  const result = await store.getAll();
  console.log('data from database is' `${JSON.stringigy(result)}`);
  return result.value;

}

initdb();
