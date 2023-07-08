
$('.temp_add_button').hide()
$('.temp_item_add_button').hide()
checkEmty()
$('.item_add_button').click(async function (e) {
    e.preventDefault();
    id = $(this).attr('item-id');
    var token =  $('input[name="csrfmiddlewaretoken"]').attr('value'); 
    data=null;
    $(this).hide()
    $(`[key=${id}] .temp_add_button`).show()
    console.log("already")
    await $.ajax({
        type: "POST",
        url: "/getinfo",
        data: {
            id: id,
            csrfmiddlewaretoken: token
        },
        headers: {
            'X-CSRF-Token': token 
       },
        success: function (response) {
            data=response
            console.log(response)
        }
    });
    await $.ajax({
        type: "GET",
        url: "/add-to-cart",
        data: data,
        success: function (response) {
      
        }
    });


    console.log(  $(`[key=${id}] .temp_add_button`))
    await $.ajax({
        type: "GET",
        url: "/new-cart",
        data: data,
        success: function (response) {
            $('.cart_body').append(response)
       
            console.log("hidden")
           
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

function checkEmty(){
    Amount= $('.App_title_amount').text()
    console.log("amount"+ Amount)
    if(Amount.trim()=="$0"){
        console.log("show")
        $('.EmptyBlock').show()
    }else{
  
        console.log("hide")
        console.log($('.EmptyBlock'))
        $('.EmptyBlock').hide()
    }
}
// $('.addItem').click(async function(e){
//     e.preventDefault()
//     console.log('+')
//     id=$(this).attr('pro-id')
//     quantity= $(`#p${id} .Cart_itemCountNumber`).text()
//     quantity=parseInt(quantity) +1;
//     $(`#p${id} .Cart_itemCountNumber`).text(quantity)
//     console.log(quantity)
//     await $.ajax({
//         type: "get",
//         url: "/set-quantity",
//         data: {
//             id:id,
//             quantity:quantity
//         },
//         success: function (response) {
            
//         }
//     });

// });

// $('.delItem').click(async function(e){
//     e.preventDefault()
//     console.log('+')
//     id=$(this).attr('pro-id')
//     quantity= $(`#p${id} .Cart_itemCountNumber`).text()
//     quantity=parseInt(quantity) -1;
//     $(`#p${id} .Cart_itemCountNumber`).text(quantity)
//     console.log(quantity)
//     await $.ajax({
//         type: "get",
//         url: "/set-quantity",
//         data: {
//             id:id,
//             quantity:quantity
//         },
//         success: function (response) {
//             if(quantity==0){
//                 $(`#p${id}`).remove()
//             }
//         }
//     });

// });

// $('.Cart_itemRemove').click(async function(e){
//     e.preventDefault()
//     console.log('+')
//     id=$(this).attr('pro-id')
//     quantity=0
//     $(`#p${id} .Cart_itemCountNumber`).text(quantity)
//     console.log(quantity)
//     await $.ajax({
//         type: "get",
//         url: "/set-quantity",
//         data: {
//             id:id,
//             quantity:quantity
//         },
//         success: function (response) {
//             if(quantity==0){
//                 $(`#p${id}`).remove()
//             }
//         }
//     });

// });
