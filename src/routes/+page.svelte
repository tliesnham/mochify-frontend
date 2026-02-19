<script lang="ts">
    import { onMount } from 'svelte';
    import ImageUpload from '$lib/components/ImageUpload.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Navigation from '$lib/components/Navigation.svelte';

    let fileCount = 0;
    let fileSizeMB = 0;

    function animateCount(from: number, to: number, duration: number, setter: (v: number) => void) {
        const start = performance.now();
        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setter(Math.round(from + (to - from) * eased));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    onMount(() => {
        // Start hero counters shortly after mount
        const t = setTimeout(() => {
            animateCount(0, 25, 1100, v => (fileCount = v));
            animateCount(0, 20, 900,  v => (fileSizeMB = v));
        }, 400);

        // Scroll-triggered reveal
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        return () => {
            clearTimeout(t);
            observer.disconnect();
        };
    });
</script>

<svelte:head>
    <title>Mochify | Free Bulk 500MB Image Compressor (Jpegli, AVIF, WebP)</title>
    <meta name="description" content="Free bulk image compressor for WebP, HEIC, JXL & AVIF. Mochify handles 25 files at once up to 20MB each with no quality loss. Fast, private, and Shopify ready.">

    <meta property="og:type" content="website">
    <meta property="og:url" content="https://mochify.xyz/">
    <meta property="og:title" content="Mochify - The 'Heavy Duty' Image Optimizer">
    <meta property="og:description" content="Don't get stuck with 5MB limits. Compress up to 500MB of images in seconds using our native C++ engine. Jpegli & AVIF supported.">
    <meta property="og:image" content="https://mochify.xyz/screenshot_v2.png"> <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Mochify | High-Speed Bulk Image Optimizer">
    <meta name="twitter:description" content="Secure, in-memory optimization with native C++ speed. Supports JXL, AVIF, and WebP with a 500MB bulk upload capacity.">
    
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Mochify",
            "alternateName": "Mochify Image Optimizer",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "featureList": [
                "20MB per-file upload limit",
                "Bulk processing for up to 25 images (500MB Total)",
                "Advanced Jpegli encoding for 35% better ratios",
                "Native C++ Drogon backend (No WASM lag)",
                "Privacy-first: RAM-only processing"
            ],
            "fileFormat": ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jxl"]
        }
    </script>
</svelte:head>

<div class="min-h-screen bg-[#FDFBF7] selection:bg-[#FFF0F3] selection:text-pink-900 flex flex-col relative">
    
    <!-- Animated background orbs -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div class="animate-float absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-pink-200/20 blur-[80px]"></div>
        <div class="animate-float-slow absolute -bottom-56 -left-40 w-[600px] h-[600px] rounded-full bg-rose-100/15 blur-[100px]"></div>
        <div class="animate-float absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full bg-pink-50/20 blur-[70px]"></div>
    </div>


    <Navigation />
    <main class="relative z-10 flex-grow w-full max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        <header class="text-center mb-16">
            <div class="flex flex-col items-center gap-4 mb-6">
                <h1 class="text-5xl md:text-7xl font-black text-[#4A2C2C] leading-tight">
                    Mochify
                </h1>
                <h2 class="shimmer-text text-2xl md:text-3xl font-extrabold tracking-tight">
                    Zero-Retention Image Optimization
                </h2>
            </div>
            
            <p class="mt-6 text-[#6C3F31] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
				No more 5MB limits. Compress
				<strong>
					<span class="font-black text-[#F06292]">{fileCount}</span> images
					(<span class="font-black text-[#F06292]">{fileSizeMB}MB</span> each)
				</strong>
				at once with our <strong>native C++ engine</strong>.
				Get next-gen <strong>Jpegli</strong>, <strong>AVIF</strong>, and <strong>JPEG XL</strong> – smaller files, same quality, instant results.
			</p>

            <div class="flex flex-wrap justify-center gap-4 mt-8">
    
                <span class="pulse-glow inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE5F0] shadow-sm text-[#BE185D] text-sm font-bold border border-pink-100">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    No Storage (RAM Only)
                </span>

                <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5E9] shadow-sm text-[#15803d] text-sm font-bold border border-green-100">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clip-rule="evenodd"/>
                    </svg>
                    Low Carbon Architecture
                </span>

            </div>
        </header>

        <ImageUpload showSmartMode={true} />

        <section class="mt-20 max-w-4xl mx-auto reveal">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="space-y-6">
                    <div>
                        <h3 class="text-2xl font-bold text-[#4A2C2C] mb-3">The Engineering</h3>
                        <p class="leading-relaxed text-[#6C3F31]">
                            Most online compressors run on slow interpreted scripts. Mochify runs on a custom C++20 engine directly on the server hardware, so we can handle much larger files (up to 20MB) and return downloads almost instantly.
                        </p>
                    </div>

                    <ul class="space-y-3">
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-[#F06292] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <div>
                                <span class="font-semibold text-[#4A2C2C]">Jpegli compression</span>
                                <span class="text-[#6C3F31]"> — Up to 35% smaller files than standard JPEG at similar visual quality</span>
                            </div>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-[#F06292] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <div>
                                <span class="font-semibold text-[#4A2C2C]">Parallel processing</span>
                                <span class="text-[#6C3F31]"> — Compress up to 25 images simultaneously</span>
                            </div>
                        </li>
                    </ul>
                </div>
                
               <div class="grid md:grid-cols-1 gap-4">
                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-pink-50 hover:shadow-md hover:border-pink-100 transition-all duration-300" style="transition-delay: 0.1s">
                        <div class="flex items-center gap-3 mb-2">
                        <svg class="text-[#F06292] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        <h3 class="font-bold text-[#4A2C2C] text-lg">Privacy by Design</h3>
                        </div>
                        <p class="text-[#6C3F31] text-sm leading-relaxed opacity-90">
                        Your images never touch a hard drive. They are streamed into RAM, compressed, and wiped instantly.
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-pink-50 hover:shadow-md hover:border-pink-100 transition-all duration-300" style="transition-delay: 0.2s">
                        <div class="flex items-center gap-3 mb-2">
                        <svg class="text-[#F06292] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <h3 class="font-bold text-[#4A2C2C] text-lg">Pro Formats Free</h3>
                        </div>
                        <p class="text-[#6C3F31] text-sm leading-relaxed opacity-90">
                        Convert to next-gen formats like AVIF and JXL for free. No "Pro" account required.
                        </p>
                    </div>
                </div>
            </div>
            
        </section>
    </main>

    <div class="mt-16 md:mt-40">
        <Footer />
    </div>

</div>