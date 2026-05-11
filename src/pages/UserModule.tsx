/**
 * @file UserModule.tsx
 * @description Página de detalle de un módulo de capacitación. Muestra video,
 *   secciones de contenido tituladas en tarjetas, fuentes citadas y un
 *   mini-test evaluativo. Ruta: /user/module/:id
 */
import React, { useMemo, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButtons, IonBackButton,
} from '@ionic/react';
import { mockModules } from '../services/mockData';
import { useSidebar } from '../context/SidebarContext';

type ModuleRouteParams = { id: string };

/* Paleta de colores para las tarjetas de sección (rotativa) */
const SECTION_COLORS = [
  { bg: 'bg-blue-50',   border: 'border-blue-200',  badge: 'bg-blue-600',   text: 'text-blue-900'  },
  { bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-600', text: 'text-indigo-900' },
  { bg: 'bg-sky-50',    border: 'border-sky-200',    badge: 'bg-sky-600',    text: 'text-sky-900'   },
  { bg: 'bg-violet-50', border: 'border-violet-200', badge: 'bg-violet-600', text: 'text-violet-900' },
  { bg: 'bg-teal-50',   border: 'border-teal-200',   badge: 'bg-teal-600',   text: 'text-teal-900'  },
];

const UserModule: React.FC<RouteComponentProps<ModuleRouteParams>> = ({ match }) => {
  const moduleId   = Number(match.params.id);
  const moduleData = useMemo(() => mockModules.find(m => m.id === moduleId), [moduleId]);
  const history    = useHistory();
  const { toggle: toggleSidebar } = useSidebar();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizResult, setQuizResult]         = useState<'correct' | 'wrong' | null>(null);

  if (!moduleData) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/user/dashboard" />
            </IonButtons>
            <IonTitle>Error</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="alert alert-error shadow-lg">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>No existe un módulo con ese identificador.</span>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const handleCheckQuiz = () => {
    setQuizResult(selectedAnswer === moduleData.quiz.answerIndex ? 'correct' : 'wrong');
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setQuizResult(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            {/* Hamburguesa — solo desktop */}
            <button
              onClick={toggleSidebar}
              aria-label="Abrir/cerrar menú"
              className="hidden md:flex w-10 h-10 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Volver — solo móvil */}
            <IonBackButton defaultHref="/user/dashboard" className="md:hidden" />
          </IonButtons>
          <IonTitle>{moduleData.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">

          {/* ── Encabezado del módulo ── */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-indigo-600" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                  Módulo {moduleData.id}
                </span>
                <span className="text-xs text-gray-400">de {mockModules.length} módulos</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 leading-snug">{moduleData.title}</h1>
              <p className="text-gray-500 mt-2 text-sm leading-relaxed">{moduleData.description}</p>
            </div>
          </div>

          {/* ── Video educativo ── */}
          {moduleData.videoUrl && (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                <h2 className="font-semibold text-gray-900">Video Educativo</h2>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src={moduleData.videoUrl}
                  title={`Video — ${moduleData.title}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* ── Contenido de estudio — tarjetas por sección ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h2 className="text-lg font-bold text-gray-900">Contenido de Estudio</h2>
              <span className="text-xs text-gray-400 ml-auto">{moduleData.sections.length} secciones</span>
            </div>

            <div className="space-y-4">
              {moduleData.sections.map((section, i) => {
                const color = SECTION_COLORS[i % SECTION_COLORS.length];
                return (
                  <div
                    key={i}
                    className={`${color.bg} border ${color.border} rounded-2xl overflow-hidden`}
                  >
                    {/* Cabecera de sección */}
                    <div className="flex items-center gap-3 px-5 py-3 border-b border-current border-opacity-20"
                      style={{ borderBottomColor: 'inherit' }}>
                      <span className={`${color.badge} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0`}>
                        {i + 1}
                      </span>
                      <h3 className={`font-semibold text-sm ${color.text}`}>{section.title}</h3>
                    </div>
                    {/* Cuerpo */}
                    <div className="px-5 py-4">
                      <p className="text-gray-700 text-sm leading-relaxed">{section.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Fuentes y referencias ── */}
          {moduleData.sources && moduleData.sources.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                <h2 className="font-semibold text-gray-900">Fuentes y Referencias</h2>
              </div>
              <ol className="space-y-3">
                {moduleData.sources.map((source, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="text-gray-400 font-mono tabular-nums shrink-0 pt-px">
                      [{i + 1}]
                    </span>
                    <div>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline underline-offset-2 font-medium"
                      >
                        {source.title}
                      </a>
                      <p className="text-gray-500 mt-0.5">{source.author}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* ── Mini-test evaluativo ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              <h2 className="font-semibold text-gray-900">Mini-test Evaluativo</h2>
            </div>

            <p className="text-gray-800 text-sm mb-5 leading-relaxed font-medium">
              {moduleData.quiz.question}
            </p>

            <div className="space-y-3">
              {moduleData.quiz.options.map((option, i) => {
                const isSelected = selectedAnswer === i;
                const isDisabled = quizResult !== null;
                const isCorrect  = i === moduleData.quiz.answerIndex;

                let cls = 'border-gray-200 text-gray-700 hover:border-primary/40 hover:bg-blue-50';
                if (isSelected && !isDisabled)                            cls = 'border-primary bg-blue-50 text-gray-900';
                if (isDisabled && isSelected && quizResult === 'correct') cls = 'border-green-500 bg-green-50 text-green-900';
                if (isDisabled && isSelected && quizResult === 'wrong')   cls = 'border-red-400 bg-red-50 text-red-900';
                if (isDisabled && !isSelected && isCorrect)               cls = 'border-green-400 bg-green-50/50 text-green-800';

                const letter = ['A', 'B', 'C', 'D'][i];

                return (
                  <label
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-150 ${cls} ${
                      isDisabled ? 'cursor-default pointer-events-none' : ''
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0
                      ${isSelected && !isDisabled ? 'border-primary bg-primary text-white' :
                        isDisabled && isSelected && quizResult === 'correct' ? 'border-green-500 bg-green-500 text-white' :
                        isDisabled && isSelected && quizResult === 'wrong' ? 'border-red-500 bg-red-500 text-white' :
                        isDisabled && isCorrect ? 'border-green-400 bg-green-400 text-white' :
                        'border-gray-300 text-gray-500'}`}>
                      {isDisabled && isSelected && quizResult === 'correct'
                        ? '✓'
                        : isDisabled && isSelected && quizResult === 'wrong'
                        ? '✗'
                        : isDisabled && !isSelected && isCorrect
                        ? '✓'
                        : letter}
                    </span>
                    <input
                      type="radio" name="quiz" value={i}
                      className="sr-only"
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={() => { if (!isDisabled) setSelectedAnswer(i); }}
                    />
                    <span className="text-sm leading-relaxed">{option}</span>
                  </label>
                );
              })}
            </div>

            {/* Acción del quiz */}
            {quizResult === null ? (
              <div className="mt-6 flex justify-end">
                <button
                  className="btn btn-primary"
                  onClick={handleCheckQuiz}
                  disabled={selectedAnswer === null}
                >
                  Confirmar Respuesta
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {quizResult === 'correct' ? (
                  <>
                    <div role="alert" className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">¡Respuesta Correcta!</p>
                        <p className="text-sm text-green-700 mt-0.5">Has completado este módulo exitosamente. ¡Excelente trabajo!</p>
                      </div>
                    </div>
                    {/* Botón de volver a módulos */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => history.push('/user/dashboard')}
                        className="btn btn-primary gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Volver a Módulos
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div role="alert" className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-red-800">Respuesta Incorrecta</p>
                        <p className="text-sm text-red-700 mt-0.5">Revisa el contenido de estudio e inténtalo de nuevo.</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="btn btn-outline btn-sm" onClick={handleRetry}>
                        Intentar de nuevo
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserModule;
