import fs from 'fs/promises';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

async function addNewObject(filePath) {
  try {
    const name = await askQuestion('Podaj imię: ');
    const age = await askQuestion('Podaj wiek: ');
    const email = await askQuestion('Podaj email: ');
    
    const newObject = { name, age: parseInt(age), email };

    let jsonArray = [];

    try {
      const data = await fs.readFile(filePath, 'utf8');
      jsonArray = JSON.parse(data);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error("Błąd w odczycie JSON:", err);
      } else {
        console.log("Plik nie istnieje, zostanie utworzony nowy.");
      }
    }

    jsonArray.push(newObject);
    await fs.writeFile(filePath, JSON.stringify(jsonArray, null, 2));
    console.log('Nowy obiekt został zapisany.');
    
  } catch (err) {
    console.error("Błąd podczas zapisywania danych:", err);
  } finally {
    rl.close();
  }
}
