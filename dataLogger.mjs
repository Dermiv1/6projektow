import readline from 'readline'
import fs from 'fs'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Podaj imie: ", function(imie) {
    rl.question("Podaj nazwisko: ", function(nazwisko){
        rl.question("Podaj wiek: ", function(wiek){
            const user = {
                imie: imie,
                nazwisko: nazwisko,
                wiek: Number(wiek)
            };
            console.log("Utworzony obiekt:", user); 
            const jsonstringuser = JSON.stringify(user)
            fs.writeFile("user.json", jsonstringuser, err=>{
                if(err){
                    console.error(`Błąd zapisu ${err}`)
                    return
                }else{
                    console.log("zapisano dane do plik json")
                }
            })
            
            rl.close()
            fs.readFile("user.json", "utf-8", (err, data)=>{
                if(err){
                    console.error(`Błąd odczytywania pliku ${err}`)
                    return;
                }
                const userobject = JSON.parse(data);
            
                console.log("dane z pliku user.json: ", userobject)
            })
        })
    })
})

