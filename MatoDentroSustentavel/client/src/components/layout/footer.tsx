import { Link } from "wouter";
import { Logo } from "@/components/ui/logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[hsl(var(--primary-dark))] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <Logo />
            </div>
            <p className="mt-2 text-center md:text-left text-neutral-200 text-sm">
              Unindo nossa comunidade, fortalecendo o futuro
            </p>
          </div>
          
          <div>
            <ul className="flex flex-wrap justify-center space-x-4">
              <li>
                <Link 
                  href="/#home"
                  className="hover:text-[hsl(var(--secondary))] transition duration-200"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link 
                  href="/#about"
                  className="hover:text-[hsl(var(--secondary))] transition duration-200"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link 
                  href="/#categories"
                  className="hover:text-[hsl(var(--secondary))] transition duration-200"
                >
                  Categorias
                </Link>
              </li>
              <li>
                <Link 
                  href="/#register"
                  className="hover:text-[hsl(var(--secondary))] transition duration-200"
                >
                  Cadastre-se
                </Link>
              </li>
              <li>
                <Link 
                  href="/#contact"
                  className="hover:text-[hsl(var(--secondary))] transition duration-200"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-[hsl(var(--primary))] text-center">
          <p className="text-sm text-neutral-300">
            &copy; {currentYear} Mato Dentro Sustentável. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
