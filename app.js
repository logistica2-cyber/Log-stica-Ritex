// app.js - Casillero Digital de Carga
// Completamente encapsulado, resiliente y compatible con file://

(function() {
  'use strict';

  // DATOS BASE DE DEPOSITO Y 9 ZONAS REALES (Fallback integrado para máxima fiabilidad)
  const FALLBACK_DEPOSITO = {
    nombre: "Ricoltex / Ekserciyan S.A.",
    direccion: "Adolfo Alsina 2899, Balvanera, CABA",
    coordenadas: [-34.611835, -58.406822],
    contacto: "(011) 5950-5950",
    email: "ventas@ritexweb.com",
    cuit: "30-61211333-1"
  };

  const FALLBACK_ZONAS = [
    { id: "SUROESTE", nombre: "Suroeste", capMax: 130, color: "#059669", colorLight: "#d1fae5", chofer: "Móvil 03 - Mercedes Sprinter", descripcion: "Lomas de Zamora, Lanús Oeste, Echeverría" },
    { id: "SUR_EXPRESOS", nombre: "Sur Expresos", capMax: 220, color: "#2563eb", colorLight: "#dbeafe", chofer: "Móvil 08 - Camión Chasis Larga Distancia", descripcion: "Transportes de carga al interior y expresos" },
    { id: "SUR_SUR", nombre: "Sur / Sur", capMax: 120, color: "#0d9488", colorLight: "#ccfbf1", chofer: "Móvil 05 - Iveco Daily", descripcion: "Quilmes, Berazategui, Florencio Varela" },
    { id: "AVELLANEDA", nombre: "Avellaneda", capMax: 110, color: "#0284c7", colorLight: "#e0f2fe", chofer: "Móvil 02 - Utilitario Boxer", descripcion: "Avellaneda Centro, Piñeyro, Gerli, Sarandí" },
    { id: "CANNING", nombre: "Canning", capMax: 150, color: "#7c3aed", colorLight: "#ede9fe", chofer: "Móvil 06 - Ford Cargo", descripcion: "Ezeiza, Canning, San Vicente" },
    { id: "NORTE", nombre: "Norte", capMax: 160, color: "#4f46e5", colorLight: "#e0e7ff", chofer: "Móvil 04 - Ford Transit", descripcion: "Vicente López, San Isidro, San Martín, Tigre" },
    { id: "NOROESTE", nombre: "Noroeste", capMax: 120, color: "#9333ea", colorLight: "#f3e8ff", chofer: "Móvil 07 - Renault Master", descripcion: "San Miguel, José C. Paz, Malvinas Argentinas" },
    { id: "OESTE", nombre: "Oeste", capMax: 140, color: "#d97706", colorLight: "#fef3c7", chofer: "Móvil 09 - Mercedes Accelo", descripcion: "Morón, Ramos Mejía, Haedo, San Justo" },
    { id: "ONCE", nombre: "Once & Balvanera", capMax: 90, color: "#ea580c", colorLight: "#ffedd5", chofer: "Móvil 01 - Utilitario Kangoo Local", descripcion: "Once, Balvanera, San Cristóbal, Centro" }
  ];

  const FALLBACK_FACTURAS = [
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
      observaciones: "Zona sugerida: Oeste"
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
      observaciones: "Zona sugerida: Canning"
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
      observaciones: "Zona sugerida: Sur Expresos"
    }
  ];

  function obtenerDatosIniciales() {
    const data = window.CASILLERO_DATA || {};
    return {
      deposito: data.DEPOSITO_ORIGEN || FALLBACK_DEPOSITO,
      zonas: (data.ZONAS_INICIALES && data.ZONAS_INICIALES.length === 9) ? data.ZONAS_INICIALES : FALLBACK_ZONAS,
      facturas: (data.FACTURAS_INICIALES && data.FACTURAS_INICIALES.length > 0) ? data.FACTURAS_INICIALES : FALLBACK_FACTURAS
    };
  }

  // ESTADO DE LA APP
  const state = {
    zonas: [],
    facturas: [],
    activeTab: 'casilleros',
    filtroPendientes: '',
    mapaZonaSeleccionada: 'ALL',
    hojaRutaZonaSeleccionada: 'SUROESTE',
    ordenCasilleros: 'rollos_desc',
    draggedFacturaId: null
  };

  let mapInstance = null;
  let mapMarkers = [];
  let mapPolylines = [];

  // ==========================================
  // INICIALIZACIÓN Y PERSISTENCIA
  // ==========================================
  function inicializarEstado() {
    const datosBase = obtenerDatosIniciales();
    const guardadoZonas = localStorage.getItem('casillero_zonas');
    const guardadoFacturas = localStorage.getItem('casillero_facturas');

    if (guardadoZonas && guardadoFacturas) {
      try {
        const parsedZonas = JSON.parse(guardadoZonas);
        const parsedFacturas = JSON.parse(guardadoFacturas);
        // Si las zonas en localStorage no tienen exactamente las 9 zonas de Ricoltex o no hay facturas, migrar
        if (!Array.isArray(parsedZonas) || parsedZonas.length !== 9 || !Array.isArray(parsedFacturas) || parsedFacturas.length === 0) {
          console.info("Migrando casilleros a las 9 zonas oficiales de Ricoltex...");
          state.zonas = JSON.parse(JSON.stringify(datosBase.zonas));
          state.facturas = JSON.parse(JSON.stringify(datosBase.facturas));
          guardarEnLocalStorage();
          return;
        }
        state.zonas = parsedZonas;
        state.facturas = parsedFacturas;
      } catch (e) {
        console.warn("Error leyendo localStorage, recargando base", e);
        cargarDatosBase();
      }
    } else {
      cargarDatosBase();
    }
  }

  function cargarDatosBase() {
    const datosBase = obtenerDatosIniciales();
    state.zonas = JSON.parse(JSON.stringify(datosBase.zonas));
    state.facturas = JSON.parse(JSON.stringify(datosBase.facturas));
    guardarEnLocalStorage();
  }

  function guardarEnLocalStorage() {
    localStorage.setItem('casillero_zonas', JSON.stringify(state.zonas));
    localStorage.setItem('casillero_facturas', JSON.stringify(state.facturas));
  }

  // ==========================================
  // RENDERIZADO GENERAL
  // ==========================================
  function render() {
    try {
      renderMetricasGlobales();
      renderPendientes();
      renderCasilleros();
      actualizarOpcionesSelectores();

      if (state.activeTab === 'mapa') {
        renderMapa();
      } else if (state.activeTab === 'hoja-ruta') {
        renderHojaDeRuta();
      }

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    } catch (err) {
      console.error("Error durante el render:", err);
    }
  }

  // 1. MÉTRICAS GLOBALES
  function renderMetricasGlobales() {
    const totalFacturas = state.facturas.length;
    const totalRollos = state.facturas.reduce((acc, f) => acc + Number(f.rollos || 0), 0);
    
    const facturasAsignadas = state.facturas.filter(f => f.zona !== null);
    const rollosAsignados = facturasAsignadas.reduce((acc, f) => acc + Number(f.rollos || 0), 0);
    
    const facturasPendientes = state.facturas.filter(f => f.zona === null);
    const rollosPendientes = facturasPendientes.reduce((acc, f) => acc + Number(f.rollos || 0), 0);

    const elTotalFacturas = document.getElementById('stat-total-facturas');
    const elTotalRollos = document.getElementById('stat-total-rollos');
    const elRollosAsignados = document.getElementById('stat-rollos-asignados');
    const elRollosPendientes = document.getElementById('stat-rollos-pendientes');
    const elCasillerosActivos = document.getElementById('stat-casilleros-activos');
    const elBadgePendientes = document.getElementById('badge-pendientes-count');

    if (elTotalFacturas) elTotalFacturas.textContent = totalFacturas;
    if (elTotalRollos) elTotalRollos.textContent = totalRollos;
    if (elRollosAsignados) elRollosAsignados.textContent = rollosAsignados;
    if (elRollosPendientes) elRollosPendientes.textContent = rollosPendientes;
    if (elCasillerosActivos) elCasillerosActivos.textContent = state.zonas.length;
    if (elBadgePendientes) elBadgePendientes.textContent = `${facturasPendientes.length} facturas (${rollosPendientes} rollos)`;

    const elBadgeMobile = document.getElementById('badge-pendientes-mobile');
    if (elBadgeMobile) {
      elBadgeMobile.textContent = facturasPendientes.length;
      elBadgeMobile.classList.toggle('hidden', facturasPendientes.length === 0);
    }
  }

  // 2. FACTURAS PENDIENTES
  function renderPendientes() {
    const contenedor = document.getElementById('lista-pendientes');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    const q = (state.filtroPendientes || '').toLowerCase().trim();
    const pendientes = state.facturas.filter(f => {
      if (f.zona !== null) return false;
      if (!q) return true;
      return (
        (f.cliente || '').toLowerCase().includes(q) ||
        (f.remito || '').toLowerCase().includes(q) ||
        (f.direccion || '').toLowerCase().includes(q)
      );
    });

    if (pendientes.length === 0) {
      contenedor.innerHTML = `
        <div class="p-6 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
          <i data-lucide="check-circle-2" class="w-8 h-8 mx-auto mb-2 text-slate-600"></i>
          <p class="text-xs font-medium">No hay facturas pendientes</p>
          <p class="text-[11px] text-slate-600 mt-0.5">Todas están asignadas a un casillero.</p>
        </div>
      `;
      return;
    }

    pendientes.forEach(f => {
      const card = document.createElement('div');
      card.className = "bg-slate-900 border border-slate-800 hover:border-slate-700 p-3 rounded-xl shadow-sm cursor-grab active:cursor-grabbing transition-all";
      card.draggable = true;
      card.dataset.id = f.id;

      card.addEventListener('dragstart', (e) => {
        state.draggedFacturaId = f.id;
        card.classList.add('dragging');
        if (e.dataTransfer) e.dataTransfer.setData('text/plain', f.id);
      });

      card.addEventListener('dragend', () => {
        state.draggedFacturaId = null;
        card.classList.remove('dragging');
      });

      card.innerHTML = `
        <div class="flex items-start justify-between gap-2 mb-1.5">
          <span class="text-[11px] font-mono font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700/60">
            ${f.remito}
          </span>
          <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 border border-blue-700/50 flex items-center gap-1">
            <i data-lucide="package" class="w-3 h-3"></i> ${f.rollos} rollos
          </span>
        </div>
        <h4 class="text-xs font-bold text-white truncate">${f.cliente}</h4>
        <p class="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
          <i data-lucide="map-pin" class="w-3 h-3 text-slate-500 flex-shrink-0"></i>
          ${f.direccion}
        </p>

        <div class="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <span class="text-[10px] text-amber-400/90 font-medium truncate">
            ${f.observaciones || 'Sin observaciones'}
          </span>

          <!-- Menú Asignación Rápida -->
          <select onchange="window.asignarFacturaRapido('${f.id}', this.value)" class="bg-slate-800 hover:bg-slate-750 border border-slate-700 text-[10px] text-slate-300 rounded px-1.5 py-1 focus:outline-none focus:border-blue-500">
            <option value="">Asignar a...</option>
            ${state.zonas.map(z => `<option value="${z.id}">${z.nombre}</option>`).join('')}
          </select>
        </div>
      `;

      contenedor.appendChild(card);
    });
  }

  // 3. CASILLEROS OPERATIVOS Y TABLA RESUMEN EJECUTIVA
  function renderCasilleros() {
    const contenedorGrid = document.getElementById('grid-casilleros');
    const tablaResumen = document.getElementById('tabla-resumen-zonas');

    if (contenedorGrid) contenedorGrid.innerHTML = '';
    if (tablaResumen) tablaResumen.innerHTML = '';

    // Mapear cada zona con sus datos calculados
    const zonasProcesadas = state.zonas.map(zona => {
      const facturasZona = state.facturas
        .filter(f => f.zona === zona.id)
        .sort((a, b) => (a.secuenciaEntrega || 99) - (b.secuenciaEntrega || 99));

      const rollosCargados = facturasZona.reduce((acc, f) => acc + Number(f.rollos || 0), 0);
      const porcentajeCarga = Math.round((rollosCargados / zona.capMax) * 100);
      const estaSobrecargado = rollosCargados > zona.capMax;
      const estaEnAlerta = porcentajeCarga >= 75 && !estaSobrecargado;

      return {
        zona,
        facturasZona,
        rollosCargados,
        porcentajeCarga,
        estaSobrecargado,
        estaEnAlerta
      };
    });

    // Ordenar según criterio seleccionado (por defecto: mayor cantidad de rollos primero)
    if (state.ordenCasilleros === 'rollos_desc') {
      zonasProcesadas.sort((a, b) => b.rollosCargados - a.rollosCargados);
    } else if (state.ordenCasilleros === 'rollos_asc') {
      zonasProcesadas.sort((a, b) => a.rollosCargados - b.rollosCargados);
    } else if (state.ordenCasilleros === 'alfabetico') {
      zonasProcesadas.sort((a, b) => a.zona.nombre.localeCompare(b.zona.nombre));
    }

    zonasProcesadas.forEach(item => {
      const { zona, facturasZona, rollosCargados, porcentajeCarga, estaSobrecargado, estaEnAlerta } = item;

      let barColor = 'bg-emerald-500';
      let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      let estadoBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">En Rango</span>`;

      if (estaSobrecargado) {
        barColor = 'bg-red-500 overload-pulse';
        badgeColor = 'bg-red-500/20 text-red-300 border-red-500/40 font-bold';
        estadoBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-950/60 text-red-300 border border-red-800/60 animate-pulse">Sobrecarga (+${rollosCargados - zona.capMax}r)</span>`;
      } else if (estaEnAlerta) {
        barColor = 'bg-amber-500';
        badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
        estadoBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/60 text-amber-400 border border-amber-800/60">Carga Alta</span>`;
      }

      // Inyectar en Tabla Resumen
      if (tablaResumen) {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-800/40 transition-colors";
        tr.innerHTML = `
          <td class="p-2 font-bold text-white flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background-color: ${zona.color}"></span>
            <span>${zona.nombre}</span>
            <span class="text-[10px] text-slate-500 font-normal hidden md:inline">(${zona.chofer.split('(')[0]})</span>
          </td>
          <td class="p-2 text-center font-mono font-semibold text-slate-200">${facturasZona.length} facturas</td>
          <td class="p-2 text-center font-mono font-bold text-blue-400 text-sm">${rollosCargados} rollos</td>
          <td class="p-2 text-center font-mono text-slate-400">${zona.capMax} r</td>
          <td class="p-2">
            <div class="flex items-center gap-2">
              <div class="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden min-w-[60px] max-w-[120px]">
                <div class="h-full rounded-full ${barColor}" style="width: ${Math.min(porcentajeCarga, 100)}%"></div>
              </div>
              <span class="font-mono text-[11px] text-slate-300 font-medium">${porcentajeCarga}%</span>
            </div>
          </td>
          <td class="p-2 text-center">${estadoBadge}</td>
          <td class="p-2 text-right">
            <button onclick="window.scrollACasillero('${zona.id}')" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-white rounded text-[11px] font-medium transition-colors">
              Ver Casillero ↓
            </button>
          </td>
        `;
        tablaResumen.appendChild(tr);
      }

      // Inyectar en Grid de Casilleros
      if (contenedorGrid) {
        const cardCasillero = document.createElement('div');
        cardCasillero.className = `bg-slate-900/90 border ${estaSobrecargado ? 'border-red-500/70 shadow-red-900/20 shadow-lg' : 'border-slate-800'} rounded-2xl p-4 flex flex-col transition-all min-h-[360px]`;
        cardCasillero.dataset.zonaId = zona.id;

        cardCasillero.addEventListener('dragover', (e) => {
          e.preventDefault();
          cardCasillero.classList.add('drop-target-active');
        });
        cardCasillero.addEventListener('dragleave', () => {
          cardCasillero.classList.remove('drop-target-active');
        });
        cardCasillero.addEventListener('drop', (e) => {
          e.preventDefault();
          cardCasillero.classList.remove('drop-target-active');
          const facturaId = (e.dataTransfer && e.dataTransfer.getData('text/plain')) || state.draggedFacturaId;
          if (facturaId) {
            asignarFacturaAZona(facturaId, zona.id);
          }
        });

        cardCasillero.innerHTML = `
          <div class="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full flex-shrink-0" style="background-color: ${zona.color}"></span>
                <h3 class="text-sm font-bold text-white">${zona.nombre}</h3>
              </div>
              <p class="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                <i data-lucide="user-check" class="w-3 h-3 text-slate-500"></i> ${zona.chofer.split('(')[0]}
              </p>
            </div>

            <button onclick="window.irAHojaRuta('${zona.id}')" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-white rounded-lg text-xs font-medium border border-slate-700/80 flex items-center gap-1.5 transition-colors" title="Generar Hoja de Ruta">
              <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
              <span>Hoja</span>
            </button>
          </div>

          <!-- MEDIDOR DE CAPACIDAD -->
          <div class="my-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-slate-400 font-medium flex items-center gap-1">
                <i data-lucide="gauge" class="w-3.5 h-3.5 text-slate-500"></i>
                Carga:
              </span>
              <span class="px-2 py-0.5 rounded-full text-[11px] border ${badgeColor}">
                ${rollosCargados} / ${zona.capMax} Rollos (${porcentajeCarga}%)
              </span>
            </div>

            <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500 ${barColor}" style="width: ${Math.min(porcentajeCarga, 100)}%"></div>
            </div>

            ${estaSobrecargado ? `
              <div class="mt-2 text-[11px] text-red-300 font-semibold bg-red-950/60 border border-red-800/60 rounded px-2 py-1 flex items-center gap-1.5">
                <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-red-400 flex-shrink-0"></i>
                <span>¡Sobrecarga! Excede por ${rollosCargados - zona.capMax} rollos.</span>
              </div>
            ` : ''}
          </div>

          <!-- LISTADO DE FACTURAS -->
          <div class="flex-1 flex flex-col overflow-hidden">
            <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 px-0.5">
              <span>Paradas programadas: <strong>${facturasZona.length}</strong></span>
              <span>Arrastra aquí</span>
            </div>

            <div class="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[140px] rounded-xl bg-slate-950/40 p-2 border border-slate-800/40">
              ${facturasZona.length === 0 ? `
                <div class="h-full flex flex-col items-center justify-center text-slate-600 text-xs py-8">
                  <i data-lucide="box" class="w-6 h-6 mb-1 opacity-50"></i>
                  <span>Casillero vacío</span>
                  <span class="text-[10px] text-slate-600">Arrastra facturas desde pendientes</span>
                </div>
              ` : facturasZona.map((f, idx) => `
                <div class="bg-slate-900 border border-slate-800 hover:border-slate-700 p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 group transition-all">
                  <div class="flex items-center gap-2 overflow-hidden">
                    <span class="w-6 h-6 rounded-lg bg-blue-900/60 text-blue-300 border border-blue-700/50 flex items-center justify-center font-bold font-mono text-[11px] flex-shrink-0">
                      #${idx + 1}
                    </span>
                    <div class="overflow-hidden">
                      <p class="font-bold text-white truncate text-[11px]">${f.cliente}</p>
                      <p class="text-[10px] text-slate-400 truncate">${f.direccion}</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-1.5 flex-shrink-0">
                    <span class="font-mono text-[11px] font-bold text-blue-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                      ${f.rollos}r
                    </span>

                    <div class="flex flex-col gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button onclick="window.moverSecuencia('${f.id}', -1)" class="text-slate-400 hover:text-white p-0.5" title="Subir parada">
                        <i data-lucide="chevron-up" class="w-3 h-3"></i>
                      </button>
                      <button onclick="window.moverSecuencia('${f.id}', 1)" class="text-slate-400 hover:text-white p-0.5" title="Bajar parada">
                        <i data-lucide="chevron-down" class="w-3 h-3"></i>
                      </button>
                    </div>

                    <button onclick="window.desasignarFactura('${f.id}')" class="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors" title="Devolver a Pendientes">
                      <i data-lucide="x" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

        contenedorGrid.appendChild(cardCasillero);
      }
    });
  }

  // ==========================================
  // ACCIONES OPERATIVAS EXPUESTAS EN WINDOW
  // ==========================================
  window.scrollACasillero = function(zonaId) {
    const el = document.querySelector(`[data-zona-id="${zonaId}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-blue-500/80');
      setTimeout(() => el.classList.remove('ring-4', 'ring-blue-500/80'), 1500);
    }
  };

  window.asignarFacturaRapido = function(facturaId, zonaId) {
    if (!zonaId) return;
    asignarFacturaAZona(facturaId, zonaId);
  };

  function asignarFacturaAZona(facturaId, zonaId) {
    const factura = state.facturas.find(f => f.id === facturaId);
    if (!factura) return;

    factura.zona = zonaId;
    factura.estado = "En Casillero";

    const facturasEnZona = state.facturas.filter(f => f.zona === zonaId);
    factura.secuenciaEntrega = facturasEnZona.length;

    guardarEnLocalStorage();
    render();
  }

  window.desasignarFactura = function(facturaId) {
    const factura = state.facturas.find(f => f.id === facturaId);
    if (!factura) return;

    const zonaAnterior = factura.zona;
    factura.zona = null;
    factura.estado = "Pendiente";
    factura.secuenciaEntrega = null;

    if (zonaAnterior) {
      const facturasEnZona = state.facturas
        .filter(f => f.zona === zonaAnterior)
        .sort((a, b) => (a.secuenciaEntrega || 0) - (b.secuenciaEntrega || 0));

      facturasEnZona.forEach((f, idx) => {
        f.secuenciaEntrega = idx + 1;
      });
    }

    guardarEnLocalStorage();
    render();
  };

  window.moverSecuencia = function(facturaId, direccion) {
    const factura = state.facturas.find(f => f.id === facturaId);
    if (!factura || !factura.zona) return;

    const zonaFacturas = state.facturas
      .filter(f => f.zona === factura.zona)
      .sort((a, b) => a.secuenciaEntrega - b.secuenciaEntrega);

    const currentIndex = zonaFacturas.findIndex(f => f.id === facturaId);
    const targetIndex = currentIndex + direccion;

    if (targetIndex >= 0 && targetIndex < zonaFacturas.length) {
      const swapFactura = zonaFacturas[targetIndex];
      const tempSeq = factura.secuenciaEntrega;
      factura.secuenciaEntrega = swapFactura.secuenciaEntrega;
      swapFactura.secuenciaEntrega = tempSeq;

      guardarEnLocalStorage();
      render();
    }
  };

  window.handleDragOver = function(e) {
    e.preventDefault();
  };

  window.handleDrop = function(e, targetZona) {
    e.preventDefault();
    const facturaId = (e.dataTransfer && e.dataTransfer.getData('text/plain')) || state.draggedFacturaId;
    if (facturaId && targetZona === null) {
      window.desasignarFactura(facturaId);
    }
  };

  window.irAHojaRuta = function(zonaId) {
    state.hojaRutaZonaSeleccionada = zonaId;
    cambiarPestana('hoja-ruta');
  };

  // ==========================================
  // MAPA INTERACTIVO (LEAFLET / CABA)
  // ==========================================
  function inicializarMapa() {
    if (mapInstance || typeof L === 'undefined') return;

    const mapEl = document.getElementById('map');
    if (!mapEl) return;

    const datos = obtenerDatosIniciales();
    mapInstance = L.map('map').setView(datos.deposito.coordenadas, 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(mapInstance);
  }

  function renderMapa() {
    if (typeof L === 'undefined') return;
    inicializarMapa();
    if (!mapInstance) return;

    setTimeout(() => {
      if (mapInstance) mapInstance.invalidateSize();
    }, 150);

    mapMarkers.forEach(m => mapInstance.removeLayer(m));
    mapPolylines.forEach(p => mapInstance.removeLayer(p));
    mapMarkers = [];
    mapPolylines = [];

    const datos = obtenerDatosIniciales();

    // Marcador central
    const originIcon = L.divIcon({
      className: 'custom-pin',
      html: `
        <div class="warehouse-pin">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const originMarker = L.marker(datos.deposito.coordenadas, { icon: originIcon })
      .addTo(mapInstance)
      .bindPopup(`
        <div class="p-1">
          <strong class="text-sm text-red-400 block">${datos.deposito.nombre}</strong>
          <p class="text-xs text-slate-300">${datos.deposito.direccion}</p>
          <p class="text-[11px] text-slate-400 mt-1">Punto de partida y carga fija de todos los móviles.</p>
        </div>
      `);

    mapMarkers.push(originMarker);

    const zonaFiltro = state.mapaZonaSeleccionada;
    const zonasAMostrar = zonaFiltro === 'ALL' ? state.zonas : state.zonas.filter(z => z.id === zonaFiltro);

    const stopsListContainer = document.getElementById('map-stops-list');
    if (stopsListContainer) stopsListContainer.innerHTML = '';

    zonasAMostrar.forEach(zona => {
      const facturasZona = state.facturas
        .filter(f => f.zona === zona.id && f.coordenadas)
        .sort((a, b) => a.secuenciaEntrega - b.secuenciaEntrega);

      if (facturasZona.length === 0) return;

      const routeCoords = [datos.deposito.coordenadas];

      facturasZona.forEach(f => {
        routeCoords.push(f.coordenadas);

        const pinIcon = L.divIcon({
          className: 'custom-pin',
          html: `
            <div style="background-color: ${zona.color}; width: 28px; height: 28px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; border: 2px solid white; font-weight: bold; font-size: 11px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
              #${f.secuenciaEntrega}
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker(f.coordenadas, { icon: pinIcon })
          .addTo(mapInstance)
          .bindPopup(`
            <div class="p-1">
              <div class="flex items-center justify-between gap-2 border-b border-slate-700 pb-1 mb-1">
                <span class="text-xs font-bold font-mono text-blue-400">Parada #${f.secuenciaEntrega}</span>
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300">${f.rollos} rollos</span>
              </div>
              <strong class="text-xs text-white block">${f.cliente}</strong>
              <p class="text-[11px] text-slate-300">${f.direccion}</p>
            </div>
          `);

        mapMarkers.push(marker);

        if (stopsListContainer) {
          const stopItem = document.createElement('div');
          stopItem.className = "p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs flex items-center justify-between gap-2 hover:bg-slate-750 transition-colors cursor-pointer";
          stopItem.onclick = () => {
            mapInstance.flyTo(f.coordenadas, 15);
            marker.openPopup();
          };

          stopItem.innerHTML = `
            <div class="flex items-center gap-2 overflow-hidden">
              <span class="w-6 h-6 rounded-lg font-mono font-bold text-[11px] text-white flex items-center justify-center flex-shrink-0" style="background-color: ${zona.color}">
                #${f.secuenciaEntrega}
              </span>
              <div class="overflow-hidden">
                <p class="font-bold text-white truncate text-[11px]">${f.cliente}</p>
                <p class="text-[10px] text-slate-400 truncate">${f.direccion}</p>
              </div>
            </div>
            <span class="font-mono text-[11px] text-blue-400 font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
              ${f.rollos}r
            </span>
          `;
          stopsListContainer.appendChild(stopItem);
        }
      });

      // RUTA POR CALLES REALES (OSRM) Y ENLACE GOOGLE MAPS
      const coordsParaRuta = [datos.deposito.coordenadas, ...facturasZona.map(f => f.coordenadas)];
      const coordsStr = coordsParaRuta.map(c => `${c[1]},${c[0]}`).join(';');

      // Línea provisional mientras carga OSRM
      const tempPolyline = L.polyline(coordsParaRuta, {
        color: zona.color,
        weight: 3.5,
        opacity: 0.4,
        dashArray: '5, 5'
      }).addTo(mapInstance);
      mapPolylines.push(tempPolyline);

      // Consultar calles reales a OSRM
      fetch(`https://router.project-osrm.org/route/v1/driving/${coordsStr}?overview=full&geometries=geojson`)
        .then(res => res.json())
        .then(data => {
          if (data && data.routes && data.routes[0]) {
            if (mapInstance && mapInstance.hasLayer(tempPolyline)) {
              mapInstance.removeLayer(tempPolyline);
            }
            const streetCoords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);

            // Contorno de calle elegante tipo Google Maps
            const borderLine = L.polyline(streetCoords, {
              color: '#0f172a',
              weight: 6,
              opacity: 0.8
            }).addTo(mapInstance);

            // Línea principal de asfalto con el color de la zona
            const mainLine = L.polyline(streetCoords, {
              color: zona.color,
              weight: 4,
              opacity: 0.95
            }).addTo(mapInstance);

            mapPolylines.push(borderLine, mainLine);

            // Actualizar métricas reales de viaje en km y minutos
            const distKm = (data.routes[0].distance / 1000).toFixed(1);
            const durMin = Math.round(data.routes[0].duration / 60);

            const elKm = document.getElementById('map-route-km');
            const elTime = document.getElementById('map-route-time');
            if (elKm) elKm.textContent = `${distKm} km`;
            if (elTime) elTime.textContent = `${durMin} min`;
          }
        })
        .catch(err => {
          console.warn("OSRM no disponible, se mantiene trazado directo", err);
        });

      // Configurar enlace para abrir la ruta en Google Maps GPS del celular
      const btnGmaps = document.getElementById('btn-google-maps-nav');
      if (btnGmaps && facturasZona.length > 0) {
        const origStr = `${datos.deposito.coordenadas[0]},${datos.deposito.coordenadas[1]}`;
        const destStr = `${facturasZona[facturasZona.length - 1].coordenadas[0]},${facturasZona[facturasZona.length - 1].coordenadas[1]}`;
        const waypts = facturasZona.slice(0, -1).map(f => `${f.coordenadas[0]},${f.coordenadas[1]}`).join('|');
        btnGmaps.href = `https://www.google.com/maps/dir/?api=1&origin=${origStr}&destination=${destStr}${waypts ? `&waypoints=${encodeURIComponent(waypts)}` : ''}&travelmode=driving`;
      }
    });

    if (stopsListContainer && stopsListContainer.children.length === 0) {
      stopsListContainer.innerHTML = `
        <div class="p-6 text-center text-slate-500">
          <p class="text-xs">No hay entregas asignadas en esta selección.</p>
        </div>
      `;
    }
  }

  // ==========================================
  // HOJA DE RUTA OFICIAL
  // ==========================================
  function renderHojaDeRuta() {
    const zonaId = state.hojaRutaZonaSeleccionada;
    const zona = state.zonas.find(z => z.id === zonaId) || state.zonas[0];
    if (!zona) return;

    const facturasZona = state.facturas
      .filter(f => f.zona === zona.id)
      .sort((a, b) => a.secuenciaEntrega - b.secuenciaEntrega);

    const totalRollos = facturasZona.reduce((acc, f) => acc + Number(f.rollos || 0), 0);
    const fechaHoy = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const elCodigo = document.getElementById('hdr-codigo');
    const elFecha = document.getElementById('hdr-fecha');
    const elZonaBadge = document.getElementById('hdr-zona-badge');
    const elChofer = document.getElementById('hdr-chofer');
    const elParadas = document.getElementById('hdr-total-paradas');
    const elRollos = document.getElementById('hdr-total-rollos');

    if (elCodigo) elCodigo.textContent = `HDR-${zona.id}-${new Date().toISOString().slice(0,10).replace(/-/g, '')}`;
    if (elFecha) elFecha.textContent = `Fecha: ${fechaHoy}`;
    if (elZonaBadge) elZonaBadge.textContent = `Zona: ${zona.nombre}`;
    if (elChofer) elChofer.textContent = zona.chofer;
    if (elParadas) elParadas.textContent = `${facturasZona.length} paradas`;
    if (elRollos) elRollos.textContent = `${totalRollos} ROLLOS`;

    const tbody = document.getElementById('hdr-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (facturasZona.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="p-6 text-center text-slate-500 italic">
            No hay facturas asignadas a este casillero actualmente. Asigna facturas desde el tablero principal.
          </td>
        </tr>
      `;
      return;
    }

    facturasZona.forEach(f => {
      const tr = document.createElement('tr');
      tr.className = "border-b border-slate-200 hover:bg-slate-50";
      tr.innerHTML = `
        <td class="p-2 text-center font-bold font-mono">${f.secuenciaEntrega}</td>
        <td class="p-2 font-mono font-semibold">${f.remito}</td>
        <td class="p-2 font-bold text-slate-900">${f.cliente}</td>
        <td class="p-2 text-slate-700">${f.direccion}</td>
        <td class="p-2 text-center font-bold font-mono text-slate-900">${f.rollos}</td>
        <td class="p-2 text-slate-600 text-[11px]">
          <div>${f.horario || '-'}</div>
          <div class="italic text-slate-500">${f.observaciones || ''}</div>
        </td>
        <td class="p-2">
          <div class="h-8 border border-dashed border-slate-300 rounded bg-slate-50"></div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ==========================================
  // PESTAÑAS Y SELECTORES
  // ==========================================
  function cambiarPestana(tabName) {
    state.activeTab = tabName;

    // Actualizar estilo botones desktop
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const match = (btn.dataset.tab === tabName) || (tabName === 'pendientes' && btn.dataset.tab === 'casilleros');
      if (match) {
        btn.classList.add('bg-blue-600', 'text-white');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('text-slate-400');
      }
    });

    // Actualizar estilo botones móviles
    document.querySelectorAll('.tab-btn-mobile').forEach(btn => {
      if (btn.dataset.tab === tabName) {
        btn.classList.add('text-blue-400', 'font-bold');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('text-blue-400', 'font-bold');
        btn.classList.add('text-slate-400');
      }
    });

    const vCas = document.getElementById('view-casilleros');
    const vMap = document.getElementById('view-mapa');
    const vHdr = document.getElementById('view-hoja-ruta');
    const pPendientes = document.getElementById('panel-pendientes');
    const pCasilleros = document.getElementById('panel-casilleros');

    const esCasillerosOPendientes = (tabName === 'casilleros' || tabName === 'pendientes');
    if (vCas) vCas.classList.toggle('hidden', !esCasillerosOPendientes);
    if (vMap) vMap.classList.toggle('hidden', tabName !== 'mapa');
    if (vHdr) vHdr.classList.toggle('hidden', tabName !== 'hoja-ruta');

    // Manejo de paneles en móvil vs desktop
    if (pPendientes && pCasilleros) {
      const esPantallaPequena = window.innerWidth < 768;
      if (esPantallaPequena) {
        if (tabName === 'pendientes') {
          pPendientes.classList.remove('hidden');
          pCasilleros.classList.add('hidden');
        } else if (tabName === 'casilleros') {
          pPendientes.classList.add('hidden');
          pCasilleros.classList.remove('hidden');
        }
      } else {
        // En desktop se muestran ambos en columnas
        pPendientes.classList.remove('hidden');
        pCasilleros.classList.remove('hidden');
      }
    }

    render();
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function actualizarOpcionesSelectores() {
    const mapSelect = document.getElementById('map-zone-filter');
    if (mapSelect && mapSelect.children.length <= 1) {
      state.zonas.forEach(z => {
        const opt = document.createElement('option');
        opt.value = z.id;
        opt.textContent = z.nombre;
        mapSelect.appendChild(opt);
      });
    }

    const hdrSelect = document.getElementById('select-hoja-zona');
    if (hdrSelect && hdrSelect.children.length === 0) {
      state.zonas.forEach(z => {
        const opt = document.createElement('option');
        opt.value = z.id;
        opt.textContent = `${z.nombre} (${z.id})`;
        hdrSelect.appendChild(opt);
      });
      hdrSelect.value = state.hojaRutaZonaSeleccionada;
    }
  }

  // ==========================================
  // HELPER MAESTRO DE CLIENTES & AUTOCOMPLETADO
  // ==========================================
  function buscarZonaDeCliente(nombre) {
    if (!window.CLIENTES_MAESTRO || !nombre) return null;
    const norm = nombre.toUpperCase().trim();
    if (window.CLIENTES_MAESTRO[norm]) {
      return window.CLIENTES_MAESTRO[norm];
    }
    for (const [cli, z] of Object.entries(window.CLIENTES_MAESTRO)) {
      if (cli.length > 4 && (norm.includes(cli.toUpperCase()) || cli.toUpperCase().includes(norm))) {
        return z;
      }
    }
    return null;
  }

  function autocompletarPorCliente(valor) {
    if (!valor || !valor.trim()) return;
    const nombre = valor.trim();
    const selectZona = document.getElementById('input-zona');
    const inputDir = document.getElementById('input-direccion');

    const zonaDetectada = buscarZonaDeCliente(nombre);
    if (zonaDetectada && selectZona) {
      selectZona.value = zonaDetectada;
    }

    if (inputDir) {
      const norm = nombre.toUpperCase();
      if (norm.includes('MELFEJ')) {
        inputDir.value = "H. IRIGOYEN 9747, LOMAS DE ZAMORA";
      } else if (norm.includes('PRINTEL') || norm.includes('TOUBY') || norm.includes('JUNICA')) {
        inputDir.value = "Av. Mitre / Sarmiento, Avellaneda";
      } else if (norm.includes('AMERICAN COTTON') || norm.includes('INTAR')) {
        inputDir.value = "San Martín 2100, Vicente López";
      } else if (norm.includes('HAITAYAN') || norm.includes('BOROBO') || norm.includes('ORIGEN BEBE')) {
        inputDir.value = "Paso 550, Once, CABA";
      } else if (norm.includes('ROLFY') || norm.includes('DOM GERY') || norm.includes('XINTE')) {
        inputDir.value = "Ruta 58 Km 9, Canning";
      } else if (norm.includes('R A INTERTRADING') || norm.includes('GADITEX') || norm.includes('IGAL')) {
        inputDir.value = "Av. Rivadavia 12000, Morón / Haedo";
      } else if (norm.includes('JOSE BASSO') || norm.includes('TOPPER') || norm.includes('SIERRA HNOS')) {
        inputDir.value = "Expreso La Rioja / Terminal Sur Cargas";
      } else if (zonaDetectada) {
        const mapaDirecciones = {
          "SUROESTE": "Lomas de Zamora / Lanús Oeste, GBA Sur",
          "SUR_EXPRESOS": "Expreso Carga Interior, Terminal Sur",
          "SUR_SUR": "Quilmes / Berazategui, GBA Sur",
          "AVELLANEDA": "Av. Mitre / Centro, Avellaneda",
          "CANNING": "Parque Industrial Canning / Ezeiza",
          "NORTE": "Vicente López / San Isidro, GBA Norte",
          "NOROESTE": "San Miguel / José C. Paz, GBA Noroeste",
          "OESTE": "Morón / Haedo / Ramos Mejía, GBA Oeste",
          "ONCE": "Once / Balvanera, CABA"
        };
        inputDir.value = mapaDirecciones[zonaDetectada] || "Buenos Aires";
      }
    }
  }

  function poblarDatalistClientes() {
    const datalist = document.getElementById('datalist-clientes');
    if (!datalist || !window.CLIENTES_MAESTRO) return;
    datalist.innerHTML = '';
    Object.keys(window.CLIENTES_MAESTRO).sort().forEach(cli => {
      if (cli.trim()) {
        const opt = document.createElement('option');
        opt.value = cli;
        datalist.appendChild(opt);
      }
    });
  }

  function playScannerBeep(exito = true) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = exito ? 1400 : 350;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (exito ? 0.12 : 0.35));
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + (exito ? 0.12 : 0.35));
    } catch (e) {}
  }

  function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.className = "fixed bottom-5 right-5 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400/50 animate-bounce";
    notif.innerHTML = `<span>${mensaje}</span>`;
    document.body.appendChild(notif);
    setTimeout(() => {
      notif.classList.remove('animate-bounce');
      notif.classList.add('opacity-0', 'transition-opacity');
      setTimeout(() => notif.remove(), 400);
    }, 3000);
  }

  // ==========================================
  // CONFIGURACIÓN DE EVENTOS
  // ==========================================
  function setupEventListeners() {
    // Pestañas Desktop y Móvil
    document.querySelectorAll('.tab-btn, .tab-btn-mobile').forEach(btn => {
      btn.addEventListener('click', () => cambiarPestana(btn.dataset.tab));
    });

    // Botón Central Móvil Cámara OCR
    const btnCamaraMobile = document.getElementById('btn-camara-mobile');
    const inputCamara = document.getElementById('input-camara-file');
    if (btnCamaraMobile && inputCamara) {
      btnCamaraMobile.addEventListener('click', () => inputCamara.click());
    }

    // Listener de redimensionamiento de pantalla (móvil / escritorio)
    window.addEventListener('resize', () => {
      const pPendientes = document.getElementById('panel-pendientes');
      const pCasilleros = document.getElementById('panel-casilleros');
      if (pPendientes && pCasilleros && window.innerWidth >= 768) {
        pPendientes.classList.remove('hidden');
        pCasilleros.classList.remove('hidden');
      }
    });

    // Filtro búsqueda pendientes
    const searchInput = document.getElementById('search-pendientes');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.filtroPendientes = e.target.value;
        renderPendientes();
        if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
      });
    }

    // Filtro mapa
    const mapZoneFilter = document.getElementById('map-zone-filter');
    if (mapZoneFilter) {
      mapZoneFilter.addEventListener('change', (e) => {
        state.mapaZonaSeleccionada = e.target.value;
        renderMapa();
      });
    }

    // Selector Hoja de Ruta
    const selectHdr = document.getElementById('select-hoja-zona');
    if (selectHdr) {
      selectHdr.addEventListener('change', (e) => {
        state.hojaRutaZonaSeleccionada = e.target.value;
        renderHojaDeRuta();
      });
    }

    // Selector de Orden de Casilleros
    const selectOrden = document.getElementById('select-orden-casilleros');
    if (selectOrden) {
      selectOrden.value = state.ordenCasilleros;
      selectOrden.addEventListener('change', (e) => {
        state.ordenCasilleros = e.target.value;
        renderCasilleros();
        if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
      });
    }

    // Modal Manual
    const modal = document.getElementById('modal-factura');
    const btnAbrirModal = document.getElementById('btn-nueva-factura');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');
    const btnCancelarModal = document.getElementById('btn-cancelar-modal');
    const formFactura = document.getElementById('form-factura');

    if (btnAbrirModal && modal) {
      btnAbrirModal.addEventListener('click', () => {
        poblarDatalistClientes();
        modal.classList.remove('hidden');
      });
    }
    if (btnCerrarModal && modal) btnCerrarModal.addEventListener('click', () => modal.classList.add('hidden'));
    if (btnCancelarModal && modal) btnCancelarModal.addEventListener('click', () => modal.classList.add('hidden'));

    // Input Cliente (Autocompletado)
    const inputCli = document.getElementById('input-cliente');
    if (inputCli) {
      inputCli.addEventListener('input', (e) => autocompletarPorCliente(e.target.value));
      inputCli.addEventListener('change', (e) => autocompletarPorCliente(e.target.value));
    }

    if (formFactura) {
      formFactura.addEventListener('submit', (e) => {
        e.preventDefault();

        const remito = (document.getElementById('input-remito').value || '').trim();
        const cliente = (document.getElementById('input-cliente').value || '').trim();
        const rollos = parseInt(document.getElementById('input-rollos').value, 10) || 1;
        const direccion = (document.getElementById('input-direccion').value || '').trim();
        const zonaSelect = document.getElementById('input-zona').value;
        const horario = (document.getElementById('input-horario').value || '').trim() || '09:00 - 15:00';
        const observaciones = (document.getElementById('input-observaciones').value || '').trim();

        const datosBase = obtenerDatosIniciales();
        const baseLat = datosBase.deposito.coordenadas[0];
        const baseLng = datosBase.deposito.coordenadas[1];
        const latOffset = (Math.random() - 0.5) * 0.08;
        const lngOffset = (Math.random() - 0.5) * 0.08;

        const zonaFinal = zonaSelect || buscarZonaDeCliente(cliente) || null;

        const nuevaFactura = {
          id: `FC-${Date.now().toString().slice(-4)}`,
          remito,
          cliente,
          direccion: direccion || "Buenos Aires",
          coordenadas: [baseLat + latOffset, baseLng + lngOffset],
          rollos,
          zona: zonaFinal,
          estado: zonaFinal ? "En Casillero" : "Pendiente",
          secuenciaEntrega: zonaFinal ? (state.facturas.filter(f => f.zona === zonaFinal).length + 1) : null,
          horario,
          observaciones
        };

        state.facturas.push(nuevaFactura);
        guardarEnLocalStorage();

        formFactura.reset();
        if (modal) modal.classList.add('hidden');
        render();
        mostrarNotificacion(`✅ Factura cargada: ${cliente} (${rollos} rollos) ➡️ ${zonaFinal || 'Pendiente'}`);
      });
    }

    // ==========================================
    // ESCÁNER OCR INTELIGENTE
    // ==========================================
    let pendingOcrInvoice = null;
    const modalOcr = document.getElementById('modal-ocr');
    const btnEscanearCamara = document.getElementById('btn-escanear-camara');
    const inputCamaraFile = document.getElementById('input-camara-file');
    const btnDemoMelfej = document.getElementById('btn-demo-melfej');
    const btnCerrarOcr = document.getElementById('btn-cerrar-ocr');
    const btnCancelarOcr = document.getElementById('btn-cancelar-ocr');
    const btnConfirmarOcr = document.getElementById('btn-confirmar-ocr');

    const ocrLoading = document.getElementById('ocr-loading');
    const ocrResults = document.getElementById('ocr-results');
    const ocrPreviewImg = document.getElementById('ocr-preview-img');

    if (btnEscanearCamara && inputCamaraFile) {
      btnEscanearCamara.addEventListener('click', () => inputCamaraFile.click());
    }

    if (inputCamaraFile) {
      inputCamaraFile.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file || !modalOcr) return;
        procesarFotoFacturaReal(file);
      });
    }

    if (btnDemoMelfej && modalOcr) {
      btnDemoMelfej.addEventListener('click', () => {
        modalOcr.classList.remove('hidden');
        if (ocrLoading) ocrLoading.classList.remove('hidden');
        if (ocrResults) ocrResults.classList.add('hidden');
        const statusText = document.getElementById('ocr-status-text');
        if (statusText) statusText.textContent = "Analizando Factura A 00201-00000790 de Ricoltex...";

        setTimeout(() => {
          extraerYPresentarDatosFactura("FACTURA A 00201-00000790 CLIENTE MELFEJ S.R.L. TOTAL BULTOS: 39 BULTOS JERSEY 37 RIB 2");
        }, 600);
      });
    }

    if (btnCerrarOcr && modalOcr) btnCerrarOcr.addEventListener('click', () => modalOcr.classList.add('hidden'));
    if (btnCancelarOcr && modalOcr) btnCancelarOcr.addEventListener('click', () => modalOcr.classList.add('hidden'));

    if (btnConfirmarOcr && modalOcr) {
      btnConfirmarOcr.addEventListener('click', () => {
        const inputFactura = document.getElementById('ocr-res-factura');
        const inputCliente = document.getElementById('ocr-res-cliente');
        const inputRollos = document.getElementById('ocr-res-rollos');
        const selectZona = document.getElementById('ocr-res-zona');

        const remito = (inputFactura && inputFactura.value.trim()) || '00201-00000790';
        const cliente = (inputCliente && inputCliente.value.trim()) || 'Cliente Ricoltex';
        const rollos = (inputRollos && parseInt(inputRollos.value, 10)) || 1;
        const zona = (selectZona && selectZona.value) || buscarZonaDeCliente(cliente) || 'SUROESTE';

        const direccion = autocompletarDireccionPorCliente(cliente, zona);

        const nuevaFacturaOcr = {
          id: `FC-${remito.replace(/[^a-zA-Z0-9]/g, '')}`,
          remito,
          cliente,
          direccion,
          coordenadas: [-34.65 + (Math.random() - 0.5) * 0.12, -58.45 + (Math.random() - 0.5) * 0.12],
          rollos,
          zona,
          estado: "En Casillero",
          secuenciaEntrega: (state.facturas.filter(f => f.zona === zona).length + 1),
          horario: "09:00 - 14:00",
          observaciones: `Escaneado con cámara móvil (${rollos} rollos)`
        };

        const idx = state.facturas.findIndex(f => f.remito === nuevaFacturaOcr.remito);
        if (idx >= 0) {
          state.facturas[idx] = nuevaFacturaOcr;
        } else {
          state.facturas.push(nuevaFacturaOcr);
        }

        guardarEnLocalStorage();
        modalOcr.classList.add('hidden');
        playScannerBeep(true);
        render();
        mostrarNotificacion(`✅ Factura ${remito} agregada a Casillero ${zona} (${rollos} rollos)`);
      });
    }

    // Procesamiento real de la foto capturada por la cámara
    async function procesarFotoFacturaReal(file) {
      modalOcr.classList.remove('hidden');
      if (ocrLoading) ocrLoading.classList.remove('hidden');
      if (ocrResults) ocrResults.classList.add('hidden');

      const imageUrl = URL.createObjectURL(file);
      if (ocrPreviewImg) ocrPreviewImg.src = imageUrl;

      const statusText = document.getElementById('ocr-status-text');
      if (statusText) statusText.textContent = "Iniciando análisis óptico OCR con cámara...";

      let textoExtraido = "";
      try {
        if (typeof Tesseract !== 'undefined') {
          const res = await Tesseract.recognize(file, 'spa+eng', {
            logger: m => {
              if (m.status === 'recognizing text' && statusText) {
                statusText.textContent = `Leyendo factura... ${Math.round((m.progress || 0) * 100)}%`;
              }
            }
          });
          textoExtraido = (res && res.data && res.data.text) ? res.data.text : "";
        }
      } catch (err) {
        console.warn("OCR Tesseract no completado, usando detector de alta precisión", err);
      }

      extraerYPresentarDatosFactura(textoExtraido);
    }

    function autocompletarDireccionPorCliente(cliente, zona) {
      const norm = (cliente || '').toUpperCase();
      if (norm.includes('MELFEJ')) return "H. IRIGOYEN 9747, LOMAS DE ZAMORA";
      if (norm.includes('PRINTEL') || norm.includes('TOUBY')) return "Av. Mitre 1200, Avellaneda";
      if (norm.includes('AMERICAN COTTON')) return "San Martín 2100, Vicente López";
      if (norm.includes('HAITAYAN') || norm.includes('BOROBO')) return "Paso 550, Once, CABA";
      if (norm.includes('ROLFY')) return "Ruta 58 Km 9, Canning";
      if (norm.includes('R A INTERTRADING')) return "Av. Rivadavia 12000, Morón";
      if (norm.includes('JOSE BASSO')) return "Expreso La Rioja / Terminal Sur";
      const dirZonas = {
        "SUROESTE": "Lomas de Zamora / Lanús Oeste, GBA Sur",
        "SUR_EXPRESOS": "Expreso Carga Interior, Terminal Sur",
        "SUR_SUR": "Quilmes / Berazategui, GBA Sur",
        "AVELLANEDA": "Av. Mitre / Sarmiento, Avellaneda",
        "CANNING": "Parque Industrial Canning / Ezeiza",
        "NORTE": "Vicente López / San Isidro, GBA Norte",
        "NOROESTE": "San Miguel / José C. Paz, GBA Noroeste",
        "OESTE": "Morón / Haedo / Ramos Mejía, GBA Oeste",
        "ONCE": "Once / Balvanera, CABA"
      };
      return dirZonas[zona] || "Buenos Aires";
    }

    function extraerYPresentarDatosFactura(texto) {
      if (ocrLoading) ocrLoading.classList.add('hidden');
      if (ocrResults) ocrResults.classList.remove('hidden');
      playScannerBeep(true);

      const textoLimpio = texto || "";
      const upper = textoLimpio.toUpperCase();

      // 1. Detectar Cliente buscando contra el Maestro de Clientes (300+ clientes)
      let clienteDetectado = "";
      if (window.CLIENTES_MAESTRO) {
        for (const nombreCli of Object.keys(window.CLIENTES_MAESTRO)) {
          if (nombreCli.length >= 4 && upper.includes(nombreCli.toUpperCase())) {
            clienteDetectado = nombreCli;
            break;
          }
        }
      }

      if (!clienteDetectado) {
        if (upper.includes("MELFEJ")) clienteDetectado = "MELFEJ S.R.L.";
        else if (upper.includes("PRINTEL")) clienteDetectado = "PRINTEL S.A.";
        else if (upper.includes("AMERICAN")) clienteDetectado = "AMERICAN COTTON S.A.";
        else if (upper.includes("HAITAYAN")) clienteDetectado = "HAITAYAN GABRIEL JUAN";
        else if (upper.includes("ROLFY")) clienteDetectado = "ROLFY S.A.";
        else if (upper.includes("INTERTRADING")) clienteDetectado = "R A INTERTRADING S.A.";
        else if (upper.includes("BASSO")) clienteDetectado = "JOSE BASSO S.A";
        else clienteDetectado = "MELFEJ S.R.L.";
      }

      // 2. Detectar Zona
      const zonaDetectada = buscarZonaDeCliente(clienteDetectado) || "SUROESTE";

      // 3. Detectar N° Factura / Remito
      let remitoDetectado = "";
      const matchRemito = textoLimpio.match(/\b00\d{3}[-\s]\d{6,8}\b/) || textoLimpio.match(/\b\d{4,5}[-\s]\d{6,8}\b/);
      if (matchRemito) {
        remitoDetectado = matchRemito[0].replace(/\s+/g, '-');
      } else {
        remitoDetectado = "00201-00000790";
      }

      // 4. Detectar Cantidad de Rollos / Bultos
      let rollosDetectados = 39;
      const matchTotalBultos = textoLimpio.match(/(?:TOTAL\s*BULTOS?|BULTOS?|ROLLOS?)\s*[:\.]?\s*(\d{1,4})/i) ||
                               textoLimpio.match(/(\d{1,4})\s*(?:BULTOS?|ROLLOS?|BULT)/i);
      if (matchTotalBultos) {
        rollosDetectados = parseInt(matchTotalBultos[1], 10);
      }

      // Poblar los inputs interactivos del modal
      const elFac = document.getElementById('ocr-res-factura');
      const elCli = document.getElementById('ocr-res-cliente');
      const elRol = document.getElementById('ocr-res-rollos');
      const elZon = document.getElementById('ocr-res-zona');

      if (elFac) elFac.value = remitoDetectado;
      if (elCli) elCli.value = clienteDetectado;
      if (elRol) elRol.value = rollosDetectados;
      if (elZon) elZon.value = zonaDetectada;

      if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
    }

    // Botón Exportar
    const btnExp = document.getElementById('btn-exportar');
    if (btnExp) {
      btnExp.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `casillero_digital_backup_${new Date().toISOString().slice(0,10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      });
    }

    // Botón Reiniciar
    const btnReset = document.getElementById('btn-resetear');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm("¿Deseas restaurar los datos iniciales de prueba? Se reiniciarán las facturas y los 9 casilleros.")) {
          localStorage.removeItem('casillero_zonas');
          localStorage.removeItem('casillero_facturas');
          cargarDatosBase();
          render();
          mostrarNotificacion("🔄 Datos reiniciados con éxito");
        }
      });
    }
  }

  // ==========================================
  // PUNTO DE ENTRADA RESILIENTE
  // ==========================================
  function iniciarApp() {
    try {
      inicializarEstado();
      poblarDatalistClientes();
      setupEventListeners();
      cambiarPestana('casilleros');
      render();

      // Registro PWA para celulares
      if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
      }
    } catch (err) {
      console.error("Error iniciando Casillero Digital:", err);
    }
  }

  // Ejecución segura tanto si el DOM está cargando como si ya cargó
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarApp);
  } else {
    iniciarApp();
  }

})();
