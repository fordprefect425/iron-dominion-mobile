import os
import glob
from PIL import Image, ImageEnhance, ImageFilter

input_dirs = [
    '/Users/apple/Desktop/Railway Game/iron-dominion-mobile/game/public/assets/tiles/',
    '/Users/apple/Desktop/Railway Game/iron-dominion-mobile/game/public/assets/entities/'
]

def process_image(img_path):
    try:
        img = Image.open(img_path).convert('RGBA')
        
        # 1. Enhance Color (Vibrancy)
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(1.4)  # 40% more vibrant
        
        # 2. Enhance Contrast
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.2)  # 20% more contrast
        
        # 3. Slight sharpening for details
        img = img.filter(ImageFilter.SHARPEN)
        
        # 4. Warm Tone grading (subtly yellow/orange for steampunk feel)
        # We only apply color grading to non-transparent pixels
        datas = img.getdata()
        newData = []
        for item in datas:
            # item is (R, G, B, A)
            if item[3] > 0:
                r = min(255, int(item[0] * 1.05)) # Boost red slightly
                g = min(255, int(item[1] * 1.02)) # Boost green slightly
                b = int(item[2] * 0.95)           # Reduce blue slightly
                newData.append((r, g, b, item[3]))
            else:
                newData.append(item)
        img.putdata(newData)
        
        # Save back to the same file
        img.save(img_path, 'PNG')
        print(f"Enhanced {os.path.basename(img_path)}")
        return True
    except Exception as e:
        print(f"Failed to enhance {os.path.basename(img_path)}: {e}")
        return False

total_processed = 0
for d in input_dirs:
    for f in glob.glob(os.path.join(d, '*.png')):
        # Skip icon files or UI files if any accidentally mixed in
        if 'icon_' not in f:
            if process_image(f):
                total_processed += 1

print(f"Successfully enhanced {total_processed} files.")
