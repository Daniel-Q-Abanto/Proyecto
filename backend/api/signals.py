from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
from django.db import connection
from .models import Usuario, Categoria, Marca, Producto, Pedido, DetallePedido

def reset_auto_increment(model):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT MAX(id) FROM {model._meta.db_table}")
        max_id = cursor.fetchone()[0]
        
        if max_id is None:
            cursor.execute(f"ALTER TABLE {model._meta.db_table} AUTO_INCREMENT = 1")
        else:
            cursor.execute(f"ALTER TABLE {model._meta.db_table} AUTO_INCREMENT = {max_id + 1}")

@receiver(post_delete, sender=Usuario)
@receiver(post_delete, sender=Categoria)
@receiver(post_delete, sender=Marca)
@receiver(post_delete, sender=Producto)
@receiver(post_delete, sender=Pedido)
@receiver(post_delete, sender=DetallePedido)
def reset_auto_increment_signal_delete(sender, **kwargs):
    reset_auto_increment(sender)

@receiver(post_save, sender=Usuario)
@receiver(post_save, sender=Categoria)
@receiver(post_save, sender=Marca)
@receiver(post_save, sender=Producto)
@receiver(post_save, sender=Pedido)
@receiver(post_save, sender=DetallePedido)
def reset_auto_increment_signal_save(sender, **kwargs):
    reset_auto_increment(sender)
