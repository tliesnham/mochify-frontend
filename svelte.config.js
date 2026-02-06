import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte'],
    kit: {
        adapter: adapter(),
        csp: {
            mode: 'auto', // Uses nonces for SSR and hashes for static pages
            directives: {
                'default-src': ['self'],
                'script-src': ['self'],
                'style-src': ['self', 'unsafe-inline'], // Tailwind needs inline styles
                'connect-src': ['self', process.env.PUBLIC_API_URL || 'https://api.mochify.xyz'], // ONLY allow your C++ API
                'img-src': ['self', 'data:', 'blob:'], // Needed for local image previews
                'frame-ancestors': ['none'], // Prevents clickjacking
                'upgrade-insecure-requests': true
            }
        }
    }
};

export default config;