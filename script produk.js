
        // Fungsi utama untuk update produk
        function updateProducts() {
            const searchTerm = document.getElementById('search-bar').value.toLowerCase();
            const sortBy = document.getElementById('sort-harga').value;
            const activeCategory = document.querySelector('.filter-btn.active').dataset.kategori;
            const products = Array.from(document.querySelectorAll('.produk-card'));

            // Filter produk
            products.forEach(product => {
                const category = product.dataset.kategori;
                const productName = product.querySelector('h3').textContent.toLowerCase();
                const condition = product.querySelector('.kondisi').textContent.toLowerCase();
                
                const categoryMatch = activeCategory === 'all' || category === activeCategory;
                const searchMatch = productName.includes(searchTerm) || condition.includes(searchTerm);
                
                product.classList.toggle('hidden', !(categoryMatch && searchMatch));
            });

            // Sorting produk
            if(sortBy !== 'default') {
                const container = document.querySelector('.produk-grid');
                const sortedProducts = [...products].sort((a, b) => {
                    const priceA = parseInt(a.dataset.harga);
                    const priceB = parseInt(b.dataset.harga);
                    return sortBy === 'termurah' ? priceA - priceB : priceB - priceA;
                });

                // Animasi sorting
                sortedProducts.forEach((product, index) => {
                    product.style.transitionDelay = `${index * 30}ms`;
                    product.style.transform = `translateY(${index * 5}px)`;
                    setTimeout(() => {
                        product.style.transform = 'translateY(0)';
                        product.style.transitionDelay = '';
                    }, 300);
                });

                // Update DOM
                container.innerHTML = '';
                sortedProducts.forEach(product => container.appendChild(product));
            }
        }

        // Event Listeners
        document.getElementById('search-bar').addEventListener('input', updateProducts);
        document.getElementById('sort-harga').addEventListener('change', updateProducts);
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                updateProducts();
            });
        });

        // Sistem Pembayaran
        document.querySelectorAll('.btn-beli').forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.parentElement.querySelector('h3').textContent;
                const payment = prompt(`Pilih metode pembayaran untuk ${productName}:\n1. BRI\n2. BNI\n3. OVO`);
                
                if(payment) {
                    alert(`✅ Pembayaran via ${payment.toUpperCase()} berhasil!\nBarang akan dikirim dalam 1-3 hari kerja.`);
                }
            });
        });

         // Fungsi Normalisasi Teks
    function normalizeText(text) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    // Fungsi Pencarian Real-Time
    function handleSearch() {
        const searchTerm = normalizeText(this.value);
        const products = document.querySelectorAll('.produk-card');
        
        products.forEach(product => {
            const productName = normalizeText(
                product.querySelector('h3').textContent
            );
            
            const isMatch = productName.includes(searchTerm);
            product.style.opacity = isMatch ? 1 : 0;
            product.style.transform = isMatch ? 'scale(1)' : 'scale(0.9)';
            product.style.pointerEvents = isMatch ? 'all' : 'none';
            
            // Highlight teks yang cocok
            if(isMatch && searchTerm.length > 0) {
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                product.querySelector('h3').innerHTML = 
                    product.querySelector('h3').textContent
                        .replace(regex, '<span class="highlight">$1</span>');
            }
        });

        // Reflow grid
        setTimeout(() => {
            const container = document.querySelector('.produk-grid');
            container.style.display = 'none';
            void container.offsetWidth;
            container.style.display = 'grid';
        }, 300);
    }

    // Update fungsi filter
    function filterProduk(kategori) {
        const container = document.querySelector('.produk-grid');
        const allCards = Array.from(container.children);
        
        // Urutkan kartu yang visible di depan
        const visibleCards = allCards.filter(card => {
            const match = card.dataset.kategori === kategori || kategori === 'all';
            card.classList.toggle('hidden', !match);
            return match;
        });

        // Animasi reposisi
        visibleCards.forEach((card, index) => {
            card.style.animation = `reposition 0.4s ease ${index * 0.08}s`;
            card.style.order = index;
        });

        // Paksa reflow untuk animasi
        void container.offsetWidth;
    }

    // Tambahkan event listener untuk animasi selesai
    document.querySelectorAll('.produk-card').forEach(card => {
        card.addEventListener('animationend', () => {
            card.style.animation = '';
        });
    });

// Toggle mobile menu
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close menu ketika klik diluar
document.addEventListener('click', function(e) {
    if(!e.target.closest('.nav') && !e.target.closest('.menu-toggle')) {
        document.querySelector('.nav-links').classList.remove('active');
    }
});
