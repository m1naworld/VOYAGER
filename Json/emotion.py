import json

index = [num for num in range(90)]

# 행복 질문
file_path = '행복질문.txt'
with open(file_path, encoding='utf-8') as f:
    lines = f.readlines()

happy_qs = [line.rstrip('\n') for line in lines]


# 분노 질문
file_path = '분노질문.txt'
with open(file_path, encoding='utf-8') as f:
    lines = f.readlines()

anger_qs = [line.rstrip('\n') for line in lines]

# 슬픔 질문
file_path = '슬픔 질문.txt'
with open(file_path, encoding='utf-8') as f:
    lines = f.readlines()

sad_qs = [line.rstrip('\n') for line in lines]

# 즐거움 질문
file_path = '즐거움 질문.txt'
with open(file_path, encoding='utf-8') as f:
    lines = f.readlines()

joy_qs = [line.rstrip('\n') for line in lines]


happy_list = []
for i in range(len(index)):
    happy_data = dict(index=index[i], qs=happy_qs[i])
    happy_list.append(happy_data)
happy_dict = dict(happy=happy_list)


anger_list = []
for i in range(len(index)):
    anger_data = dict(index=index[i], qs=anger_qs[i])
    anger_list.append(anger_data)
anger_dict = dict(anger=anger_list)


sad_list = []
for i in range(len(index)):
    sad_data = dict(index=index[i], qs=sad_qs[i])
    sad_list.append(sad_data)
sad_dict = dict(sad=sad_list)


joy_list = []
for i in range(len(index)):
    joy_data = dict(index=index[i], qs=joy_qs[i])
    joy_list.append(joy_data)
joy_dict = dict(joy=joy_list)


emotions = {**happy_dict, **anger_dict, **sad_dict, **joy_dict}
print(emotions)


# json dumping
with open('emotions.json', 'w', encoding='utf-8') as f:
    json.dump(emotions, f, ensure_ascii=False)
