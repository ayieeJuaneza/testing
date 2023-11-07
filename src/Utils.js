import CryptoJS from 'crypto-js';

// Your secret key
const secretKey = 'your-secret-key';

// Decrypt data
export function decryptData(encryptedData) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    // console.error('Decryption failed:', error);
    return null;
  }
}
