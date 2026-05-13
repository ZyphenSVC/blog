#import sympy
#import gmpy2
#from rsasim.gcd_utils import xgcd
#import binascii

# decide which answer to choose
#def choose(lst):
#    for i in lst:
#        print(i)
#        binary = bin(i)
#        append = binary[-16:]   # take the last 16 bits
#        print(binary)
#        print(append)
#        binary = binary[:-16]   # remove the last 16 bits
#        print(binary)
#        print(append)
#        if append == binary[-16:]:
#            print("test")
#            return i
#    return

def sqrt_p_3_mod_4(a, p):
    r = pow(a, (p + 1) // 4, p)
    return r


# Find SQROOT in Zp where p = 5 mod 8
def sqrt_p_5_mod_8(a, p):
    d = pow(a, (p - 1) // 4, p)
    r =0
    if d == 1:
        r = pow(a, (p + 3) // 8, p)
    elif d == p - 1:
        r = 2 * a * pow(4 * a, (p - 5) // 8, p) % p

    return r

def sqrt_p_5_mod_8(a, p):
    d = pow(a, (p - 1) // 4, p)
    r =0
    if d == 1:
        r = pow(a, (p + 3) // 8, p)
    elif d == p - 1:
        r = 2 * a * pow(4 * a, (p - 5) // 8, p) % p

    return r

def egcd(a, b):
    if a == 0:
        return b, 0, 1
    else:
        gcd, y, x = egcd(b % a, a)
        return gcd, x - (b // a) * y, y

c = 7393133392978435017631606326669002945645049245575327455199891934940471127163421964825217371440398090013070393620687586475550331584874262094419639415630197
n = 8299675369438719692429346867124546707751640425816191732040675610043554481287075447992524087489203341094226350053164998077984358117605583398826976109566041

p = 109397118167414659469854315698685280846395418815987835066487939223142947575863
q = 75867404082230064535529769847035529139210898256190940050437960991947122945007
assert(p * q == n)

r, s = 0, 0

if p % 4 == 3:
    r = sqrt_p_3_mod_4(c, p)
elif p % 8 == 5:
    r = sqrt_p_5_mod_8(c, p)

if q % 4 == 3:
    s = sqrt_p_3_mod_4(c, q)
elif q % 8 == 5:
    s = sqrt_p_5_mod_8(c, q)

gcd, c, d = egcd(p, q)
x = (r * d * q + s * c * p) % n
y = (r * d * q - s * c * p) % n

lst = [x, n - x, y, n - y]

#mp = pow(c, int((p+1)/4), p)
#mq = pow(c, int((q+1)/4), q)
#g, yp, yq = xgcd(p, q)
#
#r = (yp*p*mq + yq*q*mp) % n
#mr = n - r
#s = (yp*p*mq - yq*q*mp) % n
#ms = n - s

plaintext = lst[0]
plaintext2 = lst[1]
plaintext3 = lst[2]
plaintext4 = lst[3]
print(plaintext)
print(plaintext2)
print(plaintext3)
print(plaintext4)
string = bin(plaintext)
string2 = bin(plaintext2)
string3 = bin(plaintext3)
string4 = bin(plaintext4)
#string = binascii.unhexlify(format(plaintext, 'x')).decode()
#string = string[:-16]
plaintext = int(string, 2)
plaintext2 = int(string2, 2)
plaintext3 = int(string3, 2)
plaintext4 = int(string4, 2)
plaintext = str(hex(plaintext))[2:]
plaintext2 = str(hex(plaintext2))[2:]
plaintext3 = str(hex(plaintext3))[2:]
plaintext4 = str(hex(plaintext4))[2:]
plaintext = bytearray.fromhex(plaintext).decode()
#plaintext2 = bytearray.fromhex(plaintext2).decode()
#plaintext3 = bytearray.fromhex(plaintext3).decode()
#plaintext4 = bytearray.fromhex(plaintext4).decode()
print(plaintext)
print(plaintext2)
print(plaintext3)
print(plaintext4)