import { system_date } from 'functions';
import React, { useState } from 'react'
import { BsCardChecklist, BsPrinter } from 'react-icons/bs'


export const Remita = ({
    sent_link='', 
    receive_link='',
    querys={},
    content=[],
  
}) => {
    let counter = 1;
    let res = 0;
    const [pricetotal, setPrice] = useState(0)
    let total_price = 0;
    let container = [];
    async function print_area() {
        if (document && window) {
            // const printerArea = document.getElementById('remita_printer_area');
            // document.write(printerArea.innerHTML);
            window.print();
        }
    }

    let str = "bomach123873odfuHGLKIGGSHWTWRQNHFGSDSDS3sdafasdasdasd34fsdfgdf";
    let remita_code = str.split('').sort(function(){return 0.5-Math.random()}).join('').substring(0,9);

    async function calculateSum(params) {
        container = []
        if (document) {
            let pricedata = document.querySelectorAll('.pricelist');
            pricedata.forEach((data,i) => {
                let re = parseFloat(pricedata[i].innerHTML);
                container.push(re)
              
            })
        }

        // console.log(container);
        container.reduce((total,num,indx,arr) => {
            res = total + num;
            setPrice(res)
            return res;
        })
    }

    async function confirm_remita_payment(params) {
        if (window && document) {
            
            if (window.confirm("Are you sure?")) {
                // 
            }else {
                // 
            }
        }
    }


  return (
    <div className='container m-4' onMouseOver={calculateSum}  >
        <div className='p-3 shadow' id='remita_printer_area'>
        <div className='row' >
        {/* <div className='col-md-12'><p>Remita Code:</p></div> */}
            <div className='col-md-6'><h5>{`${querys.name}`.toUpperCase()}</h5></div>
            <div className='col-md-6'><h5>Date: {system_date()}</h5></div>
            
        </div>
        <table className='table table-sm table-striped' border={0.1}>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Name</td>
                    <td>Price</td>
                </tr>
            </thead>
            <tbody>
            {content.map((data, i) => {
                return (
                <tr key={`id_daadae_${i}`}>
                    <td>{counter + i}</td>
                    <td>{`${data.name}`.toUpperCase()}</td>
                    <td># <span className='pricelist'>{data.price}</span></td>
                </tr>
                )
            })}
              
            </tbody>
            <tfoot>
            <tr>
                    <td><b>Summary</b>:</td>
                    <td></td>
                    <td><b>
                    #{pricetotal}
                    </b></td>
                </tr>
            </tfoot>

        </table>
        <div className='col-md-12'>
            <p className='text '>
                <b>Account Details</b><br />
                Account Name:<b>Bomach Shelters & Property ltd</b> <br />
                Account Number:<b>1024196681</b> <br />
                Bank Name:<b>United Bank of Africa (UBA)</b> <br />
            </p>
            
        </div>
        </div>
        <div className='mt-3'>
            <button id='remita_print_btn' onClick={print_area} className='remita_print_btn btn btn-sm btn-white border shadow'>
                <BsPrinter className='mr-1' />
                Print Remita
            </button>

            <button  onClick={confirm_remita_payment} data-uuid={querys.id} className='remita_print_btn btn btn-sm btn-warning border shadow'>
                <BsCardChecklist className='mr-1' />
                Confirm Remita Payment
            </button>
        </div>
    </div>
  )
}
