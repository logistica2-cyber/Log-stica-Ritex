// mockData.js - Casillero Digital de Carga
// Base fija: Adolfo Alsina 2899, Balvanera, CABA, Argentina (Ricoltex / Ekserciyan)

(function() {
  const DEPOSITO_ORIGEN = {
    nombre: "Ricoltex / Ekserciyan S.A.",
    direccion: "Adolfo Alsina 2899, Balvanera, CABA",
    coordenadas: [-34.611835, -58.406822],
    contacto: "(011) 5950-5950",
    email: "ventas@ritexweb.com",
    cuit: "30-61211333-1"
  };

  // ZONAS REALES DE LOGÍSTICA DE RICOLTEX (9 Zonas)
  const ZONAS_INICIALES = [
    {
      id: "SUROESTE",
      nombre: "Suroeste",
      capMax: 130,
      color: "#059669", // emerald-600
      colorLight: "#d1fae5",
      chofer: "Móvil 03 - Mercedes Sprinter",
      descripcion: "Lomas de Zamora, Lanús Oeste, Echeverría"
    },
    {
      id: "SUR_EXPRESOS",
      nombre: "Sur Expresos",
      capMax: 220,
      color: "#2563eb", // blue-600
      colorLight: "#dbeafe",
      chofer: "Móvil 08 - Camión Chasis Larga Distancia",
      descripcion: "Transportes de carga al interior y expresos"
    },
    {
      id: "SUR_SUR",
      nombre: "Sur / Sur",
      capMax: 120,
      color: "#0d9488", // teal-600
      colorLight: "#ccfbf1",
      chofer: "Móvil 05 - Iveco Daily",
      descripcion: "Quilmes, Berazategui, Florencio Varela"
    },
    {
      id: "AVELLANEDA",
      nombre: "Avellaneda",
      capMax: 110,
      color: "#0284c7", // sky-600
      colorLight: "#e0f2fe",
      chofer: "Móvil 02 - Utilitario Boxer",
      descripcion: "Avellaneda Centro, Piñeyro, Gerli, Sarandí"
    },
    {
      id: "CANNING",
      nombre: "Canning",
      capMax: 150,
      color: "#7c3aed", // violet-600
      colorLight: "#ede9fe",
      chofer: "Móvil 06 - Ford Cargo",
      descripcion: "Ezeiza, Canning, San Vicente"
    },
    {
      id: "NORTE",
      nombre: "Norte",
      capMax: 160,
      color: "#4f46e5", // indigo-600
      colorLight: "#e0e7ff",
      chofer: "Móvil 04 - Ford Transit",
      descripcion: "Vicente López, San Isidro, San Martín, Tigre"
    },
    {
      id: "NOROESTE",
      nombre: "Noroeste",
      capMax: 120,
      color: "#9333ea", // purple-600
      colorLight: "#f3e8ff",
      chofer: "Móvil 07 - Renault Master",
      descripcion: "San Miguel, José C. Paz, Malvinas Argentinas"
    },
    {
      id: "OESTE",
      nombre: "Oeste",
      capMax: 140,
      color: "#d97706", // amber-600
      colorLight: "#fef3c7",
      chofer: "Móvil 09 - Mercedes Accelo",
      descripcion: "Morón, Ramos Mejía, Haedo, San Justo"
    },
    {
      id: "ONCE",
      nombre: "Once & Balvanera",
      capMax: 90,
      color: "#ea580c", // orange-600
      colorLight: "#ffedd5",
      chofer: "Móvil 01 - Utilitario Kangoo Local",
      descripcion: "Once, Balvanera, San Cristóbal, Centro"
    }
  ];

  // FACTURAS INICIALES REALISTAS
  const FACTURAS_INICIALES = [
    // Factura real de la foto:
    {
      id: "FC-00201-00000790",
      remito: "00201-00000790",
      cliente: "MELFEJ S.R.L.",
      direccion: "H. IRIGOYEN 9747, LOMAS DE ZAMORA",
      coordenadas: [-34.7610, -58.3980],
      rollos: 39,
      zona: "SUROESTE",
      estado: "En Casillero",
      secuenciaEntrega: 1,
      horario: "09:00 - 13:00",
      observaciones: "Factura A real: 37 bultos Jersey + 2 bultos Rib"
    },
    {
      id: "FC-00201-00000788",
      remito: "00201-00000788",
      cliente: "FAGUAR S.A.C.I.",
      direccion: "Av. Hipólito Yrigoyen 4500, Lanús Oeste",
      coordenadas: [-34.7085, -58.3912],
      rollos: 45,
      zona: "SUROESTE",
      estado: "En Casillero",
      secuenciaEntrega: 2,
      horario: "10:00 - 14:00",
      observaciones: "Entrega bultos algodón"
    },
    {
      id: "FC-00201-00000785",
      remito: "00201-00000785",
      cliente: "PRINTEL S.A.",
      direccion: "Av. Mitre 1200, Avellaneda",
      coordenadas: [-34.6640, -58.3685],
      rollos: 50,
      zona: "AVELLANEDA",
      estado: "En Casillero",
      secuenciaEntrega: 1,
      horario: "08:30 - 12:00",
      observaciones: "Descarga por rampa"
    },
    {
      id: "FC-00201-00000786",
      remito: "00201-00000786",
      cliente: "TOUBY S.A.",
      direccion: "Sarmiento 450, Avellaneda",
      coordenadas: [-34.6620, -58.3610],
      rollos: 35,
      zona: "AVELLANEDA",
      estado: "En Casillero",
      secuenciaEntrega: 2,
      horario: "11:00 - 15:00",
      observaciones: "Pedir remito firmado"
    },
    {
      id: "FC-00201-00000787",
      remito: "00201-00000787",
      cliente: "AMERICAN COTTON S.A.",
      direccion: "San Martín 2100, Vicente López",
      coordenadas: [-34.5290, -58.4820],
      rollos: 75,
      zona: "NORTE",
      estado: "En Casillero",
      secuenciaEntrega: 1,
      horario: "09:00 - 13:00",
      observaciones: "Entrada por portón 2"
    },
    {
      id: "FC-00201-00000789",
      remito: "00201-00000789",
      cliente: "HAITAYAN GABRIEL JUAN",
      direccion: "Paso 550, Once, CABA",
      coordenadas: [-34.6065, -58.4035],
      rollos: 30,
      zona: "ONCE",
      estado: "En Casillero",
      secuenciaEntrega: 1,
      horario: "08:00 - 11:30",
      observaciones: "Descarga rápida local"
    },
    // FACTURAS PENDIENTES
    {
      id: "FC-00201-00000791",
      remito: "00201-00000791",
      cliente: "R A INTERTRADING S.A.",
      direccion: "Rivadavia 12000, Morón, Buenos Aires",
      coordenadas: [-34.6520, -58.6210],
      rollos: 60,
      zona: null,
      estado: "Pendiente",
      secuenciaEntrega: null,
      horario: "10:00 - 15:00",
      observaciones: "Zona detectada: Oeste"
    },
    {
      id: "FC-00201-00000792",
      remito: "00201-00000792",
      cliente: "ROLFY S.A.",
      direccion: "Ruta 58 Km 9, Canning",
      coordenadas: [-34.8820, -58.5080],
      rollos: 80,
      zona: null,
      estado: "Pendiente",
      secuenciaEntrega: null,
      horario: "09:00 - 14:00",
      observaciones: "Zona detectada: Canning"
    },
    {
      id: "FC-00201-00000793",
      remito: "00201-00000793",
      cliente: "JOSE BASSO S.A",
      direccion: "Expreso La Rioja / Terminal Sur",
      coordenadas: [-34.6510, -58.3900],
      rollos: 110,
      zona: null,
      estado: "Pendiente",
      secuenciaEntrega: null,
      horario: "08:00 - 12:00",
      observaciones: "Zona detectada: Sur Expresos"
    }
  ];

  window.CASILLERO_DATA = {
    DEPOSITO_ORIGEN,
    ZONAS_INICIALES,
    FACTURAS_INICIALES
  };
})();
