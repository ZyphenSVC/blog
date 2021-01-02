from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="zyphen")
#location = geolocator.reverse("52.509669, 13.376294")

locations = ""
with open("enc.txt") as f:
    locations = f.read()

loclist = locations[1:][:-1].split(")(")
print("performing lookups")
output = [geolocator.reverse((loc),language="en-gb").raw["address"]["country"] for loc in loclist]
print(output)
flag = "ictf{"
for country in output:
    flag = flag + country[0]
flag = flag + "}"
print(flag)