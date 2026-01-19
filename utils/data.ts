import fs from 'fs';
import path from 'path';

export const dataPath = path.join(process.cwd(), 'data');

export const readData = (fileName: string) => {
    const filePath = path.join(dataPath, fileName);
    try {
        if (!fs.existsSync(filePath)) {
            return [];
        }
        const fileData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error(`Error reading ${fileName}:`, error);
        return [];
    }
};

export const writeData = (fileName: string, data: any) => {
    const filePath = path.join(dataPath, fileName);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error(`Error writing ${fileName}:`, error);
        return false;
    }
};
