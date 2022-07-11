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

// Logic for a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to database');
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({id: 1, value: content});
  const result = await request;
  console.log('Data saved to database', result.value);
}


// Logic for a method that gets all the content from the database
export const getDb = async () => {
  //Connect to database
  const jateDb = await openDB("jate", 1);
  //Create transaction for the database
  const tx = jateDb.transaction("jate", "readwrite");
  //Open object store
  const store = tx.objectStore("jate");
  //Pull all data
  const request = store.getAll();

  //Log results
  const result = await request;
  result
    ? console.log('Data retrieved from the database', result.value)
    : console.log('Data not found in the database');
  return result?.value;
  }


initdb();
