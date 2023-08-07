const form = document.getElementById('form');
const fileInput = document.getElementById('file-input');
const addressOutput = document.getElementById('url-output');
const copyButton = document.getElementById('copy-btn');
const qrText = document.getElementById('qr-text')
const content = document.getElementById('content')

// API: http://api.qrserver.com/v1/read-qr-code/ 
// Docs https://goqr.me/api/doc/read-qr-code/

// Event listeners
form.addEventListener("click", () => fileInput.click());
copyButton.addEventListener('click', copyToClipboard);

// Copy Address function
function copyToClipboard() {
    let address = addressOutput.textContent;
    address.select;
    navigator.clipboard.writeText(address);
    console.log(address);
}


// Fetch api
function fetchRequest(file, formData) {
    qrText.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        qrText.innerText = result ? "Upload QR Code To Scan" : "Couldn't Scan QR Code";
        if (!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        content.classList.add("inactive"); //hiddin text for the qr code area
    }).catch(() => {
        qrText.innerText = "Couldn't Scan QR Code...";
    });
}

// Send QR Code File With Request To Api
fileInput.addEventListener("change", async e => {
    let file = e.target.files[0];
    if (!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});