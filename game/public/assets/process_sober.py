import os
import glob
from PIL import Image, ImageEnhance

# We are going to process the existing gentle tiles and make them sober
src_dir = '/Users/apple/.gemini/antigravity/brain/eeb0e006-d6d6-4ed5-b930-946c49fc4888/'
dest_tiles = '/Users/apple/Desktop/Railway Game/iron-dominion-mobile/game/public/assets/tiles/'

def make_sober(img):
    # Convert to RGBA if not already
    img = img.convert("RGBA")
    
    # Lower color saturation drastically Make it very muted
    converter = ImageEnhance.Color(img)
    img = converter.enhance(0.3)
    
    # Lower contrast to make it flatter
    converter = ImageEnhance.Contrast(img)
    img = converter.enhance(0.7)
    
    # Increase brightness slightly to make it pastel/gentle
    converter = ImageEnhance.Brightness(img)
    img = converter.enhance(1.15)
    
    return img

files_processed = 0
for path in glob.glob(src_dir + 'gentle_tile_*.png'):
    filename = os.path.basename(path)
    prefix = filename.rsplit('_', 1)[0]
    out_name = prefix.replace('gentle_', '') + '.png'
    out_path = os.path.join(dest_tiles, out_name)
        
    print(f"Sobering {filename} -> {out_path}")
    try:
        # We process the ALREADY CROPPED AND BACKGROUND REMOVED files from dest_tiles 
        # Wait, the ones in dest_tiles are already background removed. Let's process those directly!
        with Image.open(out_path) as img:
            sober_img = make_sober(img)
            sober_img.save(out_path)
        files_processed += 1
    except Exception as e:
        print(f"Failed {out_name}: {e}")

print(f"Successfully processed {files_processed} sober tiles.")
