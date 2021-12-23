import requests
from bs4 import BeautifulSoup

connect_page = "https://boavista-dados.ciasc.sc.gov.br/notebook/api/execute/impala"
connect_page_headers = {
    'Host': 'boavista-dados.ciasc.sc.gov.br',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
    'Accept': '*/*',
    'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRFToken': 'bDxVFsonkGQZgMs8PNC4Yx9Jye1zIsef',
    'Content-Length': '8094',
    'Origin': 'https://boavista-dados.ciasc.sc.gov.br',
    'Connection': 'keep-alive',
    'Referer': 'https://boavista-dados.ciasc.sc.gov.br/hue/editor?editor=162845&type=impala',
    'Cookie': 'csrftoken=bDxVFsonkGQZgMs8PNC4Yx9Jye1zIsef; sessionid=da25ux16kyadaidpl1e7n47jokmidsqj; _ga=GA1.4.1115429764.1640097801; _gid=GA1.4.1377285002.1640097801; _gat=1; ROUTEID=.hue-HUE_SERVER-5e2ebd27a47c2409444922b2bb136bb9',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    }


payload = {
    'notebook': {"statement": "show databases"}
    }

get_connect_token = requests.get(connect_page, connect_page_headers, data=payload)
print(get_connect_token.status_code)
print(get_connect_token.headers)
print(get_connect_token.text)