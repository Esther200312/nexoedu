import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  GraduationCap, User, Home, BookOpen, Gamepad2, Layers, Calendar,
  Star, Bell, ChevronLeft, ChevronRight, Trophy, ClipboardCheck,
  ShieldCheck, IdCard, AlertCircle, Rocket, TreePine, PartyPopper, Sparkles,
  Heart, Sun, Cloud, Zap, Smile, Music, Gift, Lock, CheckCircle2, XCircle,
  Flame, Volume2, VolumeX, Award, Medal, Crown, Wand2, Castle, RotateCcw,
  ArrowLeft, ArrowRight, Check, X as XIcon, Puzzle, Brain
} from "lucide-react";

// ---------- BASE DE DATOS COMPLETA (¡Los 30 estudiantes!) ----------
const ESTUDIANTES_REGISTRADOS = [
  { nombre: "Acuña Felix Benjamin", dni: "12345678", genero: "M" },
  { nombre: "Alanya Benites Adriana Daiana", dni: "12345678", genero: "F" },
  { nombre: "Aybar Capcha Kenyi Marduck", dni: "12345678", genero: "M" },
  { nombre: "Barrientos Silvestre Avril Lorena", dni: "12345678", genero: "F" },
  { nombre: "Cardenas Villanueva Aldrich Derek", dni: "12345678", genero: "M" },
  { nombre: "Cardenas Palacios Brayan Joel", dni: "12345678", genero: "M" },
  { nombre: "Ccanto Vila Sebastian Gael Edgar", dni: "12345678", genero: "M" },
  { nombre: "Chuco Quilca Antony Ruben", dni: "12345678", genero: "M" },
  { nombre: "Escobar Berrocal Dareem Gabriel", dni: "12345678", genero: "M" },
  { nombre: "Eyzaguirre Arroyo Fernando Andre", dni: "12345678", genero: "M" },
  { nombre: "Gaspar Sovero Ariana Esperanza", dni: "12345678", genero: "F" },
  { nombre: "Gomez Miranda Jhonson Mateo", dni: "12345678", genero: "M" },
  { nombre: "Huaman Velapatiño Miguel Angel", dni: "12345678", genero: "M" },
  { nombre: "Huatuco Buendia Sebastian Hernan", dni: "12345678", genero: "M" },
  { nombre: "Kunz Huaman Samuel David", dni: "12345678", genero: "M" },
  { nombre: "Mallqui Nuñez Junior Alexander", dni: "12345678", genero: "M" },
  { nombre: "Mitacc Vilchez Valeria Rassiel", dni: "12345678", genero: "F" },
  { nombre: "Orihuela Avila Gael Giordano", dni: "12345678", genero: "M" },
  { nombre: "Palacios Meza Briyid Estrella", dni: "12345678", genero: "F" },
  { nombre: "Perez Pizarro Jeamelly Esteysy", dni: "12345678", genero: "F" },
  { nombre: "Poma Castañeda Daniel Aldo", dni: "12345678", genero: "M" },
  { nombre: "Ramirez Fernandez Diego Augusto", dni: "12345678", genero: "M" },
  { nombre: "Ramon Martinez Eduardo Andres", dni: "12345678", genero: "M" },
  { nombre: "Rojas Aquino Esther Damaris", dni: "12345678", genero: "F" },
  { nombre: "Romero Allca Anthoninho Jean", dni: "12345678", genero: "M" },
  { nombre: "Romero Lopez Eduardo Alexis", dni: "12345678", genero: "M" },
  { nombre: "Tacsa Poma Jhedrik Rodrigo", dni: "12345678", genero: "M" },
  { nombre: "Vicente Zacarias Gianmarco Isai", dni: "12345678", genero: "M" },
  { nombre: "Villegas Poma Delcy Milenn", dni: "12345678", genero: "F" }
];

const DOCENTES_REGISTRADOS = [
  { nombre: "Estares Ventocilla Walter David", dni: "12345678", genero: "M" },
];

// ---------- MENÚS ----------
const NAV_STUDENT = [
  { key: "inicio", icon: Home, label: "Inicio" },
  { key: "biblioteca", icon: BookOpen, label: "Biblioteca" },
  { key: "juegos", icon: Gamepad2, label: "Juegos" },
  { key: "flashcards", icon: Layers, label: "Flashcards" },
  { key: "calendario", icon: Calendar, label: "Calendario" },
  { key: "logros", icon: Trophy, label: "Mis Logros" },
  { key: "perfil", icon: User, label: "Mi Perfil" },
];

const NAV_TEACHER = [
  { key: "inicio", icon: Home, label: "Inicio" },
  { key: "cursos", icon: BookOpen, label: "Mis Cursos" },
  { key: "capacitaciones", icon: GraduationCap, label: "Capacitaciones" },
  { key: "evaluaciones", icon: ClipboardCheck, label: "Evaluaciones" },
  { key: "calendario", icon: Calendar, label: "Calendario" },
  { key: "certificados", icon: ShieldCheck, label: "Certificados" },
  { key: "perfil", icon: User, label: "Mi Perfil" },
];
const ESTADO = {
  pendiente: "#FF7A6B",
  progreso: "#FFD65A",
  logrado: "#4FD1B0",
};

const THEMES = {
  "estudiante-F": { primary: "#8B5CF6", primaryHover: "#7C3AED", bg: "#1a1330", bgSoft: "#241a3d", accent: "#F472B6", secondary: "#FFD65A" },
  "estudiante-M": { primary: "#5AC8E8", primaryHover: "#48b9db", bg: "#0B1A33", bgSoft: "#0F2038", accent: "#4FD1B0", secondary: "#FFD65A" },
  "docente-F":    { primary: "#6D28D9", primaryHover: "#5B21B6", bg: "#1E1B2E", bgSoft: "#251F38", accent: "#A78BFA", secondary: "#F472B6" },
  "docente-M":    { primary: "#1E4E8C", primaryHover: "#173d70", bg: "#0B1A33", bgSoft: "#0F2038", accent: "#5AC8E8", secondary: "#4FD1B0" },
};


function Mascot({ color = "#4FD1B0", size = 56, variant = "two-eye", pose = "idle" }) {
  const gid = `mgrad-${color.replace("#", "")}-${variant}-${pose}`;
  const dormido = pose === "dormido";
  const bloqueado = pose === "bloqueado";
  const bodyColor = bloqueado ? "#5A6E8C" : color;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bodyColor} stopOpacity="1" />
          <stop offset="100%" stopColor={bodyColor} stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* confeti si celebra */}
      {pose === "celebrando" && (
        <>
          <circle cx="12" cy="20" r="2.5" fill="#FFD65A" />
          <circle cx="88" cy="16" r="2" fill="#5AC8E8" />
          <circle cx="20" cy="8" r="2" fill="#FF7A6B" />
          <circle cx="80" cy="30" r="2.5" fill="#8B5CF6" />
          <circle cx="8" cy="38" r="2" fill="#4FD1B0" />
          <rect x="90" y="42" width="4" height="4" fill="#FFD65A" transform="rotate(20 92 44)" />
        </>
      )}

      {/* antena */}
      <circle cx="50" cy="14" r="5" fill={dormido ? "#5A6E8C" : "#FFD65A"} />
      <line x1="50" y1="19" x2="50" y2="28" stroke={bodyColor} strokeWidth="4" strokeLinecap="round" />

      {/* cuerpo */}
      <ellipse cx="50" cy="60" rx="37" ry="33" fill={`url(#${gid})`} />
      <ellipse cx="50" cy="70" rx="18" ry="12" fill="#FFFFFF" opacity="0.18" />

      {/* ojos */}
      {dormido ? (
        <>
          <path d="M30 53 Q37 48 44 53" stroke="#12233F" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M56 53 Q63 48 70 53" stroke="#12233F" strokeWidth="3" fill="none" strokeLinecap="round" />
          <text x="68" y="30" fontSize="10" fill="#9FB3CC" fontWeight="bold">z</text>
          <text x="76" y="20" fontSize="8" fill="#9FB3CC" fontWeight="bold">z</text>
        </>
      ) : variant === "one-eye" ? (
        <>
          <circle cx="50" cy="54" r="15" fill="#FFFFFF" />
          <circle cx="50" cy="55" r="6.5" fill="#12233F" />
          <circle cx="53" cy="52" r="2" fill="#FFFFFF" />
        </>
      ) : (
        <>
          <circle cx="37" cy="53" r="12" fill="#FFFFFF" />
          <circle cx="63" cy="53" r="12" fill="#FFFFFF" />
          <circle cx="38" cy="54" r="5" fill="#12233F" />
          <circle cx="64" cy="54" r="5" fill="#12233F" />
          <circle cx="40" cy="51" r="1.6" fill="#FFFFFF" />
          <circle cx="66" cy="51" r="1.6" fill="#FFFFFF" />
        </>
      )}

      {/* boca */}
      {!dormido && (pose === "celebrando" ? (
        <path d="M36 75 Q50 90 64 75" stroke="#12233F" strokeWidth="3.5" fill="#12233F" strokeLinecap="round" />
      ) : (
        <path d="M39 76 Q50 84 61 76" stroke="#12233F" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      ))}
      {!dormido && pose !== "celebrando" && <path d="M46 78 L50 83 L54 78 Z" fill="#FFFFFF" />}

      {/* patitas */}
      <ellipse cx="32" cy="90" rx="8" ry="5" fill={bodyColor} />
      <ellipse cx="68" cy="90" rx="8" ry="5" fill={bodyColor} />

      {/* accesorios según la pose */}
      {pose === "jugando" && (
        <g>
          <rect x="30" y="66" width="40" height="18" rx="7" fill="#12233F" />
          <circle cx="40" cy="75" r="3" fill="#5AC8E8" />
          <circle cx="60" cy="72" r="2.4" fill="#FF7A6B" />
          <circle cx="66" cy="78" r="2.4" fill="#FFD65A" />
          <rect x="35" y="73" width="6" height="2" fill="#5AC8E8" />
          <rect x="37" y="71" width="2" height="6" fill="#5AC8E8" />
        </g>
      )}
      {pose === "estudiando" && (
        <g>
          <rect x="31" y="68" width="38" height="16" rx="2" fill="#FFFFFF" />
          <line x1="50" y1="68" x2="50" y2="84" stroke="#C9D6E8" strokeWidth="1.5" />
          <line x1="36" y1="74" x2="46" y2="74" stroke="#9FB3CC" strokeWidth="1.5" />
          <line x1="36" y1="78" x2="46" y2="78" stroke="#9FB3CC" strokeWidth="1.5" />
          <line x1="54" y1="74" x2="64" y2="74" stroke="#9FB3CC" strokeWidth="1.5" />
          <line x1="54" y1="78" x2="64" y2="78" stroke="#9FB3CC" strokeWidth="1.5" />
          <ellipse cx="31" cy="53" rx="8" ry="6" fill="none" stroke="#12233F" strokeWidth="2" opacity="0.5" />
          <ellipse cx="63" cy="53" rx="8" ry="6" fill="none" stroke="#12233F" strokeWidth="2" opacity="0.5" />
        </g>
      )}
      {bloqueado && (
        <g>
          <rect x="41" y="60" width="18" height="14" rx="3" fill="#12233F" opacity="0.85" />
          <path d="M44 60 v-5 a6 6 0 0 1 12 0 v5" stroke="#12233F" strokeWidth="3" fill="none" opacity="0.85" />
        </g>
      )}
    </svg>
  );
}
const MASCOTAS = {
  feliz: "/bien.png",
  jugando: "/amigos.png",
  amistad: "/amistad.png",
  alerta: "/advertencia.png",
  bloqueado: "/peligro.png",
};
// ---------- COMPONENTES DE UI ----------
function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#1E4E8C] opacity-20 blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-[#5AC8E8] opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#4FD1B0] opacity-10 blur-3xl" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
        <circle cx="8%" cy="15%" r="3" fill="#5AC8E8" />
        <circle cx="15%" cy="8%" r="2" fill="#5AC8E8" />
        <circle cx="92%" cy="20%" r="3" fill="#4FD1B0" />
        <circle cx="85%" cy="12%" r="2" fill="#4FD1B0" />
        <circle cx="20%" cy="80%" r="2.5" fill="#FFD65A" />
        <circle cx="75%" cy="88%" r="2" fill="#5AC8E8" />
        <circle cx="50%" cy="6%" r="2" fill="#FFFFFF" />
        <circle cx="60%" cy="94%" r="2.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

