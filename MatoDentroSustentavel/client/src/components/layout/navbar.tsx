import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const isHomePage = location === "/";

  const navLinks = [
    { text: "Início", action: isHomePage ? () => scrollToSection("home") : () => null, path: isHomePage ? undefined : "/" },
    { text: "Sobre", action: isHomePage ? () => scrollToSection("about") : () => null, path: isHomePage ? undefined : "/#about" },
    { text: "Categorias", action: isHomePage ? () => scrollToSection("categories") : () => null, path: isHomePage ? undefined : "/#categories" },
    { text: "Cadastre-se", action: isHomePage ? () => scrollToSection("register") : () => null, path: isHomePage ? undefined : "/#register" },
    { text: "Contato", action: isHomePage ? () => scrollToSection("contact") : () => null, path: isHomePage ? undefined : "/#contact" },
  ];

  return (
    <header className="bg-[hsl(var(--primary))] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-white focus:outline-none"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link, index) => (
              link.path ? (
                <Link 
                  key={index} 
                  href={link.path}
                  className="hover:text-[hsl(var(--secondary))] transition duration-200 font-medium"
                >
                  {link.text}
                </Link>
              ) : (
                <button 
                  key={index}
                  onClick={link.action}
                  className="hover:text-[hsl(var(--secondary))] transition duration-200 font-medium bg-transparent border-none cursor-pointer"
                >
                  {link.text}
                </button>
              )
            ))}
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t border-[hsl(var(--primary-dark))] mt-3">
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  {link.path ? (
                    <Link 
                      href={link.path}
                      className="block py-2 px-4 hover:bg-[hsl(var(--primary-dark))] rounded transition duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.text}
                    </Link>
                  ) : (
                    <button 
                      onClick={link.action}
                      className="block w-full text-left py-2 px-4 hover:bg-[hsl(var(--primary-dark))] rounded transition duration-200 bg-transparent border-none text-white cursor-pointer"
                    >
                      {link.text}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
