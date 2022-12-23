import axios from "axios";
import { baseUrl } from "navigation";
// import { headers } from "next.config";
var JSAlert = require("js-alert");


export const service_iframe_func = async function(el) {
        const data = el.target.value
        let url_pattern = ''
        if (data != 'false') {
            const json_parse = JSON.parse(data)
            const {template, crud_name} = json_parse
            await queryBuilder(json_parse).then(data => {
                url_pattern = data
            })
            const href_url = `/template/${crud_name}/${url_pattern}`;
            const iframe_obj = `<iframe src='${href_url}'></iframe>`
            document.getElementById('gt').innerHTML = iframe_obj;
        }
        
    }


    export const _iframe_func = async function(el) {
      el.preventDefault();
        const href =  el.target.href;
        
        const container = el.target.dataset['container']
        const iframe_obj = `<iframe src='${href}'></iframe>`
        document.getElementById(container).innerHTML = iframe_obj;
    }

  

  // toggling request flag status
  export const request_action_btn = async function(el) {
    el.preventDefault()
    const url = el.target.href;
    await axios({
        url:url,
        method:'PUT',
        headers: {
          'Content-Type':'application/json'
        }
    }).then(data => {
      // JSAlert.alert(`${JSON.stringify(data.data)}`)
        if(document) {
            document.location.reload()
        }
    }).catch(data => {
        JSAlert.alert(`${JSON.stringify(data.message)}`)
    })
      
  }


  // for building anchor querys from object
  // e.g const obj = {'id':1, 'cred_name':'name'}
  export const queryBuilder = async function(obj) {
         let cred_k = ""
      // this will form the request parameter 
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                cred_k += `&${key}=${element}`
            }
        }
        if (cred_k.startsWith('&')) {
            const filtered_query = cred_k.replace('&', '?')
            return filtered_query;
        }
        

  }


export const registrationForm = async function(el) {
      el.preventDefault()
      const username = el.target.username.value;
      const password = el.target.password.value;
      
      const url = `${baseUrl.local}/token`
 
      await axios({
          url:url,
          method:'POST',
          headers: {
            'Content-Type':'application/json',
          },
          data:{username,password}
      }).then(data => {
          const status = data.data.status
          
          if(status != false) {
              const token_access = data.data.access_token
              document.cookie = setCookie('user_token',token_access,1 )
              JSAlert.alert("Logging..., please wait");
              window.location.href = "/dashboard"
          }else{
              JSAlert.alert(`${data.data.statusText}`)
          }
      })
  }

export async function get_xrh_data(xrh_url = '', is_single_url=true) {
    const base_url = is_single_url? `${baseUrl.local}/${xrh_url}` : xrh_url;
    const Headers = {
      'Content-Type':'application/json',
    }
    const obj = await axios({
        url:base_url,
        method:'GET',
        headers: Headers,
    })
    return obj;
}



export async function delete_xrh_data(path = '') {
    if(window && window.confirm("Are you sure?")) {
         const base_url = path;
          const Headers = {
            'Content-Type':'application/json',
          }
          const obj = await axios({
              url:base_url,
              method:'delete',
              headers: Headers,
          }).then(data => {
            JSAlert.alert(JSON.stringify(data.data.message))
        }).catch(error => {
            JSAlert.alert(JSON.stringify(error.message))
        })

      // return obj;
    }
   
}




// for registering services

let json_key_container = []
let json_value_container = []

export const register_form = async function(el) {
    el.preventDefault()
    json_key_container.length = 0
    json_value_container.length = 0
    const elements = await el.target.elements;
    const form_code = await el.target.form_code.value
    const form_title = await el.target.form_title.value
    const service_code = await el.target.service_code.value
    const services_id = await el.target.services_id.value
    const service_name = await el.target.service_name.value
    const branch_id = await el.target.branch_id.value
    const user_id = await el.target.user_id.value

    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
        if(element.name != "" && element.value != "") {
            json_key_container.push(element.name)
            json_value_container.push(element.value)
        }
    }

    let key_stringified = JSON.stringify(json_key_container);
    let value_stringified = JSON.stringify(json_value_container);

    const url2 = `${baseUrl.local}/service_product`
    await axios({
      url:url2,
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      data: {
        'data_key': key_stringified,
        'data_value': value_stringified,
        'form_code':form_code,
        'form_title':form_title,
        'service_code':service_code,
        'service_name':service_name,
        'services_id':services_id,
        'branch_id':branch_id,
        'user_id':user_id,  
      }
    }).then(data => {
        JSAlert.alert(JSON.stringify(data.data.message))
    }).catch(error => {
        JSAlert.alert(JSON.stringify(error.message))
    })
    
}




export const register_extra_form_data = async function(el) {
    el.preventDefault()
    json_key_container.length = 0
    json_value_container.length = 0
    const elements = await el.target.elements;
    const form_code = await el.target.form_code.value
    const form_title = await el.target.form_title.value
    

    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
        if(element.name != "" && element.value != "") {
            json_key_container.push(element.name)
            json_value_container.push(element.value)
        }
    }

    let key_stringified = JSON.stringify(json_key_container);
    let value_stringified = JSON.stringify(json_value_container);

    const url2 = el.target.action;
    await axios({
      url:url2,
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      data: {
        'data_key': key_stringified,
        'data_value': value_stringified,
        'form_code':form_code,
        'form_title':form_title,
      }
    }).then(data => {
        JSAlert.alert(JSON.stringify(data.data.message))
    }).catch(error => {
        JSAlert.alert(JSON.stringify(error.message))
    })
    
}


