import json

with open("search_test.json", 'r', encoding="utf-8") as file:
    data = json.load(file)

matches = data["visual_matches"]
for test_match in matches:
    print(test_match["title"])
    print(test_match["link"])
    print(test_match["image"])
    print(test_match["image_width"])
    print(test_match["image_height"])

    if "price" in test_match:
        print(test_match["price"])