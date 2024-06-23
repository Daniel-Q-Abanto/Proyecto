from rest_framework import serializers
from .models import * 

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id','nombre', 'email', 'direccion', 'telefono', 'password','fecha')

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ('id', 'nombre', 'descripcion', 'fecha')

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = ('id', 'nombre', 'descripcion', 'fecha')

class ProductoSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(required=False)

    class Meta:
        model = Producto
        fields = ('id', 'nombre', 'descripcion', 'precio', 'stock', 'categoria', 'marca', 'imagen', 'fecha')

class PedidoSerializer(serializers.ModelSerializer):
    nombre_usuario = serializers.ReadOnlyField(source='usuario.nombre')
    
    class Meta:
        model = Pedido
        fields = ['id', 'usuario', 'nombre_usuario', 'nombre', 'dni', 'direccion', 'telefono', 'email', 'fecha']

class DetallePedidoSerializer(serializers.ModelSerializer):
    pedido_nombre_usuario = serializers.SerializerMethodField()
    producto_nombre = serializers.ReadOnlyField(source='producto.nombre')
    pedido_fecha = serializers.ReadOnlyField(source='pedido.fecha')

    class Meta:
        model = DetallePedido
        fields = ('id', 'pedido', 'pedido_nombre_usuario', 'producto', 'producto_nombre', 'cantidad', 'precio', 'pedido_fecha')

    def get_pedido_nombre_usuario(self, obj):
        return f"Pedido {obj.pedido.id} de {obj.pedido.usuario.nombre}"




