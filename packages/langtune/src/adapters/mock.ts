export class MockAdapter {
    name = "mock";

    async trainStep(batch: any[]) {
        return { loss: Math.random() };
    }
}
