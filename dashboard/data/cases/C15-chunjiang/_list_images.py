import io,re
for i in range(1,10):
    fn=f"extracted/M{i:02d}.txt"
    t=io.open(fn,encoding="utf-8").read().splitlines()
    imgs=[]
    for j,l in enumerate(t):
        m=re.search(r'!\[Image \d+\]\((https?://[^)]+)\)',l)
        if m:
            nxt=""
            for k in range(j+1,min(j+4,len(t))):
                s=t[k].strip()
                if s and not s.startswith("!["):
                    nxt=s[:120]; break
            imgs.append((len(imgs)+1,m.group(1),nxt))
    print(f"===== M{i:02d} images {len(imgs)}")
    for n,u,nxt in imgs:
        print(n,u[:160],"|",nxt)
