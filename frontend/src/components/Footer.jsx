import { Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="copyright">© 2025 Arvid Back</div>

          <div className="links">
            <Link
              to="/datenschutzerklärung"
              className={`link ${location.pathname === '/datenschutzerklärung' ? 'active-link' : ''}`}
            >
              Datenschutzerklärung
            </Link>
            <Link
              to="/impressum"
              className={`link ${location.pathname === '/impressum' ? 'active-link' : ''}`}
            >
              Impressum
            </Link>
          </div>

          <div className="social-icons">
            <a href="#" className="social-link">
              <Github className="icon" />
            </a>
            <a href="#" className="social-link">
              <Linkedin className="icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
