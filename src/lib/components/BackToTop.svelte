<script>
    import { fly, fade } from 'svelte/transition';
    
    let showButton = false;
    const scrollThreshold = 400; // Show after 400px of scrolling

    function handleScroll() {
        showButton = window.scrollY > scrollThreshold;
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
</script>

<svelte:window on:scroll={handleScroll} />

{#if showButton}
    <button
        on:click={scrollToTop}
        in:fly={{ y: 20, duration: 400 }}
        out:fade={{ duration: 200 }}
        class="fixed bottom-8 right-8 z-[9999] group flex items-center justify-center w-14 h-14 bg-white/90 backdrop-blur-sm border-2 border-pink-100 rounded-full shadow-lg shadow-pink-100/50 hover:shadow-pink-200 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Back to top"
    >
        <div class="absolute inset-0 bg-[#FFF0F3] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <svg 
            class="w-6 h-6 text-[#8B5E51] group-hover:text-[#D81B60] relative z-10 transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            stroke-width="3"
        >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
{/if}