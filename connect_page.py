import requests
from bs4 import BeautifulSoup
import json

connect_page = "https://boavista-dados.ciasc.sc.gov.br/hue/accounts/login/?fromModal=true"
connect_page_headers = {
    'Host': 'boavista-dados.ciasc.sc.gov.br',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '119',
    'Origin': 'https://boavista-dados.ciasc.sc.gov.br',
    'Connection': 'keep-alive',
    'Referer': 'https://boavista-dados.ciasc.sc.gov.br/hue/accounts/login/?next=/',
    'Cookie': 'csrftoken=OttZzhKkbCTnha6HxG8NvWbYiW5g4BsN; sessionid=rhudkri84tjo6c9pmlm3zz0vf2gbiqrx',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    }

payload = 'username=rodrigoschneider-pc&password=1350bmf&server=LDAP&csrfmiddlewaretoken=OttZzhKkbCTnha6HxG8NvWbYiW5g4BsN&next=/'

get_connect_token = requests.post(
    connect_page, 
    connect_page_headers, 
    data=payload
    )
print(get_connect_token.status_code)
print(get_connect_token.headers)