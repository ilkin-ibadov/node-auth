import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// faylin yerlesdiyi yerden yeni bir qovluq ve fayl path yaratmaq
const newPath = path.join(__dirname, 'new', 'new.js');

// command run olunan yerden yeni bir qovluq ve fayl path yaratmaq
const resolvedPath = path.resolve('new', 'new.js');

// faylin adi
const fileName = path.basename(newPath)

// faylin adi, fayl sonlugu olmadan
const fileNameWithoutExt = path.basename(newPath, '.js')

// fayl sonlugu
const extensionName = path.extname(newPath)

// pathi ferqli datalara bolmek
const parsedPath = path.parse(newPath)

// datalardan pathi yaratmaq
const formattedPath = path.format({
    root: '/',
    dir: '/Users/ilkinibadov/Desktop/nodeDemo/new',
    base: 'new.js',
    ext: '.js',
    name: 'new'
})

// pathin absolute olub olmadigini yoxlamaq
console.log(path.isAbsolute(resolvedPath))

// fayl pathinde istifade olunan simvol
const seperator = path.sep

// yeni qovluq ve fayl yaratmaq
fs.mkdir(path.dirname(newPath), { recursive: true }, (err) => {
    if (err) {
        return console.error('Error creating folders:', err);
    }

    const content = "// This file was created using path.join, __dirname, and recursive folders\nconsole.log('Hello World!');";
    fs.writeFile(newPath, content, 'utf8', (err) => {
        if (err) {
            return console.error('Error creating file:', err);
        }
        console.log('File successfully created at:', newPath);
    });
});