from django.urls import path

from app import views

urlpatterns = [
    path("", views.home, name="home"),
    path("new-cart", views.newcart, name="reload-cart"),
    path('calc-totalsum',views.calcTotalSum,name="calc-totalsum"),
    path('getinfo',views.getInfo, name="getinfo"),
    path('add-to-cart',views.addToCart, name='add-to-cart'),
    path('set-quantity', views.setQuantity, name='set-quantity')
]