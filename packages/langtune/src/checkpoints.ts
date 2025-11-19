import fs from 'fs';
import path from 'path';

export function saveCheckpoint(dir: string, step: number, state: any) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const file = path.join(dir, `checkpoint-${step}.json`);
    fs.writeFileSync(file, JSON.stringify(state, null, 2));
    console.log(`Saved checkpoint to ${file}`);
}

export function loadCheckpoint(file: string): any {
    if (!fs.existsSync(file)) {
        throw new Error(`Checkpoint ${file} not found`);
    }
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
}
