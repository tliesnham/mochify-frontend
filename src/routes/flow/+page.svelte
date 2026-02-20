<script lang="ts">
    import { tick } from 'svelte';
    import Navigation from '$lib/components/Navigation.svelte';
    import Footer from '$lib/components/Footer.svelte';

    let prompt: string = $state('');
    let files: File[] = $state([]);
    let isDragging: boolean = $state(false);
    let isProcessing: boolean = $state(false);
    let uploadProgress: number = $state(0);
    let result: string | null = $state(null);
    let error: string | null = $state(null);
    let textareaEl: HTMLTextAreaElement;
    let fileInputEl: HTMLInputElement;

    function autoGrow() {
        if (!textareaEl) return;
        textareaEl.style.height = 'auto';
        textareaEl.style.height = Math.min(textareaEl.scrollHeight, 200) + 'px';
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    }

    function handleDragOver(e: DragEvent) {
        e.preventDefault();
        isDragging = true;
    }

    function handleDragLeave(e: DragEvent) {
        e.preventDefault();
        if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
            isDragging = false;
        }
    }

    function handleDrop(e: DragEvent) {
        e.preventDefault();
        isDragging = false;
        const dropped = Array.from(e.dataTransfer?.files ?? []).filter(f => f.type.startsWith('image/'));
        files = [...files, ...dropped];
        tick().then(() => textareaEl?.focus());
    }

    function handleFileSelect(e: Event) {
        const input = e.target as HTMLInputElement;
        if (input.files) {
            files = [...files, ...Array.from(input.files)];
            input.value = '';
        }
    }

    function removeFile(i: number) {
        files = files.filter((_, idx) => idx !== i);
    }

    function useSuggestion(label: string) {
        prompt = label;
        tick().then(() => { autoGrow(); textareaEl?.focus(); });
    }

    async function submit() {
        if (!prompt.trim() || files.length === 0 || isProcessing) return;
        isProcessing = true;
        uploadProgress = 0;
        result = null;
        error = null;

        try {
            // ── Step 1: Get the configuration from the NLP endpoint ──
            const nlpForm = new FormData();
            nlpForm.append('prompt', prompt.trim());

            const nlpResponse = await fetch('https://api.mochify.xyz/v1/nlp/parse', {
                method: 'POST',
                headers: { 'Referer': 'http://mochify.xyz' },
                body: nlpForm
            });

            if (!nlpResponse.ok) {
                throw new Error(`Failed to understand prompt (Status: ${nlpResponse.status})`);
            }

            const parsedConfig = await nlpResponse.json();

            // ── Step 2: Build the payload for the squish endpoint ──
            const squishForm = new FormData();

            // Append parsed NLP rules (e.g., mapping boolean smartCompress to '1' or '0')
            if ('smartCompress' in parsedConfig) {
                squishForm.append('smartCompress', parsedConfig.smartCompress ? '1' : '0');
            }
            if ('type' in parsedConfig) {
                squishForm.append('type', parsedConfig.type);
            }
            
            // Catch-all loop just in case the NLP returns extra parameters like width, height, etc.
            for (const [key, value] of Object.entries(parsedConfig)) {
                if (key !== 'smartCompress' && key !== 'type') {
                    squishForm.append(key, String(value));
                }
            }

            // Append the actual image files 
            // Note: Make sure 'files' is the exact form-data key your Squish API expects!
            files.forEach(file => {
                squishForm.append('files', file); 
            });

            // ── Step 3: Send images to Squish and track progress ──
            const xhr = new XMLHttpRequest();

            // Upload progress (0 → 50%)
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    uploadProgress = Math.round((e.loaded / e.total) * 50);
                }
            });

            // Upload done → server is processing (50%)
            xhr.upload.addEventListener('load', () => {
                uploadProgress = 50;
            });

            xhr.addEventListener('load', () => {
                uploadProgress = 100;
                let data: unknown;
                try { data = JSON.parse(xhr.responseText); } catch { data = xhr.responseText; }

                if (xhr.status >= 200 && xhr.status < 300) {
                    result = typeof data === 'object' && data !== null
                        ? JSON.stringify(data, null, 2)
                        : String(data);
                } else {
                    error = typeof data === 'object' && data !== null && 'message' in (data as object)
                        ? String((data as Record<string, unknown>).message)
                        : String(data);
                }
                isProcessing = false;
            });

            xhr.addEventListener('error', () => {
                error = 'Network error during image processing — please try again.';
                isProcessing = false;
            });

            xhr.addEventListener('abort', () => {
                error = 'Request cancelled.';
                isProcessing = false;
            });

            xhr.open('POST', 'https://api.mochify.xyz/v1/squish');
            xhr.setRequestHeader('Referer', 'http://mochify.xyz');
            xhr.send(squishForm);

        } catch (err) {
            error = err instanceof Error ? err.message : String(err);
            isProcessing = false;
        }
    }
