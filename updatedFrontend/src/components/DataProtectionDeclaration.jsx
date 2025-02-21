import '../styles/DataProtectionDeclaration.css';
export default function DataProtectionDeclaration() {
    return (
        <section className="data-protection-section">
            <div className="content-section">
                <h1>Datenschutzerklärung</h1>
                <p>
                    <strong>
                        Verantwortlicher gem. Art. 4 Abs. 7 EU Datenschutzgrundverordnung
                        (DSGVO) ist:
                    </strong>
                </p>
                <p>
                    Arvid Back
                    <br />
                    Papenmoorweg 72
                    <br />
                    25469 Halstenbek
                </p>
                <p>
                    Fragen zum Thema Datenschutz können Sie an unseren
                    Datenschutzbeauftragten richten:
                </p>
                <p>
                    Arvid Back
                    <br />
                    Der Datenschutzbeauftragte
                    <br />
                    Papenmoorweg 72
                    <br />
                    25469 Halstenbek
                    <br />
                    oder per E-Mail an{' '}
                    <a
                        href="mailto:arvidback@gmx.de"
                        className="text-blue-500 hover:underline"
                    >
                        arvidback@gmx.de
                    </a>
                    .
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">
                    1. Erfassung und Nutzung von Daten
                </h2>
                <p>
                    Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese
                    Datenschutzerklärung erläutert, wie wir Ihre Daten erfassen, verwenden
                    und schützen, wenn Sie unsere App nutzen.
                </p>
                <p>
                    Wir erfassen nur die Daten, die für die Bereitstellung unserer Dienste
                    erforderlich sind. Dazu gehören:
                </p>
                <ul className="list-disc list-inside">
                    <li>Ihr Benutzername für die Registrierung und Anmeldung.</li>
                    <li>
                        Ihr Passwort wird nach aktuellen Sicherheitsstandards verschlüsselt
                        (gehasht) und sicher in unserer Datenbank gespeichert. Als Betreiber
                        haben wir keinen Zugriff auf Ihr Passwort in Klartext, da es nur in
                        seiner verschlüsselten Form vorliegt.
                    </li>
                    <li>
                        Ihre monatlichen Einnahmen und Ausgaben, die jedoch nur über ihren
                        Nutzernamen zuzuordnen sind. Die Angabe einer Emailadresse ist
                        hierbei nicht notwendig.
                    </li>
                    <li>
                        Ihr Einkommen und Ihre Ausgaben aus vergangenen Monaten, welche sie
                        jederzeit löschen können.
                    </li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">
                    2. Weitergabe von Daten
                </h2>
                <p>
                    Ihre Daten werden nicht an Dritte weitergegeben, es sei denn, dies ist
                    gesetzlich vorgeschrieben oder für die Bereitstellung unserer Dienste
                    erforderlich.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">
                    3. Sicherheit Ihrer Daten
                </h2>
                <p>
                    Wir setzen technische und organisatorische Maßnahmen ein, um Ihre
                    Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">4. Ihre Rechte</h2>
                <p>
                    Sie haben das Recht, Auskunft über die von uns gespeicherten Daten zu
                    erhalten, diese zu berichtigen, zu löschen oder die Nutzung
                    einzuschränken. Bei Fragen wenden Sie sich bitte an uns über die oben
                    angegebenen Kontaktdaten.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">
                    5. Änderungen dieser Datenschutzerklärung
                </h2>
                <p>
                    Wir behalten uns vor, diese Datenschutzerklärung anzupassen. Aktuelle
                    Änderungen werden auf dieser Seite veröffentlicht.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">6. Hosting durch HOSTINGER</h2>
                <p>
                    Diese Website wird von der <strong>HOSTINGER operations, UAB

                </strong> gehostet. Für die
                    Nutzung der Hosting-Dienste gelten zusätzlich die
                    Datenschutzbestimmungen von HOSTINGER, die Sie unter folgendem Link
                    einsehen können: {}
                    <a
                        href="https://www.hostinger.com/de/legal/datenschutz-bestimmungen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        HOSTINGER Datenschutzerklärung
                    </a>
                    .
                </p>
            </div>
        </section>
    );
}
