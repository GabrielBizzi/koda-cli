export function copy(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined' || typeof navigator === 'undefined') {
            return reject(
                new Error('Clipboard API is not available on the server'),
            );
        }

        if (
            'navigator' in window &&
            'navigator' in globalThis &&
            'clipboard' in navigator &&
            'permissions' in navigator
        ) {
            const type = 'text/plain';
            const blob = new Blob([text], { type });
            const data = [new ClipboardItem({ [type]: blob })];

            navigator.clipboard
                .write(data)
                .then(() => resolve())
                .catch(reject);
        } else if (
            typeof document !== 'undefined' &&
            document.queryCommandSupported &&
            document.queryCommandSupported('copy')
        ) {
            const textarea = document.createElement('textarea');
            textarea.textContent = text;
            textarea.style.position = 'fixed';
            textarea.style.width = '2em';
            textarea.style.height = '2em';
            textarea.style.padding = '0';
            textarea.style.border = 'none';
            textarea.style.outline = 'none';
            textarea.style.boxShadow = 'none';
            textarea.style.background = 'transparent';

            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();

            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textarea);

                if (successful) {
                    resolve();
                } else {
                    reject(new Error('Copy command was unsuccessful'));
                }
            } catch (e) {
                document.body.removeChild(textarea);
                reject(e);
            }
        } else {
            reject(
                new Error(
                    'None of the copying methods are supported by this browser!',
                ),
            );
        }
    });
}