</script>

<svelte:head>
    <title>Mochify Flow | Prompt-driven Image Processing</title>
    <meta name="description" content="Describe what you want done to your images, drop them in, and Mochify handles the rest.">
</svelte:head>

<div class="min-h-screen bg-[#FDFBF7] flex flex-col selection:bg-[#FFF0F3] selection:text-pink-900">
    
    <!-- Background orbs -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div class="animate-float absolute -top-48 -right-48 w-[560px] h-[560px] rounded-full bg-gradient-to-br from-pink-200/35 to-transparent blur-[110px]"></div>
        <div class="animate-float-slow absolute -bottom-60 -left-48 w-[640px] h-[640px] rounded-full bg-gradient-to-tr from-rose-100/25 to-transparent blur-[130px]"></div>
        <div class="animate-float-slow absolute top-24 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-purple-100/20 to-transparent blur-[70px]"></div>
    </div>

    <Navigation />

    <!-- Centre everything vertically for the LLM feel -->
    <main class="relative z-10 flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-28 sm:px-6 sm:pb-36">

        <!-- Wordmark + tag -->
        <div class="text-center mb-10">
            <h1 class="text-4xl md:text-6xl font-black text-[#4A2C2C] leading-tight tracking-tight mb-3">
                What should we do<br class="hidden sm:block"> with your images?
            </h1>
            <p class="shimmer-text text-xl md:text-2xl font-extrabold tracking-tight mb-4">
                Prompt. Drop. Done.
            </p>
            <p class="text-[#6C3F31] text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                Describe what you want in plain English, drop your files in, and hit enter.
            </p>
        </div>

        <!-- ── Prompt Panel ── -->
        <div class="w-full max-w-2xl">

            <!-- Outer glow ring that intensifies on drag -->
            <div class="relative rounded-3xl transition-all duration-300 {isDragging ? 'prompt-glow' : ''}">
                <!-- Frosted glass card -->
                <div
                    class="relative rounded-3xl border bg-white/65 backdrop-blur-2xl shadow-2xl shadow-pink-100/60 transition-all duration-300 overflow-hidden {isDragging ? 'border-pink-300' : 'border-white/70'}"
                    ondragover={handleDragOver}
                    ondragleave={handleDragLeave}
                    ondrop={handleDrop}
                    role="region"
                    aria-label="Image processing prompt input area"
                >

                    <!-- Subtle inner shimmer line at top -->
                    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-200/80 to-transparent"></div>

                    <!-- Drag overlay -->
                    {#if isDragging}
                        <div class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-pink-50/80 backdrop-blur-sm pointer-events-none">
                            <div class="w-11 h-11 rounded-xl bg-white/80 shadow-md flex items-center justify-center mb-2.5 animate-bounce">
                                <svg class="w-5 h-5 text-[#F06292]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                                </svg>
                            </div>
                            <p class="text-[#4A2C2C] font-bold text-sm">Drop to add images</p>
                        </div>
                    {/if}

                    <!-- Image thumbnail strip (visible when files attached) -->
                    {#if files.length > 0}
                        <div class="flex items-center gap-2 flex-wrap px-5 pt-5 pb-2">
                            {#each files as file, i}
                                <div class="relative group flex-shrink-0">
                                    <div class="w-14 h-14 rounded-xl overflow-hidden border-2 border-pink-100 shadow-sm bg-pink-50">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                    <button
                                        onclick={() => removeFile(i)}
                                        class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#4A2C2C] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
                                        aria-label="Remove {file.name}"
                                    >
                                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                            {/each}
                            <!-- Add more tile -->
                            <button
                                onclick={() => fileInputEl?.click()}
                                class="flex-shrink-0 w-14 h-14 rounded-xl border-2 border-dashed border-pink-200 bg-pink-50/50 hover:bg-pink-50 hover:border-pink-300 transition-all flex items-center justify-center text-pink-400 hover:text-[#F06292]"
                                aria-label="Add more images"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                </svg>
                            </button>
                        </div>
                    {/if}

                    <!-- Text input row -->
                    <div class="flex items-center gap-3 px-5 py-4">
                        <!-- Attach button -->
                        <button
                            onclick={() => fileInputEl?.click()}
                            class="flex-shrink-0 p-2.5 rounded-xl text-[#875F42] hover:text-[#F06292] hover:bg-pink-50 transition-all"
                            aria-label="Attach images"
                            title="Attach images"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"/>
                            </svg>
                        </button>

                        <input
                            bind:this={fileInputEl}
                            type="file"
                            multiple
                            accept="image/*"
                            onchange={handleFileSelect}
                            class="hidden"
                        />

                        <textarea
                            id="prompt-input"
                            bind:this={textareaEl}
                            bind:value={prompt}
                            oninput={autoGrow}
                            onkeydown={handleKeydown}
                            placeholder={files.length === 0
                                ? 'Drop images here or attach them, then describe what you want…'
                                : 'Convert to WebP, resize to 1200 px, compress to 80%…'}
                            rows="1"
                            class="flex-1 resize-none border-0 border-none outline-none ring-0 shadow-none bg-transparent text-[#4A2C2C] placeholder-[#875F42]/50 text-base leading-relaxed focus:outline-none focus:ring-0 focus:border-0 font-medium min-h-[28px] max-h-[200px] overflow-y-auto py-0.5 [appearance:none]"
                        ></textarea>

                        <!-- Send button -->
                        <button
                            onclick={submit}
                            disabled={!prompt.trim() || files.length === 0 || isProcessing}
                            class="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all duration-200
                                   {prompt.trim() && files.length > 0 && !isProcessing
                                     ? 'bg-gradient-to-br from-[#F06292] to-[#e040a0] text-white shadow-lg shadow-pink-200 hover:scale-105 hover:shadow-pink-300'
                                     : 'bg-pink-50 text-pink-200 cursor-not-allowed'}"
                            aria-label="Process images"
                        >
                            {#if isProcessing}
                                <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                                </svg>
                            {:else}
                                <svg class="w-4 h-4 translate-x-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                                </svg>
                            {/if}
                        </button>
                    </div>

                    <!-- Bottom hint bar -->
                    <div class="border-t border-pink-50/80 bg-white/30">
                        {#if isProcessing}
                            <div class="h-1 bg-pink-50 overflow-hidden">
                                <div
                                    class="h-full bg-gradient-to-r from-[#F06292] to-[#e040a0] transition-all duration-300 ease-out"
                                    style="width: {uploadProgress}%"
                                ></div>
                            </div>
                        {/if}
                        <div class="flex items-center justify-between px-5 py-2.5">
                            <span class="text-xs text-[#875F42]/70 font-medium">
                                {#if isProcessing}
                                    {uploadProgress < 50 ? 'Uploading…' : uploadProgress < 100 ? 'Processing…' : 'Done'}
                                {:else if files.length === 0}
                                    Drop images into this box or use the clip button
                                {:else}
                                    {files.length} {files.length === 1 ? 'image' : 'images'} attached · Shift+Enter for new line
                                {/if}
                            </span>
                            <span class="text-xs text-[#875F42]/50 font-medium">↵ enter to process</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ── Result / Error Panel ── -->
        {#if result || error}
            <div class="w-full max-w-2xl mt-6">
                <div class="rounded-3xl border bg-white/65 backdrop-blur-2xl shadow-xl shadow-pink-100/40 border-white/70 overflow-hidden">
                    <div class="px-5 py-3 border-b border-pink-50/80 bg-white/30 flex items-center gap-2">
                        {#if error}
                            <span class="w-2 h-2 rounded-full bg-red-400 flex-shrink-0"></span>
                            <span class="text-xs font-semibold text-red-600">Error</span>
                        {:else}
                            <span class="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
                            <span class="text-xs font-semibold text-[#4A2C2C]">Response</span>
                        {/if}
                    </div>
                    <pre class="px-5 py-4 text-sm text-[#4A2C2C] whitespace-pre-wrap break-words font-mono leading-relaxed {error ? 'text-red-700' : ''}">{error ?? result}</pre>
                </div>
            </div>
        {/if}

    </main>

    <Footer />
</div>

<style>
    .prompt-glow {
        box-shadow: 0 0 0 3px rgba(240, 98, 146, 0.25), 0 0 40px rgba(240, 98, 146, 0.15);
        border-radius: 1.5rem;
    }
</style>
