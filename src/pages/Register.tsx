/**
 * @file Register.tsx
 * @description Formulario de registro de nuevo usuario. Secciones: información
 *   personal, ubicación (región/comuna) y seguridad (contraseña + confirmación).
 *   Valida coincidencia de contraseñas en tiempo real. Ruta: /register
 */
import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory, Link } from 'react-router-dom';

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

type FormField = {
  username: string;
  rut: string;
  email: string;
  region: string;
  comuna: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

const Register: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<FormField>({
    username: '', rut: '', email: '',
    region: '', comuna: '',
    password: '', confirmPassword: '',
    termsAccepted: false,
  });

  const [showPassword, setShowPassword]              = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg]                       = useState('');
  const [isLoading, setIsLoading]                     = useState(false);

  const set = (field: keyof FormField, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const passwordsMatch: boolean | null =
    form.password && form.confirmPassword
      ? form.password === form.confirmPassword
      : null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (form.password !== form.confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }
    if (!form.termsAccepted) {
      setErrorMsg('Debes aceptar los términos y condiciones.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      history.push('/login');
    }, 600);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="min-h-screen flex items-start justify-center bg-base-100 px-4 py-10">
          <div className="w-full max-w-lg">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary/10 border border-primary/25 rounded-xl flex items-center justify-center">
                <ShieldIcon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-base-content">CiberEscudo</span>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-base-content tracking-tight">Crear Cuenta</h2>
              <p className="text-base-content/50 mt-2 text-sm">Únete a la plataforma de ciberseguridad</p>
            </div>

            {errorMsg && (
              <div role="alert" className="alert alert-error mb-6 text-sm">
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6" noValidate>

              {/* ── Sección: Información Personal ── */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                    Información Personal
                  </span>
                </div>

                <div className="space-y-4 p-4 bg-base-200 rounded-2xl border border-base-300">
                  <div>
                    <label className="label pb-1" htmlFor="reg-username">
                      <span className="label-text font-medium text-base-content/80">Nombre de Usuario</span>
                    </label>
                    <input id="reg-username" type="text" autoComplete="username"
                      className="input input-bordered w-full focus:input-primary"
                      placeholder="juanperez123"
                      value={form.username}
                      onChange={e => set('username', e.target.value)} required />
                  </div>

                  <div>
                    <label className="label pb-1" htmlFor="reg-rut">
                      <span className="label-text font-medium text-base-content/80">RUT</span>
                      <span className="label-text-alt text-base-content/40">Ej: 12.345.678-9</span>
                    </label>
                    <input id="reg-rut" type="text"
                      className="input input-bordered w-full focus:input-primary"
                      placeholder="12.345.678-9"
                      value={form.rut}
                      onChange={e => set('rut', e.target.value)} required />
                  </div>

                  <div>
                    <label className="label pb-1" htmlFor="reg-email">
                      <span className="label-text font-medium text-base-content/80">Correo Electrónico</span>
                    </label>
                    <input id="reg-email" type="email" autoComplete="email"
                      className="input input-bordered w-full focus:input-primary"
                      placeholder="tu@correo.cl"
                      value={form.email}
                      onChange={e => set('email', e.target.value)} required />
                  </div>
                </div>
              </div>

              {/* ── Sección: Ubicación ── */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                    Ubicación
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-base-200 rounded-2xl border border-base-300">
                  <div>
                    <label className="label pb-1" htmlFor="reg-region">
                      <span className="label-text font-medium text-base-content/80">Región</span>
                    </label>
                    <input id="reg-region" type="text"
                      className="input input-bordered w-full focus:input-primary"
                      placeholder="Metropolitana"
                      value={form.region}
                      onChange={e => set('region', e.target.value)} required />
                  </div>
                  <div>
                    <label className="label pb-1" htmlFor="reg-comuna">
                      <span className="label-text font-medium text-base-content/80">Comuna</span>
                    </label>
                    <input id="reg-comuna" type="text"
                      className="input input-bordered w-full focus:input-primary"
                      placeholder="Santiago"
                      value={form.comuna}
                      onChange={e => set('comuna', e.target.value)} required />
                  </div>
                </div>
              </div>

              {/* ── Sección: Seguridad ── */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                    Seguridad
                  </span>
                </div>

                <div className="space-y-4 p-4 bg-base-200 rounded-2xl border border-base-300">
                  {/* Password */}
                  <div>
                    <label className="label pb-1" htmlFor="reg-password">
                      <span className="label-text font-medium text-base-content/80">Contraseña</span>
                    </label>
                    <div className="relative">
                      <input id="reg-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        className="input input-bordered w-full pr-12 focus:input-primary"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={e => set('password', e.target.value)} required />
                      <button type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                        onClick={() => setShowPassword(v => !v)}
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                        {showPassword ? <EyeClosed /> : <EyeOpen />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label className="label pb-1" htmlFor="reg-confirm">
                      <span className="label-text font-medium text-base-content/80">Confirmar Contraseña</span>
                      {passwordsMatch === false && (
                        <span className="label-text-alt text-error">No coinciden</span>
                      )}
                      {passwordsMatch === true && (
                        <span className="label-text-alt text-success">✓ Coinciden</span>
                      )}
                    </label>
                    <div className="relative">
                      <input id="reg-confirm"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        className={`input input-bordered w-full pr-12 focus:input-primary ${
                          passwordsMatch === false ? 'input-error' : passwordsMatch === true ? 'input-success' : ''
                        }`}
                        placeholder="••••••••"
                        value={form.confirmPassword}
                        onChange={e => set('confirmPassword', e.target.value)} required />
                      <button type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                        onClick={() => setShowConfirmPassword(v => !v)}
                        aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                        {showConfirmPassword ? <EyeClosed /> : <EyeOpen />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox"
                  className="checkbox checkbox-primary mt-0.5 shrink-0"
                  checked={form.termsAccepted}
                  onChange={e => set('termsAccepted', e.target.checked)} />
                <span className="text-sm text-base-content/60 leading-relaxed">
                  Acepto los{' '}
                  <span className="text-primary cursor-pointer hover:underline underline-offset-2">
                    términos y condiciones
                  </span>{' '}
                  de uso de la plataforma
                </span>
              </label>

              <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                {isLoading
                  ? <span className="loading loading-spinner loading-sm" />
                  : 'Crear Cuenta'}
              </button>
            </form>

            <p className="text-center text-base-content/50 text-sm mt-6">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline transition-colors">
                Inicia Sesión
              </Link>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
