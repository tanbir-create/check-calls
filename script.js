let buttonNodes = document.querySelectorAll('.btn')
let currentActiveBtn;
let buttons = [...buttonNodes]
var totalC = 0;
buttons.forEach(button => {

$(button).on('click', function(){
    let name = $(this).text();
    const url = `https://getcalldetails.herokuapp.com/calls/${name}`

    $("#table:not(:first-child)").html(`<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`)
    
    
    fetch(url)
    .then(response => response.json())
    .then((results)=>{
        $("#table:not(:first-child)").text('')
        
        totalC = results.totalCalls;
        $('#total-calls').text(`Total Calls = ${totalC}`)
        let sortedDescendeing = results.det.sort((a, b) => new Date(b.date)  - new Date(a.date))
       
        sortedDescendeing.forEach(result => {
            
            let cl = result.status;
            let a = `<div data-cl=${cl} data-date=${result.date} class='all'>
                        <p>${result.customer_number}</p>
                        <p>${result.status}</p>
                        <p>${result.date}</p>
                        <p>${result.duration} sec</p>
                     </div>`

            $('#table').append(a);
        })
    })
    

    if(currentActiveBtn ){
        

        $(currentActiveBtn).removeClass('active-btn') 
    }
    currentActiveBtn = $(this)



    $(this).addClass('active-btn')
    
    
})
})



$('#category-select').on('change', function(){
        
    let category_value = (this).options[this.selectedIndex].value.toLowerCase();

    if(category_value === 'all'){
        
        $('[class=all]').show(100);
        $('#total-calls').text(`Total Calls = ${totalC}`)
    }
    else{
       
            (function(){
                let a = $('#table>div').filter(function(){
                    
                    return  $(this).attr('data-cl') != category_value;
                    
                })
                $('#total-calls').text(`Total Calls = ${totalC - a.length}`)
                a.hide();
            })();

            $("[data-cl=" + category_value + "]").show(100);
        
    }

})


$('#find-date').click(function(){
    let d = $("#date-input").val()
    console.log($("#date-input").val())
   
   

    let category_value = d.toString();

    
            (function(){
                let a = $('#table>div').filter(function(){
                    
                    return  $(this).attr('data-date') != category_value;
                    
                })
                $('#total-calls').text(`Total Calls = ${totalC - a.length}`)
                a.hide();
            })();

            $("[data-date=" + category_value + "]").show(100);
        
   
})


function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

// let userPhone   = navigator.userAgent || navigator.vendor || window.opera;
let x = `<p>${getMobileOperatingSystem()}=os, ${navigator.platform}=platform, ${navigator.maxTouchPoints}=max touch points</p>`
$("body").append(x);


