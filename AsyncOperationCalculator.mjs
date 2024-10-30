import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getNumberInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      const number = parseFloat(input);
      if (isNaN(number)) {
        console.error("Błąd: Podana wartość nie jest liczbą.");
        rl.close();
        process.exit(1);
      } else {
        resolve(number);
      }
    });
  });
}
function getOperationType() {
    return new Promise((resolve) => {
      rl.question("Wybierz operację (dodawanie, mnożenie): ", (operation) => {
        if (["dodawanie", "mnożenie"].includes(operation)) {
          resolve(operation);
        } else {
          console.error("Błąd: Niepoprawna operacja.");
          rl.close();
          process.exit(1);
        }
      });
    });
  }
  