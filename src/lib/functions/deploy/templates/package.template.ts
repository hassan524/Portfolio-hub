export const publishedPackage = JSON.stringify(
    {
        name: "portflu-viewer",
        private: true,
        version: "0.0.0",
        type: "module",
        scripts: { dev: "vite", build: "vite build" },
        dependencies: {
            "embla-carousel-autoplay": "^8.6.0",
            "embla-carousel-react": "^8.6.0",
            "framer-motion": "^12.42.2",
            "lucide-react": "^1.24.0",
            react: "^19.2.0",
            "react-dom": "^19.2.0",
            "react-icons": "^5.7.0",
        },
        devDependencies: {
            "@vitejs/plugin-react": "^5.2.0",
            typescript: "^5.8.3",
            vite: "^8.0.16",
        },
    },
    null,
    2,
);