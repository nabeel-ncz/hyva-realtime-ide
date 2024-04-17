import { NextFunction, Request, Response } from "express";
import { spawn } from "child_process";

export const runCode = async (req: Request, res: Response, next: NextFunction) => {
    const { content, language } = req.body;
    let interpreter, fileExtension;
    switch (language) {
        case 'node':
            interpreter = 'node';
            fileExtension = 'js';
            break;
        case 'rust':
            interpreter = 'rustc';
            fileExtension = 'rs';
            break;
        default:
            return;
    }
    const fs = require('fs');
    const fileName = `temp.${fileExtension}`;
    fs.writeFileSync(fileName, content);
    //execute the file
    const child = spawn(interpreter, [fileName]);
    let output = '';
    child.stdout.on('data', (data) => {
        output += data.toString();
    });
    child.stderr.on('data', (data) => {
        output += data.toString();
    });
    child.on('close', (code) => {
        if (code === 0) {
            res.status(200).json({ out: output, success: true });
        } else {
            console.log('error', code);
            res.status(200).json({ out: output, success: false });
        }
        // cleanup the temporary file
        fs.unlinkSync(fileName);
    });
}