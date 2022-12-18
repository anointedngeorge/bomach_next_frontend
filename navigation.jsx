export  const NAVIGATION = [
    {id:'dashboard', name:'Dashboard', 
    icon:'', href:'/dashboard', 'has_dropdown':false, sub:[]},    
    {name:'Real Estate', icon:'', href:'', 'has_dropdown':true, sub:[
        {name:'Create Estate', 
        href:'/realestate/create?param=realestate&title=Real Estate Section', icon:''},
        {name:'View Estate', 
        href:'/realestate/view?param=realestate&title=View All Real Estates', icon:''}
    ]},

    {id:'customer', name:'Customer', icon:'', href:'', 'has_dropdown':true, sub:[
        {name:'Create Customer', 
        href:'/customer/create?param=customer&title=Customer Section', icon:''},
        {name:'View customer', 
        href:'/customer/view?param=customer&title=View All Customer', icon:''}
    ]},
    
    {id:'employee',name:'Employee', icon:'', href:'', 'has_dropdown':true, sub:[
        {name:'Create Employee', 
        href:'/employee/create?param=employee&title=Employee Section', icon:''},
        {name:'View employee', 
        href:'/employee/view?param=employee&title=View All Employee', icon:''}
    ]},

    {id:'settings',name:'Settings', icon:'', href:'', 'has_dropdown':true, sub:[
        {name:'Create Form Fields', 
        href:'/settings/formfield?param=formfield&title=Create Form Field', icon:''},
        {name:'Alter Formfields', 
        href:'/settings/formfieldsettings?param=formfield&title=Edit Form Field', icon:''},
        {name:'Create Forms', 
        href:'/settings/forms?param=forms&title=Create Form', icon:''},

        // {name:'websocket', 
        // href:'/settings/websocket?param=websocket&title=Create websocket', icon:''},
        
    ]}
]

export const SERVICES = [
    {id:'realestate', name:'Real Estate'},
    {id:'realestateplot', name:'Real Estate Plot'},
    {id:'customer', name:'Customer'},
    {id:'employee', name:'Employee'},
]


export const baseUrl = {}

export const FORMTYPE = [
    'text', 'datetime', 'email','number',
    'date', 'color', 'tel','password'
]
