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
        "x-csrftoken": "LyC6Q2p0BAFliVdOnqUVE9IiZO64MUUS",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "_ga=GA1.4.546366442.1640611731; _gid=GA1.4.159862798.1640789795; csrftoken=LyC6Q2p0BAFliVdOnqUVE9IiZO64MUUS; sessionid=4gszm549by2p37aoscbmpyhmzbmfgwyd; ROUTEID=.hue-HUE_SERVER-5e2ebd27a47c2409444922b2bb136bb9",
        "Referer": "https://boavista-dados.ciasc.sc.gov.br/hue/editor?editor=163507&type=impala",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": newbody_impala,
      "method": "POST"
    }).catch((error) => console.log(error))
      .then((res) => res.json())
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
            "x-csrftoken": "LyC6Q2p0BAFliVdOnqUVE9IiZO64MUUS",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "_ga=GA1.4.546366442.1640611731; _gid=GA1.4.159862798.1640789795; csrftoken=LyC6Q2p0BAFliVdOnqUVE9IiZO64MUUS; sessionid=4gszm549by2p37aoscbmpyhmzbmfgwyd; ROUTEID=.hue-HUE_SERVER-5e2ebd27a47c2409444922b2bb136bb9",
            "Referer": "https://boavista-dados.ciasc.sc.gov.br/hue/editor?editor=163529",
            "Referrer-Policy": "strict-origin-when-cross-origin"
          },
          "body": body_session,
          "method": "POST"
        }).catch((error) => console.log(error))
          .then((data_1) => data_1.json())
          .then((data_2) => {
              for (let i = 0; i < data_2.result.data.length; i++){
                  resp.push(data_2.result.data[i]);
              }
              response.json(resp);
          })
          
        
      })

};

pesquisaCPF.catch(function () {
  console.log("Promise Rejected");
});




