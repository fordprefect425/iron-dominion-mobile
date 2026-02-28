from PIL import Image
import sys
import glob

def remove_white_bg(path):
    img = Image.open(path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # Replace white (or near white) with transparent
    for item in datas:
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(path, "PNG")

for path in glob.glob(sys.argv[1]):
    print(f"Processing {path}")
    remove_white_bg(path)
