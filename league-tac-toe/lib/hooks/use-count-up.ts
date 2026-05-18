import { useEffect, useState } from "react";

export function useCountUp(target: number, durationMs = 500, enabled = true) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!enabled) {
            setValue(0);
            return;
        }

        if (target <= 0) {
            setValue(0);
            return;
        }

        const start = performance.now();
        let frameId = 0;

        const animate = (now: number) => {
            const progress = Math.min((now - start) / durationMs, 1);
            const eased = 1 - (1 - progress) ** 3;
            setValue(Math.round(target * eased));
            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            }
        };

        setValue(0);
        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [target, durationMs, enabled]);

    return value;
}
