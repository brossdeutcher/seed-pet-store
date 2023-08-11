const client = require('./db.js');

const dropTables = async() => {
  try {
    await client.query(`
    DROP TABLE IF EXISTS pets_products;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS pets;  
      DROP TABLE IF EXISTS owners;
    `);

    console.log('TABLES DROPPED!');
  } catch(error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE owners(
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(30) NOT NULL
      );

      CREATE TABLE pets(
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(20) NOT NULL,
        Type VARCHAR(20) NOT NULL,
        Owner_Id INTEGER REFERENCES owners(Id)
      );

      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      );

      CREATE TABLE pets_products(
        pets_id INTEGER REFERENCES pets(id),
        products_id INTEGER REFERENCES products(id)
      );
    `);

    console.log('TABLES CREATED!');
  } catch(error) {
    console.log(error);
  }
}

const createOwner = async(ownersName) => {
  try {
    await client.query(`
      INSERT INTO owners (Name)
      VALUES ('${ownersName}');
    `);

    console.log('OWNER CREATED');
  } catch(error) {
    console.log(error)
  }
}

const createPet = async(petName, petType, petOwnerId) => {
  try {
    await client.query(`
      INSERT INTO pets (name, type, owner_id)
      VALUES ('${petName}', '${petType}', ${petOwnerId});
    `);
    console.log('PET CREATED')
  } catch (err) {
    console.log(err);
  }
}

const syncAndSeed = async() => {
  try {
    await client.connect();
    console.log('CONNECTED TO THE DB!');

    await dropTables();
    await createTables();

    await createOwner('Greg');
    await createOwner(null);
    await createOwner('Bill');

    await createPet('Floffy', 'Bunny', 1);
    await createPet('Leroy', 'Lizard', 1);
    await createPet('Fido', 'Doggo', 3);

  } catch(error) {
    console.log(error);
  }
}

syncAndSeed();