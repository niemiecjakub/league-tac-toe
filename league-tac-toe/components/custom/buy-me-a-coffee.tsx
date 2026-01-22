"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BuyMeACoffeeWidget() {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.includes("game")) {
            const bmcWidget = document.getElementById("bmc-wbtn");
            if (bmcWidget) {
                document.body.removeChild(bmcWidget);
            }
            return;
        }

        const script = document.createElement("script");
        script.setAttribute("data-name", "BMC-Widget");
        script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
        script.setAttribute("data-id", "kniemiec3p");
        script.setAttribute("data-description", "Thank you for your support!");
        script.setAttribute("data-message", "Help me keep the project running :)");
        script.setAttribute("data-color", "#FFDD00");
        script.setAttribute("data-position", "right");
        script.setAttribute("data-x_margin", "18");
        script.setAttribute("data-y_margin", "18");
        script.async = true;

        script.onload = function () {
            const evt = new Event("DOMContentLoaded");
            window.dispatchEvent(evt);
        };

        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }

            const bmcWidget = document.getElementById("bmc-wbtn");
            if (bmcWidget) {
                document.body.removeChild(bmcWidget);
            }
        };
    }, [pathname]);

    return null;
}
