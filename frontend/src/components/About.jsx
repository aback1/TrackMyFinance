import React from 'react';

export default function About() {
  return (
    <div className="about-container">
      <h1>Über unsere Finance-Tracker-App</h1>
      <p>
        Willkommen bei unserer Finance-Tracker-App! Mit dieser App können Sie
        Ihre Finanzen einfach und effizient verwalten. Hier ist eine kurze
        Anleitung, wie Sie die App verwenden können:
      </p>

      <h2>Aktueller Monat</h2>
      <p>
        Die App zeigt standardmäßig den aktuellen Monat an. Sie können Ihr
        Einkommen und Ihre Ausgaben für diesen Monat erfassen und verwalten.
      </p>

      <h2>Einkommen und Ausgaben auflisten</h2>
      <p>
        Tragen Sie Ihre Einnahmen und Ausgaben in die entsprechenden Felder ein.
        Die App berechnet automatisch Ihr Budget und zeigt Ihnen an, wie viel
        Sie noch ausgeben können.
      </p>

      <h2>Einloggen und Daten speichern</h2>
      <p>
        Um Ihre Daten zu speichern und später wieder aufzurufen, können Sie sich
        einfach einloggen. Es ist keine E-Mail-Adresse erforderlich! Wenn Sie
        keinen eigenen Account erstellen möchten, können Sie sich gerne mit den
        folgenden Testdaten einloggen:
      </p>
      <p>
        <strong>Benutzername:</strong> John Doe
        <br />
        <strong>Passwort:</strong> peppermint
      </p>

      <h2>Ausgabenstatistik und Vergleich</h2>
      <p>
        Sobald Sie eingeloggt sind, können Sie Ihre Ausgabenstatistik hochladen
        und mit vergangenen Monaten vergleichen. Die App zeigt Ihnen, wie sich
        Ihre Ausgaben entwickelt haben und wie der durchschnittliche Haushalt im
        Vergleich abschneidet.
      </p>

      <p>
        Wir hoffen, dass Ihnen unsere App dabei hilft, Ihre Finanzen besser zu
        planen und Geld zu sparen. Viel Spaß beim Nutzen!
      </p>
    </div>
  );
}
