export class HFAdapter {
    name = "hf";

    async trainStep(batch: any[]) {
        // Pseudo-impl
        return { loss: Math.random() * 0.5 };
    }
}
