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

})}
