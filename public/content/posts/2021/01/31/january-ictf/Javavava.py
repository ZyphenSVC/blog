ct = "225 212 245 216 257 222 139 244 139 196 225 76 196 212 97 97 247 280"
ct_list = ct.split()
msg=''
for i in ct_list:
    num = int(i)
    xored = (ct_list.index(i)^15)
    half = (num-xored) / 2
    x = chr(int(half))
    msg += x
print("flag: " + msg)