// Manages display of the Podium chat widget
// Prevent overlap issues, specifically on the homepage

"use client";

import Script from "next/script";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "framer-motion";

export function PodiumChatManager() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const ignorePath = pathname === "/" || pathname === "/real-estate";

  useEffect(() => {
    widgetRef.current = document.getElementById(
      "podium-website-widget"
    ) as HTMLDivElement;
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;

    const podiumChatWidget = widgetRef.current;

    if (ignorePath && podiumChatWidget) {
      podiumChatWidget.style.visibility = "hidden";
      podiumChatWidget.style.opacity = "0";
    }

    if (!ignorePath && podiumChatWidget) {
      podiumChatWidget.style.visibility = "visible";
      podiumChatWidget.style.opacity = "1";
    }
  }, [pathname, loaded, ignorePath]);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!widgetRef?.current || !ignorePath) return;
    if (latest > 250) {
      widgetRef.current.style.visibility = "visible";
      widgetRef.current.style.opacity = "1";
    } else {
      widgetRef.current.style.visibility = "hidden";
      widgetRef.current.style.opacity = "0";
    }
  });

  return (
    <>
      <Script
        src="https://connect.podium.com/widget.js#ORG_TOKEN=976257dc-2ecf-4d98-9cf1-643eb46388ef"
        id="podium-widget"
        data-organization-api-token="976257dc-2ecf-4d98-9cf1-643eb46388ef"
        strategy="lazyOnload"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
