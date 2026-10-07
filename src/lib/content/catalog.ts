import generated from "@/data/generated/catalog.json";
import type { ApiResponse } from "@/types/content";
export const response = generated as ApiResponse;
export const catalog = response.catalog;
