import React, { useState } from "react";
import {
  GraduationCap, User, Home, BookOpen, Gamepad2, Layers, Calendar,
  Star, Bell, ChevronLeft, ChevronRight, Trophy, ClipboardCheck,
  ShieldCheck, IdCard, ChevronDown
} from "lucide-react";

// ---- Tokens ----
// Navy base:  #0B1A33 / #12233F / #16294A
// Panel light: #F2F3F5
// Accent cyan: #5AC8E8
// Mascots: coral #FF7A6B, amarillo #FFD65A, verde agua #4FD1B0

const NAV_STUDENT = [
  { icon: Home, label: "Inicio", active: true },
  { icon: BookOpen, label: "Biblioteca" },
  { icon: Gamepad2, label: "Juegos" },
  { icon: Layers, label: "Flashcards" },
  { icon: Calendar, label: "Calendario" },
  { icon: Star, label: "Mis Logros" },
  { icon: User, label: "Mi Perfil" },
];

const NAV_TEACHER = [
  { icon: Home, label: "Inicio", active: true },
  { icon: BookOpen, label: "Mis Cursos" },
  { icon: ClipboardCheck, label: "Capacitaciones" },
  { icon: ShieldCheck, label: "Evaluaciones" },
  { icon: Calendar, label: "Calendario" },
  { icon: IdCard, label: "Certificados" },
  { icon: User, label: "Mi Perfil" },
];

function Logo({ light }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5AC8E8] to-[#1E4E8C] flex items-center justify-center text-white font-black text-xs">
        NE
      </div>
      <span className={`font-extrabold tracking-tight ${light ? "text-white" : "text-[#12233F]"}`}>
        Nexo<span className="text-[#5AC8E8]">Edu</span>
      </span>
    </div>
  );
}