function Logo({ light }) {
  return (
    <div className="flex items-center gap-2">
      <img src="/logo-nexoedu.png" alt="NexoEdu" className="w-9 h-9 object-contain" />
      <span className={`font-extrabold tracking-tight ${light ? "text-white" : "text-[#12233F]"}`}>
        Nexo<span className="text-[#5AC8E8]">Edu</span>
      </span>
    </div>
  );
}

function Sidebar({ items, name, active, onSelect }) {
  return (
    <aside className="hidden md:flex w-56 shrink-0 bg-[#0F2038] rounded-2xl p-4 flex-col gap-1 h-full">
      <div className="px-2 pb-4">
        <Logo light />
      </div>
      {items.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            active === key
              ? "bg-[#5AC8E8] text-[#0B1A33]"
              : "text-[#9FB3CC] hover:bg-white/5 hover:text-white"
          }`}
        >
          {Icon ? <Icon size={17} strokeWidth={2.2} /> : <div className="w-4 h-4 bg-white/20 rounded-full" />}
          {label}
        </button>
      ))}
      <div className="mt-auto flex items-center gap-3 px-2 pt-4 border-t border-white/10">
        <div className="w-8 h-8 shrink-0 rounded-full bg-[#28406B] flex items-center justify-center text-[#9FB3CC]">
          <User size={15} />
        </div>
        <span className="text-xs text-[#9FB3CC] leading-tight truncate" title={name}>
          {name}
        </span>
      </div>
    </aside>
  );
}

// Barra superior compacta solo para celular (logo + botón salir)
function MobileTopBar({ onExit }) {
  return (
    <div className="md:hidden flex items-center justify-between px-1 pb-3">
      <Logo light />
      <button onClick={onExit} className="text-[11px] text-[#8FA3C0] hover:text-white underline">Salir</button>
    </div>
  );
}

// Barra de navegación inferior tipo app, solo visible en celular
function MobileNav({ items, active, onSelect }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0F2038] border-t border-white/10 px-1 pt-2 pb-[env(safe-area-inset-bottom)] flex items-stretch overflow-x-auto">
      {items.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`flex-1 min-w-[64px] flex flex-col items-center gap-1 py-1.5 rounded-xl text-[10px] font-medium transition-colors ${
            active === key ? "text-[#5AC8E8]" : "text-[#7E93B5]"
          }`}
        >
          {Icon ? <Icon size={18} strokeWidth={2.2} /> : <div className="w-4 h-4 bg-white/20 rounded-full" />}
          <span className="truncate max-w-[60px]">{label}</span>
        </button>
      ))}
    </nav>
  );
}

// ---------- NOTIFICACIONES (con muñecos) ----------
function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const notifs = [
  { imagen: MASCOTAS.alerta, texto: "Tienes 2 tareas pendientes por entregar" },
  { imagen: MASCOTAS.jugando, texto: "Te falta terminar una lectura" },
  { imagen: MASCOTAS.feliz, texto: "¡Completaste 3 actividades esta semana!" },
];
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-9 h-9 rounded-full bg-[#14284A] flex items-center justify-center text-white"
      >
        <Bell size={16} />
        {!open && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#FF7A6B]" />}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-[#132747] rounded-2xl shadow-2xl p-3 z-30 border border-white/10">
          <p className="text-white text-sm font-bold px-2 pb-2">Notificaciones</p>
          <div className="flex flex-col gap-1">
            {notifs.map((n, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5">
                <img src={n.imagen} alt="" className="w-9 h-9 object-contain" />
                <p className="text-[#C9D6E8] text-xs leading-snug">{n.texto}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TopBar({ points, name }) {
  const nombreSeguro = (name && typeof name === "string") ? name : "Estudiante";
  const partes = nombreSeguro.trim().split(/\s+/);
  const firstName = partes.length > 2 ? partes[2] : partes[0];

  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h1 className="text-white text-2xl font-extrabold">¡Hola, {firstName}! 👋</h1>
        <p className="text-[#8FA3C0] text-sm mt-0.5">Explora, aprende y diviértete cada día</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-[#14284A] px-3 py-1.5 rounded-full text-[#FFD65A] text-sm font-semibold">
          <Star size={15} fill="#FFD65A" strokeWidth={0} /> {points} pts
        </div>
        <NotificationBell />
      </div>
    </div>
  );
}

const normalizarTexto = (texto) => {
  if (!texto) return "";
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// ---------- LOGIN ----------
function Login({ onEnter }) {
  const [role, setRole] = useState("estudiante");
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [errors, setErrors] = useState({ nombre: "", dni: "" });

  const handleIngresar = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const newErrors = { nombre: "", dni: "" };
    const nombreLimpio = nombre.trim();
    const dniLimpio = dni.trim();

    const nombreValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreLimpio);
    const dniValido = /^\d{8}$/.test(dniLimpio);

    if (!nombreLimpio) newErrors.nombre = "Falta poner tus nombres";
    else if (!nombreValido) newErrors.nombre = "El nombre solo debe contener letras";
    else if (nombreLimpio.length < 3) newErrors.nombre = "Ingresa un nombre real";
    if (!dniLimpio) newErrors.dni = "Falta poner tu DNI";
    else if (!dniValido) newErrors.dni = "El DNI debe tener exactamente 8 números";

    if (newErrors.nombre || newErrors.dni) {
      setErrors(newErrors);
      return;
    }

    const listaUsuarios = role === "estudiante" ? ESTUDIANTES_REGISTRADOS : DOCENTES_REGISTRADOS;
    const palabrasIngresadas = normalizarTexto(nombreLimpio).split(/\s+/);

    const coincidencias = listaUsuarios.filter((usuarioDB) => {
      const nombreDB = normalizarTexto(usuarioDB.nombre);
      const coincidenNombres = palabrasIngresadas.every(palabra => nombreDB.includes(palabra));
      const coincideDNI = usuarioDB.dni === dniLimpio;
      return coincidenNombres && coincideDNI;
    });

    if (coincidencias.length === 0) {
      setErrors({ nombre: "No encontrado.", dni: "Verifica nombre o DNI." });
    } else if (coincidencias.length > 1) {
      setErrors({ nombre: "Hay varios registros. Por favor, escribe el nombre completo.", dni: "" });
    } else {
      setErrors({ nombre: "", dni: "" });
      onEnter(role, coincidencias[0]);
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto bg-[#F2F3F5] rounded-3xl p-8 shadow-2xl relative z-10">
      <div className="flex flex-col items-center text-center mb-6">
        <img src="/logo-nexoedu.png" alt="NexoEdu" className="w-40 h-40 object-contain mb-2 mix-blend-multiply" />
      </div>

      <p className="text-center text-sm font-semibold text-[#5B6B85] mb-3">¿Quién eres?</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { key: "estudiante", icon: GraduationCap, title: "Estudiante", sub: "Accede a tu mundo de aprendizaje" },
          { key: "docente", icon: User, title: "Docente", sub: "Gestiona tus cursos" },
        ].map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => { setRole(r.key); setErrors({ nombre: "", dni: "" }); }}
            className={`rounded-2xl p-4 text-left transition-all border-2 ${
              role === r.key ? "bg-[#12233F] border-[#5AC8E8] text-white" : "bg-white border-transparent text-[#12233F] hover:border-[#c7d6ea]"
            }`}
          >
            <r.icon size={22} strokeWidth={1.8} className={role === r.key ? "text-white" : "text-[#12233F]"} />
            <div className="font-bold text-sm mt-3">{r.title}</div>
            <div className={`text-xs mt-1 ${role === r.key ? "text-[#9FB3CC]" : "text-[#8FA3C0]"}`}>{r.sub}</div>
          </button>
        ))}
      </div>

      <form onSubmit={handleIngresar} className="space-y-3">
        <div>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Esther Rojas"
            className={`w-full bg-white rounded-xl px-4 py-3 text-sm text-[#12233F] placeholder-[#A6B3C6] border focus:outline-none focus:ring-2 focus:ring-[#5AC8E8] ${
              errors.nombre ? "border-[#E5484D]" : "border-[#E3E7ED]"
            }`}
          />
          {errors.nombre && (
            <p className="flex items-center gap-1 text-[#E5484D] text-xs mt-1.5 ml-1"><AlertCircle size={13} /> {errors.nombre}</p>
          )}
        </div>
        <div>
          <input
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            placeholder="Número de DNI"
            className={`w-full bg-white rounded-xl px-4 py-3 text-sm text-[#12233F] placeholder-[#A6B3C6] border focus:outline-none focus:ring-2 focus:ring-[#5AC8E8] ${
              errors.dni ? "border-[#E5484D]" : "border-[#E3E7ED]"
            }`}
          />
          {errors.dni && (
            <p className="flex items-center gap-1 text-[#E5484D] text-xs mt-1.5 ml-1"><AlertCircle size={13} /> {errors.dni}</p>
          )}
        </div>
        <button type="submit" className="w-full bg-[#5AC8E8] hover:bg-[#48b9db] transition-colors text-[#0B1A33] font-bold py-3 rounded-xl">
          Ingresar
        </button>
      </form>
    </div>
  );
}

// =====================================================================================
// ---------- PORTADAS DE LIBROS (ilustraciones originales tipo cohete / princesa / bosque) ----------
// =====================================================================================
function BookCover({ theme, color = "#5AC8E8" }) {
  const gid = `cover-${theme}-${color.replace("#", "")}`;
  if (theme === "rocket") {
    return (
      <svg viewBox="0 0 160 220" className="w-full h-full">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1A33" />
            <stop offset="100%" stopColor={color} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <rect width="160" height="220" fill={`url(#${gid})`} />
        <circle cx="20" cy="20" r="1.5" fill="#fff" opacity="0.8" />
        <circle cx="140" cy="35" r="1.2" fill="#fff" opacity="0.7" />
        <circle cx="120" cy="15" r="1" fill="#fff" opacity="0.6" />
        <circle cx="35" cy="50" r="1" fill="#fff" opacity="0.5" />
        <circle cx="145" cy="70" r="1.4" fill="#fff" opacity="0.7" />
        <circle cx="130" cy="150" r="20" fill="#8B5CF6" opacity="0.35" />
        <circle cx="130" cy="150" r="26" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.4" />
        <g transform="translate(80 120) rotate(-15)">
          <path d="M0 -55 C18 -35 18 10 12 35 L-12 35 C-18 10 -18 -35 0 -55 Z" fill="#FFFFFF" />
          <path d="M0 -55 C18 -35 18 10 12 35 L-12 35 C-18 10 -18 -35 0 -55 Z" fill={color} opacity="0.25" />
          <circle cx="0" cy="-10" r="10" fill={color} />
          <circle cx="0" cy="-10" r="6" fill="#BFE9F5" />
          <path d="M-12 30 L-26 48 L-8 40 Z" fill={color} />
          <path d="M12 30 L26 48 L8 40 Z" fill={color} />
          <path d="M-8 36 Q0 62 8 36 Z" fill="#FFD65A" />
          <path d="M-5 36 Q0 52 5 36 Z" fill="#FF7A6B" />
        </g>
      </svg>
    );
  }
  if (theme === "princesa") {
    return (
      <svg viewBox="0 0 160 220" className="w-full h-full">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#241645" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect width="160" height="220" fill={`url(#${gid})`} />
        <circle cx="128" cy="30" r="14" fill="#FFF7D6" opacity="0.9" />
        <circle cx="122" cy="26" r="14" fill="#241645" opacity="0.55" />
        <circle cx="25" cy="18" r="1.4" fill="#fff" opacity="0.8" />
        <circle cx="45" cy="40" r="1" fill="#fff" opacity="0.6" />
        <circle cx="15" cy="55" r="1.2" fill="#fff" opacity="0.7" />
        <circle cx="60" cy="15" r="1" fill="#fff" opacity="0.5" />
        {/* castillo */}
        <g transform="translate(20 120)">
          <rect x="0" y="30" width="120" height="70" fill={color} opacity="0.9" />
          <rect x="10" y="0" width="26" height="60" fill={color} />
          <path d="M10 0 L23 -18 L36 0 Z" fill="#F472B6" />
          <rect x="84" y="0" width="26" height="60" fill={color} />
          <path d="M84 0 L97 -18 L110 0 Z" fill="#F472B6" />
          <rect x="45" y="-10" width="30" height="70" fill={color} opacity="0.95" />
          <path d="M45 -10 L60 -30 L75 -10 Z" fill="#F472B6" />
          <rect x="1" y="-2" width="3" height="12" fill="#FFD65A" />
          <path d="M4 -2 L14 2 L4 6 Z" fill="#FFD65A" />
          <path d="M55 45 Q60 32 65 45 L65 65 L55 65 Z" fill="#241645" opacity="0.7" />
          <circle cx="22" cy="45" r="5" fill="#241645" opacity="0.6" />
          <circle cx="98" cy="45" r="5" fill="#241645" opacity="0.6" />
        </g>
        {/* corona */}
        <g transform="translate(58 55)">
          <path d="M0 20 L4 2 L12 14 L22 0 L32 14 L40 2 L44 20 Z" fill="#FFD65A" />
          <rect x="0" y="20" width="44" height="8" fill="#FFD65A" />
          <circle cx="22" cy="6" r="3" fill="#F472B6" />
        </g>
      </svg>
    );
  }
  // theme === "bosque" (valores / naturaleza)
  return (
    <svg viewBox="0 0 160 220" className="w-full h-full">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#123A2E" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="160" height="220" fill={`url(#${gid})`} />
      <circle cx="120" cy="40" r="22" fill="#FFD65A" opacity="0.85" />
      <ellipse cx="80" cy="200" rx="90" ry="26" fill="#0F2038" opacity="0.3" />
      <g transform="translate(28 90)">
        <rect x="12" y="60" width="10" height="45" fill="#8B5A2B" />
        <circle cx="17" cy="45" r="28" fill={color} />
        <circle cx="0" cy="55" r="18" fill={color} opacity="0.85" />
        <circle cx="36" cy="58" r="18" fill={color} opacity="0.85" />
      </g>
      <g transform="translate(95 130)">
        <rect x="10" y="35" width="8" height="30" fill="#8B5A2B" />
        <circle cx="14" cy="26" r="20" fill="#34D399" />
      </g>
      {/* zorrito amigo */}
      <g transform="translate(100 165)">
        <path d="M0 20 L8 0 L16 20 Z" fill="#F97316" />
        <circle cx="8" cy="22" r="14" fill="#F97316" />
        <path d="M0 22 Q8 34 16 22" stroke="#fff" strokeWidth="0" fill="#fff" opacity="0.9" />
        <circle cx="4" cy="20" r="1.6" fill="#12233F" />
        <circle cx="12" cy="20" r="1.6" fill="#12233F" />
      </g>
      <path d="M40 200 Q45 190 50 200" stroke="#F472B6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="55" cy="195" r="3" fill="#F472B6" />
    </svg>
  );
}

