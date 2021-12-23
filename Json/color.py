import cv2
import json

img = cv2.imread('color.png')

realimg = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
# print(realimg)
# print(realimg.shape)
# print(realimg.size)


def rgb2hex(r, g, b):
    return "#{:02x}{:02x}{:02x}".format(r, g, b)


color_data = []
for i in range(51):
    color_list = []
    for j in range(51):
        a = realimg[i][j]
        r = a[0]
        g = a[1]
        b = a[2]
        color_list.append(rgb2hex(r, g, b))
    color_data.append(color_list)
with open("colors.json", "w") as f:
    data = []
    for x, colors in enumerate(color_data):
        for y, color in enumerate(colors):
            print(f"({x}, {y})")
            j = {"position": (x, y), "color": color}
            data.append(j)
    json.dump({"colors": data}, f)
# {position : (x , y) , color : "color"}
    # f.close()
# print(color_data)
