import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertCalculationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead routes
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.json(lead);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/leads/:id", async (req, res) => {
    try {
      const lead = await storage.getLead(req.params.id);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      res.json(lead);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Calculation routes
  app.post("/api/calculations", async (req, res) => {
    try {
      const validatedData = insertCalculationSchema.parse(req.body);
      const calculation = await storage.createCalculation(validatedData);
      res.json(calculation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/calculations/:id", async (req, res) => {
    try {
      const calculation = await storage.getCalculation(req.params.id);
      if (!calculation) {
        return res.status(404).json({ error: "Calculation not found" });
      }
      res.json(calculation);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
