<script lang="ts">
    import Navigation from '$lib/components/Navigation.svelte';
    import Footer from '$lib/components/Footer.svelte';
    const tools = [
        {
            name: "eBay Image Converter",
            slug: "solutions/ebay-image-converter",
            desc: "Fix 'file not supported' errors and stay under the 12MB limit.",
            icon: "📦",
            theme: "from-blue-500 to-blue-600",
            tag: "Marketplace"
        },
        {
            name: "HEIC to JPEG",
            slug: "heic-to-jpeg",
            desc: "Instant iPhone photo conversion for universal compatibility.",
            icon: "📸",
            theme: "from-pink-500 to-purple-500",
            tag: "Mobile"
        },
        {
            name: "JPEG XL Optimizer",
            slug: "jpg-to-jpegxl",
            desc: "The future of the web. Best-in-class compression for 2026.",
            icon: "⚡",
            theme: "from-purple-500 to-indigo-500",
            tag: "Experimental"
        },
        {
            name: "AVIF Compressor",
            slug: "avif-to-jpegxl",
            desc: "Next-gen image format with superior compression and quality.",
            icon: "🖼️",
            theme: "from-green-500 to-teal-500",
            tag: "Next-Gen"
        },
        {
            name: "HIF to JPG Converter",
            slug: "solutions/hif-to-jpg",
            desc: "Convert Fuji, Canon & Sony HIF photos to universally compatible JPEGs.",
            icon: "📷",
            theme: "from-pink-500 to-blue-500",
            tag: "Photography"
        },
        {
            name: "AVIF to JPG Converter",
            slug: "avif-to-jpg",
            desc: "Turn modern AVIF files into high-quality JPEGs that work with every app and device on the planet.",
            icon: "🖼️",
            theme: "from-green-500 to-teal-500",
            tag: "Web"
        }
    ];
</script>

<svelte:head>
    <title>Mochify Solutions | Compare & Choose the Best Image Optimizer</title>
    <meta name="description" content="Compare specialized image tools for eBay, iPhone (HEIC), and next-gen web formats. Find the perfect balance between file size and quality for your specific platform.">
    <script type="application/ld+json">
        {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Mochify Image Optimization Tools",
        "description": "A collection of specialized image converters and optimizers for eBay, mobile, and web performance.",
        "itemListElement": [
            {
            "@type": "ListItem",
            "position": 1,
            "name": "eBay Image Converter",
            "url": "https://mochify.xyz/solutions/ebay-image-converter"
            },
            {
            "@type": "ListItem",
            "position": 2,
            "name": "HEIC to JPEG Converter",
            "url": "https://mochify.xyz/heic-to-jpeg"
            },
            {
            "@type": "ListItem",
            "position": 3,
            "name": "AVIF Compressor",
            "url": "https://mochify.xyz/avif-to-jpegxl"
            },
            {
            "@type": "ListItem",
            "position": 4,
            "name": "JPEG XL Optimizer",
            "url": "https://mochify.xyz/jpg-to-jpegxl"
            },
            {
            "@type": "ListItem",
            "position": 5,
            "name": "HIF to JPG Converter",
            "url": "https://mochify.xyz/solutions/hif-to-jpg"
            }
        ]
        }
    </script>
</svelte:head>
<div class="flex-1 bg-[#FDFBF7] selection:bg-[#FFF0F3] selection:text-pink-900 min-h-screen flex flex-col relative">
    <Navigation />
    
    <div class="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiIGZpbGw9InJnYmEoMjQwLCA5OCwgMTQ2LCAwLjA1KSIvPjwvZz48L3N2Zz4=')] pointer-events-none"></div>

    <div class="relative max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full flex-grow">
        
        <div class="text-center mb-16 space-y-4">
            <h1 class="text-5xl md:text-6xl font-black text-[#4A2C2C] tracking-tight">
                Specialized <span class="text-[#F06292]">Solutions</span>
            </h1>
            <p class="text-xl text-[#875F42] font-medium max-w-2xl mx-auto leading-relaxed">
                Tailored workflows for your specific platform needs. Faster. Smaller. Cuter.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {#each tools as tool}
                <a 
                    href="/{tool.slug}"
                    class="group bg-white p-8 rounded-2xl border border-pink-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                    <div class="flex justify-between items-start mb-6">
                        <div class="text-4xl group-hover:scale-110 transition-transform duration-300">
                            {tool.icon}
                        </div>
                        <span class="px-3 py-1 rounded-xl bg-[#F1F8E9] text-[#33691E] text-[10px] font-black uppercase tracking-widest border border-[#DCEDC8]">
                            {tool.tag}
                        </span>
                    </div>

                    <h2 class="text-xl font-black text-[#4A2C2C] mb-3 group-hover:text-[#F06292] transition-colors">
                        {tool.name}
                    </h2>
                    <p class="text-sm text-[#6C3F31] leading-relaxed mb-6 opacity-90">
                        {tool.desc}
                    </p>

                    <div class="mt-auto flex items-center gap-2 text-xs font-black text-[#F06292] uppercase tracking-wider">
                        Open Tool
                        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                            <path d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </div>
                </a>
            {/each}
        </div>

        <div class="mt-32 space-y-16">
            <div class="text-center space-y-4">
                <h2 class="text-3xl font-black text-[#4A2C2C]">
                    Why Image Speed is your <span class="text-[#F06292]">Secret Weapon</span>
                </h2>
                <div class="w-16 h-1 bg-pink-100 mx-auto rounded-full"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-2xl border border-pink-50 shadow-sm">
                    <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-2xl mb-6">📏</div>
                    <h3 class="text-lg font-bold text-[#4A2C2C] mb-3">The 2.5s Benchmark</h3>
                    <p class="text-sm text-[#6C3F31] leading-relaxed opacity-80">
                        Google uses <strong class="text-[#875F42]">LCP</strong> to measure speed. Optimizing your "Hero" image is the fastest way to hit the 2.5s target.
                    </p>
                </div>

                <div class="bg-white p-8 rounded-2xl border border-pink-50 shadow-sm">
                    <div class="w-12 h-12 bg-pink-50 text-[#F06292] rounded-xl flex items-center justify-center text-2xl mb-6">💰</div>
                    <h3 class="text-lg font-bold text-[#4A2C2C] mb-3">Stop the "Bounce"</h3>
                    <p class="text-sm text-[#6C3F31] leading-relaxed opacity-80">
                        Even a 1-second delay can drop conversions by 7%. Keep your customers happy with instant loads.
                    </p>
                </div>

                <div class="bg-white p-8 rounded-2xl border border-pink-50 shadow-sm">
                    <div class="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center text-2xl mb-6">📱</div>
                    <h3 class="text-lg font-bold text-[#4A2C2C] mb-3">Mobile-First Reality</h3>
                    <p class="text-sm text-[#6C3F31] leading-relaxed opacity-80">
                        Lightweight <strong class="text-[#875F42]">AVIF</strong> and <strong class="text-[#875F42]">WebP</strong> ensure your site stays fast even on slow cellular networks.
                    </p>
                </div>
            </div>
        </div>

        <div class="mt-24 text-center">
            <a href="/" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FFF5F7] text-[#F06292] font-black hover:bg-pink-50 transition-all active:scale-95 border border-pink-100 shadow-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                Back to Optimizer
            </a>
        </div>
    </div>
    <Footer />
</div>