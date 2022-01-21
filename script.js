

let buttonNodes = document.querySelectorAll('.btn')
let currentActiveBtn;
let buttons = [...buttonNodes]
buttons.forEach(button => {


$(button).on('click', function(){
    let name = $(this).text();
    const url = `https://getcalldetails.herokuapp.com/calls/${name}`

    $("#table:not(:first-child)").html(`<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`)
    
    
    fetch(url)
    .then(response => response.json())
    .then((results)=>{
        $("#table:not(:first-child)").text('')
        $('#table').append(`<div style="padding-bottom: 1.5em;">Total-Calls = ${results.totalCalls} </div>`)
        
        let sortedDescendeing = results.det.sort((a, b) => new Date(b.date)  - new Date(a.date))
       
        sortedDescendeing.forEach(result => {
            
            let cl = result.status;
            let a = `<div data-cl=${cl} class='all'>
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
    }
    else{
       
            (function(){
                $('#table>div').filter(function(){
                    
                    return  $(this).attr('data-cl') != category_value;
                    
                })
                .hide();
            })();

            $("[data-cl=" + category_value + "]").show(100);
        
    }

})
