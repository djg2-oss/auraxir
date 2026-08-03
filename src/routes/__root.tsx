import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { BRAND } from "@/lib/brand";
import { AppErrorComponent } from "@/lib/error-component";
import { defaultMeta, homeJsonLdGraph } from "@/lib/seo";
import appCss from "@/styles.css?url";

const meta = defaultMeta();
const jsonLd = JSON.stringify(homeJsonLdGraph());

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: meta.title },
      { name: "description", content: meta.description },
      { name: "keywords", content: meta.keywords },
      { name: "author", content: BRAND.legalName },
      { name: "application-name", content: BRAND.legalName },
      { name: "robots", content: meta.robots },
      { name: "googlebot", content: meta.robots },
      { name: "theme-color", content: "#0b0b0f" },
      { name: "color-scheme", content: "dark light" },
      { name: "format-detection", content: "telephone=no" },
      // Open Graph
      { property: "og:title", content: meta.og.title },
      { property: "og:description", content: meta.og.description },
      { property: "og:type", content: meta.og.type },
      { property: "og:url", content: meta.og.url },
      { property: "og:site_name", content: meta.og.siteName },
      { property: "og:locale", content: meta.og.locale },
      // Twitter
      { name: "twitter:card", content: meta.twitter.card },
      { name: "twitter:title", content: meta.twitter.title },
      { name: "twitter:description", content: meta.twitter.description },
      // Brand
      { name: "apple-mobile-web-app-title", content: BRAND.name },
      { name: "apple-mobile-web-app-capable", content: "yes" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: meta.canonical },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "sitemap", href: "/sitemap.xml", type: "application/xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: jsonLd,
      },
    ],
  }),
  errorComponent: AppErrorComponent,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--color-bg-elevated)",
            border: "1px solid var(--color-border)",
            color: "var(--color-fg)",
          },
        }}
      />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
