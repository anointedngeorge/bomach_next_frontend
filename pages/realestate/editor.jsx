import CKeditor from "components/Ckeditor";
import { useEffect, useState } from "react";




export default function CkEditor() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [dataset, setData] = useState("");
useEffect(() => {
    setEditorLoaded(true);
  }, []);

  
  return (

    <form>
        <div className="col-md-12 mt-4">
        <div className="col-md-12">
        <div className='form-group'>
            <label>Property Title</label>
            <select className='form-control form-control-sm' >
                <option value={'deed_of_assignment'}>Deed Of Assignment</option>
                <option value={'power_of_attorney'}>Power Of Attorney</option>
                <option value={'registered_survery_plan'}>Registered Survey Plan</option>
                <option value={'contract_of_sales'}>Contracts Of Sales (Offer Letter)</option>
            </select>
        </div>
        </div>
      
        <div className="col-md-12">
        <CKeditor
           
            name="property_title"
            onChange={(data) => {
            setData(data);
            }}
            editorLoaded={editorLoaded}
        />
        {/* {JSON.stringify(dataset)} */}
        </div>

        <div className="col-md-12 mt-4">
            <div className="form-group">
            <input 
                    className="btn btn-lg btn-warning btn-block"
                    type={'submit'} 
                    value="Create Property title" />
            </div>
        </div>

        </div>

        
    </form>

  );
}