import CookieConsent from "react-cookie-consent";

const CookieConsentDialog = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accepter"
      declineButtonText="Refuser"
      enableDeclineButton
      cookieName="mySiteCookieConsent"
      style={{ background: "#6f3434", fontSize: "16px" }}
      buttonStyle={{ background: "#00b894", color: "#fff" }}
      expires={150}
      onAccept={() => {
        // L'utilisateur a accepté
      }}
      onDecline={() => {
        // L'utilisateur a refusé
      }}
    >
      Ce site Web utilise des cookies qui aident le site Web à fonctionner et à
      suivre comment vous interagissez avec lui afin que nous puissions vous
      offrir une expérience utilisateur améliorée et personnalisée. Nous
      n'utiliserons les cookies que si vous y consentez en cliquant sur Accepter
    </CookieConsent>
  );
};

export default CookieConsentDialog;
