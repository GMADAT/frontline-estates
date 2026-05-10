from PIL import Image, ImageDraw, ImageFilter, ImageChops, ImageEnhance
import random, math
import numpy as np

def add_grain(img, intensity=16):
    arr = np.array(img).astype(float)
    noise = np.random.normal(0, intensity, arr.shape)
    arr = np.clip(arr + noise, 0, 255).astype(np.uint8)
    return Image.fromarray(arr)

def radial_vignette(img, strength=0.7):
    w, h = img.size
    vig = np.ones((h, w), dtype=float)
    cx, cy = w * 0.5, h * 0.48
    for y in range(h):
        for x in range(w):
            dx = (x - cx) / (w * 0.6)
            dy = (y - cy) / (h * 0.6)
            dist = math.sqrt(dx*dx + dy*dy)
            vig[y, x] = max(0.0, 1.0 - dist * strength)
    arr = np.array(img).astype(float)
    for c in range(3):
        arr[:,:,c] = arr[:,:,c] * vig
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))

def gold_grade(img):
    arr = np.array(img).astype(float)
    lum = (arr[:,:,0]*0.299 + arr[:,:,1]*0.587 + arr[:,:,2]*0.114) / 255.0
    shadow = (1.0 - lum) ** 2.0
    arr[:,:,0] = np.clip(arr[:,:,0] + shadow * 18, 0, 255)
    arr[:,:,1] = np.clip(arr[:,:,1] + shadow * 10, 0, 255)
    arr[:,:,2] = np.clip(arr[:,:,2] - shadow * 4, 0, 255)
    return Image.fromarray(arr.astype(np.uint8))

def vertical_grad(draw, w, h, top_rgb, bot_rgb):
    for y in range(h):
        t = y / h
        r = int(top_rgb[0] + (bot_rgb[0]-top_rgb[0])*t)
        g = int(top_rgb[1] + (bot_rgb[1]-top_rgb[1])*t)
        b = int(top_rgb[2] + (bot_rgb[2]-top_rgb[2])*t)
        draw.line([(0,y),(w,y)], fill=(r,g,b))

def finish(img):
    img = add_grain(img, 14)
    img = gold_grade(img)
    img = radial_vignette(img, 0.75)
    img = ImageEnhance.Contrast(img).enhance(1.12)
    img = ImageEnhance.Brightness(img).enhance(0.87)
    return img

# ─────────────────────────────────────────────────────────────────────────────
# HERO IMAGE
# ─────────────────────────────────────────────────────────────────────────────
W, H = 1920, 1080
img = Image.new('RGB', (W, H))
draw = ImageDraw.Draw(img)
vertical_grad(draw, W, H, (4, 8, 20), (22, 28, 48))

# Stone block facade
for row in range(9):
    for col in range(16):
        bx = col * 130 - 60
        by = 220 + row * 78
        s = random.randint(30, 54)
        draw.rectangle([bx, by, bx+122, by+72], fill=(s+6, s, s-4))
        draw.line([(bx, by),(bx+122, by)], fill=(12,10,8), width=2)
        draw.line([(bx, by),(bx, by+72)], fill=(14,12,10), width=1)

