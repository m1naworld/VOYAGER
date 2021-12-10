import json
li = []
with open("result.txt", "r") as f:
    with open("re.json", "w") as j:
        num = 0
        s = 0
        ls = []
        for x in f:
            js = {'index': num, "qs": x.replace("\n", "")}
            ls.append(js)
            num += 1
            if num == 3:
                l = {"label": s, "data": ls}
                s += 1
                li.append(l)
                ls = []
                num = 0
        json.dump(li, j, ensure_ascii=False)


print(li)
