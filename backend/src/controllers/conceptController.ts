import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import { ConceptService } from "../services/conceptService.js";
import { KnowledgeGraphService } from "../services/knowledge/KnowledgeGraphService.js";

export const getConcepts = catchAsync(async (req: Request, res: Response) => {
  const data = await ConceptService.getAll(req.query);
  sendSuccess(res, data);
});

export const getConcept = catchAsync(async (req: Request, res: Response) => {
  const concept = await ConceptService.getBySlug(req.params.slug as string);
  sendSuccess(res, { concept });
});

export const getGraph = catchAsync(async (req: Request, res: Response) => {
  const graph = await KnowledgeGraphService.getGlobalGraph();
  sendSuccess(res, graph);
});
