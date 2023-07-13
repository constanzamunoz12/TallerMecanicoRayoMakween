from django.contrib import admin
from django.urls import path, include
from django.urls import path, include 
from .views import *
# De las views importamos los métodos para renderizar las páginas
urlpatterns = [
    path('',index,name='INDEX'),
    path('ubicacion/',ubicacion, name='UBICACION'),
    path('registrarse/',registrarse,name='REGISTRARSE'),
    path('consulta/',consulta,name='CONSULTA'),
    path('postulacion/',postulacion,name='POSTULACION'),
    path('galeria/',galeria, name='GALERIA'),
    path('logout/',cerrarSesion,name = 'LOGOUT'),
    path('login/',iniciarSesion,name = 'LOGIN'),
    path('atenciones/', detalleAtencion, name = 'ATENCION'),
    path('atencion/<id>/',mostrarAtencion, name = 'FICHA' ), #Le entregamos una ID
    path('filtro/',filtrar,name='FILTRO'),
    path('adminAtencion/',administrarAtencion,name = 'ADMIN_ATENCION'),
    path('adminPostulacion/',administrarPostulacion,name = 'ADMIN_POSTULACION'),
    path('confirmar-postulacion/<int:postulacion_id>/<str:estado>/', confirmar_postulacion, name='confirmar_postulacion'),
    path('pagModificarAtencion/<id>/',pagModificarAtencion, name = 'MODIFICAR_ATENCION'),
    path('pagModificarAtencionAdmin/<id>/',pagModificarAtencionAdmin, name = 'MODIFICAR_ATENCION_ADMIN'),
    path('actualizar/',actualizar,name = "ACTUALIZAR"), 
    path('update/',attention_update_admin,name = "update_admin"), 
    path('eliminar/<id>/', eliminarAtencion, name = "ELIMINAR"),
    path('aceptar/<id>/', aceptarAtencion, name = "ACEPTAR"),
    path('insertarImagen/',insertarImagen,name = 'INSERTAR_IMG'),
    path('servicios/',servicios,name='SERVICIOS'), # Con API REST
    path('mostrarconsulta/',mostrarconsulta,name='MOSTRARC'),
    path('listarconsulta/',listarConsulta, name='LISTA_CON'),
    path('eliminarconsulta/<id>/',eliminarConsulta, name='ELIMINAR_CON'),
    path('admin-attetion-requests/',admin_attention_requests_render,name='ADMIN-ATTENTION'),
]