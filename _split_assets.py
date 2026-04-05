from pathlib import Path
import re

p = Path(r"D:\source_code\kuaima\web-static\index.html")
s = p.read_text(encoding="utf-8")

m_style = re.search(r"<style>([\s\S]*?)</style>", s)
m_script = re.search(r"<script>([\s\S]*?)</script>\s*</body>", s)
if not (m_style and m_script):
    raise SystemExit("style/script not found")

css = m_style.group(1).strip() + "\n"
js = m_script.group(1).strip() + "\n"

Path(r"D:\source_code\kuaima\web-static\styles.css").write_text(css, encoding="utf-8")
Path(r"D:\source_code\kuaima\web-static\app.js").write_text(js, encoding="utf-8")

s = re.sub(r"<style>[\s\S]*?</style>", '<link rel="stylesheet" href="./styles.css" />', s, count=1)
s = re.sub(r"<script>[\s\S]*?</script>\s*</body>", '<script src="./app.js"></script>\n</body>', s, count=1)

p.write_text(s, encoding="utf-8")
print("ok")