export async function settings_form(el) {
  el.preventDefault()
  const elements = await el.target.elements;
  const method_d = el.target.method;
  const data = await object_json(elements)

  const url2 = el.target.action;
  // console.log(url2)
  await axios({
      url:url2,
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        "Access-Control-Allow-Origin":"*",
        // "Access-Control-Allow-Methods":"DELETE, POST, GET, OPTIONS",
        // "Access-Control-Allow-Headers":"Content-Type, Authorization, X-Requested-With"
      },
      data: data
    }).then(data => {
        JSAlert.alert(JSON.stringify(data.data.message))
    }).catch(error => {
        JSAlert.alert(JSON.stringify(error.message))
    })
}

export async function update_xhr_data(el) {
  el.preventDefault()
  const elements = await el.target.elements;
  const data = await object_json(elements)
  const url2 = el.target.action;
  await axios({
      url:url2,
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      data: data
    }).then(data => {
        JSAlert.alert(JSON.stringify(data.data.message))
    }).catch(error => {
        JSAlert.alert(JSON.stringify(error.message))
    })
}


export async function update_xhr_data_with_data(url, data={}) {
  await axios({
      url:url,
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      data: data
    }).then(data => {
        JSAlert.alert(JSON.stringify(data.data.message))
    }).catch(error => {
        JSAlert.alert(JSON.stringify(error.message))
    })
}




export async function _settingFormWithConfirmationPrompt(el) {
  el.preventDefault()
  const elements = await el.target.elements;
  const method_d = el.target.method;
  const data = await object_json(elements)
  const url2 = el.target.action;
  if(window) {
    if(window.confirm('Are you Sure!')) {
          await axios({
            url:url2,
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            data: data
          }).then(data => {
              JSAlert.alert(JSON.stringify(data.data.message))
          }).catch(error => {
              JSAlert.alert(JSON.stringify(error.message))
          })
    }else{
      JSAlert.alert("Cancelled")
    }
  }
  
}





export async function authentication(el) {
  el.preventDefault()
  const elements = await el.target.elements;
  const method_d = el.target.method;
  const data = await object_json(elements)
  let counter = 0;
  const url2 = el.target.action;
  const methd = `${el.target.method}`.toUpperCase();
  
  // setTimeout( () => {
  //   let t = counter 
  // }, 2)

  await axios({
      url:url2,
      method: methd,
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
      },
      data: data
    }).then(data => {
      const response = data.data;
      function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
      if (window && document) {
        if (response.status == true) {
          setCookie('user_token', response.access_token, 1);
          setCookie('user_status', response.status, 1);
          document.location.assign('/dashboard')
        }    
      }

    }).catch(error => {
      // console.log(error);
      const message =  `
        Invailed User credentials.
        ${error.message}
      `
      JSAlert.alert(JSON.stringify(message))
    })
}


export async function authentication_token(url, cookie_token) {
  let container = []

  const defaultOptions = {
    headers:{
      "Content-Type":'application/json',
    "Authorization" : `Bearer ${cookie_token}`
    }
  };
  const req = await fetch(url, defaultOptions)
  const response = await req.json()
  if (response.detail === undefined) {
      return {...response, status:true}
  }else {
    return {status:false};
  }
}




async function object_json(elements) {
  let obj = {}
  for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
        if(element.name != "" && element.value != "") {
            obj[element.name] = element.value;
        }
    }
    return obj;
}



export async function serialized_json(elements) {
  let obj = {}
  for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
        if(element.name != "" && element.value != "") {
            obj[element.name] = element.value;
        }
    }
    return obj;
}



export function randomize() {
    const rand = Math.floor(Math.random() * 1000)
    return rand;
}


export async function CustomIframe(url, data_param, modal_title) {
        
        if (data_param != 'false') {
            const href_url   = `${url}/${data_param}`;
            const iframe_obj = `<iframe src='${href_url}'></iframe>`;
            document.getElementById('modal_element').innerHTML = iframe_obj;
            document.getElementById('modal_title').innerText = modal_title;
        }
}


export async function CalculatePercentage(percent=0, price) {
    return percent / 100 * parseFloat(price);
}


export async function CalculatePercentageArea(percent=0, price=0.00, area=0) {
  const area_total = parseInt(area) * parseFloat(price);
  return percent / 100 * area_total;
}



function defaultFun(params) {
  // 
}

export function EstateParamBtn(name,is_btn=true,data_toggle,data_target,
  on_click, data_url, data_modal_title, btn_color){
  this.name = name;
  this.is_btn = is_btn;
  this.data_toggle = data_toggle;
  this.data_target = data_target;
  this.on_click = on_click;
  this.data_url = data_url;
  this.data_modal_title = data_modal_title;
  this.btn_color = btn_color;
  this.on_click = on_click;

}

// estate plot button parameter
export function EstatePlotBtn(name,btn_color,is_btn=false,message,url, data_modal_title, on_click) {
  this.name = name;
  this.btn_color = btn_color;
  this.is_btn = is_btn;
  this.message = message;
  this.url =url;
  this.data_modal_title = data_modal_title;
  this.on_click = on_click;
}


