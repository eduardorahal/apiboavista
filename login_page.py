import requests
from bs4 import BeautifulSoup

login_page = "https://boavista-dados.ciasc.sc.gov.br/hue/accounts/login/?fromModal=true"
login_page_headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }

get_login_token = requests.get(login_page, login_page_headers)
print(get_login_token.status_code)
print(get_login_token.headers)