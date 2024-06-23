
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomTokenObtainPairView, create_super_user
from rest_framework_simplejwt.views import TokenRefreshView
from .views import *

router = DefaultRouter()
router.register('usuario', UsuarioViewSet, basename='usuario')
router.register('categoria', CategoriaViewSet, basename='categoria')
router.register('marca', MarcaViewSet, basename='marca')
router.register('producto', ProductoViewSet, basename='producto')
router.register('pedido', PedidoViewSet, basename='pedido')
router.register('detallepedido', DetallePedidoViewSet, basename='detallepedido')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create_super_user/', create_super_user, name='create_super_user'),
]
