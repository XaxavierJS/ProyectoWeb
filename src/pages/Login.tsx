/**
 * @file Login.tsx
 * @description Página de inicio de sesión. Panel izquierdo de marca (desktop)
 *   y formulario de autenticación a la derecha. Redirige a /user/dashboard o
 *   /admin/dashboard según el rol determinado por authService. Ruta: /login
 */
import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory, Link } from 'react-router-dom';
import { authService } from '../services/auth';

const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const EyeOpen: React.FC = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeClosed: React.FC = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [error, setError]               = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const role = email.includes('admin') ? 'admin' : 'user';
      authService.login(role);
      setIsLoading(false);
      history.push(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    }, 600);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex min-h-screen">

          {/* ── Left brand panel (desktop only) ── */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#06101e] via-[#0c1a2e] to-[#06101e] flex-col items-center justify-center p-12 relative overflow-hidden">
            {/* Dot-grid decoration */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            {/* Glow circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-700/8 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
              {/* Logo */}
              <div className="w-24 h-24 bg-blue-400/15 border border-blue-400/25 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/10">
                <ShieldIcon className="w-14 h-14 text-blue-300" />
              </div>

              <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">CiberEscudo</h1>
              <p className="text-slate-400 text-base leading-relaxed mb-12">
                Aprende a protegerte en el mundo digital con módulos diseñados para Chile.
              </p>

              {/* Decorative stats */}
              <div className="grid grid-cols-3 gap-6 w-full border-t border-white/10 pt-8">
                {[
                  { value: '2', label: 'Módulos' },
                  { value: '100%', label: 'Gratuito' },
                  { value: 'CL', label: 'Chile' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-bold text-blue-300">{value}</div>
                    <div className="text-xs text-slate-500 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right form panel ── */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-base-100">

            {/* Mobile-only logo */}
            <div className="md:hidden flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-primary/10 border border-primary/25 rounded-xl flex items-center justify-center">
                <ShieldIcon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-base-content">CiberEscudo</span>
            </div>

            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-base-content tracking-tight">Iniciar Sesión</h2>
                <p className="text-base-content/50 mt-2 text-sm">Accede a tu plataforma de aprendizaje</p>
              </div>

              {error && (
                <div role="alert" className="alert alert-error mb-6 text-sm">
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5" noValidate>
                <div>
                  <label className="label pb-1" htmlFor="login-email">
                    <span className="label-text font-medium text-base-content/80">Correo Electrónico</span>
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    className="input input-bordered w-full focus:input-primary"
                    placeholder="tu@correo.cl"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="label pb-1" htmlFor="login-password">
                    <span className="label-text font-medium text-base-content/80">Contraseña</span>
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      className="input input-bordered w-full pr-12 focus:input-primary"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                      onClick={() => setShowPassword(v => !v)}
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPassword ? <EyeClosed /> : <EyeOpen />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full mt-2"
                  disabled={isLoading}
                >
                  {isLoading
                    ? <span className="loading loading-spinner loading-sm" />
                    : 'Ingresar'}
                </button>
              </form>

              <p className="text-center text-base-content/50 text-sm mt-8">
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline transition-colors">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
