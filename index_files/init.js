$(function() {

    // $(function(){ 
    //     $('[placeholder]').placeholder();
    // }); 
    times=function(){         
        now = new Date();  
        
        hour=24-now.getHours();
        minu=60-now.getMinutes();
        secu=60-now.getSeconds(); 
        str=((hour+'').length==1?hour='0'+hour:hour)+'';
        $('.timer-h').html('<span class="timer-c">'+str[0]+'</span>'+'<span class="timer-c">'+str[1]+'</span>');
        str=((minu+'').length==1?minu='0'+minu:minu)+'';
        $('.timer-m').html('<span class="timer-c">'+str[0]+'</span>'+'<span class="timer-c">'+str[1]+'</span>');
        str=((secu+'').length==1?secu='0'+secu:secu)+'';
        $('.timer-s').html('<span class="timer-c">'+str[0]+'</span>'+'<span class="timer-c">'+str[1]+'</span>');
    }                                                 
    setInterval(times,1000);
});  