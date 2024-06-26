from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import *
# Create your views here.

#def home(request):
#    return HttpResponse("Esta es la pagina principal")


class CustomTokenObtainPairView(TokenObtainPairView):
    pass

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_super_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    try:
        user = User.objects.create_superuser(username=username, password=password)
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UsuarioViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Usuario.objects.all()    
    serializer_class = UsuarioSerializer

    def list(self, request):
        queryset = Usuario.objects.all() 
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        usuario = self.queryset.get(pk=pk)
        serializer = self.serializer_class(usuario)
        return Response(serializer.data)

    def update(self, request, pk=None):
        usuario = self.queryset.get(pk=pk)
        serializer = self.serializer_class(usuario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)


    def destroy(self, request, pk=None):
        usuario = self.queryset.get(pk=pk)
        usuario.delete()
        return Response(status=204)
    

class CategoriaViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

    def list(self, request):
        queryset = Categoria.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        categoria = self.queryset.get(pk=pk)
        serializer = self.serializer_class(categoria)
        return Response(serializer.data)

    def update(self, request, pk=None):
        categoria = self.queryset.get(pk=pk)
        serializer = self.serializer_class(categoria, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        categoria = self.queryset.get(pk=pk)
        categoria.delete()
        return Response(status=204)
    

class MarcaViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer

    def list(self, request):
        queryset = Marca.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        marca = self.queryset.get(pk=pk)
        serializer = self.serializer_class(marca)
        return Response(serializer.data)

    def update(self, request, pk=None):
        marca = self.queryset.get(pk=pk)
        serializer = self.serializer_class(marca, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        marca = self.queryset.get(pk=pk)
        marca.delete()
        return Response(status=204)


class ProductoViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def list(self, request):
        queryset = Producto.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        producto = self.queryset.get (pk=pk)
        serializer = self.serializer_class(producto)
        return Response(serializer.data)

    def update(self, request, pk=None):
        producto = self.queryset.get (pk=pk)
        serializer = self.serializer_class(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        producto = self.queryset.get (pk=pk)
        producto.delete()
        return Response(status=204)
    

class PedidoViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

    def list(self, request):
        queryset = Pedido.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            usuario_id = request.data.get('usuario')
            if usuario_id:
                usuario = Usuario.objects.get(id=usuario_id)
                serializer.save(usuario=usuario)
            else:
                serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        pedido = self.queryset.get(pk=pk)
        serializer = self.serializer_class(pedido)
        return Response(serializer.data)

    def update(self, request, pk=None):
        pedido = self.queryset.get(pk=pk)
        serializer = self.serializer_class(pedido, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        pedido = self.queryset.get(pk=pk)
        pedido.delete()
        return Response(status=204)

class DetallePedidoViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = DetallePedido.objects.all()
    serializer_class = DetallePedidoSerializer

    def list(self, request):
        queryset = DetallePedido.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        detalle_pedido = self.queryset.get(pk=pk)
        serializer = self.serializer_class(detalle_pedido)
        return Response(serializer.data)

    def update(self, request, pk=None):
        detalle_pedido = self.queryset.get(pk=pk)
        serializer = self.serializer_class(detalle_pedido, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        detalle_pedido = self.queryset.get(pk=pk)
        detalle_pedido.delete()
        return Response(status=204)