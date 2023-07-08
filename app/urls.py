from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from app import views

urlpatterns = [
    path("", views.home, name="home"),
    path("new-cart", views.newcart, name="reload-cart"),
    path('calc-totalsum',views.calcTotalSum,name="calc-totalsum"),
    path('getinfo',views.getInfo, name="getinfo"),
    path('add-to-cart',views.addToCart, name='add-to-cart'),
    path('set-quantity', views.setQuantity, name='set-quantity')
]
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)