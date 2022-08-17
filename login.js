import axios from 'axios';
import util from 'node:util';
import { exec } from 'node:child_process';
const execute = util.promisify(exec);
import { writeFileSync } from 'node:fs';
import res from 'res';

    const get_login = async () => {
        await axios
            .get('https://boavista-dados.ciasc.sc.gov.br/hue/accounts/login/')
            .then(res => {
                let token = res.headers['set-cookie'][0].split(';')[0];
                let session = res.headers['set-cookie'][1].split(';')[0];
                post_login(token, session);
            })
            .catch(error => {
            console.error(error);
            }
        );
    }

    const post_login = async(token, session) => {
        const cmd = 
        `curl -X HEAD -i https://boavista-dados.ciasc.sc.gov.br/accounts/login/ -X POST -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0" -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8" -H "Accept-Language: en-US,en;q=0.5" -H "Accept-Encoding: gzip, deflate, br" -H "Content-Type: application/x-www-form-urlencoded" -H "Origin: https://boavista-dados.ciasc.sc.gov.br" -H "Connection: keep-alive" -H "Referer: https://boavista-dados.ciasc.sc.gov.br/hue/accounts/login/?next=/" -H "Cookie: ${token}; ${session}; _ga=GA1.4.386469824.1660134747; _gid=GA1.4.1790371126.1660134747; ROUTEID=.hue-HUE_SERVER-5e2ebd27a47c2409444922b2bb136bb9" -H "Upgrade-Insecure-Requests: 1" -H "Sec-Fetch-Dest: document" -H "Sec-Fetch-Mode: navigate" -H "Sec-Fetch-Site: same-origin" -H "Sec-Fetch-User: ?1" --data-raw "csrfmiddlewaretoken=${token.split('=')[1]}&username=rodrigoschneider-pc&password=1350bmf&server=LDAP&next=/"`;
        try {
            const { stdout } = await execute(cmd);
            token = stdout.split('csrftoken=')[1].split(';')[0];
            session = stdout.split('sessionid=')[1].split(';')[0];
            writeFileSync('./token.txt', token);
            writeFileSync('./cookies.txt', 'csrftoken=' + token + ';' + 'sessionid=' + session + ';');
        } catch(err) {
            console.log("ERRO");
        }
    }

    export default get_login();

