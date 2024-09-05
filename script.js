document.getElementById('submit').addEventListener('click', function() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const paymentProof = document.getElementById('paymentProof').files[0];

    if (date && time && paymentProof) {
        alert(`Booking confirmed for ${date} at ${time}. Payment proof uploaded.`);
    } else {
        alert('Please select a date, time, and upload payment proof.');
    }
});
flatpickr("#date", {
    enableTime: false,
    dateFormat: "Y-m-d",
    minDate: "today", // Prevent booking past dates
});
