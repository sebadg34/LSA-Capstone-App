import { extend } from 'vee-validate';

extend('rut', value => {
    value = value.replace(/\./g, "");
    if(value.indexOf('-') > -1)
    {
        console.log('sucess');
    }
    else
    {
       value = value.replace(/(.)$/, "-$1");
    }
    value = value.replace("‐","-");
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( value ))
        return 'Debe ingresar un RUT válido.';
    var tmp     = value.split('-');
    var digv    = tmp[1];
    var rut     = tmp[0];
    if ( digv == 'K' ) digv = 'k' ;
    if(dv(rut)== digv)
    {
        return true;
    }else
    {
      return 'Debe ingresar un RUT válido.';
    }

});

extend('rutSinPuntoGuion', value => {
if (value.match(/^[a-zA-Z0-9]+$/) !== null){
  return true;
}else{
  return 'Debe ingresar el RUT sin puntos ni guión.'
}
});




extend('url', value => {
   
    let url;
    console.log(url);
  
    try {
      url = new URL(value);
      
    } catch (_) {
      return "Debe ingresar una dirección URL válida.";  
    }
  
    return true;
  
  });
  
  
     function dv(T){
         var M=0,S=1;
         for(;T;T=Math.floor(T/10))
            S=(S+T%10*(9-M++%6))%11;
          return S?S-1:'k';
      }