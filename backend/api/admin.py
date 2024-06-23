from django.contrib import admin
from .models import Usuario, Categoria, Marca, Producto, Pedido, DetallePedido

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'email', 'direccion', 'telefono', 'fecha')
    search_fields = ('nombre', 'email')
    list_filter = ('fecha',)

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'fecha')
    search_fields = ('nombre',)
    list_filter = ('fecha',)

@admin.register(Marca)
class MarcaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'fecha')
    search_fields = ('nombre',)
    list_filter = ('fecha',)

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'precio', 'stock', 'categoria', 'marca', 'imagen', 'fecha')
    search_fields = ('nombre', 'descripcion')
    list_filter = ('categoria', 'marca', 'fecha')
    list_editable = ('precio', 'stock')

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'nombre', 'dni', 'direccion', 'telefono', 'email', 'fecha')
    search_fields = ('nombre', 'dni', 'email')
    list_filter = ('fecha',)
    date_hierarchy = 'fecha'

@admin.register(DetallePedido)
class DetallePedidoAdmin(admin.ModelAdmin):
    list_display = ('pedido', 'producto', 'cantidad', 'precio')
    search_fields = ('pedido__nombre', 'producto__nombre')
    list_filter = ('pedido', 'producto')
