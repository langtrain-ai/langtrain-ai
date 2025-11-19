export function tokenize(text: string): number[] {
    // Mock tokenization
    return text.split(' ').map(() => Math.floor(Math.random() * 1000));
}
