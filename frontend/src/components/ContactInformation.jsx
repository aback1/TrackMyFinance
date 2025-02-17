export default function ContactInformation() {
  return (
    <section className="contact-section">
      <h1 className="section-heading">Kontaktinformationen</h1>
      <div className="content-section">
        <p>
          Bei Fragen oder Anliegen können Sie uns gerne über die folgenden
          Kontaktdaten erreichen:
        </p>

        <h2 className="content-heading">E-Mail</h2>
        <p>
          <strong>E-Mail-Adresse:</strong>{' '}
          <a href="mailto:arvidback@gmx.de" className="content-link">
            arvidback@gmx.de
          </a>
        </p>

        <h2 className="content-heading">Adresse</h2>
        <p>
          <strong>Name:</strong> Arvid Back
          <br />
          <strong>Straße und Hausnummer:</strong> Papenmoorweg 72
          <br />
          <strong>Postleitzahl und Ort:</strong> 25469 Halstenbek
          <br />
          <strong>Land:</strong> Deutschland
        </p>

        <h2 className="content-heading">Telefon</h2>
        <p>
          <strong>Telefonnummer:</strong>{' '}
          <a href="tel:+4915737229499" className="content-link">
            +49 1573 7229499
          </a>
        </p>
      </div>
    </section>
  );
}
