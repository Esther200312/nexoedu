import React, { useState } from "react";
import {
  GraduationCap, User, Home, BookOpen, Gamepad2, Layers, Calendar,
  Star, Bell, ChevronLeft, ChevronRight, Trophy, ClipboardCheck,
  ShieldCheck, IdCard, AlertCircle
} from "lucide-react";

// ---- Tokens ----
// Navy base:  #0B1A33 / #12233F / #16294A
// Panel light: #ffffff
// Accent cyan: #5AC8E8
// Mascots: coral #FF7A6B, amarillo #FFD65A, verde agua #4FD1B0

const ESTUDIANTES_REGISTRADOS = [
  { nombre: "Acuña Felix Benjamin", dni: "12345678" },
  { nombre: "Alanya Benites Adriana Daiana", dni: "12345678" },
  { nombre: "Aybar Capcha Kenyi Marduck", dni: "12345678" },
  { nombre: "Barrientos Silvestre Avril Lorena", dni: "12345678" },
  { nombre: "Cardenas Villanueva Aldrich Derek", dni: "12345678" },
  { nombre: "Cardenas Palacios Brayan Joel", dni: "12345678" },
  { nombre: "Ccanto Vila Sebastian Gael Edgar", dni: "12345678" },
  { nombre: "Chuco Quilca Antony Ruben", dni: "12345678" },
  { nombre: "Escobar Berrocal Dareem Gabriel", dni: "12345678" },
  { nombre: "Eyzaguirre Arroyo Fernando Andre", dni: "12345678" },
  { nombre: "Gaspar Sovero Ariana Esperanza", dni: "12345678" },
  { nombre: "Gomez Miranda Jhonson Mateo", dni: "12345678" },
  { nombre: "Huaman Velapatiño Miguel Angel", dni: "12345678" }, 
  { nombre: "Huatuco Buendia Sebastian Hernan", dni: "12345678" },
  { nombre: "Kunz Huaman Samuel David", dni: "12345678" },
  { nombre: "Mallqui Nuñez Junior Alexander", dni: "12345678" },
  { nombre: "Mitacc Vilchez Valeria Rassiel", dni: "12345678" },
  { nombre: "Orihuela Avila Gael Giordano", dni: "12345678" },
  { nombre: "Palacios Meza Briyid Estrella", dni: "12345678" },
  { nombre: "Perez Pizarro Jeamelly Esteysy", dni: "12345678" },
  { nombre: "Poma Castañeda Daniel Aldo", dni: "12345678" },
  { nombre: "Ramirez Fernandez Diego Augusto", dni: "12345678" },
  { nombre: "Ramon Martinez Eduardo Andres", dni: "12345678" },
  { nombre: "Rojas Aquino Esther Damaris", dni: "12345678" },
  { nombre: "Romero Allca Anthoninho Jean", dni: "12345678" },
  { nombre: "Romero Lopez Eduardo Alexis", dni: "12345678" },
  { nombre: "Tacsa Poma Jhedrik Rodrigo", dni: "12345678" },
  { nombre: "Vicente Zacarias Gianmarco Isai", dni: "12345678" },
  { nombre: "Villegas Poma Delcy Milenn", dni: "12345678" }
];


const DOCENTES_REGISTRADOS = [
  { nombre: "Estares Ventocilla Walter David", dni: "12345678" },
];

// ---------- Fondo decorativo ----------
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
    <aside className="w-56 shrink-0 bg-[#0F2038] rounded-2xl p-4 flex flex-col gap-1 h-full">
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
          <Icon size={17} strokeWidth={2.2} />
          {label}
        </button>
      ))}
      <div className="mt-auto flex items-center gap-2 px-2 pt-4 border-t border-white/10">
        <div className="w-8 h-8 rounded-full bg-[#28406B] flex items-center justify-center text-[#9FB3CC]">
          <User size={15} />
        </div>
        <span className="text-xs text-[#9FB3CC] leading-tight">{name}</span>
      </div>
    </aside>
  );
}

function TopBar({ points, name }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h1 className="text-white text-2xl font-extrabold">¡Hola, {name}! 👋</h1>
        <p className="text-[#8FA3C0] text-sm mt-0.5">Explora, aprende y diviértete cada día</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-[#14284A] px-3 py-1.5 rounded-full text-[#FFD65A] text-sm font-semibold">
          <Star size={15} fill="#FFD65A" strokeWidth={0} /> {points} pts
        </div>
        <div className="relative w-9 h-9 rounded-full bg-[#14284A] flex items-center justify-center text-white">
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#FF7A6B]" />
        </div>
      </div>
    </div>
  );
}

