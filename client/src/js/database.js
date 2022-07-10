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
  console.error('putDb not implemented');

}


// Logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
  //Connect to database
  const jateDb = await openDB("jate", 1);
  //Create transaction for the database
  const tx = jateDb.transaction("jate", "readwrite");
  //Open object store
  const store = tx.objectStore("jate");
  //Pull all data
  const request = store.getAll();

  //Log results and error catch
  const result = await request;
  console.log("result.value", result);
  return result;
  }
  catch (err) {
  console.error("getDb not implemented");
  }
}


initdb();
