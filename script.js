

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const kategori = button.dataset.kategori;
        filterProduk(kategori);
    });
});

function filterProduk(kategori) {
    document.querySelectorAll('.produk-card').forEach(card => {
        if (kategori === 'all' || card.dataset.kategori === kategori) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Simulasi Pembayaran
document.querySelectorAll('.btn-beli').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.parentElement.querySelector('h3').textContent;
        const metodePembayaran = prompt(`Pilih metode pembayaran untuk ${productName}: BRI/BNI/OVO`);
        if (metodePembayaran) {
            alert(`✅ Pembayaran via ${metodePembayaran} untuk ${productName} berhasil!`);
        }
    });
});