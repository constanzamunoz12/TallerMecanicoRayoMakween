from django.db import models
from django.db.models.deletion import CASCADE
from django.forms import ValidationError
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.


# Registramos atenciones
class TipoAtencion(models.Model):
    categoria = models.CharField(max_length=50)
    imagen_categoria = models.ImageField(upload_to="categorias")

    def __str__(self):
        return self.categoria


class Atencion(models.Model):
    diagnostico = models.TextField(max_length=150)
    fecha = models.DateField(null=True)
    imagen = models.ImageField(upload_to="atenciones")
    materiales = models.TextField(max_length=100)
    id_atencion = models.ForeignKey(TipoAtencion, on_delete=CASCADE)
    publicado = models.BooleanField(default=False)
    comentario = models.CharField(max_length=40, default="N/A")
    trabajador = models.CharField(max_length=30)

    def __str__(self):
        return self.trabajador


class Galeria(models.Model):
    id_galeria = models.AutoField(primary_key=True)
    imagen_galeria = models.ImageField(upload_to="galeria", null=True)
    atencion = models.ForeignKey(Atencion, on_delete=CASCADE)

    def __str__(self):
        return "ID : " + str(self.id_galeria)


# Sin uso aún
class FormularioConsulta(models.Model):
    categoria = models.ForeignKey(TipoAtencion, on_delete=CASCADE)
    correo = models.CharField(max_length=40, null=True)
    comentario = models.TextField(max_length=100, null=True)

    def __str__(self):
        return str(self.categoria)


def validate_pdf(value):
    if not value.name.endswith('.pdf'):
        raise ValidationError(_('El archivo debe ser en formato PDF.'))


OPCIONES_ESTADO = [
    ("RECHAZADO", "Rechazado"),
    ("ACEPTADO", "Aceptado"),
    ("PENDIENTE", "Pendiente")
]


class FormularioPostulacion(models.Model):
    nombre = models.CharField(max_length=30, null=False)
    apellido = models.CharField(max_length=30, null=False)
    correo = models.EmailField(max_length=40, null=False)
    imagen = models.ImageField(upload_to="postulaciones")
    cv = models.FileField(upload_to='postulaciones/cv',validators=[validate_pdf])
    estado = models.CharField(choices=OPCIONES_ESTADO, default="PENDIENTE", max_length=10)

    def __str__(self):
        return str(self.nombre)


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('El correo electrónico debe ser proporcionado')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_mechanic = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_short_name(self):
        return self.first_name

    def get_full_name(self):
        full_name = '{} {}'.format(self.first_name, self.last_name)
        return full_name.strip()
