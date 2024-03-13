import "@/styles/globals.css";

import localFont from "next/font/local";
import classNames from "classnames";

const fontDefault = localFont({
  src: [
    {
      path: "../public/fonts/soehne-buch.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-default",
});

const fontMedium = localFont({
  src: [
    {
      path: "../public/fonts/soehne-kraftig.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-medium",
});

const fontHeadline = localFont({
  src: [
    {
      path: "../public/fonts/soehne-schmal-extrafett.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-headline",
});

const fontSerif = localFont({
  src: [
    {
      path: "../public/fonts/reckless-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-serif",
});

const fontSerifMedium = localFont({
  src: [
    {
      path: "../public/fonts/reckless-medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-serif-medium",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontFamilies = [
    fontDefault.variable,
    fontMedium.variable,
    fontSerif.variable,
    fontSerifMedium.variable,
    fontHeadline.variable,
  ];

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/images/favicon.svg"
          sizes="any"
          type="image/svg+xml"
        />
      </head>
      <body className={classNames([...fontFamilies])}>
        {children}
        <div hidden>
          <span id="new-window-0">Opens in a new window</span>
          <span id="new-window-1">Opens an external site</span>
          <span id="new-window-2">Opens an external site in a new window</span>
        </div>
      </body>
    </html>
  );
}
