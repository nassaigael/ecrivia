import React from 'react';
import { useForm } from 'react-hook-form';
import { Bot, Globe, User, Sparkles } from 'lucide-react';

const EmailForm = ({ formData, setFormData, handleGenerateEmail, isGenerating, tones, languages, genders }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    setFormData(data);
    handleGenerateEmail();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Bot className="h-6 w-6 text-blue-600" />
        Composer votre e-mail
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message principal *</label>
          <textarea
            {...register('mainMessage', {
              required: 'Le message principal est requis',
              minLength: {
                value: 10,
                message: 'Le message principal doit contenir au moins 10 caractères',
              },
            })}
            placeholder="Décrivez le message que vous souhaitez transmettre..."
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              errors.mainMessage ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
          />
          {errors.mainMessage && (
            <p className="mt-1 text-sm text-red-600">{errors.mainMessage.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ton de l'e-mail</label>
            <select
              {...register('tone', { required: 'Le ton est requis' })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.tone ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {tones.map((tone) => (
                <option key={tone.value} value={tone.value}>
                  {tone.label}
                </option>
              ))}
            </select>
            {errors.tone && <p className="mt-1 text-sm text-red-600">{errors.tone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Langue de sortie
            </label>
            <select
              {...register('language', { required: 'La langue est requise' })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.language ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            {errors.language && (
              <p className="mt-1 text-sm text-red-600">{errors.language.message}</p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-gray-600" />
            Informations sur le destinataire
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du destinataire
              </label>
              <input
                type="text"
                {...register('recipientName')}
                placeholder="Marie Dubois, M. Martin..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
              <select
                {...register('recipientGender')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {genders.map((gender) => (
                  <option key={gender.value} value={gender.value}>
                    {gender.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre/Poste</label>
            <input
              type="text"
              {...register('recipientTitle')}
              placeholder="Directeur RH, Dr., Prof..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-mail auquel vous répondez (optionnel)
          </label>
          <textarea
            {...register('replyToEmail')}
            placeholder="Collez ici l'e-mail original si vous répondez à un message..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Génération en cours...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Générer l'e-mail
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EmailForm;