// Placeholder simple para secciones aún no diseñadas a detalle
function SectionPlaceholder({ title, desc }) {
  return (
    <div className="bg-[#0F2038] rounded-2xl p-8 flex-1 flex flex-col items-center justify-center text-center">
      <h2 className="text-white font-bold text-xl mb-2">{title}</h2>
      <p className="text-[#8FA3C0] text-sm max-w-md">{desc}</p>
    </div>
  );
}

// Función para quitar tildes y pasar todo a minúsculas
const normalizarTexto = (texto) => {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); 
};

// ---------- LOGIN ----------
function Login({ onEnter }) {
  const [role, setRole] = useState("estudiante");
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [errors, setErrors] = useState({ nombre: "", dni: "" });

 const handleIngresar = (e) => {
    if (e) e.preventDefault(); 

    // CHIVATO: Si no ves este mensaje en la consola, tu código no se ha actualizado.
    console.log("Iniciando validación estricta v2...", { nombre, dni });

    const newErrors = { nombre: "", dni: "" };
    const nombreLimpio = nombre.trim();
    const dniLimpio = dni.trim();
    
    // --- REGLAS ESTRICTAS ---
    const nombreValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreLimpio);
    const dniValido = /^\d{8}$/.test(dniLimpio); // EXACTAMENTE 8 DÍGITOS NUMÉRICOS

    // Validamos que el nombre tenga sentido (solo letras y al menos 3 caracteres)
    if (!nombreLimpio) {
      newErrors.nombre = "Falta poner tus nombres";
    } else if (!nombreValido) {
      newErrors.nombre = "El nombre solo debe contener letras";
    } else if (nombreLimpio.length < 3) {
      newErrors.nombre = "Ingresa un nombre real";
    }

    // Validamos que el DNI sea real (8 números)
    if (!dniLimpio) {
      newErrors.dni = "Falta poner tu DNI";
    } else if (!dniValido) {
      newErrors.dni = "El DNI debe tener exactamente 8 números";
    }
    
    // Si hay errores de formato, detenemos TODO aquí y no dejamos entrar
    if (newErrors.nombre || newErrors.dni) {
      console.log("Bloqueado por formato incorrecto:", newErrors);
      setErrors(newErrors);
      return; 
    }

    // --- BÚSQUEDA EN LA BASE DE DATOS ---
    const listaUsuarios = role === "estudiante" ? ESTUDIANTES_REGISTRADOS : DOCENTES_REGISTRADOS;
    const palabrasIngresadas = normalizarTexto(nombreLimpio).split(/\s+/);

    const usuarioEncontrado = listaUsuarios.find((usuarioDB) => {
      const nombreDB = normalizarTexto(usuarioDB.nombre);
      const coincidenNombres = palabrasIngresadas.every(palabra => nombreDB.includes(palabra));
      const coincideDNI = usuarioDB.dni === dniLimpio;

      return coincidenNombres && coincideDNI;
    });

    if (usuarioEncontrado) {
      console.log("¡Usuario válido! Ingresando...", usuarioEncontrado);
      setErrors({ nombre: "", dni: "" });
      onEnter(role); 
    } else {
      console.log("Bloqueado: El usuario no existe en la lista o el DNI no cuadra.");
      setErrors({ 
        nombre: "Usuario no encontrado. Revisa tus nombres.", 
        dni: "El DNI no coincide." 
      });
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto bg-[#F2F3F5] rounded-3xl p-8 shadow-2xl relative z-10">
      <div className="flex flex-col items-center text-center mb-6">
        {/* Aquí agregamos mix-blend-multiply para quitar el fondo blanco del logo */}
        <img 
          src="/logo-nexoedu.png" 
          alt="NexoEdu" 
          className="w-40 h-40 object-contain mb-2 mix-blend-multiply" 
        />
      </div>

      <p className="text-center text-sm font-semibold text-[#5B6B85] mb-3">¿Quién eres?</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { key: "estudiante", icon: GraduationCap, title: "Estudiante", sub: "Accede a tu mundo de aprendizaje" },
          { key: "docente", icon: User, title: "Docente", sub: "Gestiona tus cursos" },
        ].map((r) => (
          <button
            key={r.key}
            // Agregamos type="button" para que no active el formulario accidentalmente
            type="button" 
            onClick={() => {
              setRole(r.key);
              setErrors({ nombre: "", dni: "" }); 
            }}
            className={`rounded-2xl p-4 text-left transition-all border-2 ${
              role === r.key
                ? "bg-[#12233F] border-[#5AC8E8] text-white"
                : "bg-white border-transparent text-[#12233F] hover:border-[#c7d6ea]"
            }`}
          >
            <r.icon size={22} strokeWidth={1.8} className={role === r.key ? "text-white" : "text-[#12233F]"} />
            <div className="font-bold text-sm mt-3">{r.title}</div>
            <div className={`text-xs mt-1 ${role === r.key ? "text-[#9FB3CC]" : "text-[#8FA3C0]"}`}>{r.sub}</div>
          </button>
        ))}
      </div>

      {/* Envolvemos los inputs y el botón en un <form> para activar el "Enter" */}
      <form 
        onSubmit={(e) => { 
          e.preventDefault(); // Evita que la página se recargue al dar Enter
          handleIngresar(); 
        }} 
        className="space-y-3"
      >
        <div>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Alanya Adriana"
            className={`w-full bg-white rounded-xl px-4 py-3 text-sm text-[#12233F] placeholder-[#A6B3C6] border focus:outline-none focus:ring-2 focus:ring-[#5AC8E8] ${
              errors.nombre ? "border-[#E5484D]" : "border-[#E3E7ED]"
            }`}
          />
          {errors.nombre && (
            <p className="flex items-center gap-1 text-[#E5484D] text-xs mt-1.5 ml-1">
              <AlertCircle size={13} /> {errors.nombre}
            </p>
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
            <p className="flex items-center gap-1 text-[#E5484D] text-xs mt-1.5 ml-1">
              <AlertCircle size={13} /> {errors.dni}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#5AC8E8] hover:bg-[#48b9db] transition-colors text-[#0B1A33] font-bold py-3 rounded-xl"
        >
          Ingresar
        </button>
      </form>
      <p className="text-center text-xs text-[#8FA3C0] mt-4">¿Necesitas ayuda?</p>
    </div>
  );
}

// ---------- STUDENT DASHBOARD ----------
function StudentHome() {
  const books = [
    { title: "Aventuras Matemáticas", emoji: "📘" },
    { title: "Viaje al Conocimiento", emoji: "🚀", featured: true },
    { title: "Cuentos de Valores", emoji: "🌳" },
  ];
  const notifications = [
    { color: "#FF7A6B", emoji: "😮", title: "Tareas pendientes", text: "Tienes 2 tareas por completar" },
    { color: "#FFD65A", emoji: "🙂", title: "Lecturas incompletas", text: "Tienes 1 lectura sin terminar" },
    { color: "#4FD1B0", emoji: "🎉", title: "¡Felicidades!", text: "Completaste 3 actividades esta semana" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 flex-1">
      <div className="col-span-2 bg-[#0F2038] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg">Biblioteca</h2>
          <ChevronRight size={18} className="text-[#8FA3C0]" />
        </div>
        <div className="flex items-center gap-3">
          <ChevronLeft size={18} className="text-[#8FA3C0] shrink-0" />
          {books.map((b) => (
            <div
              key={b.title}
              className={`flex-1 rounded-xl p-5 text-center ${
                b.featured ? "bg-[#14284A] ring-2 ring-[#5AC8E8]" : "bg-[#14284A]"
              }`}
            >
              <div className="text-5xl mb-3">{b.emoji}</div>
              <div className="text-white text-xs font-semibold leading-tight">{b.title}</div>
            </div>
          ))}
          <ChevronRight size={18} className="text-[#8FA3C0] shrink-0" />
        </div>
        <div className="flex justify-center gap-1.5 mt-3">
          {books.map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === 1 ? "bg-[#5AC8E8]" : "bg-[#2C4266]"}`} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-[#14284A] rounded-xl p-5 flex items-center gap-3">
            <span className="text-4xl">🎮</span>
            <span className="text-white text-sm font-bold">Juegos</span>
          </div>
          <div className="bg-[#14284A] rounded-xl p-5 flex items-center gap-3">
            <span className="text-4xl">🃏</span>
            <span className="text-white text-sm font-bold">Flashcards</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0F2038] rounded-2xl p-6">
        <h2 className="text-white font-bold text-lg mb-4">Mi Calendario</h2>
        <div className="space-y-4">
          {notifications.map((n) => (
            <div key={n.title} className="flex gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0"
                style={{ backgroundColor: n.color + "33" }}
              >
                {n.emoji}
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: n.color }}>{n.title}</div>
                <div className="text-xs text-[#8FA3C0] mt-0.5">{n.text}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-5 bg-[#5AC8E8] text-[#0B1A33] text-xs font-bold py-2.5 rounded-lg">
          Ver calendario
        </button>
      </div>
    </div>
  );
}

const STUDENT_SECTIONS = {
  biblioteca: { title: "Biblioteca", desc: "Aquí verás todos tus libros interactivos organizados por materia." },
  juegos: { title: "Juegos", desc: "Aquí van los juegos de concentración y aprendizaje lúdico." },
  flashcards: { title: "Flashcards", desc: "Tus tarjetas de repaso rápido por tema aparecerán aquí." },
  calendario: { title: "Calendario", desc: "Vista completa de tus tareas y actividades programadas." },
  logros: { title: "Mis Logros", desc: "Insignias y puntos que ganaste completando actividades." },
  perfil: { title: "Mi Perfil", desc: "Tus datos personales y configuración de cuenta." },
};

function StudentDashboard({ onExit }) {
  const [active, setActive] = useState("inicio");
  return (
    <div className="flex gap-4 h-full">
      <Sidebar items={NAV_STUDENT} name="Nombres y Apellidos" active={active} onSelect={setActive} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-end mb-2">
          <button onClick={onExit} className="text-xs text-[#8FA3C0] hover:text-white underline">
            Cambiar de perfil
          </button>
        </div>
        <TopBar points="120" name="Estudiante" />
        {active === "inicio" ? (
          <StudentHome />
        ) : (
          <SectionPlaceholder {...STUDENT_SECTIONS[active]} />
        )}
      </div>
    </div>
  );
}

// ---------- TEACHER DASHBOARD ----------
function TeacherHome() {
  const skills = [
    { label: "Pedagogía", value: 90 },
    { label: "Comprensión Lectora", value: 75 },
    { label: "Evaluación Formativa", value: 60 },
    { label: "TIC en Educación", value: 45 },
  ];
  const events = [
    { color: "#FF7A6B", title: "Taller: Estrategias activas", time: "10:00 AM - 11:30 AM" },
    { color: "#FFD65A", title: "Revisión de Actividades", time: "1:00 PM - 2:00 PM" },
    { color: "#4FD1B0", title: "Webinar: Innovación Educativa", time: "4:00 PM - 5:30 PM" },
  ];
  const notes = [
    { color: "#FF7A6B", text: "Alerta de revisión...", time: "Hace 15 min" },
    { color: "#FFD65A", text: "Lectura pendiente...", time: "Hace 1 hora" },
    { color: "#4FD1B0", text: "Actividad completada...", time: "Hace 2 horas" },
    { color: "#5AC8E8", text: "Nuevo certificado disponible...", time: "Ayer" },
    { color: "#5AC8E8", text: "Recordatorio de taller...", time: "Ayer" },
  ];
  const circumference = 2 * Math.PI * 42;

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#0F2038] rounded-2xl p-6">
          <h2 className="text-white font-bold">Evaluación Diagnóstica</h2>
          <p className="text-[#8FA3C0] text-xs mt-0.5 mb-4">Descubre tus fortalezas y áreas de mejora</p>
          <div className="flex items-center gap-6">
            <svg width="110" height="110" viewBox="0 0 100 100" className="shrink-0">
              <circle cx="50" cy="50" r="42" stroke="#1E3660" strokeWidth="9" fill="none" />
              <circle
                cx="50" cy="50" r="42" stroke="#5AC8E8" strokeWidth="9" fill="none"
                strokeDasharray={circumference} strokeDashoffset={circumference * 0.28}
                strokeLinecap="round" transform="rotate(-90 50 50)"
              />
              <text x="50" y="46" textAnchor="middle" fill="white" fontSize="18" fontWeight="800">72%</text>
              <text x="50" y="62" textAnchor="middle" fill="#8FA3C0" fontSize="8">Completado</text>
            </svg>
            <div className="flex-1 space-y-2.5">
              {skills.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-[10px] text-[#B7C4D9] mb-1">
                    <span>✓ {s.label}</span>
                  </div>
                  <div className="h-1.5 bg-[#1E3660] rounded-full overflow-hidden">
                    <div className="h-full bg-[#5AC8E8] rounded-full" style={{ width: `${s.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-5 bg-[#5AC8E8] text-[#0B1A33] text-xs font-bold py-2.5 rounded-lg">
            Continuar evaluación
          </button>
        </div>

        <div className="bg-[#0F2038] rounded-2xl p-6 flex flex-col">
          <h2 className="text-white font-bold">Mi Progreso</h2>
          <p className="text-[#8FA3C0] text-xs mt-0.5">Nivel 3 · Docente Avanzado</p>
          <div className="flex items-center gap-4 mt-5">
            <Trophy size={44} className="text-[#FFD65A] shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between text-xs text-[#B7C4D9] mb-1">
                <span>950 / 1300 pts</span><span>75%</span>
              </div>
              <div className="h-2 bg-[#1E3660] rounded-full overflow-hidden">
                <div className="h-full bg-[#5AC8E8] rounded-full" style={{ width: "75%" }} />
              </div>
            </div>
          </div>
          <p className="text-xs text-[#8FA3C0] mt-5">
            <span className="text-[#5AC8E8] font-semibold">Próximo nivel: </span>
            Completa las actividades para seguir avanzando.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="bg-[#0F2038] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-bold">Calendario</h2>
            <div className="flex items-center gap-2 text-xs text-[#8FA3C0]">
              <ChevronLeft size={14} /> Julio 2026 <ChevronRight size={14} />
            </div>
          </div>
          <div className="space-y-3">
            {events.map((e) => (
              <div key={e.title} className="flex gap-2 items-start">
                <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: e.color }} />
                <div>
                  <div className="text-xs text-white font-medium">{e.title}</div>
                  <div className="text-[10px] text-[#8FA3C0]">{e.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0F2038] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-3">Notificaciones</h2>
          <div className="space-y-3">
            {notes.map((n, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: n.color }} />
                  <span className="text-xs text-[#D6DFEC]">{n.text}</span>
                </div>
                <span className="text-[10px] text-[#6E80A0]">{n.time}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-5 bg-[#5AC8E8] text-[#0B1A33] text-xs font-bold py-2.5 rounded-lg">
            Ver todas
          </button>
        </div>
      </div>
    </div>
  );
}

const TEACHER_SECTIONS = {
  cursos: { title: "Mis Cursos", desc: "Lista de cursos que dictas o en los que estás inscrito." },
  capacitaciones: { title: "Capacitaciones", desc: "Rutas de formación docente disponibles y en progreso." },
  evaluaciones: { title: "Evaluaciones", desc: "Evaluaciones diagnósticas y de certificación pendientes." },
  calendario: { title: "Calendario", desc: "Todos tus talleres, webinars y actividades programadas." },
  certificados: { title: "Certificados", desc: "Tus certificaciones obtenidas y en proceso." },
  perfil: { title: "Mi Perfil", desc: "Tus datos personales y configuración de cuenta." },
};

function TeacherDashboard({ onExit }) {
  const [active, setActive] = useState("inicio");
  return (
    <div className="flex gap-4 h-full">
      <Sidebar items={NAV_TEACHER} name="Nombres y Apellidos" active={active} onSelect={setActive} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-end mb-2">
          <button onClick={onExit} className="text-xs text-[#8FA3C0] hover:text-white underline">
            Cambiar de perfil
          </button>
        </div>
        <TopBar points="950" name="Docente" />
        {active === "inicio" ? (
          <TeacherHome />
        ) : (
          <SectionPlaceholder {...TEACHER_SECTIONS[active]} />
        )}
      </div>
    </div>
  );
}

// ---------- APP ----------
export default function NexoEduPrototype() {
  const [view, setView] = useState("login"); // login | estudiante | docente

  return (
    <div className="min-h-screen w-full bg-[#0B1A33] flex items-center justify-center p-6 relative overflow-hidden">
      <BackgroundDecor />
      {view === "login" && <Login onEnter={(role) => setView(role)} />}
      {view === "estudiante" && (
        <div className="w-full h-[92vh] relative z-10">
          <StudentDashboard onExit={() => setView("login")} />
        </div>
      )}
      {view === "docente" && (
        <div className="w-full h-[92vh] relative z-10">
          <TeacherDashboard onExit={() => setView("login")} />
        </div>
      )}
    </div>
  );
}
