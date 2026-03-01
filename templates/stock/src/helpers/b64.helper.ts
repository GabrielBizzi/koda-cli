export function getBase64(file: File) {
	return new Promise((resolve) => {
		let baseURL: string | ArrayBuffer | null = '';
		// Make new FileReader
		const reader = new FileReader();

		// Convert the file to base64 text
		reader.readAsDataURL(file);

		// on reader load somthing...
		reader.onload = () => {
			// Make a fileInfo Object
			baseURL = reader.result;
			resolve(baseURL);
		};
	});
}
