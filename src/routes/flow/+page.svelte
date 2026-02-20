<script lang="ts">
    import { tick } from 'svelte';
    import Navigation from '$lib/components/Navigation.svelte';
    import Footer from '$lib/components/Footer.svelte';

    let prompt: string = $state('');
    let files: File[] = $state([]);
    let isDragging: boolean = $state(false);
    
    // NEW: Break down the processing state
    let isProcessing: boolean = $state(false);
    let processPhase: 'idle' | 'thinking' | 'uploading' = $state('idle');
    
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

    async function submit() {
        if (!prompt.trim() || files.length === 0 || isProcessing) return;
        
        isProcessing = true;
        processPhase = 'thinking'; // Step 1: LLM Phase
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

            // ── Step 2: Build the Query String ──
            const params = new URLSearchParams();
            if (parsedConfig.type) params.append('type', parsedConfig.type);
            if (parsedConfig.smartCompress) params.append('smartCompress', '1');
            
            for (const [key, value] of Object.entries(parsedConfig)) {
                if (key !== 'smartCompress' && key !== 'type' && value !== false) {
                    params.append(key, String(value));
                }
            }
            const queryString = params.toString();

            // ── Step 3: Process the files and trigger downloads ──
            processPhase = 'uploading'; // Step 2: Transition to actual upload
            let completedFiles = 0;

            for (const file of files) {
                const blob = await new Promise<Blob>((resolve, reject) => {
                    const xhr = new XMLHttpRequest();

                    xhr.upload.addEventListener('progress', (e) => {
                        if (e.lengthComputable) {
                            const fileProgress = (e.loaded / e.total);
                            const baseProgress = completedFiles / files.length;
                            uploadProgress = Math.round((baseProgress + (fileProgress / files.length)) * 100);
                        }
                    });

                    xhr.addEventListener('load', () => {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve(xhr.response);
                        } else {
                            reject(new Error(`Failed to process ${file.name} (Status: ${xhr.status})`));
                        }
                    });

                    xhr.addEventListener('error', () => reject(new Error('Network error during image processing.')));
                    xhr.addEventListener('abort', () => reject(new Error('Request cancelled.')));

                    xhr.open('POST', `https://api.mochify.xyz/v1/squish?${queryString}`);
                    xhr.setRequestHeader('Referer', 'http://mochify.xyz');
                    xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
                    xhr.responseType = 'blob'; 
                    xhr.send(file);
                });

                // ── Step 4: Automatically Download the Blob ──
                const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                const newExtension = parsedConfig.type || file.name.split('.').pop();
                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                
                a.style.display = 'none';
                a.href = downloadUrl;
                a.download = `${baseName}_mochified.${newExtension}`;
                document.body.appendChild(a);
                a.click();
                
                setTimeout(() => {
                    window.URL.revokeObjectURL(downloadUrl);
                    document.body.removeChild(a);
                }, 100);

                completedFiles++;
            }

            result = `Successfully processed and downloaded ${completedFiles} image${completedFiles === 1 ? '' : 's'}!`;
            
        } catch (err) {
            error = err instanceof Error ? err.message : String(err);
        } finally {
            // Reset states
            isProcessing = false;
            processPhase = 'idle';
        }
    }
</script>

<svelte:head>
    <title>Mochify Flow | Prompt-driven Image Processing</title>
    <meta name="description" content="Describe what you want done to your images, drop them in, and Mochify handles the rest.">
</svelte:head>

<div class="min-h-screen bg-[#FDFBF7] flex flex-col selection:bg-[#FFF0F3] selection:text-pink-900">
    <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div class="animate-float absolute -top-48 -right-48 w-[560px] h-[560px] rounded-full bg-gradient-to-br from-pink-200/35 to-transparent blur-[110px]"></div>
        <div class="animate-float-slow absolute -bottom-60 -left-48 w-[640px] h-[640px] rounded-full bg-gradient-to-tr from-rose-100/25 to-transparent blur-[130px]"></div>
        <div class="animate-float-slow absolute top-24 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-purple-100/20 to-transparent blur-[70px]"></div>
    </div>

    <Navigation />

    <main class="relative z-10 flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-28 sm:px-6 sm:pb-36">
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

        <div class="w-full max-w-2xl">
            <div class="relative rounded-3xl transition-all duration-300 {isDragging ? 'prompt-glow' : ''}">
                <div class="relative rounded-3xl border bg-white/65 backdrop-blur-2xl shadow-2xl shadow-pink-100/60 transition-all duration-300 overflow-hidden {isDragging ? 'border-pink-300' : 'border-white/70'}">
                    
                    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-200/80 to-transparent"></div>

                    <div class="flex items-center gap-3 px-5 py-4">
                        <button onclick={() => fileInputEl?.click()} class="flex-shrink-0 p-2.5 rounded-xl text-[#875F42] hover:text-[#F06292] hover:bg-pink-50 transition-all">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"/>
                            </svg>
                        </button>
                        <input bind:this={fileInputEl} type="file" multiple accept="image/*" onchange={handleFileSelect} class="hidden"/>
                        <textarea bind:this={textareaEl} bind:value={prompt} oninput={autoGrow} onkeydown={handleKeydown} placeholder="Describe what you want…" rows="1" class="flex-1 resize-none border-0 border-none outline-none ring-0 shadow-none bg-transparent text-[#4A2C2C] placeholder-[#875F42]/50 text-base leading-relaxed focus:outline-none focus:ring-0 focus:border-0 font-medium min-h-[28px] max-h-[200px] overflow-y-auto py-0.5 [appearance:none]"></textarea>
                        
                        <button onclick={submit} disabled={!prompt.trim() || files.length === 0 || isProcessing} class="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all duration-200 {prompt.trim() && files.length > 0 && !isProcessing ? 'bg-gradient-to-br from-[#F06292] to-[#e040a0] text-white shadow-lg shadow-pink-200 hover:scale-105' : 'bg-pink-50 text-pink-200 cursor-not-allowed'}">
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

                    <div class="border-t border-pink-50/80 bg-white/30">
                        {#if isProcessing}
                            <div class="h-1 bg-pink-50 overflow-hidden relative">
                                {#if processPhase === 'thinking'}
                                    <div class="absolute inset-0 bg-gradient-to-r from-[#F06292] to-[#e040a0] opacity-40 animate-pulse"></div>
                                {:else}
                                    <div class="h-full bg-gradient-to-r from-[#F06292] to-[#e040a0] transition-all duration-300 ease-out" style="width: {uploadProgress}%"></div>
                                {/if}
                            </div>
                        {/if}
                        
                        <div class="flex items-center justify-between px-5 py-2.5">
                            <span class="text-xs text-[#875F42]/70 font-medium">
                                {#if isProcessing}
                                    {#if processPhase === 'thinking'}
                                        AI is analyzing instructions…
                                    {:else}
                                        {uploadProgress < 100 ? `Processing images (${uploadProgress}%)` : 'Finishing up…'}
                                    {/if}
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
    </main>

    <Footer />
</div>