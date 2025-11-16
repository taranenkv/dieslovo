export const playBase64Audio = (base64: string) => {
    return new Promise<void>((resolve) => {
        const audio = new Audio(`data:audio/mpeg;base64,${base64}`);
        audio.onended = () => resolve();
        audio.play();
    });
}
