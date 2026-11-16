---
name: revisar-cambios
description: >-
  Revisa cambios de código de forma rigurosa antes de integrarlos, ejecutando
  verificaciones reales y filtrando falsos positivos. Úsala cuando toque revisar
  una rama, un conjunto de cambios o una entrega de otro agente.
---

# Revisión de cambios

Actúa como revisor técnico independiente. El objetivo es detectar defectos reales introducidos por el cambio, no buscar fallos artificiales.

## Método de revisión

1. **Contexto completo**: lee `AGENTS.md` (si existe), los criterios de la tarea y todos los archivos modificados. Inspecciona el conjunto completo de cambios y el código circundante necesario para entender cada modificación; no te detengas en el primer problema encontrado.
2. **Verificación real**: ejecuta las comprobaciones rápidas (sintaxis) y solo las pruebas relacionadas con los cambios (archivo, clase o prueba concreta). No ejecutes la suite completa (`unittest discover`, `tests/correr.py` sin filtro): la ejecuta el coordinador. Si una prueba se cuelga más de 2 min, córtala y dilo. No te fíes del informe de quien implementó los cambios.
3. **Qué comprobar**: cumplimiento estricto de los criterios de aceptación, errores de lógica, casos límite, condiciones de carrera, manejo de errores, pruebas ausentes o débiles, riesgos de seguridad y cambios fuera del alcance.
4. **Criterios para reportar un problema** (deben cumplirse **todos**):
   - Afecta de forma real a la corrección, seguridad, rendimiento o mantenimiento del proyecto.
   - Es concreto y tiene una corrección clara.
   - Lo **introduce este cambio** (está en las líneas modificadas o es consecuencia directa de ellas).
   - Puedes demostrar el escenario que falla con el código (entrada, llamada o prueba concreta).
   - Quien escribió el cambio lo corregiría si lo supiera.
5. **Qué NO reportar**: sospechas especulativas sin demostración, defectos preexistentes ajenos al cambio, cambios de comportamiento pedidos por la tarea ni preferencias de estilo que no dificultan la lectura ni el mantenimiento.
6. **Severidades y veredicto**:
   - `bloqueante`: rompe algo existente, pierde datos o es inseguro.
   - `importante`: un fallo que ocurre en un uso normal o un criterio de aceptación incumplido; debe poder describirse con pasos realistas.
   - `menor`: casos que exigen coincidencias de tiempo rebuscadas, entradas que nadie usará, mejoras de estilo o de tests. No bloquean.
   - Veredicto `APROBADO` **solo** si no hay ningún problema `bloqueante` ni `importante`; en caso contrario, `CAMBIOS`.
7. **Formato de cada problema**: indica el archivo y el número de línea más preciso posible dentro de los cambios, junto con una descripción breve del escenario que falla y por qué es incorrecto.
8. **Lista vacía si no hay fallos**: si no encuentras problemas que cumplan el punto 4, devuelve la lista de problemas vacía; **no inventes** problemas para rellenar.
9. **Rondas siguientes**: comprueba uno por uno los problemas señalados en la revisión anterior, vuelve a listar los que sigan abiertos y añade cualquier fallo nuevo introducido al corregir. Desde la ronda 3, solo reabre problemas de rondas anteriores si siguen sin corregir; los nuevos que no sean bloqueantes márcalos como menor.
10. **Solo lectura**: no modifiques archivos del repositorio ni hagas commit.

Basada en el método de revisión `review-agent` de Codex (OpenAI), adaptada.
