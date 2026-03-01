import os
import glob
from rembg import remove
from PIL import Image

src_dir = '/Users/apple/.gemini/antigravity/brain/eeb0e006-d6d6-4ed5-b930-946c49fc4888/'
dest_tiles = '/Users/apple/Desktop/Railway Game/iron-dominion-mobile/game/public/assets/tiles/'

os.makedirs(dest_tiles, exist_ok=True)

files_processed = 0
for path in glob.glob(src_dir + 'gentle_tile_*.png'):
    filename = os.path.basename(path)
    prefix = filename.rsplit('_', 1)[0]
    out_name = prefix.replace('gentle_', '') + '.png'
    out_path = os.path.join(dest_tiles, out_name)
        
    print(f"Processing {filename} -> {out_path}")
    try:
        input_img = Image.open(path)
        output_img = remove(input_img)
        # Crop to content
        bbox = output_img.getbbox()
        if bbox:
            output_img = output_img.crop(bbox)
        output_img.save(out_path)
        files_processed += 1
    except Exception as e:
        print(f"Failed {filename}: {e}")

print(f"Successfully processed {files_processed} gentle tiles.")
