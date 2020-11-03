import dayjs from 'dayjs';

const contentTypes = {
  'image/png': 'PNG image',
  'image/jpg': "JPEG image",
  'image/jpeg': 'JPEG image',
  'application/pdf': 'PDF file',
  'application/zip': 'ZIP file'
};

let fallbackContentType = 'File';

export const formatContentType = contentType => {
  return contentTypes[contentType] || fallbackContentType;
}

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  let k = 1024;
  let dm = decimals < 0 ? 0 : decimals;
  let sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  let value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  let size = sizes[i];
  return `${value}${size}`;
}

export const formatTimestamp = timestamp => {
  if(!timestamp) {
    return;
  }
  if(!timestamp.toDate) {
    return
  }
  return dayjs(timestamp.toDate()).format('DD.MM.YYYY HH:mm');
}