function Sidebar({ items, name }) {
  return (
    <aside className="w-56 shrink-0 bg-[#0F2038] rounded-2xl p-4 flex flex-col gap-1 h-full">
      <div className="px-2 pb-4">
        <Logo light />
      </div>
      {items.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            active
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

// ---------- LOGIN ----------
function Login({ onEnter }) {
  const [role, setRole] = useState("estudiante");
  return (
    <div className="w-full max-w-[420px] mx-auto bg-[#F2F3F5] rounded-3xl p-8 shadow-2xl">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#eef3fb] to-[#dbe6f5] flex items-center justify-center mb-4 shadow-inner">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5AC8E8] to-[#1E4E8C] flex items-center justify-center text-white font-black text-lg">
            NE
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-[#12233F]">
          Nexo<span className="text-[#2E7FC1]">Edu</span>
        </h1>
        <p className="text-[10px] tracking-[0.2em] text-[#8FA3C0] font-semibold mt-1">
          APRENDE · CONECTA · TRANSFORMA
        </p>
      </div>

      <p className="text-center text-sm font-semibold text-[#5B6B85] mb-3">¿Quién eres?</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { key: "estudiante", icon: GraduationCap, title: "Estudiante", sub: "Accede a tu mundo de aprendizaje" },
          { key: "docente", icon: User, title: "Docente", sub: "Gestiona tus cursos y capacitaciones" },
        ].map((r) => (
          <button
            key={r.key}
            onClick={() => setRole(r.key)}
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

      <div className="space-y-3">
        <input
          placeholder="Nombres y Apellidos Completos"
          className="w-full bg-white rounded-xl px-4 py-3 text-sm text-[#12233F] placeholder-[#A6B3C6] border border-[#E3E7ED] focus:outline-none focus:ring-2 focus:ring-[#5AC8E8]"
        />
        <input
          placeholder="Número de DNI"
          className="w-full bg-white rounded-xl px-4 py-3 text-sm text-[#12233F] placeholder-[#A6B3C6] border border-[#E3E7ED] focus:outline-none focus:ring-2 focus:ring-[#5AC8E8]"
        />
        <button
          onClick={() => onEnter(role)}
          className="w-full bg-[#5AC8E8] hover:bg-[#48b9db] transition-colors text-[#0B1A33] font-bold py-3 rounded-xl"
        >
          Ingresar
        </button>
      </div>
      <p className="text-center text-xs text-[#8FA3C0] mt-4">¿Necesitas ayuda?</p>
    </div>
  );
}

// ---------- STUDENT DASHBOARD ----------
function StudentDashboard({ onExit }) {
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
    <div className="flex gap-4 h-full">
      <Sidebar items={NAV_STUDENT} name="Nombres y Apellidos" />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-end mb-2">
          <button onClick={onExit} className="text-xs text-[#8FA3C0] hover:text-white underline">
            Cambiar de perfil
          </button>
        </div>
        <TopBar points="120" name="Estudiante" />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-[#0F2038] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold">Biblioteca</h2>
              <ChevronRight size={18} className="text-[#8FA3C0]" />
            </div>
            <div className="flex items-center gap-3">
              <ChevronLeft size={18} className="text-[#8FA3C0] shrink-0" />
              {books.map((b) => (
                <div
                  key={b.title}
                  className={`flex-1 rounded-xl p-4 text-center ${
                    b.featured
                      ? "bg-[#14284A] ring-2 ring-[#5AC8E8]"
                      : "bg-[#14284A]"
                  }`}
                >
                  <div className="text-4xl mb-3">{b.emoji}</div>
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

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-[#14284A] rounded-xl p-4 flex items-center gap-3">
                <span className="text-3xl">🎮</span>
                <span className="text-white text-sm font-bold">Juegos</span>
              </div>
              <div className="bg-[#14284A] rounded-xl p-4 flex items-center gap-3">
                <span className="text-3xl">🃏</span>
                <span className="text-white text-sm font-bold">Flashcards</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0F2038] rounded-2xl p-5">
            <h2 className="text-white font-bold mb-4">Mi Calendario</h2>
            <div className="space-y-3">
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
            <button className="w-full mt-4 bg-[#5AC8E8] text-[#0B1A33] text-xs font-bold py-2.5 rounded-lg">
              Ver calendario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- TEACHER DASHBOARD ----------
function TeacherDashboard({ onExit }) {
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
    <div className="flex gap-4 h-full">
      <Sidebar items={NAV_TEACHER} name="Nombres y Apellidos" />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-end mb-2">
          <button onClick={onExit} className="text-xs text-[#8FA3C0] hover:text-white underline">
            Cambiar de perfil
          </button>
        </div>
        <TopBar points="950" name="Docente" />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-[#0F2038] rounded-2xl p-5">
            <h2 className="text-white font-bold text-sm">Evaluación Diagnóstica</h2>
            <p className="text-[#8FA3C0] text-xs mt-0.5 mb-4">Descubre tus fortalezas y áreas de mejora</p>
            <div className="flex items-center gap-5">
              <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0">
                <circle cx="50" cy="50" r="42" stroke="#1E3660" strokeWidth="9" fill="none" />
                <circle
                  cx="50" cy="50" r="42" stroke="#5AC8E8" strokeWidth="9" fill="none"
                  strokeDasharray={circumference} strokeDashoffset={circumference * 0.28}
                  strokeLinecap="round" transform="rotate(-90 50 50)"
                />
                <text x="50" y="46" textAnchor="middle" fill="white" fontSize="18" fontWeight="800">72%</text>
                <text x="50" y="62" textAnchor="middle" fill="#8FA3C0" fontSize="8">Completado</text>
              </svg>
              <div className="flex-1 space-y-2">
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
            <button className="w-full mt-4 bg-[#5AC8E8] text-[#0B1A33] text-xs font-bold py-2.5 rounded-lg">
              Continuar evaluación
            </button>
          </div>

          <div className="bg-[#0F2038] rounded-2xl p-5 flex flex-col">
            <h2 className="text-white font-bold text-sm">Mi Progreso</h2>
            <p className="text-[#8FA3C0] text-xs mt-0.5">Nivel 3 · Docente Avanzado</p>
            <div className="flex items-center gap-4 mt-4">
              <Trophy size={40} className="text-[#FFD65A] shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between text-xs text-[#B7C4D9] mb-1">
                  <span>950 / 1300 pts</span><span>75%</span>
                </div>
                <div className="h-2 bg-[#1E3660] rounded-full overflow-hidden">
                  <div className="h-full bg-[#5AC8E8] rounded-full" style={{ width: "75%" }} />
                </div>
              </div>
            </div>
            <p className="text-xs text-[#8FA3C0] mt-4">
              <span className="text-[#5AC8E8] font-semibold">Próximo nivel: </span>
              Completa las actividades para seguir avanzando.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0F2038] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-bold text-sm">Calendario</h2>
              <div className="flex items-center gap-2 text-xs text-[#8FA3C0]">
                <ChevronLeft size={14} /> Julio 2026 <ChevronRight size={14} />
              </div>
            </div>
            <div className="space-y-2.5">
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

          <div className="bg-[#0F2038] rounded-2xl p-5">
            <h2 className="text-white font-bold text-sm mb-3">Notificaciones</h2>
            <div className="space-y-2.5">
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
            <button className="w-full mt-4 bg-[#5AC8E8] text-[#0B1A33] text-xs font-bold py-2.5 rounded-lg">
              Ver todas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- APP ----------
export default function NexoEduPrototype() {
  const [view, setView] = useState("login"); // login | estudiante | docente

  return (
    <div className="min-h-screen w-full bg-[#0B1A33] flex items-center justify-center p-6">
      {view === "login" && <Login onEnter={(role) => setView(role)} />}
      {view === "estudiante" && (
        <div className="w-full max-w-6xl h-[640px]">
          <StudentDashboard onExit={() => setView("login")} />
        </div>
      )}
      {view === "docente" && (
        <div className="w-full max-w-6xl h-[640px]">
          <TeacherDashboard onExit={() => setView("login")} />
        </div>
      )}
    </div>
  );
}
