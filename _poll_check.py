from pathlib import Path
import datetime

base = Path(r"D:\source_code\kuaima\web-static")
idx = base / "index.html"
css = base / "styles.css"
js = base / "app.js"

ok = idx.exists() and css.exists() and js.exists()
s = idx.read_text(encoding="utf-8") if idx.exists() else ""
checks = {
    "has_styles_link": "./styles.css" in s,
    "has_js_link": "./app.js" in s,
    "has_worker_order": 'id="workerOrder"' in s,
    "has_boss_order": 'id="bossOrder"' in s,
}

print("OK", ok, "CHECKS", checks)

log = base / "docs" / "PROGRESS_LOG.md"
log.parent.mkdir(parents=True, exist_ok=True)
ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
line = f"- {ts} 巡检：files={ok}, checks={checks}, stuck=False\n"

if log.exists():
    old = log.read_text(encoding="utf-8")
else:
    old = "# PROGRESS LOG\n\n"

log.write_text(old + line, encoding="utf-8")
