/* Datos compartidos del juego «Ascenso gerencial» (Módulo 4): las 5 gerencias, sus bases y sus recomendaciones. */
window.GERENCIAS = [
 {
  "key": "reclamaciones",
  "nombre": "Gerencia de Reclamaciones",
  "corto": "Reclamaciones",
  "icon": "📋",
  "color": "#E4572E",
  "rol": "Controlas lo que los prestadores le cobran a la ARS: qué se aprueba, qué se rechaza, por qué y qué tan rápido se responde.",
  "mision": "Presenta a la dirección cómo se comportan las reclamaciones: cuánto se reclama, cuánto se aprueba, dónde se rechaza más y cuánto tarda cada canal en resolver.",
  "kpis": [
   "Total reclamado (Suma de Monto Reclamado)",
   "Total aprobado (Suma de Monto Aprobado)",
   "Porcentaje aprobado (aprobado ÷ reclamado)",
   "Cantidad de reclamaciones (Cuenta de ID Reclamación)",
   "Días promedio de procesamiento",
   "Reclamaciones rechazadas (filtro Estado = Rechazada)"
  ],
  "graficos": [
   [
    "Reclamado frente a aprobado por mes",
    "Líneas · Filas: Mes · Valores: Monto Reclamado y Monto Aprobado"
   ],
   [
    "Reclamaciones por estado",
    "Circular · Filas: Estado · Valores: Cuenta de ID Reclamación"
   ],
   [
    "Rechazos por prestador",
    "Columnas · Filas: PSS · Filtro: Estado = Rechazada"
   ],
   [
    "Motivos de rechazo",
    "Barras · Filas: Motivo de Rechazo · Valores: Cuenta"
   ],
   [
    "Días de procesamiento por canal",
    "Columnas · Filas: Canal de Recepción · Valores: Promedio de Días"
   ],
   [
    "Monto aprobado por ARS",
    "Columnas · Filas: ARS · Valores: Monto Aprobado"
   ]
  ],
  "segs": [
   "Año",
   "ARS",
   "Canal de Recepción"
  ],
  "situaciones": [
   "Un prestador tiene muchos más rechazos que los demás. ¿Cuál es y por qué motivo se le rechaza?",
   "Las reclamaciones que llegan en papel tardan más en resolverse. ¿Cuántos días más que las del portal web?",
   "La dirección quiere saber cuánto dinero se dejó de pagar por rechazos y ajustes de tarifa.",
   "¿Qué ARS concentra más monto reclamado y cómo cambió de 2024 a 2025?",
   "¿Qué motivo de rechazo se podría evitar orientando mejor a los prestadores?"
  ],
  "tips": [
   "La diferencia entre Monto Reclamado y Monto Aprobado cuenta una historia: muéstrala.",
   "Para un porcentaje, divide dos totales de la tabla dinámica en una celda y dale formato de porcentaje."
  ],
  "archivo": "Modulo4-Gerencia-Reclamaciones.xlsx",
  "tabla": "tblReclamaciones",
  "hoja": "Reclamaciones",
  "registros": 420,
  "campos": [
   [
    "ID Reclamación",
    "Código único de la reclamación"
   ],
   [
    "Fecha de Recepción",
    "Día en que la ARS recibió la reclamación"
   ],
   [
    "Año",
    "Año de la fecha de recepción"
   ],
   [
    "Mes",
    "Mes de la fecha de recepción (1 a 12)"
   ],
   [
    "ARS",
    "Aseguradora que recibe la reclamación"
   ],
   [
    "PSS",
    "Prestador que reclama el pago"
   ],
   [
    "Tipo de Servicio",
    "Consulta, Laboratorio, Imágenes, Emergencia u Hospitalización"
   ],
   [
    "Provincia",
    "Provincia del prestador"
   ],
   [
    "Canal de Recepción",
    "Portal web, Físico o Correo"
   ],
   [
    "Monto Reclamado",
    "Lo que el prestador pide cobrar (RD$)"
   ],
   [
    "Monto Aprobado",
    "Lo que la ARS aprobó pagar (RD$)"
   ],
   [
    "Estado",
    "Aprobada, Aprobada parcial, Rechazada o En revisión"
   ],
   [
    "Motivo de Rechazo",
    "Por qué se rechazó o se ajustó (vacío si se aprobó completa)"
   ],
   [
    "Días de Procesamiento",
    "Días desde que llegó hasta que se resolvió"
   ]
  ]
 },
 {
  "key": "finanzas",
  "nombre": "Gerencia de Finanzas",
  "corto": "Finanzas",
  "icon": "💰",
  "color": "#2E9E6B",
  "rol": "Cuidas el dinero de la ARS: lo que se factura, lo que ya se pagó, lo que está pendiente y lo que está vencido.",
  "mision": "Presenta a la dirección la salud financiera: cuánto se factura, cuánto se ha pagado, qué deudas están vencidas y en qué servicios se va el dinero.",
  "kpis": [
   "Total facturado (Suma de Monto Facturado)",
   "Total pagado (Suma de Monto Pagado)",
   "Copago total de los afiliados",
   "Porcentaje pagado (pagado ÷ facturado)",
   "Pagos vencidos (filtro Estado del Pago = Vencido)",
   "Días promedio para pagar"
  ],
  "graficos": [
   [
    "Facturación por mes",
    "Líneas · Filas: Mes · Columnas: Año · Valores: Monto Facturado"
   ],
   [
    "Dinero por tipo de servicio",
    "Columnas o circular · Filas: Tipo de Servicio · Valores: Monto Facturado"
   ],
   [
    "Estado de los pagos",
    "Circular · Filas: Estado del Pago · Valores: Cuenta de ID Pago"
   ],
   [
    "Pagos vencidos por ARS",
    "Columnas · Filas: ARS · Filtro: Estado del Pago = Vencido"
   ],
   [
    "Contributivo frente a subsidiado",
    "Circular · Filas: Régimen · Valores: Monto Facturado"
   ],
   [
    "Facturación por prestador",
    "Barras · Filas: PSS · Valores: Monto Facturado"
   ]
  ],
  "segs": [
   "Año",
   "ARS",
   "Régimen"
  ],
  "situaciones": [
   "Una ARS acumula la mayoría de los pagos vencidos. ¿Cuál es y cuánto dinero representa?",
   "Hospitalización tiene pocas facturas, pero ¿qué parte del dinero se lleva?",
   "El gasto sube al final del año. ¿En qué meses y cuánto más?",
   "¿Cuánto aportan los afiliados con el copago y en qué régimen?",
   "¿Conviene seguir pagando con cheque? Compáralo con la transferencia."
  ],
  "tips": [
   "Separa lo pagado de lo pendiente y lo vencido: es lo primero que pregunta la dirección.",
   "Pon los montos con formato RD$ y sin decimales en las tarjetas grandes si se ven muy largos."
  ],
  "archivo": "Modulo4-Gerencia-Finanzas.xlsx",
  "tabla": "tblFinanzas",
  "hoja": "Pagos",
  "registros": 400,
  "campos": [
   [
    "ID Pago",
    "Código único de la factura o pago"
   ],
   [
    "Fecha de Factura",
    "Día en que el prestador facturó"
   ],
   [
    "Año",
    "Año de la factura"
   ],
   [
    "Mes",
    "Mes de la factura (1 a 12)"
   ],
   [
    "ARS",
    "Aseguradora que paga"
   ],
   [
    "PSS",
    "Prestador que factura"
   ],
   [
    "Tipo de Servicio",
    "Consulta, Laboratorio, Imágenes, Emergencia u Hospitalización"
   ],
   [
    "Régimen",
    "Contributivo (empleados) o Subsidiado (lo paga el Estado)"
   ],
   [
    "Monto Facturado",
    "Total de la factura (RD$)"
   ],
   [
    "Copago Afiliado",
    "Parte que paga el afiliado (RD$)"
   ],
   [
    "Monto Pagado",
    "Lo que la ARS ya pagó al prestador (RD$)"
   ],
   [
    "Estado del Pago",
    "Pagado, Pendiente o Vencido (más de 60 días sin pagar)"
   ],
   [
    "Días para Pagar",
    "Días que pasaron desde la factura"
   ],
   [
    "Forma de Pago",
    "Transferencia o Cheque"
   ]
  ]
 },
 {
  "key": "servicio",
  "nombre": "Gerencia de Servicio al Cliente",
  "corto": "Servicio al cliente",
  "icon": "🎧",
  "color": "#2F86D6",
  "rol": "Escuchas a los afiliados: cada llamada, mensaje, correo o visita. Tu meta es responder rápido y dejar al afiliado satisfecho.",
  "mision": "Presenta a la dirección cómo se atiende a los afiliados: por qué canal llegan, qué piden, cuánto se tarda en responder y qué tan satisfechos quedan.",
  "kpis": [
   "Total de casos (Cuenta de ID Caso)",
   "Satisfacción promedio (1 a 5)",
   "Tiempo de respuesta promedio (horas)",
   "Porcentaje resuelto en el primer contacto",
   "Cantidad de quejas (filtro Tipo de Solicitud = Queja)",
   "Casos pendientes o escalados"
  ],
  "graficos": [
   [
    "Casos por canal",
    "Columnas · Filas: Canal · Valores: Cuenta de ID Caso"
   ],
   [
    "Satisfacción por canal",
    "Barras · Filas: Canal · Valores: Promedio de Satisfacción"
   ],
   [
    "Tiempo de respuesta por canal",
    "Columnas · Filas: Canal · Valores: Promedio de Tiempo de Respuesta"
   ],
   [
    "Temas de las quejas",
    "Barras · Filas: Tema · Filtro: Tipo de Solicitud = Queja"
   ],
   [
    "Satisfacción por agente",
    "Columnas · Filas: Agente · Valores: Promedio de Satisfacción"
   ],
   [
    "Casos por mes",
    "Líneas · Filas: Mes · Columnas: Año · Valores: Cuenta"
   ]
  ],
  "segs": [
   "Año",
   "Canal",
   "Tipo de Solicitud"
  ],
  "situaciones": [
   "Un canal responde mucho más rápido y tiene a los afiliados más satisfechos. ¿Cuál es?",
   "Un agente tiene una satisfacción muy por debajo del resto. ¿Quién es y qué harías?",
   "¿Cuál es la queja más frecuente y qué área de la empresa debería resolverla?",
   "¿Qué pasa con la satisfacción cuando la respuesta tarda más de dos días?",
   "¿Qué canal convendría promover y cuál hay que mejorar?"
  ],
  "tips": [
   "Para promedios, cambia Suma por Promedio en Configuración de campo de valor.",
   "Compara siempre dos cosas: rapidez y satisfacción. Juntas explican mejor el servicio."
  ],
  "archivo": "Modulo4-Gerencia-Servicio-al-Cliente.xlsx",
  "tabla": "tblServicioCliente",
  "hoja": "Casos",
  "registros": 450,
  "campos": [
   [
    "ID Caso",
    "Código único del caso"
   ],
   [
    "Fecha",
    "Día en que el afiliado contactó"
   ],
   [
    "Año",
    "Año del contacto"
   ],
   [
    "Mes",
    "Mes del contacto (1 a 12)"
   ],
   [
    "ARS",
    "Aseguradora del afiliado"
   ],
   [
    "Canal",
    "Teléfono, WhatsApp, Presencial, Correo o Portal web"
   ],
   [
    "Tipo de Solicitud",
    "Consulta, Autorización, Queja, Reclamo o Cambio de datos"
   ],
   [
    "Tema",
    "De qué se trató el caso"
   ],
   [
    "Provincia",
    "Provincia del afiliado"
   ],
   [
    "Agente",
    "Código del agente que atendió (A-01 a A-08)"
   ],
   [
    "Tiempo de Respuesta (horas)",
    "Horas hasta dar respuesta al afiliado"
   ],
   [
    "Estado",
    "Resuelto, Escalado o Pendiente"
   ],
   [
    "Resuelto en Primer Contacto",
    "Sí, si se resolvió sin volver a llamar"
   ],
   [
    "Satisfacción (1-5)",
    "Calificación del afiliado: 1 muy mala, 5 excelente"
   ]
  ]
 },
 {
  "key": "prestadores",
  "nombre": "Gerencia de Red de Prestadores",
  "corto": "Red de prestadores",
  "icon": "🏥",
  "color": "#8E5BD6",
  "rol": "Administras las clínicas, hospitales, laboratorios y centros de diagnóstico que atienden a los afiliados, y vigilas que cumplan su contrato.",
  "mision": "Presenta a la dirección cómo trabaja la red: quién factura más, quién hace esperar más a los pacientes, quién está mejor calificado y quién no respeta la tarifa contratada.",
  "kpis": [
   "Total de atenciones (Cuenta de ID Atención)",
   "Monto facturado total",
   "Tiempo de espera promedio (minutos)",
   "Calificación promedio de los pacientes",
   "Atenciones fuera de tarifa (Cumple Tarifa = No)",
   "Autorizaciones rechazadas"
  ],
  "graficos": [
   [
    "Facturación por prestador",
    "Barras · Filas: PSS · Valores: Monto Facturado"
   ],
   [
    "Espera promedio por prestador",
    "Columnas · Filas: PSS · Valores: Promedio de Tiempo de Espera"
   ],
   [
    "Calificación por prestador",
    "Columnas · Filas: PSS · Valores: Promedio de Calificación"
   ],
   [
    "Atenciones por especialidad",
    "Circular o columnas · Filas: Especialidad · Valores: Cuenta"
   ],
   [
    "Fuera de tarifa por prestador",
    "Columnas · Filas: PSS · Filtro: Cumple Tarifa Contratada = No"
   ],
   [
    "Atenciones por provincia",
    "Barras · Filas: Provincia · Valores: Cuenta"
   ]
  ],
  "segs": [
   "Año",
   "Tipo de Prestador",
   "Provincia"
  ],
  "situaciones": [
   "Un hospital hace esperar a sus pacientes mucho más que los demás. ¿Cuál es y cómo afecta su calificación?",
   "Dos prestadores cobran por encima de la tarifa contratada con más frecuencia. ¿Cuáles son?",
   "¿Cuál es el prestador mejor calificado y qué se puede aprender de él?",
   "¿Qué prestador factura más? ¿Se justifica por la cantidad de atenciones?",
   "Si tuvieras que renegociar un contrato, ¿con quién empezarías y por qué?"
  ],
  "tips": [
   "Ordena los prestadores de mayor a menor: el ranking se lee de un vistazo.",
   "Un mismo prestador puede verse bien en un gráfico y mal en otro: esa es la historia."
  ],
  "archivo": "Modulo4-Gerencia-Red-de-Prestadores.xlsx",
  "tabla": "tblPrestadores",
  "hoja": "Atenciones",
  "registros": 400,
  "campos": [
   [
    "ID Atención",
    "Código único de la atención"
   ],
   [
    "Fecha",
    "Día de la atención"
   ],
   [
    "Año",
    "Año de la atención"
   ],
   [
    "Mes",
    "Mes de la atención (1 a 12)"
   ],
   [
    "PSS",
    "Prestador que atendió"
   ],
   [
    "Tipo de Prestador",
    "Hospital, Clínica, Centro de diagnóstico o Laboratorio"
   ],
   [
    "Provincia",
    "Provincia del prestador"
   ],
   [
    "ARS",
    "Aseguradora del paciente"
   ],
   [
    "Especialidad",
    "Área médica de la atención"
   ],
   [
    "Monto Facturado",
    "Lo que el prestador cobró (RD$)"
   ],
   [
    "Tiempo de Espera (min)",
    "Minutos que esperó el paciente para ser atendido"
   ],
   [
    "Calificación del Paciente (1-5)",
    "Qué tan satisfecho quedó: 1 muy mal, 5 excelente"
   ],
   [
    "Autorización",
    "Si la ARS aprobó o rechazó la autorización"
   ],
   [
    "Cumple Tarifa Contratada",
    "Sí, si cobró lo acordado en el contrato"
   ]
  ]
 },
 {
  "key": "auditoria",
  "nombre": "Gerencia de Auditoría Médica",
  "corto": "Auditoría médica",
  "icon": "🩺",
  "color": "#E0A526",
  "rol": "Revisas los internamientos: si lo facturado corresponde con lo que se hizo, cuántos días estuvo el paciente y si volvió a ingresar.",
  "mision": "Presenta a la dirección los resultados de la auditoría: cuánto se glosó, en qué prestadores, qué diagnósticos cuestan más y qué pacientes vuelven a internarse.",
  "kpis": [
   "Casos auditados (Cuenta de ID Caso)",
   "Monto facturado total",
   "Monto glosado total",
   "Porcentaje glosado (glosado ÷ facturado)",
   "Días promedio de internamiento",
   "Reingresos en 30 días"
  ],
  "graficos": [
   [
    "Glosa por prestador",
    "Barras · Filas: PSS · Valores: Monto Glosado"
   ],
   [
    "Costo promedio por diagnóstico",
    "Barras · Filas: Diagnóstico · Valores: Promedio de Monto Facturado"
   ],
   [
    "Casos de dengue por mes",
    "Líneas · Filas: Mes · Filtro: Diagnóstico = Dengue"
   ],
   [
    "Resultado de la auditoría",
    "Circular · Filas: Resultado de Auditoría · Valores: Cuenta"
   ],
   [
    "Reingresos por diagnóstico",
    "Columnas · Filas: Diagnóstico · Filtro: Reingreso = Sí"
   ],
   [
    "Días promedio por diagnóstico",
    "Columnas · Filas: Diagnóstico · Valores: Promedio de Días"
   ]
  ],
  "segs": [
   "Año",
   "Diagnóstico",
   "Tipo de Ingreso"
  ],
  "situaciones": [
   "Un prestador concentra las mayores glosas. ¿Cuál es y cuánto dinero representa?",
   "El dengue no se comporta igual todo el año. ¿En qué meses sube?",
   "¿Qué diagnóstico es el más caro por caso?",
   "¿Qué pacientes vuelven a internarse más y qué programa de prevención propondrías?",
   "¿Cuánto dinero se ahorró la ARS gracias a la auditoría?"
  ],
  "tips": [
   "La glosa es dinero que la ARS no pagó porque no correspondía: es el resultado de tu trabajo.",
   "Para ver la estacionalidad, pon Mes en Filas y filtra un solo diagnóstico."
  ],
  "archivo": "Modulo4-Gerencia-Auditoria-Medica.xlsx",
  "tabla": "tblAuditoria",
  "hoja": "Casos",
  "registros": 360,
  "campos": [
   [
    "ID Caso",
    "Código único del caso auditado"
   ],
   [
    "Fecha de Ingreso",
    "Día en que el paciente ingresó"
   ],
   [
    "Año",
    "Año del ingreso"
   ],
   [
    "Mes",
    "Mes del ingreso (1 a 12)"
   ],
   [
    "ARS",
    "Aseguradora del paciente"
   ],
   [
    "PSS",
    "Hospital o clínica donde se internó"
   ],
   [
    "Diagnóstico",
    "Motivo principal del internamiento"
   ],
   [
    "Tipo de Ingreso",
    "Emergencia o Programado"
   ],
   [
    "Sexo",
    "F o M"
   ],
   [
    "Edad",
    "Edad del paciente en años"
   ],
   [
    "Días de Internamiento",
    "Días que estuvo ingresado"
   ],
   [
    "Monto Facturado",
    "Lo que facturó el prestador (RD$)"
   ],
   [
    "Monto Aprobado",
    "Lo que aprobó el auditor (RD$)"
   ],
   [
    "Monto Glosado",
    "Diferencia que el auditor no aprobó (RD$)"
   ],
   [
    "Resultado de Auditoría",
    "Sin observación, Glosa parcial o Rechazo total"
   ],
   [
    "Reingreso en 30 Días",
    "Sí, si volvió a internarse antes de 30 días"
   ]
  ]
 }
];
window.MINIMOS = { kpi: 3, graficos: 4, segmentaciones: 1 };
