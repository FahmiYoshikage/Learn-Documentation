import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "FailDeGaskar's wiki",
    description: 'Catatan teknis dan dokumentasi pribadi',
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config

        // Navigation Bar (top menu)
        nav: [
            { text: 'Home', link: '/' },
            { text: 'RE & Binex', link: '/RE-Binex/' },
            { text: 'Docker', link: '/docker/' },
            { text: 'CTF Writeups', link: '/writeup/' },
            { text: 'Anything', link: '/anything/wildcard-certificate' },
        ],

        // Sidebar - berbeda untuk setiap section
        sidebar: {
            // Sidebar untuk section Docker
            '/docker/': [
                {
                    text: 'Docker',
                    items: [
                        { text: 'Overview', link: '/docker/' },
                        { text: 'Perintah Dasar', link: '/docker/basics' },
                    ],
                },
            ],
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/https://github.com/FahmiYoshikage' },
        ],

        // Search (built-in local search)
        search: {
            provider: 'local',
        },

        // Footer
        footer: {
            message: 'Made with ❤️ by FailDeGaskar | <a href="/profile">Lihat Profil Saya</a>',
            copyright: 'Copyright © ' + new Date().getFullYear() + ' FailDeGaskar'
        }
    },
});
