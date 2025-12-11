# Katkıda Bulunma Rehberi

Projeye katkıda bulunduğunuz için teşekkür ederiz! Lütfen aşağıdaki kurallara uyun.

## 🌟 Katkı Alanları

Bu projeye iki ana şekilde katkıda bulunabilirsiniz:
1. **İçerik Katkısı:** Yeni uzay/havacılık projeleri ekleyerek.
2. **Web Geliştirme:** Next.js tabanlı web platformunu geliştirerek.

---

## 📝 İçerik Ekleme (Yeni Proje)

1. Uygun kategoriye (`Türkiye` veya `Dünya`) yeni bir klasör oluşturun.
2. Klasör içine `README.md` dosyası ekleyin. (Bkz: [TEMPLATE.md](../TEMPLATE.md))
3. Projenizi ekledikten sonra ana dizindeki `README.md` dosyasını güncellemek için aşağıdaki komutu çalıştırın:
   ```bash
   python scripts/update_index.py
   ```
4. Değişiklikleri commit edin ve Pull Request gönderin.

---

## 💻 Web Geliştirme

Web arayüzü `web/` klasöründe bulunmaktadır ve **Next.js 14**, **Tailwind CSS** ve **Framer Motion** kullanmaktadır.

### Kurulum
```bash
cd web
npm install
npm run dev
```

### Kurallar
- Yeni bileşenler oluştururken `components/` klasörünü kullanın.
- Mevcut renk paletine (`colors-space-...`) sadık kalın.
- Herhangi bir değişiklik yapmadan önce yerel ortamda çalıştığından emin olun.

---

## 🚦 Genel Kurallar
1. Repoyu fork'layın.
2. Yeni bir dal (branch) açın (`feature/yeni-ozellik`).
3. Değişiklikleri anlamlı commit mesajları ile gönderin.
4. Pull Request açarken yaptığınız değişikliği detaylıca açıklayın.

Her türlü katkı için teşekkürler! 🚀
