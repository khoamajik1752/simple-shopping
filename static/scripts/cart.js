
function checkEmty(){
    Amount= $('.App_title_amount').text()
    if(Amount=="$0"){
        $('.EmptyBlock').show()
    }else{
     

        $('.EmptyBlock').hide()
    }
}
$(document).ready(function(){
    $('.addItem').off()
    $('.addItem').click(async function(e){
        e.preventDefault()
        console.log('++')
        id=$(this).attr('pro-id')
        quantity= $(`#p${id} .Cart_itemCountNumber`).text()
        console.log(quantity)
        quantity=parseInt(quantity) +1;
        $(`#p${id} .Cart_itemCountNumber`).text(quantity)
        console.log(quantity)
        await $.ajax({
            type: "get",
            url: "/set-quantity",
            data: {
                id:id,
                quantity:quantity
            },
            success: function (response) {
                
            }
        });
        await $.ajax({
            type: "get",
            url: "/calc-totalsum",
            success: function (response) {
                console.log(response['totalsum'])
                $('.App_title_amount').text('$'+response['totalsum'])
                checkEmty()
            }
        });
  
    
    });
    
    $('.delItem').click(async function(e){
        e.preventDefault()
        console.log("script")
        console.log('++')
        id=$(this).attr('pro-id')
        quantity= $(`#p${id} .Cart_itemCountNumber`).text()
        quantity=parseInt(quantity) -1;
        $(`#p${id} .Cart_itemCountNumber`).text(quantity)
        console.log(quantity)
        if(quantity<=0){
            $(`[key=${id}] .temp_item_add_button`).show()
            $(`[key=${id}] .temp_add_button`).hide()
            $(`[key=${id}] .item_add_button_inactive`).hide()
            $(`#p${id}`).remove()
        }
        await $.ajax({
            type: "get",
            url: "/set-quantity",
            data: {
                id:id,
                quantity:quantity
            },
            success: function (response) {
    
            }
        });
        await $.ajax({
            type: "get",
            url: "/calc-totalsum",
            success: function (response) {
                console.log(response['totalsum'])
                $('.App_title_amount').text('$'+response['totalsum'])
                checkEmty()
            }
        });

    });
    
    $('.Cart_itemRemove').click(async function(e){
        e.preventDefault()
        console.log('+')
        id=$(this).attr('pro-id')
        quantity=0
        $(`#p${id} .Cart_itemCountNumber`).text(quantity)
        console.log(quantity)
        
        if(quantity<=0){
            $(`[key=${id}] .temp_item_add_button`).show()
            $(`[key=${id}] .temp_add_button`).hide()
            $(`[key=${id}] .item_add_button_inactive`).hide()
            $(`#p${id}`).remove()
        }
        await $.ajax({
            type: "get",
            url: "/set-quantity",
            data: {
                id:id,
                quantity:quantity
            },
            success: function (response) {
             
            }
        });
        await $.ajax({
            type: "get",
            url: "/calc-totalsum",
            success: function (response) {
                console.log(response['totalsum'])
                $('.App_title_amount').text('$'+response['totalsum'])
                checkEmty()
            }
        });
    });
 
})
