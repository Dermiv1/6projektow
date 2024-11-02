import http from 'http';
import fs from 'fs';
import url from 'url';

const requestListener = (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const fileName = queryObject.file;

    if (!fileName) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Błąd: Proszę podać nazwę pliku jako parametr, np. ?file=przyklad.txt');
        return;
    }

    const filePath = `./${fileName}`;

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`Blad 404: Plik "${fileName}" nie zostal znaleziony.`);
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/plain' });

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        fileStream.on('error', (streamErr) => {
            console.error(`Bląd podczas odczytu pliku: ${streamErr.message}`);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Blad serwera podczas odczytu pliku.');
        });
    });
};

const server = http.createServer(requestListener);

server.listen(3000, () => {
    console.log('Serwer nasłuchuje na http://localhost:3000');
});
