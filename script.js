const textarea_input = document.getElementById('textarea-input');
const output = document.getElementById('output');

function updatePreview() {
  const rawMarkdown = textarea_input.value;
  const htmlOutput = marked.parse(rawMarkdown);
  output.innerHTML = htmlOutput;
}
textarea_input.addEventListener('input', updatePreview);

const downloadButton = document.getElementById('download-button');
downloadButton.addEventListener('click', () => {
    const markdownContent = textarea_input.value;
    if (!markdownContent.trim()) {
        alert("A szövegdoboz üres, nincs mit menteni!");
        return;
    }
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'markdown.md';
    link.click();
    URL.revokeObjectURL(downloadUrl);
});

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
    if (confirm("Biztosan törölni szeretnéd a szövegdobozt?")) {
        textarea_input.value = '';
        updatePreview();
    }
});

const copyButton = document.getElementById('copy-button');
copyButton.addEventListener('click', () => {
    const markdownContent = textarea_input.value;
    if (!markdownContent.trim()) {
        alert("A szövegdoboz üres, nincs mit másolni!");
        return;
    }
    navigator.clipboard.writeText(markdownContent)
        .then(() => {
            alert("A szöveg sikeresen a vágólapra másolva!");
        })
        .catch(err => {
            console.error('Hiba a másolás során: ', err);
            alert("Hiba történt a másolás során.");
        });
});