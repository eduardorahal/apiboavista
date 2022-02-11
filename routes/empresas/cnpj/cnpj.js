import fetch from "node-fetch";
import { readFileSync } from 'fs';


export function empresasPorCNPJ(request, response) {

    let cnpj = request.params.cnpj;
    const body_impala = readFileSync("./routes/empresas/cnpj/body_impala.json");
    const body1_impala = body_impala.toString();
    const newbody_impala = body1_impala.replace(/XXXXXXXXXXXXXX/gi, cnpj);
    let resp = [];
    let cookies = readFileSync("./cookies.txt");
    let token = readFileSync("./token.txt");

    fetch("https://boavista-dados.ciasc.sc.gov.br/notebook/api/execute/impala", {
      "headers": {
        "accept": "*/*",
        "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrftoken": token,
        "x-requested-with": "XMLHttpRequest",
        "cookie": cookies,
        "Referer": "https://boavista-dados.ciasc.sc.gov.br/hue/editor?editor=163507&type=impala",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": newbody_impala,
      "method": "POST"
    }).then((res) => res.json())
      .then((data) => {
        const id = data.history_id;
        const secret = encodeURIComponent(JSON.stringify(data.handle.secret));
        const session_guid = encodeURIComponent(JSON.stringify(data.handle.session_guid));
        
        const body_fetch = readFileSync("./routes/empresas/cnpj/body_fetch.json");
        const body1_fetch = body_fetch.toString();
        const newbody_fetch = body1_fetch.replace(/XXXXXXXXXXXXXX/gi, cnpj);
        const body_id = newbody_fetch.replace("IDIDID", id);
        const body_secret = body_id.replace(/secretsecretsecret/gi, secret);
        const body_session = body_secret.replace("sessionguidsessionguid", session_guid);

        fetch("https://boavista-dados.ciasc.sc.gov.br/notebook/api/fetch_result_data", {
          "headers": {
            "accept": "text/plain, */*; q=0.01",
            "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrftoken": token,
            "x-requested-with": "XMLHttpRequest",
            "cookie": cookies,
            "Referer": "https://boavista-dados.ciasc.sc.gov.br/hue/editor?editor=163529",
            "Referrer-Policy": "strict-origin-when-cross-origin"
          },
          "body": body_session,
          "method": "POST"
        }).then((data_1) => data_1.json())
          .then((data_2) => {
              for (let i = 0; i < data_2.result.data.length; i++){
                var temp = {};
                
                for (let j = 0; j < data_2.result.data[i].length; j++){
                  temp[data_2.result.meta[j].name] = JSON.parse(JSON.stringify(data_2.result.data[i][j]).replace(/&nbsp;/g," "));
                }
                resp.push(temp);
              }
              
              response.json(resp);
          }).catch((error) => console.log(error));
          
        
      }).catch((error) => console.log(error));

};