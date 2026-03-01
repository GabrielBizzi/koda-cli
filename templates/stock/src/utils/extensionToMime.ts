export const extensionToMime: { [key: string]: string } = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export const fileTypeTranslations: { [key: string]: string } = {
  "application/pdf": "Documento PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "Documento Word",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    "Planilha Excel",
  "image/jpeg": "Imagem JPEG",
  "image/png": "Imagem PNG",

};