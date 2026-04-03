import { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { User, Sparkles, Mail, MessageSquare, Send, AtSign, Briefcase, Languages } from 'lucide-react';

const EmailForm = ({ formData, setFormData, handleGenerateEmail, isGenerating, tones, languages, genders }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm({
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const formValues = watch();

  useEffect(() => {
    if (isDirty) {
      setFormData(formValues);
    }
  }, [formValues, isDirty, setFormData]);

  const onSubmit = async (data) => {
    setFormData(data);
    await handleGenerateEmail();
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-3xl p-6 md:p-8"
      style={{
        background: "#f0e2e6",
        boxShadow: "20px 20px 40px #d0b6be, -20px -20px 40px #ffffff",
      }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-center gap-3"
        style={{
          background: "linear-gradient(135deg, #c23b78, #d95c92)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
        Composer votre e-mail
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Message principal */}
        <div>
          <label className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#c23b78" }}>
            <MessageSquare className="h-4 w-4" />
            Message principal <span className="text-xs">*</span>
          </label>
          <textarea
            {...register('mainMessage', {
              required: 'Le message principal est requis',
              minLength: {
                value: 10,
                message: 'Le message principal doit contenir au moins 10 caractères',
              },
            })}
            placeholder="Décrivez le message que vous souhaitez transmettre..."
            className={`w-full px-5 py-4 rounded-2xl outline-none transition-all duration-200 resize-none ${
              errors.mainMessage ? 'border-2 border-rose-400' : ''
            }`}
            style={{
              background: "#f0e2e6",
              boxShadow: "inset 8px 8px 16px #d0b6be, inset -8px -8px 16px #ffffff",
              color: "#5a2a46"
            }}
            rows={4}
          />
          {errors.mainMessage && (
            <p className="mt-2 text-sm" style={{ color: "#c23b78" }}>{errors.mainMessage.message}</p>
          )}
        </div>

        {/* Ton et Langue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#c23b78" }}>
              <Sparkles className="h-4 w-4" />
              Ton de l'e-mail
            </label>
            <select
              {...register('tone', { required: 'Le ton est requis' })}
              className={`w-full px-5 py-3 rounded-xl outline-none transition-all duration-200 ${
                errors.tone ? 'border-2 border-rose-400' : ''
              }`}
              style={{
                background: "#f0e2e6",
                boxShadow: "inset 5px 5px 12px #d0b6be, inset -5px -5px 12px #ffffff",
                color: "#5a2a46"
              }}
            >
              {tones.map((tone) => (
                <option key={tone.value} value={tone.value} style={{ background: "#f0e2e6" }}>
                  {tone.label}
                </option>
              ))}
            </select>
            {errors.tone && <p className="mt-1 text-sm" style={{ color: "#c23b78" }}>{errors.tone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#c23b78" }}>
              <Languages className="h-4 w-4" />
              Langue de sortie
            </label>
            <select
              {...register('language', { required: 'La langue est requise' })}
              className={`w-full px-5 py-3 rounded-xl outline-none transition-all duration-200 ${
                errors.language ? 'border-2 border-rose-400' : ''
              }`}
              style={{
                background: "#f0e2e6",
                boxShadow: "inset 5px 5px 12px #d0b6be, inset -5px -5px 12px #ffffff",
                color: "#5a2a46"
              }}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} style={{ background: "#f0e2e6" }}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            {errors.language && (
              <p className="mt-1 text-sm" style={{ color: "#c23b78" }}>{errors.language.message}</p>
            )}
          </div>
        </div>

        {/* Informations destinataire */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "#f0e2e6",
            boxShadow: "10px 10px 20px #d0b6be, -10px -10px 20px #ffffff",
          }}
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "#c23b78" }}>
            <User className="h-5 w-5" />
            Informations sur le destinataire
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-2 flex items-center gap-1" style={{ color: "#d95c92" }}>
                <AtSign className="h-3 w-3" />
                Nom du destinataire
              </label>
              <input
                type="text"
                {...register('recipientName')}
                placeholder="Marie Dubois, M. Martin..."
                className="w-full px-4 py-2 rounded-xl outline-none transition-all duration-200"
                style={{
                  background: "#f0e2e6",
                  boxShadow: "inset 5px 5px 12px #d0b6be, inset -5px -5px 12px #ffffff",
                  color: "#5a2a46"
                }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "#d95c92" }}>Genre</label>
              <select
                {...register('recipientGender')}
                className="w-full px-4 py-2 rounded-xl outline-none transition-all duration-200"
                style={{
                  background: "#f0e2e6",
                  boxShadow: "inset 5px 5px 12px #d0b6be, inset -5px -5px 12px #ffffff",
                  color: "#5a2a46"
                }}
              >
                {genders.map((gender) => (
                  <option key={gender.value} value={gender.value} style={{ background: "#f0e2e6" }}>
                    {gender.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold mb-2 flex items-center gap-1" style={{ color: "#d95c92" }}>
              <Briefcase className="h-3 w-3" />
              Titre/Poste
            </label>
            <input
              type="text"
              {...register('recipientTitle')}
              placeholder="Directeur RH, Dr., Prof..."
              className="w-full px-4 py-2 rounded-xl outline-none transition-all duration-200"
              style={{
                background: "#f0e2e6",
                boxShadow: "inset 5px 5px 12px #d0b6be, inset -5px -5px 12px #ffffff",
                color: "#5a2a46"
              }}
            />
          </div>
        </div>

        {/* Email de réponse */}
        <div>
          <label className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#c23b78" }}>
            <Mail className="h-4 w-4" />
            E-mail auquel vous répondez <span className="text-xs font-normal">(optionnel)</span>
          </label>
          <textarea
            {...register('replyToEmail')}
            placeholder="Collez ici l'e-mail original si vous répondez à un message..."
            className="w-full px-5 py-3 rounded-xl outline-none transition-all duration-200 resize-none"
            style={{
              background: "#f0e2e6",
              boxShadow: "inset 8px 8px 16px #d0b6be, inset -8px -8px 16px #ffffff",
              color: "#5a2a46"
            }}
            rows={3}
          />
        </div>

        {/* Bouton génération */}
        <motion.button
          type="submit"
          disabled={isGenerating}
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          className="w-full py-4 px-4 rounded-2xl font-bold text-lg relative overflow-hidden transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "#f0e2e6",
            boxShadow: "12px 12px 24px #d0b6be, -12px -12px 24px #ffffff",
            color: "#c23b78"
          }}
        >
          <div className="flex items-center justify-center gap-3 relative z-10">
            {isGenerating ? (
              <>
                <motion.div 
                  className="rounded-full h-5 w-5 border-2"
                  style={{ borderColor: "#c23b78", borderTopColor: "transparent" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                <span>Génération en cours...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Générer l'e-mail</span>
                <Sparkles className="h-4 w-4" />
              </>
            )}
          </div>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EmailForm;