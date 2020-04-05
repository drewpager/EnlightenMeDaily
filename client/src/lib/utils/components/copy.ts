import { useRef } from 'react';
import { displaySuccessNotification } from '../index';

export function copyToClipboard(quote: string) {
  const copyRef = useRef(quote);
  document.execCommand('copy', false, copyRef.current);
  console.log(copyRef.current);
  displaySuccessNotification('copied successfully!');
}


