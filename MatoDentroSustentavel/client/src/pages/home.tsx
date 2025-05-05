import { useState } from "react";
import { Link } from "wouter";
import { Leaf, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { insertCommunityMemberSchema, type InsertCommunityMember } from "@shared/schema";

// Category data
const categories = [
  { 
    id: "artesanato", 
    title: "Artesanato", 
    description: "Descubra produtos artesanais criados por artistas e artesãos locais, incluindo peças decorativas, tecidos e mais.",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: "alimentacao", 
    title: "Alimentação", 
    description: "Produtos alimentícios caseiros e artesanais, como pães, queijos, geleias, conservas e outros itens produzidos localmente.",
    imageUrl: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: "servicos", 
    title: "Serviços", 
    description: "Prestadores de serviços da região, incluindo reparos, construção, jardinagem, limpeza e diversos serviços para sua casa e propriedade.",
    imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: "agricultura", 
    title: "Agricultura", 
    description: "Produtores de frutas, verduras, legumes e outros produtos agrícolas produzidos com carinho em nossa região.",
    imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: "outros", 
    title: "Outros", 
    description: "Outras habilidades, talentos e ofertas que não se encaixam nas categorias anteriores, como aulas, consultoria e mais.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  }
];

// Extended form validation schema
const formSchema = insertCommunityMemberSchema.extend({
  termsAccepted: insertCommunityMemberSchema.shape.termsAccepted
});

export default function Home() {
  const { toast } = useToast();
  
  // Form setup
  const form = useForm<InsertCommunityMember>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      category: "",
      offering: "",
      phone: "",
      email: "",
      termsAccepted: false,
    },
  });

  // Members query
  const { data: members = [] } = useQuery({
    queryKey: ['/api/members'],
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: InsertCommunityMember) => {
      const res = await apiRequest("POST", "/api/members", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Em breve entraremos em contato com você.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erro ao cadastrar",
        description: error.message || "Ocorreu um erro ao processar seu cadastro. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const onSubmit = (data: InsertCommunityMember) => {
    registerMutation.mutate(data);
  };

  // Phone input mask handler
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 2 && value.length <= 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }
    
    form.setValue('phone', value);
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="bg-pattern py-10 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-[hsl(var(--primary))] mb-6">
              Bem-vindo ao Mato Dentro Sustentável
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              Uma iniciativa para conectar moradores e fortalecer nossa comunidade rural em expansão. Juntos, podemos criar um futuro sustentável para nossa região.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Button 
                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white py-3 px-6 h-auto"
                size="lg"
              >
                Cadastre-se
              </Button>
              <Button 
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="bg-white hover:bg-neutral-100 text-[hsl(var(--primary))] border-2 border-[hsl(var(--primary))] py-3 px-6 h-auto"
                size="lg"
              >
                Explorar Categorias
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-[hsl(var(--primary))]">Sobre o Projeto</h2>
              <div className="w-16 h-1 bg-[hsl(var(--secondary))] mx-auto mt-4 mb-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="Comunidade rural com pessoas trabalhando juntas" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading text-xl md:text-2xl font-semibold mb-4 text-[hsl(var(--primary-dark))]">Nossa Missão</h3>
                <p className="mb-4 leading-relaxed">
                  O <strong>Mato Dentro Sustentável</strong> nasceu da necessidade de unir os moradores da região rural de Mato Dentro, que atualmente passa por uma expansão com a construção de novos condomínios residenciais.
                </p>
                <p className="mb-4 leading-relaxed">
                  Nosso objetivo é criar uma rede de apoio comunitário, promovendo produtores e serviços locais, além de organizar ações coletivas para preservação ambiental e melhoria da qualidade de vida de todos.
                </p>
                
                <h3 className="font-heading text-xl md:text-2xl font-semibold mb-4 mt-6 text-[hsl(var(--primary-dark))]">Nossos Objetivos</h3>
                <ul className="space-y-2">
                  {[
                    "Conectar moradores antigos e novos da região",
                    "Promover produtos e serviços locais",
                    "Organizar ações de restauração ambiental",
                    "Facilitar compras coletivas e mutirões",
                    "Promover a sustentabilidade local"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-[hsl(var(--secondary))] h-5 w-5 mr-2 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-[hsl(var(--primary))]">Categorias</h2>
            <div className="w-16 h-1 bg-[hsl(var(--secondary))] mx-auto mt-4 mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed">
              Explore os serviços e produtos disponíveis em nossa comunidade. Clique em uma categoria para ver mais detalhes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((category) => (
              <Card key={category.id} className="overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <img 
                  src={category.imageUrl} 
                  alt={`${category.title} - ${category.description}`} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-xl text-[hsl(var(--primary))] mb-2">{category.title}</h3>
                  <p className="text-neutral-800 mb-4">
                    {category.description}
                  </p>
                  <Link 
                    href={`/categorias/${category.id}`}
                    className="inline-flex items-center text-[hsl(var(--primary))] font-medium hover:text-[hsl(var(--primary-dark))]"
                  >
                    Ver detalhes <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Register Section */}
      <section id="register" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-[hsl(var(--primary))]">Cadastre-se na Comunidade</h2>
              <div className="w-16 h-1 bg-[hsl(var(--secondary))] mx-auto mt-4 mb-6"></div>
              <p className="max-w-2xl mx-auto text-lg leading-relaxed">
                Faça parte da comunidade Mato Dentro Sustentável. Preencha o formulário abaixo para se registrar.
              </p>
            </div>

            <Card className="bg-neutral-50 shadow-md rounded-lg">
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-800 font-medium">Nome Completo *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Digite seu nome completo" 
                              {...field} 
                              className="px-4 py-3 h-auto"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-800 font-medium">Localização (Bairro/Região) *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Condomínio Vale Encantado, Sítio São José" 
                              {...field} 
                              className="px-4 py-3 h-auto"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-800 font-medium">Categoria *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-3 h-auto">
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="artesanato">Artesanato</SelectItem>
                              <SelectItem value="alimentacao">Alimentação</SelectItem>
                              <SelectItem value="servicos">Serviços</SelectItem>
                              <SelectItem value="agricultura">Agricultura</SelectItem>
                              <SelectItem value="outros">Outros</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="offering"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-800 font-medium">O que você oferece? *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva os produtos ou serviços que você oferece à comunidade" 
                              {...field} 
                              className="px-4 py-3 min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-800 font-medium">Telefone/WhatsApp *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(XX) XXXXX-XXXX" 
                              {...field} 
                              onChange={(e) => {
                                field.onChange(e);
                                handlePhoneInput(e);
                              }}
                              className="px-4 py-3 h-auto"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-800 font-medium">Email (opcional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="seu@email.com" 
                              type="email"
                              className="px-4 py-3 h-auto"
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-8">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-neutral-700">
                              Concordo com o compartilhamento dos meus dados de contato com os membros da comunidade Mato Dentro Sustentável *
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="text-center">
                      <Button 
                        type="submit" 
                        className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white font-medium py-3 px-6 h-auto min-w-[200px]"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "Enviando..." : "Cadastrar"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-[hsl(var(--primary))]">Entre em Contato</h2>
              <div className="w-16 h-1 bg-[hsl(var(--secondary))] mx-auto mt-4 mb-6"></div>
              <p className="max-w-2xl mx-auto text-lg leading-relaxed mb-6">
                Para ajuda ou dúvidas sobre o projeto, entre em contato conosco pelo WhatsApp:
              </p>
              
              <a 
                href="https://wa.me/5515991268056" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center bg-[#25D366] text-white py-3 px-6 rounded-lg hover:bg-[#128C7E] transition duration-300 font-medium shadow-md"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-2"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                  <path d="M9 10a1 1 0 0 0 1 1"/>
                  <path d="M14 10a1 1 0 0 0 1 1"/>
                </svg>
                (15) 99126-8056
              </a>
              
              <p className="mt-8 text-neutral-700">
                Ou envie uma mensagem através dos nossos canais nas redes sociais:
              </p>
              
              <div className="flex justify-center space-x-6 mt-4">
                <a href="#" className="text-3xl text-neutral-800 hover:text-[hsl(var(--primary))] transition duration-300">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="36" 
                    height="36" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" className="text-3xl text-neutral-800 hover:text-[hsl(var(--primary))] transition duration-300">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="36" 
                    height="36" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
