from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
from django.db import connection
from .models import Usuario, Categoria, Marca, Producto, Pedido, DetallePedido

def reset_auto_increment(model):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT id FROM {model._meta.db_table} ORDER BY id")
        ids = [row[0] for row in cursor.fetchall()]
        
        # Si la tabla no tiene registros, resetea AUTO_INCREMENT a 1
        if not ids:
            cursor.execute(f"ALTER TABLE {model._meta.db_table} AUTO_INCREMENT = 1")
        else:
            # Encuentra el menor ID que falta
            next_id = 1
            for current_id in ids:
                if current_id != next_id:
                    break
                next_id += 1
            cursor.execute(f"ALTER TABLE {model._meta.db_table} AUTO_INCREMENT = {next_id}")

@receiver(post_delete, sender=Usuario)
@receiver(post_delete, sender=Categoria)
@receiver(post_delete, sender=Marca)
@receiver(post_delete, sender=Producto)
@receiver(post_delete, sender=Pedido)
@receiver(post_delete, sender=DetallePedido)
def reset_auto_increment_signal(sender, **kwargs):
    reset_auto_increment(sender)
