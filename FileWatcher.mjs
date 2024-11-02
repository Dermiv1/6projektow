import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';

class FileWatcher extends EventEmitter {
  constructor(directory, logFile) {
    super();
    this.directory = directory;
    this.logFile = logFile;
    this.watchedFiles = new Set();
  }

 
  start() {

    fs.watch(this.directory, (eventType, filename) => {
      if (!filename) return;

      const filePath = path.join(this.directory, filename);


      fs.stat(filePath, (err, stats) => {
        if (err) {
   
          if (err.code === 'ENOENT') {
            if (this.watchedFiles.has(filename)) {
              this.watchedFiles.delete(filename);
              this.emit('fileRemoved', filename);
              this.logChange(`Usunięto plik: ${filename}`);
            }
          } else {
            console.error(`Błąd przy sprawdzaniu pliku ${filename}:`, err);
          }
          return;
        }

        if (stats.isFile()) {
          if (this.watchedFiles.has(filename)) {
      
            this.emit('fileChanged', filename);
            this.logChange(`Zmieniono plik: ${filename}`);
          } else {
     
            this.watchedFiles.add(filename);
            this.emit('fileAdded', filename);
            this.logChange(`Dodano nowy plik: ${filename}`);
          }
        }
      });
    });
    

    console.log(`Monitoring katalogu: ${this.directory}`);
  }

  
  logChange(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFile(this.logFile, logMessage, (err) => {
      if (err) console.error('Błąd przy zapisywaniu logu:', err);
    });
  }
}


const directoryToWatch = './ogladany_katalog';
const logFile = './fileWatcher.log';


const watcher = new FileWatcher(directoryToWatch, logFile);


watcher.on('fileAdded', (filename) => {
  console.log(`Dodano nowy plik: ${filename}`);
});

watcher.on('fileChanged', (filename) => {
  console.log(`Zmieniono plik: ${filename}`);
});

watcher.on('fileRemoved', (filename) => {
  console.log(`Usunięto plik: ${filename}`);
});

watcher.start();
