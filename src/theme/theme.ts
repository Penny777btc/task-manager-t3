'use client';

import { createTheme, MantineThemeOverride, MantineColorsTuple } from '@mantine/core';

// 铜金属色调主题 - 灵感来自工业风格模板
const copperPrimary: MantineColorsTuple = [
    '#fff4e6',
    '#ffe8cc',
    '#ffd8a8',
    '#ffc078',
    '#ffa94d',
    '#d48e4d',  // primary shade
    '#c27c3e',
    '#a86932',
    '#8e5c2d',
    '#744d26',
];

export const theme: MantineThemeOverride = createTheme({
    // 主色调 - 阳极氧化铜色
    primaryColor: 'copper',
    colors: {
        copper: copperPrimary,
        // 深色背景色
        dark: [
            '#e2e2e4',
            '#88888c',
            '#6a6a6e',
            '#4a4a4e',
            '#323236',
            '#2a2a2e',
            '#1c1c1f',
            '#141416',
            '#0a0a0b',
            '#050506',
        ],
    },

    // 圆角设置
    radius: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
    },
    defaultRadius: 'md',

    // 字体设置
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    fontFamilyMonospace: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',

    // 标题样式
    headings: {
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
        fontWeight: '900',
        sizes: {
            h1: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1', fontWeight: '900' },
            h2: { fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: '1.2', fontWeight: '700' },
            h3: { fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', lineHeight: '1.3', fontWeight: '700' },
        },
    },

    // 间距
    spacing: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },

    // 阴影
    shadows: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.2)',
        sm: '0 2px 4px rgba(0, 0, 0, 0.25)',
        md: '0 4px 8px rgba(0, 0, 0, 0.3)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.35)',
        xl: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
    },

    // 组件默认属性覆盖
    components: {
        Button: {
            defaultProps: {
                radius: 'sm',
            },
            styles: {
                root: {
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                },
            },
        },
        Card: {
            defaultProps: {
                radius: 'md',
                withBorder: true,
            },
            styles: {
                root: {
                    backgroundColor: 'var(--mantine-color-dark-7)',
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: 'var(--mantine-color-copper-5)',
                    },
                },
            },
        },
        TextInput: {
            defaultProps: {
                radius: 'sm',
            },
            styles: {
                input: {
                    backgroundColor: 'var(--mantine-color-dark-6)',
                    borderColor: 'var(--mantine-color-dark-4)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:focus': {
                        borderColor: 'var(--mantine-color-copper-5)',
                        boxShadow: '0 0 15px rgba(212, 142, 77, 0.2)',
                    },
                },
            },
        },
        Modal: {
            defaultProps: {
                radius: 'md',
                centered: true,
                overlayProps: {
                    backgroundOpacity: 0.8,
                    blur: 10,
                },
            },
            styles: {
                content: {
                    backgroundColor: 'var(--mantine-color-dark-7)',
                    border: '1px solid var(--mantine-color-dark-4)',
                },
                header: {
                    backgroundColor: 'var(--mantine-color-dark-7)',
                },
            },
        },
        Table: {
            styles: {
                table: {
                    backgroundColor: 'var(--mantine-color-dark-7)',
                },
                thead: {
                    backgroundColor: 'var(--mantine-color-dark-8)',
                },
                th: {
                    borderColor: 'var(--mantine-color-dark-4)',
                    color: 'var(--mantine-color-dark-1)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.75rem',
                },
                td: {
                    borderColor: 'var(--mantine-color-dark-5)',
                },
                tr: {
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'var(--mantine-color-dark-6)',
                    },
                },
            },
        },
        Badge: {
            defaultProps: {
                radius: 'xs',
                variant: 'outline',
            },
            styles: {
                root: {
                    fontFamily: 'var(--mantine-font-family-monospace)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                },
            },
        },
    },

    // 其他设置
    cursorType: 'pointer',
    focusRing: 'auto',
    respectReducedMotion: true,
});
