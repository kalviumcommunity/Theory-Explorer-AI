import { Category } from "../models/Category.js";

export class CategoryService {
  static async getAll() {
    return await Category.find().sort({ name: 1 });
  }
}
