export class Scheduler {
    constructor(private totalSteps: number) { }

    getLearningRate(step: number): number {
        return 0.001 * (1 - step / this.totalSteps);
    }
}
