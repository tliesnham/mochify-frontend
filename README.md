# Mochify Frontend

### **The Stateless Image Vault**
**Privacy-First • Hardware-Hardened • Green C++ Engine**

![License](https://img.shields.io/badge/License-MIT-green) ![Svelte](https://img.shields.io/badge/Svelte-5-orange) ![Security](https://img.shields.io/badge/Security-Auditable-blue) ![Analytics](https://img.shields.io/badge/Analytics-Cookie--Free-purple) ![Docker Pulls](https://img.shields.io/docker/pulls/mochify/mochify-lite?color=blue)

Mochify is a high-performance image processing utility built for 2026 privacy standards. Unlike traditional "Cloud" converters that buffer images to disk and leak data to swap files, Mochify uses a **Stateless C++ Engine** to ensure your pixels never touch a permanent storage medium.

[🚀 Launch App (mochify.xyz)](https://mochify.xyz)

---

## 🔒 The Translucent Privacy Model

We believe in **Trust through Transparency**. This frontend repository is open-source so you can verify exactly how your data is handled before it leaves your browser.

* **Public UI (SvelteKit + Cloudflare):** Auditable code. No hidden trackers. No third-party ad networks.
* **Private Vault (C++):** A proprietary, hardware-locked engine running on native Linux kernel primitives to guarantee data volatility.

### **Security Hardening**
Mochify isn't just "private"; it's **physically incapable** of retaining data.

* **Volatile RAM Only:** We strictly prevent temporary file creation and disable container swap, guaranteeing your images are buffered fully in volatile RAM and wiped instantly.
* **Zero-Buffer Streaming:** Request buffering is disabled. Data streams directly from the user's TLS connection into the C++ process's L3 cache.
* **Strict CSP:** This frontend implements a rigid Content Security Policy (`connect-src`) that physically prevents the browser from sending data to any domain other than our verified API.

### **Analytics Disclosure**
We value privacy, but we also need to know if our site is online.
* We use **Self-Hosted Umami Analytics**.
* It is **Cookie-Free**, GDPR-compliant, and anonymized.
* All analytics data is stored on our own infrastructure. We **do not** share traffic data with Google, Facebook, or any advertising networks.

---

## 🌿 Eco-Friendly High Performance

Mochify is built with **Native C++** and `libvips`. By ditching heavy interpreted runtimes (Python/Node.js), we achieve:

* **50x Better Energy Efficiency:** Native code consumes significantly less electricity per megapixel than standard APIs.
* **Low Latency:** Average internal processing time is ~822ms, outperforming industry giants by removing the Disk I/O bottleneck.

---

## 🛠️ Developing

This project is built with **Svelte 5** and **TailwindCSS**, configured for deployment on **Cloudflare Pages**.

### **Prerequisites**
* Node.js 20+
* npm / pnpm

### **Getting Started**

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/tliesnham/mochify-frontend.git
    cd mochify-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory.

    > **⚠️ Note:** The production API (`api.mochify.xyz`) enforces strict CORS and Referrer checks. It will **reject** requests from `localhost`. To test the frontend locally, please point to a mock server.

    ```env
    # Example for local development
    PUBLIC_API_URL=http://localhost:3000
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    # or open immediately in browser
    npm run dev -- --open
    ```

### **Building for Production**
To create a production build (using `@sveltejs/adapter-cloudflare`):

```bash
npm run build
```

## 📦 Self-Hosted Infrastructure

While this frontend is open-source for auditability, the **Mochify Lite** engine is available as a hardened Docker image for developers who want to run their own private image-optimization infrastructure.

* **Docker Hub:** [mochify/mochify-lite](https://hub.docker.com/r/mochify/mochify-lite)
* **Hardening:** Includes the same RAM-only, zero-persistence configuration used by our production API.
* **Compatibility:** Multi-arch support for `amd64` and `arm64` (Apple Silicon/AWS Graviton).

```bash
docker pull mochify/mochify-lite:latest
