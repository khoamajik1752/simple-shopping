from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Product
# Create your views here.
def newcart(request):
    id=request.GET['id']
    name=request.GET['name']
    image=request.GET['image']
    price=request.GET['price']
    return render(request, 'cart.html',{'id':id,
                             'image':image,
                             'name':name,
                              'price':price})

def calcTotalSum(request):
    totalsum=0
    if 'cartdata' in request.session:
        cart_data=request.session['cartdata']     
        cart_data=cart_data.items()
        for key,item in cart_data:
            price=float(item['price'])*float(item['quantity'])
            totalsum=totalsum + price
        totalsum=round(totalsum,2)
    else:
        cart_data=None
    return JsonResponse({'totalsum':totalsum})
def home(request):
    totalsum=0
    if 'cartdata' in request.session:
        cart_data=request.session['cartdata']
        cart_data=request.session['cartdata']
        cart=[]
     
        cart_data=cart_data.items()
        for key,item in cart_data:
            price=float(item['price'])*float(item['quantity'])
            totalsum=totalsum + price
            cart.append(int(key))
        totalsum=round(totalsum,2)
    else:
        cart=None
        cart_data=None
    products=Product.objects.all()
    return render(request, 'home.html',{'products':products, 'cart':cart_data, 'added':cart,'totalsum':totalsum})

def getInfo(request):
    id=request.POST['id']
    product=Product.objects.all().filter(id=id)
    if(product != None):
        return JsonResponse({'id':product[0].id,
                             'image':product[0].image,
                             'name':product[0].name,
                              'price':product[0].price})
    else:
        return HttpResponse(None)

def addToCart(request):
    cart={}
    cart[str(request.GET['id'])]={
        'name':request.GET['name'],
        'image': request.GET['image'],
        'price': request.GET['price'],
        'quantity':1
    }
    if 'cartdata' in request.session:
        if str(request.GET['id']) in request.session['cartdata']:
            cart_data=request.session['cartdata']
            # print('name'+cart_data[str(request.GET['id'])]['quantity'])
        else:
            cart_data=request.session['cartdata']
            cart_data.update(cart)
            request.session['cartdata']=cart_data
    else:
        request.session['cartdata']=cart
    return JsonResponse({'data':request.session['cartdata']})

def setQuantity(request):
    id= request.GET['id']
    quantity=request.GET['quantity']
    if 'cartdata' in request.session:
        if str(request.GET['id']) in request.session['cartdata']:
            if(int(quantity)<=0):
                print('removed')
                newCart= request.session['cartdata']
                del  newCart[id]
                request.session['cartdata']=newCart
            else:
                newCart= request.session['cartdata']
                newCart[id]['quantity']=int(quantity)
                request.session['cartdata']=newCart
                # request.session['cartdata'][id]['quantity']= int(quantity)
        return JsonResponse({'data':request.session['cartdata']})
    else:
        return None