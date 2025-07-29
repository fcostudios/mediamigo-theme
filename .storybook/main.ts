import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [],
    framework: {
        name: "@storybook/react-vite",
        options: {}
    },
    staticDirs: ["../public"],
    viteFinal: async (config) => {
        // Import Tailwind plugin dynamically to avoid CommonJS issues
        const { default: tailwind } = await import("@tailwindcss/vite");
        config.plugins = config.plugins || [];
        config.plugins.push(tailwind());
        return config;
    }
};
export default config;
