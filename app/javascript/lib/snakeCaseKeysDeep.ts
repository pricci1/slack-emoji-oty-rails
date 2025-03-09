import { snakeCase } from "es-toolkit/string";
import type { SnakeCasedPropertiesDeep } from "type-fest";

export function snakeCaseKeysDeep<T extends object>(obj: T): SnakeCasedPropertiesDeep<T> {
  if (Array.isArray(obj)) {
    return obj.map(snakeCaseKeysDeep) as SnakeCasedPropertiesDeep<T>;
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    const snakeCaseKey = snakeCase(key);
    acc[snakeCaseKey] = value && typeof value === "object" ? snakeCaseKeysDeep(value) : value;
    return acc;
  }, {} as any);
}
