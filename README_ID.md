# <a name="top"/> Ski Article

<!-- Badges -->
[![Node.js Version](https://img.shields.io/badge/Node.js-16.20.2-brightgreen?logo=node.js)](https://nodejs.org/blog/release/v16.20.2)
[![ESLint](https://github.com/mitsuki31/SkiArticle/actions/workflows/eslint.yml/badge.svg)](https://github.com/mitsuki31/SkiArticle/actions/workflows/eslint.yml)
[![Test](https://github.com/mitsuki31/SkiArticle/actions/workflows/test.yml/badge.svg)](https://github.com/mitsuki31/SkiArticle/actions/workflows/test.yml)


> [!WARNING]
> 
> Kami telah menyebarkan dan mempublikasikan website ini; namun begitu, proyek ini masih dalam pengembangan. Kami saat ini sedang mencoba untuk membuat artikel berbasis website ini
> jauh lebih responsif dan cocok (kompatibel) pada perangkat seluler dan juga komputer desktop. [Beritahu kami](https:/github.com/mitsuki31/SkiArticle/issues/new) jika kamu mempunyai
> ide yang menarik untuk halaman artikel atau jika memiliki masalah pada situs web nya. Atau jika kamu adalah seorang siswa/i dari SMK Sukamandi, kamu mungkin dapat bertemu kami secara langsung.

Proyek ini merupakan bagian dari proyek kelompok sekolah kami, yang terdiri dari 5 orang siswa dari kelas yang sama (kelas 11 Teknik Komputer dan Jaringan) yang bernama CV. DR2E.

Artikel berbasis web tentang [Sekolah Menengah Kejuruan Sukamandi][ski-instagram].  
Proyek ini dimiliki oleh **CV. DR2E** dan berada di bawah ketentuan lisensi sumber terbuka ([**&ldquo;MIT License&rdquo;**][mit-license]), yang dikembangkan oleh dua orang dari grup ini,
yaitu [**Ryuu Mitsuki**][mitsuki31] dan [**Nuryadani**]. Project ini dirancang oleh [**Ryuu Mitsuki**][mitsuki31] dan dibantu oleh **Nuryadani** untuk bagian desain dan penulisan artikel.

Organisasi atau kelompok ini terdiri dari:

- **Dhefa Gusni A.** (_juga dikenal sebagai_, [**Ryuu Mitsuki**][mitsuki31])
- **Nuryadani**
- **Elga Dera D.**
- **Ryan Prasetyo**
- [**Rio Anandang J.**](https://instagram.com/yhoanandang)

Pembuatan proyek ini juga diarahkan oleh Indra Baskara ([@indrabaskara10][baskara-instragram]), juga selaku guru kami, dan teman-teman kami yang mendukung kami dalam pembuatan proyek ini.

## <a name="development-usage"/> 🚧 Penggunaan Pengembangan

> [!IMPORTANT]
> 
> **HANYA UNTUK PENGGUNAAN PENGEMBANGAN!** Silahkan lihat terlebih dahulu persyaratan dibawah sebelum melanjutkan untuk mengembangkan dan menyiapkan proyek ini.
> 
> **Persyaratan:**  
> - Windows 8 (Direkomendasikan: Windows 10)
>   > Jika kamu menggunakan sistem seperti Unix, pertimbangkan untuk memperbarui sistem operasi ke yang terbaru.
> - [Git Windows](https://git-scm.com/download/win) (Hanya untuk Windows)
> - [Node.js](nodejs-homepage) (Versi min. 16.20.2)

### <a name="npm-commands"/> 🔑 Perintah `npm`

| Nama | Deskripsi | Perintah yang Dibutuhkan |
| ---- | ----------- | -------- |
| `start` | Memulai server. Sebelum memulai server, ia akan mencari file CSS utama di direktori 'build' dan kemudian menyalinnya ke sisi klien. Jika tidak ada argumen yang diberikan, server akan berjalan di `localhost`. Lihat '[Menyiapkan Server](#setting-up-the-server)'. | _None_ |
| `start:dry` | Only searches and copies the main CSS file, and does not runs the server. Useful for debugging. | _None_ |
| `build` | Transpiles all TypeScript files, and then compiles all SCSS files. All output files are stored in 'build' directory. | `build:js`, `build:css` |
| `build:js` | Transpiles all TypeScript files and stores all outputs in 'build' directory. | _None_ |
| `build:css` | Compiles all SCSS file and stores all outputs in 'build' directory. | _None_ |
| `build:docs` | Builds and generates [JSDoc](https://jsdoc.app) documentation. All outputs stored in 'docs' directory. | _None_ |
| `lint` | Invokes the [ESLint][eslint] linter. | _None_ |
| `lint:fix` | Invokes the [ESLint][eslint] linter and then fix all errors and warnings if fixable. | _None_ |
| `lint:ci` | Invokes the [ESLint][eslint] linter but use cache to speed up linting. | _None_ |
| `test` | Runs the test by invoking [Jest][jest]. All tests are written in Jest and TypeScript. | _None_ |

### <a name="install-necessary-dependencies"/> 🧩 Instal Dependensi yang Diperlukan
  ```bash
  # Pastikan variabel environment NODE_ENV telah disetel ke 'development'
  NODE_ENV="development" npm install
  ```

### <a name="build-the-project"/> 🪄 Bangun Proyek

  ```bash
  npm run build
  ```
  > [!NOTE]
  > 
  > Perintah ini akan mentranspilasi semua file TypeScript di direktori 'src' lalu
  > mengkompilasi file SCSS. Semuanya akan disimpan pada direktori 'build'.

### <a name="run-the-server"/> ⚡ Jalankan Server

  ```bash
  # Tidak memberikan argumen apapun akan membuat server berjalan
  # pada localhost dengan port default.
  npm start
  ```

Setelah melakukan cara-cara diatas secara benar, server akan berjalan di alamat URL yang telah ditentukan (alamat URL ini akan muncul pada layar terminal setelah menjalankan server).
Buka browser dan buka alamat yang diberikan untuk melihat halaman web nya.

#### <a name="setting-up-the-server"/> 🪛 Menyiapkan Server

Kamu juga dapat mengubah alamat host dan port sesuai kebutuhan.

- Menggunakan argumen baris perintah

  ```bash
  # Alamat host di argumen ketiga (setelah `start`),
  # sementara untuk port setelahnya
  npm start <host> <port>
  ```

- Menggunakan variabel environment

  ```bash
  HOST="<host>" PORT="<port>" npm start
  ```
  > Nama variabelnya harus sama seperti contoh di atas,
  > yakni, `HOST` untuk mengindikasikan alamat host dan `PORT` untuk mengindikasikan port.

Sebagai contoh, anggap saja kita ingin menjalankan server menggunakan IP dengan alamat IP `172.15.2.120`, dan `7800` sebagai port.

```bash
npm start 172.15.2.120 7800
# ...
# Server is running at 'http://172.15.2.120:7800'
```

> Kode diatas ekuivalen dengan kode berikut:
> ```bash
> HOST=172.15.2.120 PORT=7800 npm start
> ```

### <a name="test"/> 🧪 Tes

Seluruh tes ditulis menggunakan [Jest][jest].

```bash
npm test
```

## <a name="license"/> Lisensi

Berlisensi di bawah [MIT License][mit-license]. Untuk rincian lebih lanjut tentang lisensi, lihat file [LICENSE](./LICENSE).

[↑ Pergi ke atas](#top)

<!-- Links -->
[mitsuki31]: https://github.com/mitsuki31
[mit-license]: https://opensource.org/license/mit
[ski-instagram]: https://instagram.com/smksukamandi.72
[baskara-instragram]: https://instagram.com/indrabaskara10
[nodejs-homepage]: https://nodejs.org
[jest]: https://jestjs.io
[eslint]: https://eslint.org
