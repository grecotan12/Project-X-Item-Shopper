from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import re

class HtmlCleaner:
    def __init__(self, url):
        self.url = url
        
    def fetch_html(self):
        with sync_playwright() as p:
            browser = p.chromium.launch(
                headless=True,
                args=["--disable-blink-features=AutomationControlled"]
            )

            context = browser.new_context(
                user_agent=(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/120.0.0.0 Safari/537.36"
                )
            )

            page = context.new_page()

            page.goto(self.url, wait_until="domcontentloaded", timeout=60000)

            html = page.content()
            context.close()
            browser.close()
            return html
    
    def clean_html(self, html):
        soup = BeautifulSoup(html, "lxml")

        for tag in soup([
            "script", "style", "noscript", "iframe", "svg"
        ]):
            tag.decompose()
        return soup
    
    def content_extraction(self, soup):
        sections = []
        curr_section = {
            "title": None,
            "content": []
        }

        for el in soup.body.descendants:
            if el.name in ["h1", "h2", "h3", "h4"]:
                if curr_section["content"]:
                    sections.append(curr_section)
                
                curr_section = {
                    "title": el.get_text(strip=True),
                    "content": []
                }
            
            elif el.name in ["p", "li"]:
                text = el.get_text(" ", strip=True)
                if len(text) > 30:
                    curr_section["content"].append(text)
        
        if curr_section["content"]:
            sections.append(curr_section)
        return sections
    
    def clean_contents(self, contents):
        for section in contents:
            section['title'] = re.sub(r"\s+", " ", section['title']).strip()
            for s in section['content']:
                s = re.sub(r"\s+", " ", s)
                s = s.replace("\r\n", "\n").replace("\r", "\n")
                s = re.sub(r"\n{3,}", "\n\n", s)
                s = re.sub(r"[ \t]+", " ", s)
                s = re.sub(r" *\n *", "\n", s)
                s = s.strip()
    
    def remove_dublicate(self, contents):
        seen = set()
        cleaned = []
        for s in contents:
            unique = []
            for line in s["content"]:
                if line not in seen:
                    unique.append(line)
                    seen.add(line)
            if unique:
                cleaned.append({
                    "title": s["title"],
                    "content": unique
                })
        return cleaned 
    def flatten_contents(self, contents):
        out = []
        for s in contents:
            out.append(f"{s['title']}:\n{" ".join(s['content'])}")
        return "\n\n".join(out)


# test = HtmlCleaner("https://www.amazon.com/dp/B08WYXNVQ7/ref=sspa_dk_detail_1?psc=1&pd_rd_i=B08WYXNVQ7&pd_rd_w=q8wFE&content-id=amzn1.sym.7446a9d1-25fe-4460-b135-a60336bad2c9&pf_rd_p=7446a9d1-25fe-4460-b135-a60336bad2c9&pf_rd_r=TS1HDMMVNFZVZDB5XDGX&pd_rd_wg=CH1ph&pd_rd_r=22073be3-d9ae-4eb1-b64e-48ab7a5e4eec&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw")
# html = test.fetch_html()
# soup = test.clean_html(html)
# contents = test.content_extraction(soup)
# test.clean_contents(contents)
# cleaned_contents = test.remove_dublicate(contents)

# final_contents = test.flatten_contents(cleaned_contents)
# print(final_contents)

