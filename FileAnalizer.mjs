import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';

class FileAnalyzerEmitter extends EventEmitter {}
const analyzerEmitter = new FileAnalyzerEmitter();

function analyzeDirectory(directoryPath) {
    console.log(`Rozpoczynam analizę katalogu: ${directoryPath}`);

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(`Błąd podczas odczytu katalogu: ${err.message}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directoryPath, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Błąd podczas odczytu informacji o pliku ${file}: ${err.message}`);
                    return;
                }

                if (stats.isDirectory()) {
                    console.log(`Katalog: ${file}`);
                } else {
                    analyzerEmitter.emit('fileAnalysisStarted', file);

                    const fileSize = stats.size;
                    const fileExtension = path.extname(file);
                    const lastModified = stats.mtime;

                    console.log(`Plik: ${file}`);
                    console.log(`Rozmiar: ${fileSize} B`);
                    console.log(`Rozszerzenie: ${fileExtension}`);
                    console.log(`Ostatnia modyfikacja: ${lastModified}`);

                    analyzerEmitter.emit('fileAnalysisCompleted', file);
                }
            });
        });
    });
}


analyzerEmitter.on('fileAnalysisStarted', (fileName) => {
    console.log(`Analiza pliku "${fileName}" rozpoczęta.`);
});

analyzerEmitter.on('fileAnalysisCompleted', (fileName) => {
    console.log(`Analiza pliku "${fileName}" zakończona.`);
});


const directoryPath = process.argv[2];

if (!directoryPath) {
    console.error('Proszę podać ścieżkę do katalogu.');
    process.exit(1);
}

analyzeDirectory(directoryPath);
