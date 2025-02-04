async function generateWidget() {
    const startDate = prompt("Enter start date (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
    const targetDate = prompt("Enter target date (YYYY-MM-DD):");

    if (!startDate || !targetDate) {
        alert("Please provide both dates!");
        return;
    }

    try {
        const response = await fetch('widget-template.html');
        let templateCode = await response.text();
        
        // Replace placeholders in the template
        templateCode = templateCode
            .replace('{{generationDate}}', new Date().toLocaleDateString())
            .replace('{{startDate}}', startDate)
            .replace('{{targetDate}}', targetDate);

        const codeOutput = document.getElementById('codeOutput');

        // Add copy button if it doesn't exist
        if (!document.querySelector('.copy-button')) {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = 'Copy to Clipboard';
            copyButton.onclick = function() {
                navigator.clipboard.writeText(templateCode)
                    .then(() => {
                        copyButton.textContent = 'Copied!';
                        setTimeout(() => {
                            copyButton.textContent = 'Copy to Clipboard';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy:', err);
                        alert('Failed to copy to clipboard');
                    });
            };
            codeOutput.parentNode.insertBefore(copyButton, codeOutput.nextSibling);
        }

        // Open in new window button
        if (!document.querySelector('.new-window-button')) {
            const newWindowButton = document.createElement('button');
            newWindowButton.className = 'new-window-button';
            newWindowButton.textContent = 'Open in New Window';
            newWindowButton.onclick = function() {
                const newWindow = window.open('', '_blank');
                newWindow.document.write(templateCode);
                newWindow.document.close();
            };
            codeOutput.parentNode.insertBefore(newWindowButton, codeOutput.nextSibling);
        }
    } catch (error) {
        console.error('Error loading template:', error);
        alert('Failed to load widget template');
    }
} 