from PIL import Image
import os, shutil
picks={
"C15-1":"M01_02.jpg","C15-2":"M01_13.jpg","C15-3":"M01_12.jpg","C15-4":"M04_04.jpg",
"C15-5":"M07_05.jpg","C15-6":"M07_04.jpg","C15-7":"M08_01.jpg","C15-8":"M08_03.jpg",
"C15-9":"M09_03.jpg","C15-10":"M09_06.jpg","C15-11":"M09_07.jpg","C15-12":"M09_08.jpg"}
os.makedirs("materials/assets",exist_ok=True)
for out,src in picks.items():
    p=os.path.join("materials/assets/_candidates",src)
    im=Image.open(p).convert("RGB")
    w,h=im.size
    if w>1400:
        im=im.resize((1400,round(h*1400/w)),Image.LANCZOS)
    fn=f"materials/assets/{out}.jpg"
    im.save(fn,"JPEG",quality=85,optimize=True)
    print(fn,im.size,os.path.getsize(fn))
