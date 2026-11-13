from PIL import Image, ImageDraw, ImageFont
import glob, os, math
files=sorted(glob.glob("materials/assets/_candidates/*.jpg"))
cols=4; thumb=(320,220); pad=10; labelh=24
rows=math.ceil(len(files)/cols)
sheet=Image.new("RGB",(cols*(thumb[0]+pad)+pad, rows*(thumb[1]+labelh+pad)+pad),"white")
d=ImageDraw.Draw(sheet)
try: font=ImageFont.truetype("C:/Windows/Fonts/arial.ttf",14)
except: font=ImageFont.load_default()
for i,f in enumerate(files):
    im=Image.open(f).convert("RGB"); im.thumbnail(thumb)
    x=pad+(i%cols)*(thumb[0]+pad); y=pad+(i//cols)*(thumb[1]+labelh+pad)
    sheet.paste(im,(x,y))
    d.text((x,y+thumb[1]+2),os.path.basename(f),fill="black",font=font)
sheet.save("materials/assets/_contact_sheet.jpg",quality=85)
print(sheet.size, len(files))
