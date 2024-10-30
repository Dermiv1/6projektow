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
  function getExecutionMethod() {
    return new Promise((resolve) => {
      rl.question("Wybierz metodę (callback lub promise): ", (method) => {
        if (["callback", "promise"].includes(method)) {
          resolve(method);
        } else {
          console.error("Błąd: Niepoprawna metoda.");
          rl.close();
          process.exit(1);
        }
      });
    });
  }
  
  function asyncOperationCallback(a, b, operation, callback) {
    setTimeout(() => {
      if (operation === "dodawanie") {
        callback(null, a + b);
      } else if (operation === "mnożenie") {
        callback(null, a * b);
      } else {
        callback("Nieznana operacja");
      }
    }, 1000);
  }
  


  function asyncOperationPromise(a, b, operation) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (operation === "dodawanie") {
          resolve(a + b);
        } else if (operation === "mnożenie") {
          resolve(a * b);
        } else {
          reject("Nieznana operacja");
        }
      }, 1000);
    });
  }
  
  async function main() {
    const number1 = await getNumberInput("Podaj pierwszą liczbę: ");
    const number2 = await getNumberInput("Podaj drugą liczbę: ");
    const operation = await getOperationType();
    const method = await getExecutionMethod();
  
    if (method === "callback") {
      asyncOperationCallback(number1, number2, operation, (error, result) => {
        if (error) {
          console.error("Błąd:", error);
        } else {
          console.log("Wynik:", result);
        }
        rl.close();
      });
    } else if (method === "promise") {
      asyncOperationPromise(number1, number2, operation)
        .then((result) => {
          console.log("Wynik:", result);
        })
        .catch((error) => {
          console.error("Błąd:", error);
        })
        .finally(() => {
          rl.close();
        });
    }
  }
  
  main();
  