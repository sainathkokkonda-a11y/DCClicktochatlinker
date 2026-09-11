function checkManualCode(selectObj) {
    const manualInput = document.getElementById('manualCode');
    if(selectObj.value === 'other') {
        manualInput.style.display = 'block';
        manualInput.focus();
    } else {
        manualInput.style.display = 'none';
    }
}

document.getElementById('templateSelector').addEventListener('change', function() {
    const selectedTemplate = this.value;
    if(selectedTemplate) {
        document.getElementById('waMessage').value = selectedTemplate;
    }
});

document.getElementById('waGenerateBtn').addEventListener('click', function() {
    const selectElem = document.getElementById('countryCode');
    let countryCode = selectElem.value;
    
    if(countryCode === 'other') {
        countryCode = document.getElementById('manualCode').value.trim();
    }
    
    const phone = document.getElementById('waPhone').value.trim();
    const message = document.getElementById('waMessage').value.trim();
    
    if(!phone) {
        alert("Please enter a valid mobile number.");
        return;
    }
    if(!countryCode && selectElem.value === 'other') {
        alert("Please enter a valid country code.");
        return;
    }
    
    const cleanPhone = countryCode.replace(/[^0-9]/g, '') + phone.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const finalUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    
    const outputInput = document.getElementById('waOutputLink');
    outputInput.value = finalUrl;
    
    const qrImage = document.getElementById('qrImage');
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(finalUrl)}`;
    
    document.getElementById('waResultBox').style.display = 'block';
    document.getElementById('waTestBtn').href = finalUrl;
});

document.getElementById('waCopyBtn').addEventListener('click', function() {
    const outputInput = document.getElementById('waOutputLink');
    outputInput.select();
    outputInput.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(outputInput.value).then(() => {
        alert("WhatsApp link copied to clipboard!");
    });
});
