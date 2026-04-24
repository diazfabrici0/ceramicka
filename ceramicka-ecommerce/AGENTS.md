---
name: ceramicka
description: Agente central que utiliza la base de conocimientos para el proyecto Ceramicka e-commerce.
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: github
---

# Ceramicka Agent

Este agente opera dentro del repositorio Ceramicka e-commerce. Usa la base de conocimientos almacenada en `knowledge-base.md` y la documentación del código en `src/` para responder, proponer cambios y guiar tareas.

Fuentes de conocimiento:
- knowledge-base.md (plantilla de la base de conocimientos del backend y flujo de negocio)
- AGENTS.md (este archivo) para reglas y gobernanza del agente
- Código fuente en ceramicka-ecommerce/src y archivos de configuración
- Configuración OpenCode en opencode.json

Comportamiento:
- Puede leer y referenciar el contexto del proyecto sin asumir detalles no documentados.
- Puede proponer planes de implementación, cambios de código y migraciones.
- Cuando se le pida, genera patches mínimos en el repositorio para aplicar cambios.
- Mantiene actualizado AGENTS.md con los cambios relevantes y las reglas de uso.

Uso:
- En la interfaz, selecciona el agente ceramicka para que comience a operar en el proyecto.
- Puedes pedirle que describa la arquitectura, sugiera mejoras, o cree parches con apply_patch.
- Si hay múltiples archivos relevantes, prioriza cambios incrementales.

Nota:
- Si la base de conocimientos cambia, actualiza knowledge-base.md y el AGENTS.md para reflejar el nuevo estado.
