import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCommunityMemberSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for community members
  app.get("/api/members", async (_req: Request, res: Response) => {
    try {
      const members = await storage.getAllMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching members:", error);
      res.status(500).json({ message: "Erro ao buscar membros" });
    }
  });

  app.get("/api/members/category/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const members = await storage.getMembersByCategory(category);
      res.json(members);
    } catch (error) {
      console.error(`Error fetching members by category ${req.params.category}:`, error);
      res.status(500).json({ message: "Erro ao buscar membros por categoria" });
    }
  });

  app.get("/api/members/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }
      
      const member = await storage.getMember(id);
      if (!member) {
        return res.status(404).json({ message: "Membro não encontrado" });
      }
      
      res.json(member);
    } catch (error) {
      console.error(`Error fetching member ${req.params.id}:`, error);
      res.status(500).json({ message: "Erro ao buscar membro" });
    }
  });

  app.post("/api/members", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const parseResult = insertCommunityMemberSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        const validationError = fromZodError(parseResult.error);
        return res.status(400).json({ 
          message: "Dados inválidos", 
          errors: validationError.details 
        });
      }
      
      // Check terms acceptance
      if (!parseResult.data.termsAccepted) {
        return res.status(400).json({ 
          message: "Você precisa aceitar os termos para continuar" 
        });
      }
      
      // Create member
      const newMember = await storage.createMember(parseResult.data);
      res.status(201).json(newMember);
    } catch (error) {
      console.error("Error creating member:", error);
      res.status(500).json({ message: "Erro ao cadastrar membro" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
