
import sys
from PIL import Image
from rembg import remove
import base64
from io import BytesIO


image_path = sys.argv[1]
    
# Processing the image 
input = Image.open(image_path) 
  
# Removing the background from the given Image 
output = remove(input) 

buffered = BytesIO()
output.save(buffered, format="PNG")
img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

print(img_str)
