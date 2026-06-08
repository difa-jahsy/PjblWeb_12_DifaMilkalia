
const namaSaya = "Difa Milkalia al-jahsy";

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
    });
});

document.getElementById("btnKirim").addEventListener("click", function(event) {
    event.preventDefault();

    let nama = document.getElementById("nama-lengkap").value.trim();
    let alamat = document.getElementById("alamat").value.trim();
    let tempatLahir = document.getElementById("tempat-lahir").value.trim();
    let tglLahir = document.getElementById("tgl-lahir").value;
    let nik = document.getElementById("nik").value.trim();
    let telepon = document.getElementById("no_telepon").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let agama = document.getElementById("agama").value;

    let jenisKelamin = "";
    let radioJk = document.querySelectorAll('input[name="jenis_kelamin"]');

    for (let i = 0; i < radioJk.length; i++) {
        if (radioJk[i].checked) {
            jenisKelamin = radioJk[i].value;
            break;
        }
    }

    let bahasa = [];
    let allCheckbox = document.querySelectorAll('.checkbox-group input');

    for (let i = 0; i < 4 && i < allCheckbox.length; i++) {
        if (allCheckbox[i].checked) {
            bahasa.push(allCheckbox[i].value);
        }
    }

    let hobi = [];

    for (let i = 4; i < allCheckbox.length; i++) {
        if (allCheckbox[i].checked) {
            hobi.push(allCheckbox[i].value);
        }
    }

    if (nama === "") {
        alert("⚠️ Nama lengkap harus diisi!");
        return;
    }

    if (email !== "" && (!email.includes("@") || !email.includes("."))) {
        alert("⚠️ Masukkan email yang valid!");
        return;
    }

    let dataBaru = document.createElement("div");
    dataBaru.classList.add("data-card");

    let html = `
        <div class="nama">👤 ${escapeHtml(nama)}</div>

        <div class="info">
            📧 ${email || "-"} | 📞 ${telepon || "-"} | ${agama}
        </div>

        <div class="detail">
            <strong>📍 Alamat:</strong> ${escapeHtml(alamat) || "-"}<br>

            <strong>🎂 Tempat/Tgl Lahir:</strong>
            ${escapeHtml(tempatLahir) || "-"} / ${tglLahir || "-"}<br>

            <strong>⚥ Jenis Kelamin:</strong>
            ${jenisKelamin || "-"}<br>

            <strong>🆔 NIK:</strong>
            ${nik || "-"}<br>

            <strong>🗣️ Bahasa:</strong>
            ${bahasa.length > 0 ? bahasa.join(", ") : "-"}<br>

            <strong>🎨 Hobi:</strong>
            ${hobi.length > 0 ? hobi.join(", ") : "-"}
        </div>
    `;

    dataBaru.innerHTML = html;

    const hasilData = document.getElementById("hasilData");
    const emptyMessage = hasilData.querySelector(".empty-message");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    hasilData.insertBefore(dataBaru, hasilData.firstChild);

    alert(`✅ Data berhasil disimpan!\nTerima kasih ${nama}, data Anda sudah tercatat.`);

    document.getElementById("nama-lengkap").value = "";
    document.getElementById("alamat").value = "";
    document.getElementById("tempat-lahir").value = "";
    document.getElementById("tgl-lahir").value = "";
    document.getElementById("nik").value = "";
    document.getElementById("no_telepon").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("agama").value = "Islam";

    let allRadio = document.querySelectorAll('input[type="radio"]');
    allRadio.forEach(radio => radio.checked = false);

    let allCheckboxReset = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxReset.forEach(cb => cb.checked = false);
});

function escapeHtml(text) {
    if (!text) return "";

    const div = document.createElement('div');
    div.textContent = text;

    return div.innerHTML;
}