# Tall windows with interior warm glow
for wx in [420, 680, 940, 1200, 1460]:
    draw.rectangle([wx, 280, wx+140, 560], fill=(6,14,30))
    draw.ellipse([wx, 232, wx+140, 312], fill=(6,14,30))
    for r in range(70, 0, -3):
        frac = 1.0 - r/70
        cr = min(255, int(180 + frac*60))
        cg = min(255, int(130 + frac*40))
        cb = int(40 * frac)
        alpha = int(frac**1.8 * 100)
        draw.ellipse([wx+70-r, 400-r, wx+70+r, 400+r],
                     fill=(cr*alpha//255, cg*alpha//255, cb*alpha//255))
    draw.line([(wx+70, 248),(wx+70, 560)], fill=(18,28,50), width=3)
    draw.line([(wx, 420),(wx+140, 420)], fill=(18,28,50), width=3)

# 6 white columns
for cx in [660, 760, 860, 1020, 1120, 1220]:
    draw.rectangle([cx+10, 320, cx+26, 700], fill=(8,12,20))
    draw.rectangle([cx, 320, cx+20, 700], fill=(42,46,52))
    draw.line([(cx+5, 330),(cx+5, 690)], fill=(58,62,68), width=2)
    draw.rectangle([cx-4, 316, cx+24, 326], fill=(54,58,64))
    draw.rectangle([cx-4, 698, cx+24, 708], fill=(54,58,64))

# Grand pediment
draw.polygon([(560,320),(940,185),(1380,320)], fill=(20,24,30))
draw.line([(560,320),(940,185),(1380,320)], fill=(46,50,58), width=3)

# Front entrance
draw.rectangle([870, 490, 1010, 710], fill=(10,18,36))
draw.ellipse([870, 450, 1010, 520], fill=(10,18,36))
for angle in range(0, 180, 25):
    rad = math.radians(angle)
    ex = 940 + int(70*math.cos(rad))
    ey = 490 - int(40*math.sin(rad))
    draw.line([(940,490),(ex,ey)], fill=(28,40,65), width=2)

# Balustrade
for bx in range(580, 1360, 18):
    draw.rectangle([bx, 700, bx+10, 735], fill=(38,40,45))
draw.line([(570,700),(1380,700)], fill=(52,54,60), width=3)
draw.line([(570,735),(1380,735)], fill=(52,54,60), width=3)

# Grand steps
for step in range(7):
    sy = 735 + step*16
    sw = step*22
    draw.rectangle([580-sw, sy, 1360+sw, sy+14], fill=(28+step*2, 30+step*2, 32+step*2))
    draw.line([(580-sw,sy),(1360+sw,sy)], fill=(48,50,55), width=1)

# Foreground lawn
for y in range(840, H):
    t = (y-840)/(H-840)
    draw.line([(0,y),(W,y)], fill=(int(7+t*18), int(9+t*18), int(6+t*14)))

# Tree silhouettes
for tx in [60,160,260,W-60,W-160,W-260,W-380]:
    h_tree = random.randint(220, 360)
    draw.rectangle([tx-5, 700-h_tree, tx+5, 800], fill=(12,12,10))
    for layer in range(5):
        ly = 700-h_tree+layer*55
        lw = 52-layer*7
        s = 9+layer*3
        draw.ellipse([tx-lw, ly-28, tx+lw, ly+45], fill=(s,s+2,s-2))

# Driveway
for off in [-500,-250,0,250,500]:
    draw.line([(940+off,H),(940,745)], fill=(16,18,20), width=max(1,2-abs(off)//250))

# Sky gradient
for y in range(500):
    t = y/500
    r = int(4+t*30); g = int(6+t*22); b = int(20+t*38)
    draw.line([(0,y),(W,y)], fill=(r,g,b))

# Stars
for _ in range(300):
    sx = random.randint(0,W); sy = random.randint(0,380)
    sb = random.randint(50,150)
    draw.point((sx,sy), fill=(sb,sb,int(sb*0.85)))

# Subtle moon
for r in range(55,0,-3):
    frac = 1.0 - r/55
    a = int(frac**1.5 * 180)
    draw.ellipse([1620-r, 70-r, 1620+r, 70+r], fill=(a,int(a*0.92),int(a*0.65)))

# Atmospheric haze band
haze = Image.new('RGBA', (W,H), (0,0,0,0))
hd = ImageDraw.Draw(haze)
for y in range(640,730):
    a = int(22 * math.sin(math.pi*(y-640)/90))
    hd.line([(0,y),(W,y)], fill=(165,158,145,a))
img = Image.alpha_composite(img.convert('RGBA'), haze).convert('RGB')

img = finish(img)
img.save(r'C:\frontline-estates\src\assets\hero\hero-mansion.jpg', quality=92)
print('Hero saved')

# ─────────────────────────────────────────────────────────────────────────────
# LISTING 1 — Colonial exterior
# ─────────────────────────────────────────────────────────────────────────────
def listing_colonial():
    W2,H2 = 800,600
    img2 = Image.new('RGB', (W2,H2))
    d = ImageDraw.Draw(img2)
    vertical_grad(d, W2, H2, (6,12,26), (22,28,44))
    # Brick facade
    for row in range(10):
        for col in range(10):
            bx = col*85; by = 150+row*52
            s = random.randint(65,88)
            d.rectangle([bx,by,bx+81,by+48], fill=(s+8,s,s-8))
            d.line([(bx,by),(bx+81,by)], fill=(18,14,12), width=2)
            d.line([(bx,by),(bx,by+48)], fill=(20,16,14), width=1)
    # Windows
    for wx in [55,195,335,475,615]:
        d.rectangle([wx,190,wx+90,320], fill=(8,18,40))
        d.ellipse([wx,164,wx+90,210], fill=(8,18,40))
        for r in range(38,0,-3):
            frac=1.0-r/38; a=int(frac**1.6*90)
            d.ellipse([wx+45-r,255-r,wx+45+r,255+r],
                      fill=(min(255,195+int(frac*50)), min(255,148+int(frac*30)), int(40*frac)))
        d.line([(wx+45,176),(wx+45,320)], fill=(22,34,58), width=2)
        d.line([(wx,255),(wx+90,255)], fill=(22,34,58), width=2)
    # Roof
    d.polygon([(0,150),(400,60),(800,150)], fill=(16,14,12))
    d.line([(0,150),(400,60),(800,150)], fill=(36,32,28), width=2)
    # Columns
    for cx in [180,280,480,580]:
        d.rectangle([cx+8,148,cx+22,430], fill=(8,12,18))
        d.rectangle([cx,148,cx+18,430], fill=(45,48,54))
        d.line([(cx+5,155),(cx+5,422)], fill=(60,64,70), width=2)
    # Landscaping
    for y in range(420,H2):
        t=(y-420)/(H2-420)
        d.line([(0,y),(W2,y)], fill=(int(8+t*16),int(12+t*20),int(8+t*14)))
    for hx in [20,100,620,700]:
        d.ellipse([hx,388,hx+72,428], fill=(10,18,10))
    for y in range(60):
        t=y/60; r=int(6+t*28); g=int(8+t*22); b=int(18+t*36)
        d.line([(0,y),(W2,y)], fill=(r,g,b))
    for _ in range(120):
        sx=random.randint(0,W2); sy=random.randint(0,120)
        sb=random.randint(45,130)
        d.point((sx,sy), fill=(sb,sb,int(sb*0.85)))
    return finish(img2)

listing_colonial().save(r'C:\frontline-estates\src\assets\listings\mansion-1.jpg', quality=90)
print('Listing 1 saved')

# ─────────────────────────────────────────────────────────────────────────────
# LISTING 2 — Center-hall elegant
# ─────────────────────────────────────────────────────────────────────────────
def listing_centerhall():
    W2,H2 = 800,600
    img2 = Image.new('RGB', (W2,H2))
    d = ImageDraw.Draw(img2)
    vertical_grad(d, W2, H2, (8,16,36), (28,32,52))
    # Stone facade
    for y in range(100,420):
        s=random.randint(40,62)
        d.line([(0,y),(W2,y)], fill=(s+4,s,s-4))
    # 2x3 windows
    for row in range(2):
        for col in range(3):
            wx=70+col*240; wy=130+row*150
            d.rectangle([wx,wy,wx+110,wy+120], fill=(6,16,38))
            d.ellipse([wx,wy-28,wx+110,wy+22], fill=(6,16,38))
            for r in range(38,0,-3):
                frac=1.0-r/38; a=int(frac**1.6*85)
                d.ellipse([wx+55-r,wy+60-r,wx+55+r,wy+60+r],
                          fill=(min(255,195+int(frac*48)), min(255,148+int(frac*28)), int(38*frac)))
            d.line([(wx+55,wy-16),(wx+55,wy+120)], fill=(20,32,56), width=3)
            d.line([(wx,wy+60),(wx+110,wy+60)], fill=(20,32,56), width=2)
    # Central door
    d.rectangle([330,330,450,455], fill=(10,18,36))
    d.ellipse([330,302,450,352], fill=(10,18,36))
    d.ellipse([384,392,396,404], fill=(175,142,55))
    # 4 columns
    for cx in [200,280,510,590]:
        d.rectangle([cx+8,100,cx+22,460], fill=(8,10,16))
        d.rectangle([cx,100,cx+18,460], fill=(50,54,60))
        d.line([(cx+5,108),(cx+5,452)], fill=(65,69,76), width=2)
        d.rectangle([cx-4,96,cx+22,108], fill=(58,62,68))
        d.rectangle([cx-4,458,cx+22,470], fill=(58,62,68))
    d.rectangle([0,96,W2,108], fill=(28,26,24))
    # Front driveway
    for y in range(450,H2):
        t=(y-450)/(H2-450); s=int(20+t*14)
        d.line([(0,y),(W2,y)], fill=(s,s,s-2))
    # Perspective driveway lines
    for off in [-250,0,250]:
        d.line([(400+off,H2),(400,460)], fill=(16,17,18), width=max(1,2-abs(off)//250))
    # Flanking trees
    for tx in [25,110,W2-25,W2-110]:
        h_t=random.randint(160,260)
        d.rectangle([tx-4,450-h_t,tx+4,520], fill=(10,10,8))
        for layer in range(4):
            ly=450-h_t+layer*52; lw=42-layer*6; s=8+layer*3
            d.ellipse([tx-lw,ly-22,tx+lw,ly+38], fill=(s,s+2,s-2))
    # Sky gradient
    for y in range(100):
        t=y/100; r=int(6+t*22); g=int(10+t*18); b=int(24+t*36)
        d.line([(0,y),(W2,y)], fill=(r,g,b))
    return finish(img2)

listing_centerhall().save(r'C:\frontline-estates\src\assets\listings\mansion-2.jpg', quality=90)
print('Listing 2 saved')

# ─────────────────────────────────────────────────────────────────────────────
# LISTING 3 — Chef kitchen interior
# ─────────────────────────────────────────────────────────────────────────────
def listing_kitchen():
    W2,H2 = 800,600
    img2 = Image.new('RGB', (W2,H2))
    d = ImageDraw.Draw(img2)
    # Marble floor
    for y in range(360,H2):
        t=(y-360)/(H2-360); s=int(188-t*40)
        d.line([(0,y),(W2,y)], fill=(s,s-2,s-6))
    for x in range(0,W2,56):
        d.line([(x,360),(x,H2)], fill=(172,168,162), width=1)
    for y in range(360,H2,56):
        d.line([(0,y),(W2,y)], fill=(172,168,162), width=1)
    # Back wall
    for y in range(80,360):
        s=230-(360-y)//9
        d.line([(0,y),(W2,y)], fill=(s,s-3,s-8))
    # Dark upper cabinets
    for cx in [0,152,304,456,608,700]:
        d.rectangle([cx,30,cx+148,162], fill=(24,26,32))
        d.rectangle([cx+4,34,cx+144,158], fill=(28,30,36))
        d.ellipse([cx+68,100,cx+80,112], fill=(172,140,55))
    # Island countertop
    d.rectangle([120,278,680,360], fill=(40,38,34))
    d.rectangle([115,268,685,282], fill=(195,188,180))
    for mx in range(115,685,40):
        d.line([(mx,268),(mx+20,282)], fill=(175,168,160), width=1)
    # Pendant lights
    for px in [200,400,600]:
        d.line([(px,0),(px,162)], fill=(175,142,54), width=2)
        d.ellipse([px-24,158,px+24,202], fill=(195,160,60))
        for r in range(65,0,-4):
            frac=1.0-r/65; a=int(frac**2.0*55)
            d.ellipse([px-r,182-r,px+r,182+r],
                      fill=(min(255,195+int(frac*48)), min(255,155+int(frac*28)), int(50*frac)))
    # Range and hood
    d.rectangle([290,148,510,278], fill=(35,32,28))
    d.rectangle([252,100,548,152], fill=(24,22,20))
    for ty in range(152,278,14):
        for tx in range(292,508,20):
            off=10 if (ty//14)%2 else 0
            d.rectangle([tx+off,ty,tx+off+16,ty+11], fill=(65,62,58))
            d.line([(tx+off,ty),(tx+off+16,ty)], fill=(48,46,42), width=1)
    # Sink/faucet hint
    d.rectangle([335,270,445,282], fill=(150,145,138))
    d.ellipse([383,255,397,275], fill=(158,152,140))
    return finish(img2)

listing_kitchen().save(r'C:\frontline-estates\src\assets\listings\kitchen-1.jpg', quality=90)
print('Listing 3 saved')

# ─────────────────────────────────────────────────────────────────────────────
# LISTING 4 — Tudor exterior with dramatic sky
# ─────────────────────────────────────────────────────────────────────────────
def listing_tudor():
    W2,H2 = 800,600
    img2 = Image.new('RGB', (W2,H2))
    d = ImageDraw.Draw(img2)
    # Stormy sky
    for y in range(220):
        t=y/220; r=int(14+t*40); g=int(16+t*36); b=int(26+t*52)
        d.line([(0,y),(W2,y)], fill=(r,g,b))
    # Cloud layers
    for _ in range(12):
        cx2=random.randint(40,760); cy2=random.randint(15,160)
        for r in range(random.randint(25,60),0,-4):
            frac=1.0-r/60; a=int(frac*36)
            d.ellipse([cx2-r*2,cy2-r,cx2+r*2,cy2+r], fill=(32+a,34+a,46+a))
    # Stone facade
    BRICK_H = 34
    for row in range(12):
        by=200+row*BRICK_H
        for col in range(12):
            bx = col*70 + (18 if row%2 else 0)
            s=random.randint(52,78)
            d.rectangle([bx,by,bx+66,by+BRICK_H-3], fill=(s+4,s,s-4))
            d.line([(bx,by),(bx+66,by)], fill=(16,14,12), width=2)
            d.line([(bx,by),(bx,by+BRICK_H-3)], fill=(18,16,14), width=1)
    # Tudor timber frame
    for tx in [0,200,400,600,800]:
        d.line([(tx,80),(tx,440)], fill=(20,16,12), width=7)
    d.line([(0,150),(W2,150)], fill=(20,16,12), width=5)
    d.line([(0,240),(W2,240)], fill=(20,16,12), width=7)
    # Leaded windows
    for wx in [50,250,480,640]:
        d.rectangle([wx,170,wx+130,330], fill=(10,20,42))
        for lx in range(wx,wx+130,28):
            d.line([(lx,170),(lx,330)], fill=(22,36,60), width=3)
        for ly in range(170,330,42):
            d.line([(wx,ly),(wx+130,ly)], fill=(22,36,60), width=3)
        for r in range(32,0,-3):
            frac=1.0-r/32; a=int(frac**1.6*75)
            d.ellipse([wx+65-r,250-r,wx+65+r,250+r],
                      fill=(min(255,192+int(frac*46)), min(255,148+int(frac*28)), int(42*frac)))
    # Arched door
    d.rectangle([332,348,448,480], fill=(28,20,14))
    d.ellipse([332,310,448,368], fill=(28,20,14))
    d.ellipse([382,398,396,411], fill=(178,144,56))
    # Porch overhang
    d.rectangle([190,155,610,168], fill=(26,20,14))
    # Brick path
    for py in range(465,H2):
        for px in range(242,558,48):
            s=random.randint(58,78)
            d.rectangle([px+1,py,px+44,py+20], fill=(s+7,s,s-8))
    # Landscaping
    for y in range(455,H2):
        t=(y-455)/(H2-455)
        d.line([(0,y),(W2,y)], fill=(int(7+t*18),int(11+t*22),int(7+t*15)))
    for bx in [22,90,600,688]:
        for r in range(38,0,-3):
            s=random.randint(7,16)
            d.ellipse([bx-r,430-r//2,bx+r,430+r//2], fill=(s,s+3,s))
    return finish(img2)

listing_tudor().save(r'C:\frontline-estates\src\assets\listings\exterior-1.jpg', quality=90)
print('Listing 4 saved')
print('ALL DONE')
