from pathlib import Path
s = Path(r"D:\source_code\kuaima\web-static\index.html").read_text(encoding="utf-8")
i = s.find('<section id="worker"')
j = s.find('</section>', i)
print(s[i:j+10])
