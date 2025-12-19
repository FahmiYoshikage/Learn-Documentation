import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "FailDeGaskar's wiki",
    description: 'Catatan teknis dan dokumentasi pribadi',
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config

        // Navigation Bar (top menu)
        nav: [
            { text: 'Home', link: '/' },
            { text: 'JavaScript', link: '/javascript/' },
            { text: 'Python', link: '/python/' },
            { text: 'Docker', link: '/docker/' },
            {
                text: 'Panduan',
                items: [
                    {
                        text: 'Panduan VitePress',
                        link: '/tutorial/panduan-vitepress',
                    },
                    {
                        text: 'Syntax & Fitur',
                        link: '/tutorial/vitepress-syntax',
                    },
                    {
                        text: 'Struktur Project',
                        link: '/tutorial/struktur-project',
                    },
                    {
                        text: 'Homapage Customization',
                        link: '/tutorial/homepage-customization',
                    },
                    {
                        text: 'Navbar VS Sidebar',
                        link: '/tutorial/navbar-vs-sidebar',
                    },
                    {
                        text: 'Cheatsheet',
                        link: '/tutorial/markdown-cheatsheet',
                    },
                ],
            },
        ],

        // Sidebar - berbeda untuk setiap section
        sidebar: {
            // Sidebar untuk section JavaScript
            '/javascript/': [
                {
                    text: 'JavaScript',
                    items: [
                        { text: 'Overview', link: '/javascript/' },
                        {
                            text: 'Dasar JavaScript',
                            link: '/javascript/basics',
                        },
                        {
                            text: 'Array Methods',
                            link: '/javascript/array-methods',
                        },
                    ],
                },
            ],

            // Sidebar untuk section Python
            '/python/': [
                {
                    text: 'Python',
                    items: [
                        { text: 'Overview', link: '/python/' },
                        { text: 'Dasar Python', link: '/python/basics' },
                    ],
                },
            ],

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
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
        ],

        // Search (built-in local search)
        search: {
            provider: 'local',
        },
    },
});
