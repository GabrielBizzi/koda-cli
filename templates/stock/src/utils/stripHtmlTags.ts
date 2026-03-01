export const stripHtmlTags = (str?: string) => {

  if ((str===null) || (str==='') || (str===undefined))
      return '';
  else
      str = str.toString();
  return str.replace(/<[^>]*>/g, '');
}