const BOOKS = [
  {
    key: "mate1",
    title: "Aventuras Matemáticas",
    imagen: "/mate.png",
    categoria: "Matemática",
    progreso: 65,
    paginas: "26/40",
    sinopsis: "...",
  },

  {
    key: "mate2",
    title: "La Fórmula Secreta",
    imagen: "/constelacion.png",   // o la portada que quieras
    categoria: "Matemática",
    progreso: 20,
    paginas: "8/38",
    sinopsis: "...",
  },

  {
    key: "mate3",
    title: "Viaje al Conocimiento",
    imagen: "/viaje.png",
    categoria: "Matemática",
    progreso: 100,
    paginas: "42/42",
    sinopsis: "...",
  },

  {
    key: "com1",
    title: "El Bosque de las Palabras",
    imagen: "/valores.png",
    categoria: "Comunicación",
    progreso: 45,
    paginas: "18/40",
    sinopsis: "...",
  },

  {
    key: "princesa1",
    title: "La Princesa del Bosque Encantado",
    imagen: "/princesas.png",
    categoria: "Cuentos de Valores",
    progreso: 40,
    paginas: "16/40",
    sinopsis: "...",
  },
];
function BookCard({ book, onOpen }) {
  const estadoColor = book.progreso === 100 ? ESTADO.logrado : book.progreso > 0 ? ESTADO.progreso : ESTADO.pendiente;
  const estadoTexto = book.progreso === 100 ? "Completado" : book.progreso > 0 ? `${book.progreso}% leído` : "Sin empezar";
  return (
    <button
      onClick={() => onOpen(book)}
      className="relative rounded-2xl overflow-hidden aspect-[3/4] text-left shadow-lg hover:scale-[1.02] transition-transform ring-1 ring-white/10"
    >
      <img src={book.imagen} alt={book.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
      {book.progreso === 100 && (
        <div className="absolute top-2 right-2 bg-[#4FD1B0] rounded-full p-1">
          <Star size={12} fill="#0B1A33" strokeWidth={0} />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="text-white font-bold text-xs leading-tight drop-shadow">{book.title}</h3>
        <div className="mt-2 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${book.progreso}%`, backgroundColor: estadoColor }} />
        </div>
        <p className="text-[10px] mt-1 font-semibold" style={{ color: estadoColor }}>{estadoTexto}</p>
      </div>
    </button>
  );
}

function LibroModal({ book, onClose }) {
  if (!book) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-[#0F2038] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="h-52 relative">
          <img src={book.imagen} alt={book.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2038] to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center">
            <XIcon size={16} />
          </button>
        </div>
        <div className="p-6 -mt-8 relative">
          <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: `${book.color}33`, color: book.color }}>{book.categoria}</span>
          <h2 className="text-white font-extrabold text-xl mt-2">{book.title}</h2>
          <p className="text-[#8FA3C0] text-sm mt-3 leading-relaxed">{book.sinopsis}</p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${book.progreso}%`, backgroundColor: book.progreso === 100 ? ESTADO.logrado : ESTADO.progreso }} />
            </div>
            <span className="text-xs text-[#8FA3C0] shrink-0">{book.paginas} páginas</span>
          </div>
          <button className="w-full mt-5 bg-[#5AC8E8] hover:bg-[#48b9db] transition-colors text-[#0B1A33] font-bold text-sm py-2.5 rounded-xl">
            {book.progreso === 100 ? "Leer de nuevo" : book.progreso > 0 ? "Continuar leyendo" : "Empezar a leer"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BibliotecaSection() {
  const [libroActivo, setLibroActivo] = useState(null);
  const categorias = ["Matemática", "Comunicación", "Cuentos de Valores"];
  return (
    <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-6">
      <div className="bg-[#0F2038] rounded-2xl p-5 flex items-center gap-4">
        <Mascot color="#5AC8E8" size={56} variant="two-eye" pose="estudiando" />
        <div>
          <h2 className="text-white font-bold text-lg">Tu biblioteca mágica</h2>
          <p className="text-[#8FA3C0] text-sm">Explora cuentos de aventuras espaciales, princesas y valores. ¡Sigue leyendo para ganar puntos!</p>
        </div>
      </div>
      {categorias.map((cat) => {
        const libros = BOOKS.filter((b) => b.categoria === cat);
        if (!libros.length) return null;
        return (
          <div key={cat}>
            <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5AC8E8]" /> {cat}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {libros.map((b) => <BookCard key={b.key} book={b} onOpen={setLibroActivo} />)}
            </div>
          </div>
        );
      })}
      <LibroModal book={libroActivo} onClose={() => setLibroActivo(null)} />
    </div>
  );
}

// =====================================================================================
// ---------- JUEGOS ----------
// =====================================================================================
const ICONOS_MEMORIA = [
  { id: "star", Icon: Star, color: "#FFD65A" },
  { id: "heart", Icon: Heart, color: "#FF7A6B" },
  { id: "sun", Icon: Sun, color: "#FFA94D" },
  { id: "cloud", Icon: Cloud, color: "#5AC8E8" },
  { id: "zap", Icon: Zap, color: "#8B5CF6" },
  { id: "smile", Icon: Smile, color: "#4FD1B0" },
  { id: "music", Icon: Music, color: "#F472B6" },
  { id: "gift", Icon: Gift, color: "#34D399" },
];

function barajar(arr) {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function JuegoMemoria({ onSalir }) {
  const [cartas, setCartas] = useState(() => barajar([...ICONOS_MEMORIA, ...ICONOS_MEMORIA].map((c, i) => ({ ...c, uid: i }))));
  const [volteadas, setVolteadas] = useState([]);
  const [emparejadas, setEmparejadas] = useState([]);
  const [movimientos, setMovimientos] = useState(0);

  const reiniciar = () => {
    setCartas(barajar([...ICONOS_MEMORIA, ...ICONOS_MEMORIA].map((c, i) => ({ ...c, uid: i }))));
    setVolteadas([]); setEmparejadas([]); setMovimientos(0);
  };

  const manejarClic = (uid) => {
    if (volteadas.length === 2 || volteadas.includes(uid) || emparejadas.includes(uid)) return;
    const nuevas = [...volteadas, uid];
    setVolteadas(nuevas);
    if (nuevas.length === 2) {
      setMovimientos((m) => m + 1);
      const [a, b] = nuevas.map((u) => cartas.find((c) => c.uid === u));
      if (a.id === b.id) {
        setTimeout(() => { setEmparejadas((e) => [...e, a.uid, b.uid]); setVolteadas([]); }, 500);
      } else {
        setTimeout(() => setVolteadas([]), 800);
      }
    }
  };

  const completado = emparejadas.length === cartas.length;

  return (
    <div className="bg-[#0F2038] rounded-2xl p-6 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={onSalir} className="w-8 h-8 rounded-full bg-[#14284A] text-[#9FB3CC] hover:text-white flex items-center justify-center"><ArrowLeft size={15} /></button>
          <h2 className="text-white font-bold text-lg">Memoria Mágica</h2>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#8FA3C0]">
          <span>Movimientos: {movimientos}</span>
          <button onClick={reiniciar} className="flex items-center gap-1 bg-[#14284A] px-2.5 py-1.5 rounded-full text-[#C9D6E8] hover:text-white"><RotateCcw size={12} /> Reiniciar</button>
        </div>
      </div>

      {completado ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <Mascot color={ESTADO.logrado} size={90} variant="one-eye" pose="celebrando" />
          <p className="text-white font-bold text-lg">¡Lo lograste en {movimientos} movimientos!</p>
          <button onClick={reiniciar} className="bg-[#5AC8E8] hover:bg-[#48b9db] transition-colors text-[#0B1A33] font-bold text-sm px-5 py-2.5 rounded-xl">Jugar de nuevo</button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 flex-1">
          {cartas.map((c) => {
            const visible = volteadas.includes(c.uid) || emparejadas.includes(c.uid);
            const Icon = c.Icon;
            return (
              <button
                key={c.uid}
                onClick={() => manejarClic(c.uid)}
                className={`rounded-xl aspect-square flex items-center justify-center transition-all ${
                  visible ? "bg-[#14284A]" : "bg-gradient-to-br from-[#5AC8E8] to-[#8B5CF6] hover:scale-[1.03]"
                }`}
              >
                {visible ? <Icon size={26} color={c.color} /> : <Sparkles size={18} className="text-white/70" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const PREGUNTAS_QUIZ = [
  { pregunta: "¿Cuánto es 6 + 7?", opciones: ["11", "13", "14", "12"], correcta: 1 },
  { pregunta: "¿Cuál es un sinónimo de 'contento'?", opciones: ["Triste", "Feliz", "Cansado", "Enojado"], correcta: 1 },
  { pregunta: "¿Cuántos planetas tiene el sistema solar?", opciones: ["7", "9", "8", "6"], correcta: 2 },
  { pregunta: "¿Qué valor mostramos al decir siempre la verdad?", opciones: ["Honestidad", "Pereza", "Envidia", "Timidez"], correcta: 0 },
  { pregunta: "¿Cuánto es 9 x 3?", opciones: ["27", "24", "18", "21"], correcta: 0 },
];

function JuegoQuiz({ onSalir }) {
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [correctas, setCorrectas] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const pregunta = PREGUNTAS_QUIZ[indice];

  const elegir = (i) => {
    if (seleccion !== null) return;
    setSeleccion(i);
    if (i === pregunta.correcta) setCorrectas((c) => c + 1);
    setTimeout(() => {
      if (indice + 1 < PREGUNTAS_QUIZ.length) { setIndice((n) => n + 1); setSeleccion(null); }
      else setTerminado(true);
    }, 700);
  };

  const reiniciar = () => { setIndice(0); setSeleccion(null); setCorrectas(0); setTerminado(false); };

  const porcentaje = Math.round((correctas / PREGUNTAS_QUIZ.length) * 100);
  const colorResultado = porcentaje >= 80 ? ESTADO.logrado : porcentaje >= 50 ? ESTADO.progreso : ESTADO.pendiente;

  return (
    <div className="bg-[#0F2038] rounded-2xl p-6 flex-1 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onSalir} className="w-8 h-8 rounded-full bg-[#14284A] text-[#9FB3CC] hover:text-white flex items-center justify-center"><ArrowLeft size={15} /></button>
        <h2 className="text-white font-bold text-lg">Quiz Rápido</h2>
      </div>

      {terminado ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <Mascot color={colorResultado} size={90} variant="two-eye" pose={porcentaje >= 80 ? "celebrando" : "idle"} />
          <p className="text-white font-bold text-lg">Obtuviste {correctas} de {PREGUNTAS_QUIZ.length} correctas</p>
          <p className="text-sm" style={{ color: colorResultado }}>{porcentaje >= 80 ? "¡Excelente trabajo!" : porcentaje >= 50 ? "¡Vas muy bien, sigue practicando!" : "Sigue intentando, tú puedes!"}</p>
          <button onClick={reiniciar} className="bg-[#5AC8E8] hover:bg-[#48b9db] transition-colors text-[#0B1A33] font-bold text-sm px-5 py-2.5 rounded-xl mt-2">Intentar de nuevo</button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-1.5 mb-5">
            {PREGUNTAS_QUIZ.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${i < indice ? "bg-[#4FD1B0]" : i === indice ? "bg-[#5AC8E8]" : "bg-white/10"}`} />
            ))}
          </div>
          <p className="text-[#8FA3C0] text-xs mb-1">Pregunta {indice + 1} de {PREGUNTAS_QUIZ.length}</p>
          <h3 className="text-white font-bold text-xl mb-6">{pregunta.pregunta}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pregunta.opciones.map((op, i) => {
              let estilo = "bg-[#14284A] text-white hover:bg-[#1a3660]";
              if (seleccion !== null) {
                if (i === pregunta.correcta) estilo = "bg-[#4FD1B0]/20 text-[#4FD1B0] ring-2 ring-[#4FD1B0]";
                else if (i === seleccion) estilo = "bg-[#FF7A6B]/20 text-[#FF7A6B] ring-2 ring-[#FF7A6B]";
                else estilo = "bg-[#14284A] text-[#5A6E8C]";
              }
              return (
                <button key={i} onClick={() => elegir(i)} className={`rounded-xl p-4 text-sm font-semibold text-left transition-colors flex items-center justify-between ${estilo}`}>
                  {op}
                  {seleccion !== null && i === pregunta.correcta && <Check size={16} />}
                  {seleccion !== null && i === seleccion && i !== pregunta.correcta && <XIcon size={16} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const JUEGOS_DISPONIBLES = [
  { key: "memoria", titulo: "Memoria Mágica", desc: "Encuentra todas las parejas", color: ESTADO.logrado, variant: "one-eye", estado: "logrado" },
  { key: "quiz", titulo: "Quiz Rápido", desc: "Preguntas de todos los cursos", color: ESTADO.progreso, variant: "two-eye", estado: "progreso" },
  { key: "rompecabezas", titulo: "Rompecabezas Numérico", desc: "Ordena las piezas por valor", color: ESTADO.pendiente, variant: "two-eye", estado: "bloqueado" },
  { key: "palabras", titulo: "Sopa de Palabras", desc: "Encuentra palabras escondidas", color: ESTADO.pendiente, variant: "one-eye", estado: "bloqueado" },
];

function JuegosSection() {
  const [juegoActivo, setJuegoActivo] = useState(null);

  if (juegoActivo === "memoria") return <JuegoMemoria onSalir={() => setJuegoActivo(null)} />;
  if (juegoActivo === "quiz") return <JuegoQuiz onSalir={() => setJuegoActivo(null)} />;

  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="bg-[#0F2038] rounded-2xl p-5 flex items-center gap-4">
        <Mascot color={ESTADO.logrado} size={56} variant="one-eye" pose="jugando" />
        <div>
          <h2 className="text-white font-bold text-lg">Zona de juegos</h2>
          <p className="text-[#8FA3C0] text-sm">Pon a prueba lo que aprendiste. ¡Cada juego suma puntos a tu perfil!</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {JUEGOS_DISPONIBLES.map((j) => {
          const bloqueado = j.estado === "bloqueado";
          return (
            <button
              key={j.key}
              disabled={bloqueado}
              onClick={() => setJuegoActivo(j.key)}
              className={`bg-[#0F2038] rounded-2xl p-5 flex items-center gap-4 text-left transition-colors ${bloqueado ? "opacity-60 cursor-not-allowed" : "hover:bg-[#132747]"}`}
            ><img src={bloqueado ? MASCOTAS.bloqueado : MASCOTAS.jugando} alt="" className="w-[54px] h-[54px] object-contain" />
              
              <div className="min-w-0 flex-1">
                <div className="text-white font-bold text-sm">{j.titulo}</div>
                <div className="text-[#8FA3C0] text-xs mt-0.5">{j.desc}</div>
                <span className="inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${j.color}26`, color: j.color }}>
                  {bloqueado ? "Próximamente" : j.estado === "logrado" ? "Completado" : "Disponible"}
                </span>
              </div>
              {!bloqueado && <ChevronRight size={16} className="text-[#5A6E8C] shrink-0" />}
              {bloqueado && <Lock size={15} className="text-[#5A6E8C] shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// =====================================================================================
// ---------- FLASHCARDS ----------
// =====================================================================================
const MAZOS_FLASHCARDS = {
  matematica: {
    titulo: "Matemática", color: "#5AC8E8",
    cartas: [
      { frente: "¿Cuánto es 7 + 8?", reverso: "15" },
      { frente: "¿Cuánto es 9 x 3?", reverso: "27" },
      { frente: "¿Qué número es par: 14 o 15?", reverso: "14" },
      { frente: "¿Cuánto es la mitad de 50?", reverso: "25" },
    ],
  },
  comunicacion: {
    titulo: "Comunicación", color: "#8B5CF6",
    cartas: [
      { frente: "¿Cuál es un sinónimo de 'feliz'?", reverso: "Contento" },
      { frente: "¿Cuál es un antónimo de 'grande'?", reverso: "Pequeño" },
      { frente: "¿Qué signo se usa al final de una pregunta?", reverso: "Signo de interrogación ( ¿ ? )" },
      { frente: "Da un ejemplo de palabra aguda", reverso: "Camión" },
    ],
  },
  ciencia: {
    titulo: "Ciencia", color: "#4FD1B0",
    cartas: [
      { frente: "¿Qué gas respiramos para vivir?", reverso: "Oxígeno" },
      { frente: "¿Cuántos planetas tiene el sistema solar?", reverso: "8 planetas" },
      { frente: "¿Qué astro nos da luz de día?", reverso: "El Sol" },
      { frente: "¿En qué estado está el hielo?", reverso: "Sólido" },
    ],
  },
  valores: {
    titulo: "Valores", color: "#F472B6",
    cartas: [
      { frente: "¿Qué valor demostramos al decir la verdad?", reverso: "Honestidad" },
      { frente: "¿Qué practicamos al ayudar a un compañero?", reverso: "Solidaridad" },
      { frente: "¿Cómo se llama respetar las diferencias de los demás?", reverso: "Tolerancia" },
      { frente: "¿Qué valor mostramos al cumplir promesas?", reverso: "Responsabilidad" },
    ],
  },
};

function DeckFlashcards({ mazoKey, onSalir }) {
  const mazo = MAZOS_FLASHCARDS[mazoKey];
  const [indice, setIndice] = useState(0);
  const [volteada, setVolteada] = useState(false);
  const [estados, setEstados] = useState({});

  const carta = mazo.cartas[indice];
  const marcar = (estado) => {
    setEstados((e) => ({ ...e, [indice]: estado }));
    setTimeout(() => {
      setVolteada(false);
      setIndice((i) => (i + 1) % mazo.cartas.length);
    }, 250);
  };

  return (
    <div className="bg-[#0F2038] rounded-2xl p-6 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button onClick={onSalir} className="w-8 h-8 rounded-full bg-[#14284A] text-[#9FB3CC] hover:text-white flex items-center justify-center"><ArrowLeft size={15} /></button>
          <h2 className="text-white font-bold text-lg">{mazo.titulo}</h2>
        </div>
        <span className="text-xs text-[#8FA3C0]">{indice + 1} / {mazo.cartas.length}</span>
      </div>

      <div className="flex items-center justify-center gap-1.5 mb-6">
        {mazo.cartas.map((_, i) => {
          const est = estados[i];
          const color = est === "sabe" ? ESTADO.logrado : est === "repasar" ? ESTADO.progreso : "#28406B";
          return <div key={i} className={`h-1.5 rounded-full ${i === indice ? "w-6" : "w-1.5"} transition-all`} style={{ backgroundColor: i === indice ? mazo.color : color }} />;
        })}
      </div>

      <button
        onClick={() => setVolteada((v) => !v)}
        className="flex-1 rounded-2xl flex items-center justify-center text-center p-8 mb-5 transition-transform hover:scale-[1.01]"
        style={{ backgroundColor: `${mazo.color}1A`, border: `2px solid ${mazo.color}55` }}
      >
        <div>
          <p className="text-xs font-semibold mb-3" style={{ color: mazo.color }}>{volteada ? "RESPUESTA" : "PREGUNTA — toca para voltear"}</p>
          <p className="text-white font-bold text-2xl leading-snug">{volteada ? carta.reverso : carta.frente}</p>
        </div>
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button onClick={() => marcar("repasar")} className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm" style={{ backgroundColor: `${ESTADO.progreso}26`, color: ESTADO.progreso }}>
          <RotateCcw size={15} /> Repasar de nuevo
        </button>
        <button onClick={() => marcar("sabe")} className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm" style={{ backgroundColor: `${ESTADO.logrado}26`, color: ESTADO.logrado }}>
          <Check size={15} /> Ya lo sé
        </button>
      </div>
    </div>
  );
}

function FlashcardsSection() {
  const [mazoActivo, setMazoActivo] = useState(null);
  if (mazoActivo) return <DeckFlashcards mazoKey={mazoActivo} onSalir={() => setMazoActivo(null)} />;

  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="bg-[#0F2038] rounded-2xl p-5 flex items-center gap-4">
       <img src={MASCOTAS.amistad} alt="" className="w-14 h-14 object-contain" />
        <div>
          <h2 className="text-white font-bold text-lg">Flashcards de repaso</h2>
          <p className="text-[#8FA3C0] text-sm">Elige un mazo y repasa. Marca "Ya lo sé" o "Repasar de nuevo" en cada tarjeta.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(MAZOS_FLASHCARDS).map(([key, mazo]) => (
          <button key={key} onClick={() => setMazoActivo(key)} className="bg-[#0F2038] rounded-2xl p-5 flex items-center gap-4 text-left hover:bg-[#132747] transition-colors">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${mazo.color}26` }}>
              <Layers size={24} color={mazo.color} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-white font-bold text-sm">{mazo.titulo}</div>
              <div className="text-[#8FA3C0] text-xs mt-0.5">{mazo.cartas.length} tarjetas</div>
            </div>
            <ChevronRight size={16} className="text-[#5A6E8C] shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

// =====================================================================================
// ---------- CALENDARIO MENSUAL (mejorado, con más colores y diseño) ----------
// =====================================================================================
const NOMBRES_MES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const NOMBRES_DIA = ["D", "L", "M", "M", "J", "V", "S"];

const TIPOS_EVENTO = {
  tarea: { color: ESTADO.pendiente, label: "Tarea", icon: ClipboardCheck },
  lectura: { color: ESTADO.progreso, label: "Lectura", icon: BookOpen },
  logro: { color: ESTADO.logrado, label: "Logro", icon: PartyPopper },
  especial: { color: "#8B5CF6", label: "Evento especial", icon: Sparkles },
};

function generarDiasDelMes(fecha) {
  const anio = fecha.getFullYear();
  const mes = fecha.getMonth();
  const primerDia = new Date(anio, mes, 1);
  const diasEnMes = new Date(anio, mes + 1, 0).getDate();
  const dias = [];
  for (let i = 0; i < primerDia.getDay(); i++) dias.push(null);
  for (let d = 1; d <= diasEnMes; d++) dias.push(d);
  return dias;
}

function CalendarioSection() {
  const hoy = new Date();
  const [mesVisto, setMesVisto] = useState(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
  const dias = generarDiasDelMes(mesVisto);
  const esMesActual = mesVisto.getMonth() === hoy.getMonth() && mesVisto.getFullYear() === hoy.getFullYear();

  const eventos = useMemo(() => {
    const base = hoy.getDate();
    const clamp = (n) => Math.min(Math.max(n, 1), dias.filter(Boolean).length);
    return [
      { dia: clamp(base + 2), tipo: "tarea", titulo: "Entrega: Aventuras Matemáticas", detalle: "Cap. 3 - ejercicios de suma" },
      { dia: clamp(base + 5), tipo: "tarea", titulo: "Quiz de Comunicación", detalle: "Sinónimos y antónimos" },
      { dia: clamp(base - 3), tipo: "lectura", titulo: "Lectura pendiente", detalle: "El Bosque de las Palabras" },
      { dia: clamp(base + 8), tipo: "especial", titulo: "Taller de Ciencias", detalle: "Actividad especial en vivo" },
      { dia: clamp(base - 1), tipo: "logro", titulo: "¡Insignia desbloqueada!", detalle: "Racha de 7 días" },
    ];
  }, [mesVisto]);

  const eventosPorDia = (d) => eventos.filter((e) => e.dia === d);

  const cambiarMes = (delta) => setMesVisto((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
      <div className="lg:col-span-2 bg-gradient-to-br from-[#0F2038] to-[#152a4d] rounded-2xl p-6 flex flex-col relative overflow-visible">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#8B5CF6] opacity-10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#5AC8E8] opacity-10 blur-2xl" />

        <div className="flex items-center justify-between mb-5 relative">
          <div className="flex items-center gap-2">
            <button onClick={() => cambiarMes(-1)} className="w-7 h-7 rounded-full bg-[#14284A] text-[#9FB3CC] hover:text-white flex items-center justify-center"><ChevronLeft size={15} /></button>
            <h2 className="text-white font-bold text-lg w-40 text-center">{NOMBRES_MES[mesVisto.getMonth()]} {mesVisto.getFullYear()}</h2>
            <button onClick={() => cambiarMes(1)} className="w-7 h-7 rounded-full bg-[#14284A] text-[#9FB3CC] hover:text-white flex items-center justify-center"><ChevronRight size={15} /></button>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-[#8FA3C0] flex-wrap justify-end max-w-[45%]">
            {Object.values(TIPOS_EVENTO).map((t) => (
              <span key={t.label} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} /> {t.label}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[#5A6E8C] text-xs font-semibold mb-2 relative">
          {NOMBRES_DIA.map((d, i) => <div key={i}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1.5 relative">
          {dias.map((d, i) => {
            if (!d) return <div key={i} />;
            const esHoy = esMesActual && d === hoy.getDate();
            const evs = eventosPorDia(d);
            return (
              <div
                key={i}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative transition-colors ${
                  esHoy ? "bg-gradient-to-br from-[#5AC8E8] to-[#8B5CF6] text-[#0B1A33] font-bold shadow-lg" : "text-[#C9D6E8] hover:bg-white/5"
                }`}
              >
                {d}
                {evs.length > 0 && (
                  <div className="absolute bottom-1.5 flex items-center gap-0.5">
                    {evs.slice(0, 3).map((e, k) => (
                      <span key={k} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: esHoy ? "#12233F" : TIPOS_EVENTO[e.tipo].color }} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#0F2038] rounded-2xl p-6 flex flex-col gap-3 overflow-y-auto">
        <div className="flex items-center gap-3 mb-1">
          <Mascot color="#8B5CF6" size={40} variant="two-eye" pose="idle" />
          <h2 className="text-white font-bold text-lg">Próximos eventos</h2>
        </div>
        {eventos.sort((a, b) => a.dia - b.dia).map((e, i) => {
          const t = TIPOS_EVENTO[e.tipo];
          const Icon = t.icon;
          return (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl border-l-4" style={{ backgroundColor: `${t.color}14`, borderColor: t.color }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${t.color}33` }}>
                <Icon size={16} color={t.color} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold" style={{ color: t.color }}>Día {e.dia} · {t.label}</p>
                <p className="text-white text-sm font-semibold mt-0.5 leading-snug">{e.titulo}</p>
                <p className="text-[#8FA3C0] text-xs mt-0.5">{e.detalle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =====================================================================================
// ---------- MIS LOGROS ----------
// =====================================================================================
const LOGROS = [
  { titulo: "Primeros Pasos", desc: "Completa tu primer libro", icon: BookOpen, estado: "logrado", progreso: 100 },
  { titulo: "Mente Matemática", desc: "Juega 10 juegos de matemáticas", icon: Gamepad2, estado: "logrado", progreso: 100 },
  { titulo: "Racha de 7 Días", desc: "Entra a NexoEdu 7 días seguidos", icon: Flame, estado: "logrado", progreso: 100 },
  { titulo: "Explorador de Flashcards", desc: "Repasa 50 tarjetas", icon: Layers, estado: "progreso", progreso: 60 },
  { titulo: "Bibliotecario Junior", desc: "Lee 5 libros completos", icon: Crown, estado: "progreso", progreso: 40 },
  { titulo: "Maestro del Quiz", desc: "Responde 20 preguntas correctas seguidas", icon: Brain, estado: "pendiente", progreso: 15 },
  { titulo: "Superestrella", desc: "Acumula 500 puntos", icon: Star, estado: "pendiente", progreso: 24 },
  { titulo: "Amigo Solidario", desc: "Ayuda a un compañero de clase", icon: Heart, estado: "pendiente", progreso: 0 },
];

function BadgeCard({ logro }) {
  const color = ESTADO[logro.estado];
  const Icon = logro.icon;
  const bloqueado = logro.estado === "pendiente";
  return (
    <div className="bg-[#0F2038] rounded-2xl p-5 flex flex-col items-center text-center gap-2" style={{ boxShadow: logro.estado === "logrado" ? `0 0 0 1px ${color}55` : "none" }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative" style={{ backgroundColor: `${color}22` }}>
        <Icon size={26} color={color} />
        {logro.estado === "logrado" && (
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#4FD1B0] flex items-center justify-center"><Check size={11} className="text-[#0B1A33]" /></div>
        )}
        {bloqueado && logro.progreso === 0 && (
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#5A6E8C] flex items-center justify-center"><Lock size={10} className="text-white" /></div>
        )}
      </div>
      <h3 className="text-white font-bold text-sm mt-1">{logro.titulo}</h3>
      <p className="text-[#8FA3C0] text-xs leading-snug">{logro.desc}</p>
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-1">
        <div className="h-full rounded-full transition-all" style={{ width: `${logro.progreso}%`, backgroundColor: color }} />
      </div>
      <span className="text-[10px] font-semibold" style={{ color }}>{logro.estado === "logrado" ? "Desbloqueado" : `${logro.progreso}% completado`}</span>
    </div>
  );
}

function LogrosSection() {
  const totalLogrados = LOGROS.filter((l) => l.estado === "logrado").length;
  const nivel = Math.min(10, 1 + Math.floor(totalLogrados / 2));
  return (
    <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-5">
      <div className="bg-gradient-to-br from-[#0F2038] to-[#1a2f57] rounded-2xl p-6 flex items-center gap-5">
        <Mascot color={ESTADO.logrado} size={72} variant="one-eye" pose="celebrando" />
        <div className="flex-1">
          <h2 className="text-white font-bold text-xl">¡Vas muy bien!</h2>
          <p className="text-[#8FA3C0] text-sm mt-1">Nivel {nivel} · {totalLogrados} de {LOGROS.length} insignias desbloqueadas</p>
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden mt-3">
            <div className="h-full rounded-full bg-gradient-to-r from-[#5AC8E8] to-[#4FD1B0]" style={{ width: `${(totalLogrados / LOGROS.length) * 100}%` }} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {LOGROS.map((l, i) => <BadgeCard key={i} logro={l} />)}
      </div>
    </div>
  );
}

// =====================================================================================
// ---------- MI PERFIL ----------
// =====================================================================================
function Toggle({ label, icono: Icono, valorInicial = true }) {
  const [activo, setActivo] = useState(valorInicial);
  return (
    <button onClick={() => setActivo((a) => !a)} className="w-full flex items-center justify-between p-3 rounded-xl bg-[#14284A] hover:bg-[#1a3660] transition-colors">
      <span className="flex items-center gap-2.5 text-sm text-[#C9D6E8] font-medium">
        <Icono size={16} className={activo ? "text-[#5AC8E8]" : "text-[#5A6E8C]"} /> {label}
      </span>
      <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${activo ? "bg-[#4FD1B0]" : "bg-[#28406B]"}`}>
        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${activo ? "translate-x-4" : "translate-x-0"}`} />
      </div>
    </button>
  );
}

function PerfilSection({ user }) {
  const nombreCompleto = user ? user.nombre : "Estudiante";
  const dniOculto = user ? `${user.dni.slice(0, 2)}••••${user.dni.slice(-2)}` : "••••••••";
  const librosCompletados = BOOKS.filter((b) => b.progreso === 100).length;
  const insigniasGanadas = LOGROS.filter((l) => l.estado === "logrado").length;

  const stats = [
    { label: "Puntos", valor: "120", color: "#FFD65A", icon: Star },
    { label: "Racha", valor: "7 días", color: "#FF7A6B", icon: Flame },
    { label: "Libros leídos", valor: librosCompletados, color: "#5AC8E8", icon: BookOpen },
    { label: "Insignias", valor: insigniasGanadas, color: "#4FD1B0", icon: Trophy },
  ];

  return (
    <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="bg-gradient-to-br from-[#0F2038] to-[#1a2f57] rounded-2xl p-6 flex items-center gap-5">
          <Mascot color="#5AC8E8" size={80} variant="two-eye" pose="celebrando" />
          <div>
            <h2 className="text-white font-extrabold text-xl">{nombreCompleto}</h2>
            <p className="text-[#8FA3C0] text-sm mt-1">DNI: {dniOculto}</p>
            <span className="inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#5AC8E8]/20 text-[#5AC8E8]">Estudiante · Nivel 3</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0F2038] rounded-2xl p-4 flex flex-col items-center text-center gap-1.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${s.color}26` }}>
                <s.icon size={17} color={s.color} />
              </div>
              <span className="text-white font-bold text-lg">{s.valor}</span>
              <span className="text-[#8FA3C0] text-[10px]">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#0F2038] rounded-2xl p-6">
          <h3 className="text-white font-bold text-sm mb-3">Actividad reciente</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-sm"><span className="w-2 h-2 rounded-full bg-[#4FD1B0]" /><span className="text-[#C9D6E8]">Completaste "Cuentos de Valores"</span></div>
            <div className="flex items-center gap-3 text-sm"><span className="w-2 h-2 rounded-full bg-[#FFD65A]" /><span className="text-[#C9D6E8]">Repasaste el mazo de Matemática</span></div>
            <div className="flex items-center gap-3 text-sm"><span className="w-2 h-2 rounded-full bg-[#5AC8E8]" /><span className="text-[#C9D6E8]">Jugaste Memoria Mágica</span></div>
          </div>
        </div>
      </div>

      <div className="bg-[#0F2038] rounded-2xl p-6 flex flex-col gap-3">
        <h3 className="text-white font-bold text-sm mb-1">Preferencias</h3>
        <Toggle label="Notificaciones" icono={Bell} valorInicial={true} />
        <Toggle label="Sonidos" icono={Volume2} valorInicial={true} />
        <Toggle label="Recordatorios diarios" icono={Calendar} valorInicial={false} />
      </div>
    </div>
  );
}

// =====================================================================================
// ---------- INICIO DEL ESTUDIANTE (carrusel + mascotas) ----------
// =====================================================================================
function BibliotecaCarrusel({ onNavigate }) {
  const destacados = [BOOKS[0], BOOKS[2], BOOKS[4]];
  const [activo, setActivo] = useState(1);
  const touchStartX = useRef(null);

  const irAnterior = () => setActivo((a) => (a - 1 + destacados.length) % destacados.length);
  const irSiguiente = () => setActivo((a) => (a + 1) % destacados.length);

  const izquierda = destacados[(activo - 1 + destacados.length) % destacados.length];
  const centro = destacados[activo];
  const derecha = destacados[(activo + 1) % destacados.length];

  const Carta = ({ libro, destacado }) => (
    <button
      onClick={() => onNavigate("biblioteca")}
      className={`relative flex-1 rounded-xl overflow-hidden aspect-[3/4] transition-all ${
        destacado ? "ring-2 ring-[#5AC8E8] scale-105 shadow-[0_0_25px_-5px_rgba(90,200,232,0.6)]" : "opacity-70 hover:opacity-100"
      }`}
    >
      <img src={libro.imagen} alt={libro.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-semibold leading-tight text-center">{libro.title}</div>
    </button>
  );

  return (
    <div className="bg-[#0F2038] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-lg">Biblioteca</h2>
        <div className="flex items-center gap-2">
          <button onClick={irAnterior} aria-label="Libro anterior" className="w-7 h-7 rounded-full bg-[#14284A] text-[#9FB3CC] hover:text-white flex items-center justify-center"><ChevronLeft size={15} /></button>
          <button onClick={irSiguiente} aria-label="Siguiente libro" className="w-7 h-7 rounded-full bg-[#14284A] text-[#9FB3CC] hover:text-white flex items-center justify-center"><ChevronRight size={15} /></button>
        </div>
      </div>

      <div
  className="flex items-center gap-3"
  onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
  onTouchEnd={(e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) irSiguiente();
    else if (diff < -40) irAnterior();
  }}
>
  <Carta libro={izquierda} destacado={false} />
  <Carta libro={centro} destacado={true} />
  <Carta libro={derecha} destacado={false} />
</div>

     <div className="flex items-center justify-center gap-1.5 mt-4">
  {destacados.map((libro, i) => (
    <button key={libro.key} onClick={() => setActivo(i)} aria-label={`Ir a ${libro.title}`} className={`h-1.5 rounded-full transition-all ${i === activo ? "w-5 bg-[#5AC8E8]" : "w-1.5 bg-white/20"}`} />
  ))}
</div>
    </div>
  );
}

function AtajoCard({ label, sub, color, variant, pose, onClick }) {
  return (
    <button onClick={onClick} className="flex-1 bg-[#0F2038] rounded-2xl p-5 text-left hover:bg-[#132747] transition-colors flex items-center gap-4">
      <Mascot color={color} size={48} variant={variant} pose={pose} />
      <div className="min-w-0">
        <div className="text-white font-bold text-sm">{label}</div>
        <div className="text-[#8FA3C0] text-xs mt-0.5 truncate">{sub}</div>
      </div>
      <ChevronRight size={16} className="ml-auto text-[#5A6E8C] shrink-0" />
    </button>
  );
}

function TareaWidget({ color, icon: Icon, titulo, detalle, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-white/5 text-left" style={{ backgroundColor: `${color}1A` }}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}33` }}>
        <Icon size={17} color={color} />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold" style={{ color }}>{titulo}</div>
        <div className="text-[#8FA3C0] text-xs mt-0.5 leading-snug">{detalle}</div>
      </div>
    </button>
  );
}

function StudentHome({ onNavigate }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <BibliotecaCarrusel onNavigate={onNavigate} />
        <div className="flex flex-col sm:flex-row gap-4">
  <AtajoCard label="Juegos" sub="Desafíos de concentración" color={ESTADO.logrado} variant="one-eye" pose="jugando" onClick={() => onNavigate("juegos")} />
  <AtajoCard label="Flashcards" sub="Repaso rápido y divertido" color={ESTADO.progreso} variant="two-eye" pose="estudiando" onClick={() => onNavigate("flashcards")} />
</div>
      </div>

      <div className="bg-[#0F2038] rounded-2xl p-6 flex flex-col">
        <h2 className="text-white font-bold text-lg mb-4">Mi Calendario</h2>
        <div className="flex flex-col gap-2 flex-1">
          <TareaWidget color={ESTADO.pendiente} icon={ClipboardCheck} titulo="Tareas pendientes" detalle="Tienes 2 tareas por completar" onClick={() => onNavigate("calendario")} />
          <TareaWidget color={ESTADO.progreso} icon={BookOpen} titulo="Lecturas incompletas" detalle="Tienes 1 lectura sin terminar" onClick={() => onNavigate("biblioteca")} />
          <TareaWidget color={ESTADO.logrado} icon={PartyPopper} titulo="¡Felicidades!" detalle="Completaste 3 actividades esta semana 🎉" onClick={() => onNavigate("logros")} />
        </div>
        <button onClick={() => onNavigate("calendario")} className="mt-4 w-full bg-[#5AC8E8] hover:bg-[#48b9db] transition-colors text-[#0B1A33] font-bold text-sm py-2.5 rounded-xl">
          Ver calendario
        </button>
      </div>
    </div>
  );
}

function SectionPlaceholder({ title, desc }) {
  return (
    <div className="bg-[#0F2038] rounded-2xl p-8 flex-1 flex flex-col items-center justify-center text-center">
      <h2 className="text-white font-bold text-xl mb-2">{title}</h2>
      <p className="text-[#8FA3C0] text-sm max-w-md">{desc}</p>
    </div>
  );
}

function StudentDashboard({ onExit, user, active, onSelect }) {
  const nombreMostrar = user ? user.nombre : "Estudiante";

  let contenido;
  if (active === "inicio") contenido = <StudentHome onNavigate={onSelect} />;
  else if (active === "calendario") contenido = <CalendarioSection />;
  else if (active === "biblioteca") contenido = <BibliotecaSection />;
  else if (active === "juegos") contenido = <JuegosSection />;
  else if (active === "flashcards") contenido = <FlashcardsSection />;
  else if (active === "logros") contenido = <LogrosSection />;
  else if (active === "perfil") contenido = <PerfilSection user={user} />;

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <Sidebar items={NAV_STUDENT} name={nombreMostrar} active={active} onSelect={onSelect} />
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0 overflow-y-auto">
        <MobileTopBar onExit={onExit} />
        <div className="hidden md:flex justify-end mb-2">
          <button onClick={onExit} className="text-xs text-[#8FA3C0] hover:text-white underline">Cerrar sesión</button>
        </div>
        <TopBar points="120" name={nombreMostrar} />
        {contenido}
      </div>
      <MobileNav items={NAV_STUDENT} active={active} onSelect={onSelect} />
    </div>
  );
}

const PROGRESO_DOCENTE = [
  { label: "Pedagogía", valor: 90 },
  { label: "Comprensión Lectora", valor: 78 },
  { label: "Evaluación Formativa", valor: 65 },
  { label: "TIC en Educación", valor: 55 },
];

const NOTIFS_DOCENTE = [
  { icon: AlertCircle, color: "#FF7A6B", texto: "Alerta de revisión pendiente", tiempo: "Hace 15 min" },
  { icon: BookOpen, color: "#FFD65A", texto: "Lectura pendiente por revisar", tiempo: "Hace 1 hora" },
  { icon: CheckCircle2, color: "#4FD1B0", texto: "Actividad completada por un curso", tiempo: "Hace 2 horas" },
  { icon: ShieldCheck, color: "#5AC8E8", texto: "Nuevo certificado disponible", tiempo: "Ayer" },
];

// ---------- FONDO TECNOLÓGICO (grid + esquinas tipo HUD) ----------
function TechGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.07]" preserveAspectRatio="none">
      <defs>
        <pattern id="techgrid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#5AC8E8" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#techgrid)" />
    </svg>
  );
}

function GlowPanel({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-2xl p-6 overflow-hidden border ${className}`}
      style={{ backgroundColor: "var(--color-bg-soft)", borderColor: "rgba(90,200,232,0.25)" }}
    >
      <TechGrid />
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-25 blur-3xl" style={{ backgroundColor: "var(--color-primary)" }} />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: "var(--color-accent)" }} />
      {/* esquinas estilo HUD */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 opacity-60" style={{ borderColor: "var(--color-accent)" }} />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 opacity-60" style={{ borderColor: "var(--color-accent)" }} />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 opacity-60" style={{ borderColor: "var(--color-accent)" }} />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 opacity-60" style={{ borderColor: "var(--color-accent)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}

function RingProgress({ value, size = 88, colorVar = "--color-primary" }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" style={{ width: size, height: size }} className="-rotate-90">
        <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
        <circle cx="18" cy="18" r="16" fill="none" stroke={`var(${colorVar})`} strokeWidth="3"
          strokeDasharray={`${value} ${100 - value}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">{value}%</div>
    </div>
  );
}

function TeacherHome() {
  const promedio = Math.round(PROGRESO_DOCENTE.reduce((a, b) => a + b.valor, 0) / PROGRESO_DOCENTE.length);

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <GlowPanel>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "var(--color-accent)" }}>Diagnóstico IA</p>
        <h2 className="text-white font-bold text-lg mb-4">Evaluación Diagnóstica</h2>
        <div className="flex items-center gap-6">
          <RingProgress value={promedio} />
          <div className="flex-1 flex flex-col gap-2">
            {PROGRESO_DOCENTE.map((p) => (
              <div key={p.label} className="flex items-center gap-2 text-xs">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                <span className="text-[#C9D6E8] flex-1">{p.label}</span>
                <span className="font-semibold" style={{ color: "var(--color-accent)" }}>{p.valor}%</span>
              </div>
            ))}
          </div>
        </div>
        <button className="w-full mt-5 font-bold text-sm py-2.5 rounded-xl text-[#0B1A33]" style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))" }}>
          Continuar evaluación
        </button>
      </GlowPanel>

      <GlowPanel>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "var(--color-accent)" }}>Nivel Docente</p>
        <h2 className="text-white font-bold text-lg mb-4">Mi Progreso</h2>
        <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden mb-2">
          <div className="h-full rounded-full" style={{ width: "75%", background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))" }} />
        </div>
        <p className="text-[#8FA3C0] text-xs mb-5">950 / 1300 pts · Nivel 3 Avanzado</p>
        <div className="rounded-xl p-4 flex items-center gap-4 border" style={{ backgroundColor: "var(--color-primary)15", borderColor: "var(--color-primary)33" }}>
          <Trophy size={28} style={{ color: "var(--color-accent)" }} />
          <div>
            <p className="text-white font-semibold text-sm">Próximo nivel</p>
            <p className="text-[#8FA3C0] text-xs mt-0.5">Completa las actividades para seguir avanzando.</p>
          </div>
        </div>
      </GlowPanel>

     <GlowPanel className="lg:col-span-2">
        <h2 className="text-white font-bold text-lg mb-4">Mi Calendario</h2>
        <CalendarioSection />
      </GlowPanel>

      <GlowPanel className="lg:col-span-2">
        <h2 className="text-white font-bold text-lg mb-4">Notificaciones</h2>
        <div className="flex flex-col gap-2">
          {NOTIFS_DOCENTE.map((n, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${n.color}26` }}>
                <n.icon size={16} color={n.color} />
              </div>
              <p className="text-[#C9D6E8] text-xs flex-1">{n.texto}</p>
              <span className="text-[#5A6E8C] text-[10px] shrink-0">{n.tiempo}</span>
            </div>
          ))}
        </div>
      </GlowPanel>
    </div>
  );
}

// ---------- MIS CURSOS (con sílabo real) ----------
const MIS_CURSOS = [
  {
    nombre: "Realidad Nacional y Globalización",
    estudiantes: 30,
    avance: 78,
    silabo: ["Unidad I: Perú en el contexto global", "Unidad II: Análisis PESTEL", "Unidad III: Integración económica", "Unidad IV: Proyecto final"],
  },
  {
    nombre: "Medio Ambiente y Desarrollo Sostenible",
    estudiantes: 28,
    avance: 62,
    silabo: ["Unidad I: Huella ecológica", "Unidad II: Política Nacional del Ambiente", "Unidad III: Tecnología y sostenibilidad", "Unidad IV: Estudio de caso Mantaro"],
  },
  {
    nombre: "Sistemas de Información",
    estudiantes: 25,
    avance: 45,
    silabo: ["Unidad I: Fundamentos de SI", "Unidad II: Modelado de datos", "Unidad III: Arquitectura de sistemas", "Unidad IV: Proyecto integrador"],
  },
];

function MisCursosSection() {
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {MIS_CURSOS.map((c) => (
        <GlowPanel key={c.nombre}>
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-white font-bold text-base pr-2">{c.nombre}</h3>
            <span className="text-[10px] font-semibold px-2 py-1 rounded-full shrink-0" style={{ backgroundColor: "var(--color-primary)22", color: "var(--color-accent)" }}>
              {c.estudiantes} est.
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-3 mb-1">
            <div className="h-full rounded-full" style={{ width: `${c.avance}%`, background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))" }} />
          </div>
          <p className="text-xs font-semibold mb-3" style={{ color: "var(--color-accent)" }}>{c.avance}% del sílabo avanzado</p>
          <div className="flex flex-col gap-1.5">
            {c.silabo.map((u, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] text-[#C9D6E8]">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                {u}
              </div>
            ))}
          </div>
        </GlowPanel>
      ))}
    </div>
  );
}

// ---------- CAPACITACIONES ----------
const CAPACITACIONES_DOCENTE = [
  { titulo: "TIC aplicadas a la Educación", estado: "En curso", progreso: 55, horas: "40h" },
  { titulo: "Evaluación Formativa Digital", estado: "Pendiente", progreso: 0, horas: "30h" },
  { titulo: "Gamificación en el Aula", estado: "Completado", progreso: 100, horas: "25h" },
];

function CapacitacionesSection() {
  return (
    <div className="flex-1 flex flex-col gap-3">
      {CAPACITACIONES_DOCENTE.map((c) => (
        <GlowPanel key={c.titulo}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-white font-bold text-sm">{c.titulo}</h3>
            <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: "var(--color-primary)22", color: "var(--color-accent)" }}>{c.estado}</span>
          </div>
          <p className="text-[#8FA3C0] text-xs mb-2">Duración: {c.horas}</p>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${c.progreso}%`, background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))" }} />
          </div>
        </GlowPanel>
      ))}
    </div>
  );
}

// ---------- EVALUACIONES (con notas) ----------
const EVALUACIONES_DOCENTE = [
  { curso: "Realidad Nacional", tipo: "Quiz Semana 14", pendientes: 6, promedioNota: 15.4 },
  { curso: "Medio Ambiente", tipo: "Trabajo Final", pendientes: 12, promedioNota: 16.8 },
  { curso: "Realidad Nacional", tipo: "Examen Parcial", pendientes: 3, promedioNota: 14.2 },
  { curso: "Medio Ambiente", tipo: "Práctica Calificada 2", pendientes: 8, promedioNota: 15.9 },
  { curso: "Sistemas de Información", tipo: "Proyecto Integrador", pendientes: 10, promedioNota: 17.1 },
  { curso: "Sistemas de Información", tipo: "Quiz de Repaso", pendientes: 5, promedioNota: 13.7 },
];

function EvaluacionesSection() {
  return (
    <div className="flex-1 flex flex-col gap-3">
      {EVALUACIONES_DOCENTE.map((e, i) => (
        <GlowPanel key={i}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-sm">{e.tipo}</h3>
              <p className="text-[#8FA3C0] text-xs mt-1">{e.curso}</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-extrabold" style={{ color: "var(--color-accent)" }}>{e.pendientes}</p>
                <p className="text-[10px] text-[#8FA3C0]">por revisar</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-white">{e.promedioNota}</p>
                <p className="text-[10px] text-[#8FA3C0]">promedio</p>
              </div>
            </div>
          </div>
        </GlowPanel>
      ))}
    </div>
  );
}

// ---------- CERTIFICADOS (diseño de certificado real) ----------
const CERTIFICADOS_DOCENTE = [
  { titulo: "Certificado TIC Nivel 1", fecha: "Marzo 2026", horas: "40 horas académicas" },
  { titulo: "Certificado Pedagogía Digital", fecha: "Diciembre 2025", horas: "30 horas académicas" },
];
function CertificadosSection({ user }) {
  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {CERTIFICADOS_DOCENTE.map((c) => (
        <Certificado key={c.titulo} c={c} nombreDocente={user ? user.nombre : "Docente"} />
      ))}
    </div>
  );
}
function Certificado({ c, nombreDocente }) {
  return (
    <div className="relative rounded-2xl p-6 overflow-hidden border-2" style={{ backgroundColor: "var(--color-bg-soft)", borderColor: "var(--color-accent)" }}>
      <TechGrid />
      <div className="relative text-center">
        <ShieldCheck size={30} className="mx-auto mb-2" style={{ color: "var(--color-accent)" }} />
        <p className="text-[10px] tracking-widest uppercase" style={{ color: "var(--color-accent)" }}>NexoEdu · Certificación Digital</p>
        <h3 className="text-white font-extrabold text-lg mt-2">{c.titulo}</h3>
        <p className="text-[#8FA3C0] text-xs mt-3">Otorgado a</p>
        <p className="text-white font-semibold text-sm">{nombreDocente}</p>
        <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-[#8FA3C0]">
          <span>{c.fecha}</span>
          <span className="w-1 h-1 rounded-full bg-[#5A6E8C]" />
          <span>{c.horas}</span>
        </div>
        <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-[#5A6E8C]">Código de verificación: NXE-{c.fecha.replace(" ", "").toUpperCase()}</div>
      </div>
    </div>
  );
}


function PerfilDocenteSection({ user }) {
  const statsDocente = [
    { label: "Cursos activos", valor: MIS_CURSOS.length, color: "#5AC8E8", icon: BookOpen },
    { label: "Estudiantes", valor: MIS_CURSOS.reduce((a, c) => a + c.estudiantes, 0), color: "#4FD1B0", icon: User },
    { label: "Certificados", valor: CERTIFICADOS_DOCENTE.length, color: "#F472B6", icon: ShieldCheck },
    { label: "Puntos", valor: "950", color: "#FFD65A", icon: Star },
  ];

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <GlowPanel className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))" }}>
            <User size={32} className="text-[#0B1A33]" />
          </div>
          <div>
            <h2 className="text-white font-extrabold text-xl">{user ? user.nombre : "Docente"}</h2>
            <p className="text-[#8FA3C0] text-xs mt-1">DNI: {user ? `${user.dni.slice(0,2)}••••${user.dni.slice(-2)}` : "••••••••"}</p>
            <span className="inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "var(--color-primary)22", color: "var(--color-accent)" }}>
              Docente · UNCP · Nivel 3
            </span>
          </div>
        </GlowPanel>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statsDocente.map((s) => (
            <GlowPanel key={s.label} className="flex flex-col items-center text-center gap-1.5 !p-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${s.color}26` }}>
                <s.icon size={17} color={s.color} />
              </div>
              <span className="text-white font-bold text-lg">{s.valor}</span>
              <span className="text-[#8FA3C0] text-[10px]">{s.label}</span>
            </GlowPanel>
          ))}
        </div>

        <GlowPanel>
          <h3 className="text-white font-bold text-sm mb-3">Cursos que dicta</h3>
          <div className="flex flex-col gap-2">
            {MIS_CURSOS.map((c) => (
              <div key={c.nombre} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                <span className="text-[#C9D6E8] flex-1">{c.nombre}</span>
                <span className="text-xs font-semibold" style={{ color: "var(--color-accent)" }}>{c.avance}%</span>
              </div>
            ))}
          </div>
        </GlowPanel>
      </div>

      <GlowPanel className="flex flex-col gap-3">
        <h3 className="text-white font-bold text-sm mb-1">Preferencias</h3>
        <Toggle label="Notificaciones" icono={Bell} valorInicial={true} />
        <Toggle label="Sonidos" icono={Volume2} valorInicial={true} />
        <Toggle label="Recordatorios diarios" icono={Calendar} valorInicial={false} />
      </GlowPanel>
    </div>
  );
}

function TeacherDashboard({ onExit, user, active, onSelect }) {
  const nombreMostrar = user ? user.nombre : "Docente";

  
 let contenido;
  if (active === "inicio") contenido = <TeacherHome />;
  else if (active === "calendario") contenido = <CalendarioSection />;
  else if (active === "cursos") contenido = <MisCursosSection />;
  else if (active === "capacitaciones") contenido = <CapacitacionesSection />;
  else if (active === "evaluaciones") contenido = <EvaluacionesSection />;
  else if (active === "certificados") contenido = <CertificadosSection user={user} />;
  else if (active === "perfil") contenido = <PerfilDocenteSection user={user} />;

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <Sidebar items={NAV_TEACHER} name={nombreMostrar} active={active} onSelect={onSelect} />
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0 overflow-y-auto">
        <MobileTopBar onExit={onExit} />
        <div className="hidden md:flex justify-end mb-2">
          <button onClick={onExit} className="text-xs text-[#8FA3C0] hover:text-white underline">Cerrar sesión</button>
        </div>
        <TopBar points="950" name={nombreMostrar} />
        {contenido}
      </div>
      <MobileNav items={NAV_TEACHER} active={active} onSelect={onSelect} />
    </div>
  );
}

