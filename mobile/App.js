import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function App() {
  const [decryptedLink, setDecryptedLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('localhost:3000/data');
        const encryptedLink = response.encryptedString;

        const decryptedBytes = CryptoJS.AES.decrypt(encryptedLink, 'your-decryption-key');
        const decryptedLink = decryptedBytes.toString(CryptoJS.enc.Utf8);

        setDecryptedLink(decryptedLink);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <WebView source={{ uri: decryptedLink }} />
  );
}
