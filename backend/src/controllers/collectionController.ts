import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import { CollectionService } from "../services/collectionService.js";
import type { AuthRequest } from "../middleware/auth.js";

export const getCollections = catchAsync(async (req: AuthRequest, res: Response) => {
  const collections = await CollectionService.getUserCollections(req.user!.id);
  sendSuccess(res, { collections });
});

export const createCollection = catchAsync(async (req: AuthRequest, res: Response) => {
  const collection = await CollectionService.createCollection(req.user!.id, req.body);
  sendSuccess(res, { collection }, "Collection created", 201);
});

export const updateCollection = catchAsync(async (req: AuthRequest, res: Response) => {
  const collection = await CollectionService.updateCollection(req.user!.id, req.params.id as string, req.body);
  sendSuccess(res, { collection }, "Collection updated");
});

export const deleteCollection = catchAsync(async (req: AuthRequest, res: Response) => {
  await CollectionService.deleteCollection(req.user!.id, req.params.id as string);
  sendSuccess(res, null, "Collection deleted");
});

export const addConceptToCollection = catchAsync(async (req: AuthRequest, res: Response) => {
  const collection = await CollectionService.addConcept(req.user!.id, req.params.id as string, req.body.conceptId);
  sendSuccess(res, { collection }, "Concept added to collection");
});

export const removeConceptFromCollection = catchAsync(async (req: AuthRequest, res: Response) => {
  const collection = await CollectionService.removeConcept(req.user!.id, req.params.id as string, req.params.conceptId as string);
  sendSuccess(res, { collection }, "Concept removed from collection");
});
