import wikipedia

# Specify the title of the Wikipedia page
wiki = wikipedia.page('Coronary artery bypass surgery')

# Extract the plain text content of the page, excluding images, tables, and other data.
text = wiki.content

# Replace '==' with '' (an empty string)
text = text.replace('==', '')

# Replace '\n' (a new line) with '' & end the string at $1000.
text = text.replace('\n', '')[:-12]
text = text.replace(',', '')
text = text.replace('"', '')
text = text.replace('/', '')
text = text.replace('(', '')
text = text.replace(')', '')
text = text.replace(' ', 'surgeon\n')
print(text)

# ========== 2. Using urllib & BeatifulSoup ==========
# Import packages
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re

# Specify url of the web page
source = urlopen('https://en.wikipedia.org/wiki/Coronary_artery_bypass_surgery').read()

# Make a soup 
soup = BeautifulSoup(source,'lxml')
soup

# Extract the plain text content from paragraphs
paras = []
for paragraph in soup.find_all('p'):
    paras.append(str(paragraph.text))

# Extract text from paragraph headers
heads = []
for head in soup.find_all('span', attrs={'mw-headline'}):
    heads.append(str(head.text))

# Interleave paragraphs & headers
text = [val for pair in zip(paras, heads) for val in pair]
text = ' '.join(text)

# Drop footnote superscripts in brackets
text = re.sub(r"\[.*?\]+", '', text)

# Replace '\n' (a new line) with '' and end the string at $1000.
text = text.replace('\n', '')[:-11]
text = text.replace(',', '')
text = text.replace('"', '')
text = text.replace('/', '')
text = text.replace('(', '')
text = text.replace(')', '')
text = text.replace(' ', 'surgeon\n')
print(text)