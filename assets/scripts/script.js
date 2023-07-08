console.log("haha")
$('.temp_add_button').hide()
$('.temp_item_add_button').hide()
$('.item_add_button').click(async function (e) {
    e.preventDefault();

    id = $(this).attr('item-id');
    console.log(id)
    var token =  $('input[name="csrfmiddlewaretoken"]').attr('value'); 
    console.log(token)
    data=null;
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
    $(this).hide()
    $(`[key=${id}] .temp_add_button`).show()
    console.log(  $(`[key=${id}] .temp_add_button`))
    await $.ajax({
        type: "GET",
        url: "/new-cart",
        data: data,
        success: function (response) {
              $('.cart_body').append(response)
           
        }
    });

    await $.ajax({
        type: "get",
        url: "/calc-totalsum",
        success: function (response) {
            console.log(response['totalsum'])
            $('.App_title_amount').text('$'+response['totalsum'])
        }
    });
});

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
