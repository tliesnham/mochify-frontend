<script lang="ts">
    import ImageUpload from '$lib/components/ImageUpload.svelte';
</script>

<svelte:head>
    <title>Fix eBay "Unsupported File" Error | HEIC to JPEG Converter</title>
    <meta name="description" content="Stop eBay upload rejections. Instantly convert iPhone HEIC photos to JPEG and compress images under 12MB with our secure C++ engine.">
    <meta property="og:title" content="eBay Image Compressor - Optimize Photos for Listings">
    <meta property="og:description" content="The fastest way to compress large DSLR photos for eBay.">
    
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@graph": [
                {
                "@type": "SoftwareApplication",
                "name": "Mochify eBay Compressor",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Web Browser",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "featureList": "Compress JPEG, Resize for eBay, Bulk Optimization, Remove Metadata"
                },
                {
                "@type": "HowTo",
                "name": "How to Fix eBay Unsupported File Errors from iPhone",
                "description": "Convert iPhone HEIC photos to eBay-compatible JPEGs and compress them under 12MB.",
                "step": [
                    {
                    "@type": "HowToStep",
                    "name": "Transfer Photos",
                    "itemListElement": [{
                        "@type": "HowToDirection",
                        "text": "Move photos from iPhone to PC/Mac via AirDrop or USB."
                    }]
                    },
                    {
                    "@type": "HowToStep",
                    "name": "Convert with Mochify",
                    "itemListElement": [{
                        "@type": "HowToDirection",
                        "text": "Drag HEIC files into the tool to convert to JPEG."
                    }]
                    },
                    {
                    "@type": "HowToStep",
                    "name": "Upload to eBay",
                    "itemListElement": [{
                        "@type": "HowToDirection",
                        "text": "Download the JPEGs and add them to your listing."
                    }]
                    }
                ]
                }
            ]
        }
    </script>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-gray-100">
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjA1KSIvPjwvc3ZnPg==')] opacity-40"></div>

    <div class="relative max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
            <h1 class="text-4xl sm:text-5xl font-black text-slate-800 mb-4 tracking-tight">
                eBay <span class="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Image Compressor</span>
            </h1>
            <p class="text-xl text-slate-600 font-light max-w-2xl mx-auto">
                Reduce file size without losing quality. Fix <strong>"Image is too large"</strong> errors and make your listings load faster.
            </p>
            
            <div class="mt-6 flex flex-wrap justify-center gap-3">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    Fixes iPhone HEIC
                </span>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    Fast Loading
                </span>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-700 text-sm font-semibold">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    Under 12MB
                </span>
            </div>
        </div>

       <ImageUpload types=".JPG, .JPEG, .HEIC, .HEIF, .HIF" showQuality={false} showTypes={false} theme="blue" compact />

        <div class="mt-20 mb-16 bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50">
            <h2 class="text-2xl font-bold text-slate-800 mb-8 text-center">
                3 Steps to Fix eBay "Unsupported File" Errors from iPhone
            </h2>
            
            <div class="grid sm:grid-cols-3 gap-8 relative">
                <div class="text-center relative z-10">
                    <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-200">1</div>
                    <h3 class="font-semibold text-slate-800 mb-2 text-sm uppercase tracking-wide">Transfer</h3>
                    <p class="text-slate-600 text-sm">
                        Move your photos from iPhone to your PC or Mac using <strong>AirDrop</strong> or a USB cable to keep full quality.
                    </p>
                </div>

                <div class="text-center relative z-10">
                    <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-200">2</div>
                    <h3 class="font-semibold text-slate-800 mb-2 text-sm uppercase tracking-wide">Fix Format</h3>
                    <p class="text-slate-600 text-sm">
                        Drag those "unsupported" <strong>.HEIC</strong> files into the Mochify tool above. We'll turn them into eBay JPEGs instantly.
                    </p>
                </div>

                <div class="text-center relative z-10">
                    <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-200">3</div>
                    <h3 class="font-semibold text-slate-800 mb-2 text-sm uppercase tracking-wide">List Fast</h3>
                    <p class="text-slate-600 text-sm">
                        Download your optimized files and upload them directly to your eBay listing. No more rejection errors!
                    </p>
                </div>
                
                <div class="hidden sm:block absolute top-6 left-0 w-full h-0.5 bg-slate-200 -z-0"></div>
            </div>
        </div>

        <div class="grid md:grid-cols-2 gap-8 text-slate-700 md:items-center">
            <div class="space-y-6">
                <div class="bg-white/60 p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all">
                    <h2 class="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        Why compress photos for eBay?
                    </h2>
                    <ul class="space-y-3 text-sm text-slate-600 leading-relaxed">
                        <li class="flex items-start gap-2">
                            <span class="text-green-500 font-bold">✓</span>
                            <span><strong>Faster Uploads:</strong> Don't wait minutes for 20MB files to upload to the listing tool.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-green-500 font-bold">✓</span>
                            <span><strong>Avoid Rejection:</strong> eBay has a hard limit of 12MB per file. We fix that instantly.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-green-500 font-bold">✓</span>
                            <span><strong>Better SEO:</strong> Listings with fast-loading images perform better in Cassini search.</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="space-y-4">
                <details class="group bg-white/60 p-6 rounded-3xl border border-white shadow-sm [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                    <summary class="flex items-center justify-between font-semibold text-slate-900">
                        Will my photos look pixelated?
                        <svg class="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <p class="mt-4 leading-relaxed text-slate-600 text-sm">
                        Not at all. We use Google's Jpegli encoding which removes invisible file data (metadata, unused color profiles) while keeping the visual quality high. Your customers won't see the difference, but the file size will be up to 70% smaller.
                    </p>
                </details>

                <details class="group bg-white/60 p-6 rounded-3xl border border-white shadow-sm [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                    <summary class="flex items-center justify-between font-semibold text-slate-900">
                        Can I upload in bulk?
                        <svg class="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <p class="mt-4 leading-relaxed text-slate-600 text-sm">
                        Yes. Select up to 25 images at once. We'll compress them all in your browser and give you a single ZIP file download, ready to drag-and-drop into your eBay listing.
                    </p>
                </details>
            </div>
        </div>

        <div class="mt-12 text-center border-t border-slate-200 pt-8">
            <div class="space-y-4 mb-10">
                <a 
                    href="https://ko-fi.com/Z8Z41T1651" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onclick={() => typeof window.umami !== 'undefined' && window.umami.track('kofi-click')}
                    class="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-full shadow-lg transition-all duration-300 group"
                >
                    <svg class="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"/>
                    </svg>
                    <span>Keep Mochify Free</span>
                </a>
                <p class="text-slate-400 text-sm">
                    Your files are never stored on a hard drive and are deleted instantly.
                </p>
            </div>

            <a href="/" class="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                Back to Home
            </a>
        </div>
    </div>
</div>