<script lang="ts">
    const metadata = {
        title: "Image Optimization Guides | Mochify",
        description: "Learn about modern image formats, compression techniques, and optimization strategies with our in-depth guides."
    };

    const guides = [
        {
            title: "Fuji HIF Files Explained: How to Convert X‑T5 / X‑H2 / X100VI / X‑T50 HIF to JPEG",
            description: "Fuji's HIF files are highly efficient and better quality at 10-bit but they're not supported everywhere, which can lead to frustration. Learn how to convert your camera's .HIF files to JPGs",
            url: "/guides/fujifilm-hif-to-jpg",
            category: "Image Formats",
            readTime: "5 min read",
            date: "Feb 01, 2026"
        },
        {
            title: "Privacy & Image Optimization: A Comprehensive Guide (2026)",
            description: "Learn how to keep your images secure with zero-retention optimization. The only way to ensure 100% data privacy in 2026 while still getting fast, high-quality compression.",
            url: "/guides/privacy-image-optimization",
            category: "Data Privacy",
            readTime: "6 min read",
            date: "Feb 05, 2026"
        },
        {
            title: "Fix \"Next-Gen Formats\" in WordPress (No Plugins) & Boost LCP",
            description: "Boost LCP on your WordPress site by fixing \"Serve images in next-gen formats\" without plugins. A simple, plugin-free workflow for pre-optimizing images with Mochify before uploading to WordPress.",
            url: "/guides/next-gen-image-formats-wordpress",
            category: "WordPress Performance",
            readTime: "15 min read",
            date: "Feb 09, 2026"
        },
        {
            title: "The 2026 Guide to Next-Gen Formats: WebP, AVIF, and JPEG XL",
            description: "Your 2MB JPEG homepage hero is killing your LCP score. Google's PageSpeed Insights keeps screaming \"Serve images in next-gen formats,\" but which one should you actually use? WebP has been around since 2010, AVIF promises 50% better compression, and JPEG XL keeps showing up in conversations despite near-zero browser support.",
            url: "/guides/2026-guide-next-gen-formats",
            category: "Image Formats",
            readTime: "10 min read",
            date: "Feb 07, 2026"
        },
        {
            title: "Jpegli Guide 2026: Why Jpegli Changes the Quality-Per-Byte Game",
            description: "Boost eBay & Etsy sales with Jpegli. Get 35% better compression than MozJPEG with no quality loss. Master chroma & workflows via Mochify's encoder.",
            url: "/guides/jpeg-in-2026-jpegli",
            category: "Image Optimization",
            readTime: "7 min read",
            date: "Feb 09, 2026"
        }
    ];
    guides.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
</script>

<svelte:head>
    <title>{metadata.title}</title>
    <meta name="description" content={metadata.description}>
</svelte:head>
        
<header class="text-center mb-16">
    <h1 class="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#FFB3C6] via-[#E0ACD5] to-[#C5A3E0] bg-clip-text text-transparent leading-tight pb-2 mb-6">
        Image Optimization Guides
    </h1>
    <p class="text-xl text-[#875F42] font-medium max-w-2xl mx-auto">
        In-depth articles about modern image formats, compression techniques, and best practices for web performance.
    </p>
</header>

<div class="grid gap-8 mb-24">
    {#each guides as guide}
        <a href={guide.url} class="group block bg-white rounded-3xl p-8 border border-pink-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 no-underline">
            <span class="inline-block px-3 py-1 rounded-full bg-pink-50 text-pink-500 text-xs font-bold uppercase tracking-wider mb-4">
                {guide.category}
            </span>
    
            <h2 class="text-2xl md:text-3xl font-black text-[#4A2C2C] group-hover:text-[#F06292] transition-colors mb-3">
                {guide.title}
            </h2>
            
            <p class="text-[#875F42] leading-relaxed mb-6 opacity-80">
                {guide.description}
            </p>
            
            <div class="flex items-center justify-between text-xs font-bold text-[#875F42]/60 pt-6 border-t border-pink-50">
                <span>{guide.date} · {guide.readTime}</span>
                <span class="text-[#F06292] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide →
                </span>
            </div>
        </a>
    {/each}
</div>

<div class="bg-white p-10 rounded-3xl border border-pink-50 shadow-sm text-center space-y-6">
    <h3 class="text-2xl font-black text-[#4A2C2C]">Ready to squish some images?</h3>
    <p class="text-[#875F42] max-w-md mx-auto">
        Try our native C++ engine for instant Jpegli, AVIF, and WebP compression.
    </p>
    <a href="/" class="inline-flex items-center gap-2 px-10 py-4 bg-[#F06292] hover:bg-[#ec407a] text-white font-black rounded-2xl shadow-lg hover:-translate-y-1 transition-all duration-300 no-underline">
        Start Optimizing Now
    </a>
</div>
