// Modern Clipboard Copy Utility with Success Detection

// Method 1: Using Clipboard API (Recommended for modern browsers)
function copyToClipboard(text) {
  return new Promise((resolve, reject) => {
    // Check if Clipboard API is available
    if (!navigator.clipboard) {
      // Fallback for older browsers
      return fallbackCopyToClipboard(text);
    }

    // Use Clipboard API
    navigator.clipboard.writeText(text)
      .then(() => {
        // Successfully copied
        resolve(true);
      })
      .catch(err => {
        // Failed to copy
        console.error('Failed to copy text: ', err);
        reject(false);
      });
  });
}

// Fallback method for older browsers
function fallbackCopyToClipboard(text) {
  return new Promise((resolve, reject) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();

    try {
      // Execute the copy command
      const successful = document.execCommand('copy');
      
      if (successful) {
        resolve(true);
      } else {
        reject(false);
      }
    } catch (err) {
      console.error('Fallback copy failed', err);
      reject(false);
    }

    // Remove the temporary textarea
    document.body.removeChild(textArea);
  });
}

// Example usage
function handleCopy() {
  const textToCopy = "Hello, clipboard!";
  
  copyToClipboard(textToCopy)
    .then(() => {
      console.log('Text successfully copied to clipboard');
      
      // Optional: Provide user feedback
      const copyButton = document.getElementById('copyButton');
      copyButton.textContent = 'Copied!';
      
      // Optionally revert button text after a few seconds
      setTimeout(() => {
        copyButton.textContent = 'Copy';
      }, 2000);
    })
    .catch(() => {
      console.log('Failed to copy text');
      
      // Optional: Show error feedback
      const copyButton = document.getElementById('copyButton');
      copyButton.textContent = 'Copy Failed';
    });
}

// Example HTML to demonstrate usage
/*
<button id="copyButton" onclick="handleCopy()">Copy</button>
*/

// Additional utility for checking clipboard permissions (modern browsers)
async function checkClipboardPermission() {
  try {
    const result = await navigator.permissions.query({ name: 'clipboard-write' });
    return result.state === 'granted';
  } catch (err) {
    console.error('Could not check clipboard permissions', err);
    return false;
  }
}

// Export functions if using as a module
export { 
  copyToClipboard, 
  fallbackCopyToClipboard, 
  checkClipboardPermission 
};