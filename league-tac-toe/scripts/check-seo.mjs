/** Contract check for canonical URL joining. Fails if locale URLs pick up a double slash. */
function siteUrl(value) {
    return String(value).replace(/\/+$/, "");
}

function absoluteUrl(base, localePath) {
    const origin = siteUrl(base);
    const path = localePath.startsWith("/") ? localePath : `/${localePath}`;
    return `${origin}${path}`;
}

const origin = siteUrl("https://leaguetactoe.com/");
const cases = [
    [absoluteUrl(origin, "/en"), "https://leaguetactoe.com/en"],
    [absoluteUrl(origin, "/en/champions"), "https://leaguetactoe.com/en/champions"],
    [absoluteUrl("https://leaguetactoe.com/", "/pt-BR/champions"), "https://leaguetactoe.com/pt-BR/champions"],
    [absoluteUrl(origin, "/sitemap.xml"), "https://leaguetactoe.com/sitemap.xml"],
];

let failed = 0;
for (const [actual, expected] of cases) {
    if (actual !== expected || actual.includes("//", "https://".length)) {
        console.error(`fail: ${actual} !== ${expected}`);
        failed += 1;
    }
}

if (failed) {
    process.exit(1);
}

console.log("seo url checks passed");
