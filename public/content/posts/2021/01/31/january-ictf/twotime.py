def bxor(b1: bytes, b2: bytes) -> bytes:
    key = bytes([a ^ b for a, b in zip(b1, b2)])
    return key

def invert(b: bytes) -> bytes:
    return bytes([~x & 0xff for x in b])

def encrypt(key: bytes, ptxt: bytes) -> str:
    assert len(ptxt) % len(key) == 0, f'Lengths don\'t work: {len(key)}, {len(ptxt)} :('
    ctxt = bytes([a ^ b for a, b in zip(key, ptxt)])
    return ctxt.hex()


message1 = b'I am creative with my plaintexts'
ctxt1 = bytes.fromhex('28732169e171c93897eca4e904ab55b6')
ctxt2 = bytes.fromhex('08303462ba6a8b2fa9a9bec00fbb5680')
pad = b'\xff'*16

key = bytes.fromhex(encrypt(ctxt1, message1))

message2 = bytes.fromhex(encrypt(key, ctxt2))
print(message2)

assert(len(key)==16)

k1k2 = bxor(key, pad)
a = k1k2[:8]
secret = invert(bxor(k1k2[8:], a))
print(secret)