export default function NexoEduPrototype() {
  const [view, setView] = useState("login");
  const [active, setActive] = useState("inicio");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    window.history.replaceState({ view: "login", active: "inicio", user: null }, "");
    const handlePop = (e) => {
      const estado = e.state || { view: "login", active: "inicio", user: null };
      setView(estado.view);
      setActive(estado.active);
      setCurrentUser(estado.user || null);
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const navegar = (nuevaView, nuevaActive, nuevoUsuario) => {
    const usuarioFinal = nuevoUsuario !== undefined ? nuevoUsuario : currentUser;
    setView(nuevaView);
    setActive(nuevaActive);
    setCurrentUser(usuarioFinal);
    window.history.pushState({ view: nuevaView, active: nuevaActive, user: usuarioFinal }, "");
  };

  const handleEnter = (role, user) => navegar(role, "inicio", user);
  const handleExit = () => navegar("login", "inicio", null);
  const handleSelect = (key) => navegar(view, key);
const themeKey = `${view}-${currentUser?.genero || "M"}`;
const theme = THEMES[themeKey] || THEMES["estudiante-M"];


  return (
    <div
  className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 md:p-6 relative overflow-hidden transition-colors duration-500"
 style={{ backgroundColor: theme.bg, "--color-primary": theme.primary, "--color-primary-hover": theme.primaryHover, "--color-bg-soft": theme.bgSoft, "--color-accent": theme.accent, "--color-secondary": theme.secondary }}
>
      <BackgroundDecor />
      {view === "login" && <Login onEnter={handleEnter} />}
      {view === "estudiante" && (
        <div className="w-full h-[100dvh] md:h-[92vh] relative z-10">
          <StudentDashboard onExit={handleExit} user={currentUser} active={active} onSelect={handleSelect} />
        </div>
      )}
      {view === "docente" && (
        <div className="w-full h-[100dvh] md:h-[92vh] relative z-10">
          <TeacherDashboard onExit={handleExit} user={currentUser} active={active} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
}
