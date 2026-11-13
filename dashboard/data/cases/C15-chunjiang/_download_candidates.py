import io,re,os,requests
from urllib.parse import urlparse
picks={"M01":[1,2,12,13],"M04":[2,3,4],"M07":[1,4,5],"M08":[1,2,3,6],"M09":[2,3,6,7,8]}
h={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36","Referer":"https://www.toutiao.com/"}
os.makedirs("materials/assets/_candidates",exist_ok=True)
for mid,idxs in picks.items():
    t=io.open(f"extracted/{mid}.txt",encoding="utf-8").read()
    urls=re.findall(r'!\[Image \d+\]\((https?://[^)]+)\)',t)
    for n in idxs:
        if n>len(urls): print(mid,n,"missing"); continue
        u=urls[n-1]
        try:
            r=requests.get(u,headers=h,timeout=60)
            ct=r.headers.get("content-type","")
            ext=".jpg" if "jpeg" in ct or "jpg" in ct else ".png" if "png" in ct else ".webp"
            fn=f"materials/assets/_candidates/{mid}_{n:02d}{ext}"
            open(fn,"wb").write(r.content)
            print(mid,n,r.status_code,len(r.content),ct,fn)
        except Exception as e: print(mid,n,"ERR",e)
