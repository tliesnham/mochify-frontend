<script lang="ts">
    import ImageUpload from '$lib/components/ImageUpload.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Navigation from '$lib/components/Navigation.svelte';
    
    // Simple state for FAQ toggles if needed, 
    // but <details> works natively without JS overhead!
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
    
    <div class="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjgiIGZpbGw9InJnYmEoMjU1LDI0MCwyNDMsMC4zKSIvPjwvZz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>


    <Navigation />
    <main class="relative z-10 flex-grow w-full max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        <header class="text-center mb-16">
            <div class="flex flex-col items-center gap-2 mb-4">
                <h1 class="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#FFB3C6] via-[#E0ACD5] to-[#C5A3E0] bg-clip-text text-transparent leading-tight text-center drop-shadow-sm pb-2">
					Mochify <br>
					<span class="text-3xl md:text-4xl text-[#FF8FA3] font-bold">Sustainable Image Vault</span>
				</h1>
            </div>
            
            <p class="mt-4 text-base text-[#6C3F31] max-w-2xl mx-auto leading-relaxed">
				No more 5MB limits. Compress <strong class="text-[#7E685E]">25 images (20MB each)</strong> at once with our <strong class="text-[#7E685E]">native C++ engine</strong>. 
				Get next-gen <strong class="text-[#7E685E]">Jpegli</strong>, <strong class="text-[#7E685E]">AVIF</strong>, and <strong class="text-[#7E685E]">JPEG XL</strong> – smaller files, same quality, instant results.
			</p>

            <div class="flex flex-wrap justify-center gap-4 mt-8">
    
                <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE5F0] shadow-sm text-[#BE185D] text-sm font-bold border border-pink-100">
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

        <ImageUpload />

       <div class="my-16 max-w-3xl mx-auto">
    <div class="text-center mb-6">
        <h3 class="text-xl font-bold text-[#6C3F31]">Real-World Efficiency</h3>
        <p class="text-sm text-[#9C7A6F]">
            Our C++ engine proves you don't always need new formats to get small files.
        </p>
    </div>
    
    <div class="overflow-hidden rounded-3xl border border-pink-50 shadow-sm bg-white">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-[#FFF5F7] border-b border-pink-100">
                        <th class="py-4 px-6 text-xs font-black text-[#875F42] uppercase tracking-wider">Optimization</th>
                        <th class="py-4 px-6 text-xs font-black text-[#875F42] uppercase tracking-wider">Efficiency</th>
                        <th class="py-4 px-6 text-xs font-black text-[#875F42] uppercase tracking-wider text-right">Result</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-pink-50 text-[#6C3F31]">
                    
                    <tr class="group hover:bg-[#FFF9FB] transition-colors duration-200">
                        <td class="py-4 px-6">
                            <div class="flex items-center gap-3">
                                <span class="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">JPG</span>
                                <div>
                                    <span class="font-bold text-sm block">Jpegli Re-encode</span>
                                    <span class="text-[10px] text-gray-500 font-medium">100% Compatibility</span>
                                </div>
                            </div>
                        </td>
                        <td class="py-4 px-6">
                            <div class="flex items-center gap-2">
                                <div class="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                                    <div class="h-full bg-blue-500 w-[94%]"></div>
                                </div>
                                <span class="text-xs font-bold text-blue-600">-94%</span>
                            </div>
                        </td>
                        <td class="py-4 px-6 text-right font-mono text-sm">
                            <span class="text-gray-400 line-through mr-2">12MB</span>
                            <span class="font-bold text-[#6C3F31]">710KB</span>
                        </td>
                    </tr>

                    <tr class="group hover:bg-[#FFF9FB] transition-colors duration-200">
                        <td class="py-4 px-6">
                            <div class="flex items-center gap-3">
                                <span class="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded">AVIF</span>
                                <div>
                                    <span class="font-bold text-sm block">Convert to AVIF</span>
                                    <span class="text-[10px] text-gray-500 font-medium">Modern Browsers</span>
                                </div>
                            </div>
                        </td>
                        <td class="py-4 px-6">
                            <div class="flex items-center gap-2">
                                <div class="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                                    <div class="h-full bg-purple-500 w-[90%]"></div>
                                </div>
                                <span class="text-xs font-bold text-purple-600">-90%</span>
                            </div>
                        </td>
                        <td class="py-4 px-6 text-right font-mono text-sm">
                            <span class="text-gray-400 line-through mr-2">12MB</span>
                            <span class="font-bold text-[#6C3F31]">1.1MB</span>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</div>

        <section class="mt-20 max-w-4xl mx-auto">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="space-y-4">
                    <h3 class="text-2xl font-bold">The Engineering</h3>
                    <p class="leading-relaxed">
                        Most online compressors run on slow interpreted scripts. Mochify runs on a custom C++20 engine directly on the server hardware, so we can handle much larger files (up to 20 MB) and return downloads almost instantly.
                    </p>
                    <ul class="space-y-2 mt-2">
                        <li class="flex items-center gap-3">
                            <div class="flex-1 flex flex-wrap items-center gap-2">
                                <span class="font-semibold mr-1">Jpegli compression</span>
                                <span>Up to 35% smaller files than standard JPEG at similar visual quality.</span>
                            </div>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="flex-1 flex flex-wrap items-center gap-2">
                                <span class="font-semibold mr-1">Parallel processing</span>
                                <span>Compress up to 25 images at the same time.</span>
                            </div>
                        </li>
                    </ul>
                </div>
                
               <div class="grid md:grid-cols-1 gap-4">
                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-pink-50 hover:shadow-md transition-shadow">
                        <div class="flex items-center gap-3 mb-2">
                        <svg class="text-[#F06292] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        <h3 class="font-bold text-[#4A2C2C] text-lg">Privacy by Design</h3>
                        </div>
                        <p class="text-[#6C3F31] text-sm leading-relaxed opacity-90">
                        Your images never touch a hard drive. They are streamed into RAM, compressed, and wiped instantly.
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-pink-50 hover:shadow-md transition-shadow">
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

    <div class="mt-32 md:mt-40">
        <Footer />
    </div>

</div>