import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { type Metadata, type Viewport } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Inter, JetBrains_Mono } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { theme } from "~/theme/theme";

export const metadata: Metadata = {
  title: "TaskFlow | 现代任务管理",
  description: "工业风格的极简任务管理应用 - 高效管理您的日常任务",
  keywords: ["任务管理", "todo", "productivity", "task manager"],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      data-mantine-color-scheme="dark"
    >
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark" forceColorScheme="dark">
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
