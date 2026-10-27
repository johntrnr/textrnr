# textrnr — makes small, phone-friendly copies of images. skips ones that already exist.
#   posts/img/<f>        → posts/img/sm/<f>       (720px wide)
#   covers/<slug>.<ext>  → covers/thumbs/<slug>.jpg (160×200 crop)
# needs pillow (the publish action installs it). run: python3 thumbs.py
import os, glob
from PIL import Image, ImageOps

EXT = ('.jpg', '.jpeg', '.png', '.webp')

def small(src_dir, out_dir, width=720):
    os.makedirs(out_dir, exist_ok=True)
    for f in sorted(glob.glob(f'{src_dir}/*')):
        if not f.lower().endswith(EXT): continue
        out = f'{out_dir}/{os.path.basename(f)}'
        if os.path.exists(out): continue
        im = ImageOps.exif_transpose(Image.open(f))
        if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        if out.lower().endswith(('.jpg', '.jpeg')): im.convert('RGB').save(out, quality=78, optimize=True, progressive=True)
        else: im.save(out, optimize=True)
        print('made', out)

def cover_thumbs():
    os.makedirs('covers/thumbs', exist_ok=True)
    for f in sorted(glob.glob('covers/*')):
        if not f.lower().endswith(EXT): continue
        out = f'covers/thumbs/{os.path.splitext(os.path.basename(f))[0]}.jpg'
        if os.path.exists(out): continue  # delete a thumb to regenerate it
        ImageOps.fit(ImageOps.exif_transpose(Image.open(f)).convert('RGB'), (160, 200), Image.LANCZOS).save(out, quality=80, optimize=True)
        print('made', out)

if os.path.isdir('posts/img'): small('posts/img', 'posts/img/sm')
cover_thumbs()
