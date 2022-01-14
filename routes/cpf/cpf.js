import fetch from "node-fetch";
import { readFileSync } from 'fs';


export function pesquisaCPF(request, response) {

    let cpf = request.params.cpf;
    const body_impala = readFileSync("./routes/body_impala_cpf.json");
    const body1_impala = body_impala.toString();
    const newbody_impala = body1_impala.replace(/XXXXXXXXXXX/gi, cpf);
    let resp = [];

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
        "x-csrftoken": "KfzbwgIVJ3cjkhS4UHohxfFnstPTjuJv",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "_ga=GA1.4.546366442.1640611731; _gid=GA1.4.724433356.1642087103; _gat=1; csrftoken=KfzbwgIVJ3cjkhS4UHohxfFnstPTjuJv; sessionid=9vjmnpa21aymg5r75pm1gnqo7l76czj0; ROUTEID=.hue-HUE_SERVER-5e2ebd27a47c2409444922b2bb136bb9",
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
        
        const body_fetch = readFileSync("./routes/body_fetch_cpf.json");
        const body1_fetch = body_fetch.toString();
        const newbody_fetch = body1_fetch.replace(/XXXXXXXXXXX/gi, cpf);
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
            "x-csrftoken": "KfzbwgIVJ3cjkhS4UHohxfFnstPTjuJv",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "_ga=GA1.4.546366442.1640611731; _gid=GA1.4.724433356.1642087103; _gat=1; csrftoken=KfzbwgIVJ3cjkhS4UHohxfFnstPTjuJv; sessionid=9vjmnpa21aymg5r75pm1gnqo7l76czj0; ROUTEID=.hue-HUE_SERVER-5e2ebd27a47c2409444922b2bb136bb9",
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