/**
 * Minimal TypeScript scaffolding for langtune (JS-side)
 * Export simple mock trainer to satisfy CLI examples.
 */

/**
 * Run a mock training loop for N steps and save checkpoints to disk.
 */
import fs from "fs";
import path from "path";

export async function mockTrain(outDir: string, steps = 10) {
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    for (let i = 1; i <= steps; i++) {
        const ckpt = { step: i, loss: (Math.random() * 0.1 + (1 / i)).toFixed(4) };
        fs.writeFileSync(path.join(outDir, `checkpoint-${i}.json`), JSON.stringify(ckpt, null, 2));
        console.log(`Saved checkpoint ${i}`);
        await new Promise((r) => setTimeout(r, 50));
    }
}

export { tune, prepare } from './cli-helpers';
