import { useLang } from '@/hooks/useLang'
import AuthPopupClose from './AuthPopupClose'

const AuthPopupRegistration = () => {
  const { lang, translations } = useLang()

  return (
    <div>
      <AuthPopupClose />
      <div className='card-body wow-bg'>
        <h3 className='card-body__title'>
          {translations[lang].auth_popup.registration_title}
        </h3>

        <p className='card-body__description'>
          {translations[lang].auth_popup.registration_description}
        </p>
      </div>
    </div>
  )
}

export default AuthPopupRegistration
