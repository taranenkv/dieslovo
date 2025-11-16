export const parseTerms = (text: string) => {
    return text
        .split('\n')
        .filter(Boolean)
        .map((line) => {
            const [word, translation] = line.split(' - ');
            return { word: word?.trim(), translation: translation?.trim() }
        });
}