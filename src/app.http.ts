import fs from 'fs'
import http from 'http';


const server= http.createServer((req, res)=>{
    console.log(req.url)
    // res.write('<h1>Hola Mundo</h1>')
    // res.end();

    if(req.url == '/'){
        const htmlFile = fs.readFileSync('./public/index.html','utf-8');
        res.write(htmlFile);
        res.end();
    }
});


server.listen(8080,()=>{
    console.log('Server running on port 8080')
});