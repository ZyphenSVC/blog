 #!/usr/bin/env python

import zipfile 
import os

dictionary = 'breakingbad.txt' 
 
password = None 

while True:
    for fname in os.listdir('.'):
        if fname.endswith('.zip'):
            fname = zipfile.ZipFile(fname)
            with open(dictionary, 'r') as f:
                for line in f.readlines():
                    password = line.strip('\n') 
                    try: 
                          fname.extractall(pwd=password)
                          print(fname.getinfo())
                          password = 'Password found: %s' % password 
                          print (password) 
                    except: 
                          pass 