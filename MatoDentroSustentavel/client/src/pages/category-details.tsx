import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { CommunityMember } from "@shared/schema";

// Category data
const categories = {
  artesanato: { 
    title: "Artesanato", 
    description: "Produtos artesanais criados por artistas e artesãos locais, incluindo peças decorativas, tecidos e mais.",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  alimentacao: { 
    title: "Alimentação", 
    description: "Produtos alimentícios caseiros e artesanais, como pães, queijos, geleias, conservas e outros itens produzidos localmente.",
    imageUrl: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  servicos: { 
    title: "Serviços", 
    description: "Prestadores de serviços da região, incluindo reparos, construção, jardinagem, limpeza e diversos serviços para sua casa e propriedade.",
    imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  agricultura: { 
    title: "Agricultura", 
    description: "Produtores de frutas, verduras, legumes e outros produtos agrícolas produzidos com carinho em nossa região.",
    imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  outros: { 
    title: "Outros", 
    description: "Outras habilidades, talentos e ofertas que não se encaixam nas categorias anteriores, como aulas, consultoria e mais.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  }
};

export default function CategoryDetails() {
  const { categoryId } = useParams();
  const categoryInfo = categoryId && categories[categoryId as keyof typeof categories];
  
  // Get members in this category
  const { data: members = [], isLoading } = useQuery<CommunityMember[]>({
    queryKey: ['/api/members/category', categoryId],
  });

  if (!categoryInfo) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-[hsl(var(--primary))] mb-4">
            Categoria não encontrada
          </h1>
          <p className="mb-6">A categoria solicitada não existe ou foi removida.</p>
          <Link href="/#categories" className="inline-block">
            <Button className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para categorias
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <Link href="/#categories" className="inline-block">
          <Button variant="link" className="mb-6 pl-0 text-[hsl(var(--primary))]">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para categorias
          </Button>
        </Link>
        
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <img 
              src={categoryInfo.imageUrl} 
              alt={categoryInfo.title} 
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div>
            <h1 className="font-heading font-bold text-2xl md:text-4xl text-[hsl(var(--primary))] mb-4">
              {categoryInfo.title}
            </h1>
            <p className="text-lg leading-relaxed mb-6">
              {categoryInfo.description}
            </p>
            <Link href="/#register" className="inline-block">
              <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white">
                Cadastre-se nesta categoria
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="my-8">
          <h2 className="font-heading font-bold text-2xl text-[hsl(var(--primary))] mb-6">
            Membros e serviços nesta categoria
          </h2>
          
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[hsl(var(--primary))] border-r-transparent"></div>
              <p className="mt-4">Carregando membros...</p>
            </div>
          )}
          
          {!isLoading && members.length === 0 && (
            <Card className="border border-dashed border-gray-300 bg-gray-50">
              <CardContent className="py-12 text-center">
                <p className="text-neutral-600 mb-4">
                  Ainda não temos membros cadastrados nesta categoria.
                </p>
                <Link href="/#register" className="inline-block">
                  <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white mt-2">
                    Seja o primeiro a se cadastrar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
          
          {!isLoading && members.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {members.map((member) => (
                <Card key={member.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-xl mb-2">{member.name}</h3>
                    <p className="text-sm text-neutral-500 mb-1">
                      <span className="font-medium">Localização:</span> {member.location}
                    </p>
                    <p className="text-sm text-neutral-500 mb-4">
                      <span className="font-medium">Contato:</span> {member.phone}
                      {member.email && ` • ${member.email}`}
                    </p>
                    <div className="border-t pt-3 mt-3">
                      <p className="text-neutral-700">{member.offering}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
