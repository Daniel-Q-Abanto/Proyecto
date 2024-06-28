from django.db import models
from django.utils import timezone

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True, max_length=100)
    direccion = models.CharField(max_length=255, default='N/A', null=True, blank=True)
    telefono = models.CharField(max_length=20, default='N/A')
    password = models.CharField(max_length=255)
    fecha = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'usuarios'

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(default='N/A', null=True, blank=True)
    fecha = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'categorias'

class Marca(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(default='N/A', null=True, blank=True)
    fecha = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'marcas'

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(default='N/A', null=True, blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE, null=True, blank=True)
    marca = models.ForeignKey('Marca', on_delete=models.CASCADE, null=True, blank=True)
    imagen = models.URLField(max_length=255, null=True, blank=True)  # Campo para URL de la imagen
    fecha = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'productos'

class Pedido(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True, blank=True)
    nombre = models.CharField(max_length=100)
    dni = models.CharField(max_length=8)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    email = models.EmailField(max_length=100)
    fecha = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Pedido {self.id} de {self.nombre}"

    class Meta:
        db_table = 'pedido'


class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.cantidad} x {self.producto.nombre} en Pedido {self.pedido.id}"

    class Meta:
        db_table = 'detalle_pedido'
