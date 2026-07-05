import puppeteer from "puppeteer-core"

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe"

async function run(origin) {
  console.log(`\n================ ${origin} ================`)
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox"],
  })
  const page = await browser.newPage()

  page.on("console", (m) => console.log("  [console]", m.type(), m.text()))
  page.on("pageerror", (e) => console.log("  [pageerror]", e.message))
  page.on("requestfailed", (r) => {
    if (r.url().includes("/api/")) console.log("  [requestfailed]", r.url(), "->", r.failure()?.errorText)
  })
  page.on("response", (res) => {
    if (res.url().includes("/api/products/categories")) console.log("  [response]", res.status(), res.url())
  })

  try {
    await page.goto(`${origin}/`, { waitUntil: "networkidle0", timeout: 20000 })
  } catch (e) {
    console.log("  [goto error]", e.message)
  }

  // Run the exact axios call the app makes, from inside the page.
  const result = await page.evaluate(async () => {
    try {
      const res = await fetch("/api/products/categories/", { credentials: "include" })
      const text = await res.text()
      return { ok: res.ok, status: res.status, redirected: res.redirected, len: text.length, sample: text.slice(0, 80) }
    } catch (e) {
      return { error: String(e) }
    }
  })
  console.log("  [in-page fetch]", JSON.stringify(result))

  await browser.close()
}

await run("http://localhost:3000")
await run("http://127.0.0.1:3000")
