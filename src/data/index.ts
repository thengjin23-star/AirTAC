import taxonomy from './category-taxonomy.json';
import sharedOptions from './shared-options.json';
import catalogFluid from './catalog-fluid-valves.json';
import catalogSolenoid from './catalog-solenoid-valves.json';
import catalogActuators from './catalog-actuators.json';
import catalogAirPrep from './catalog-air-prep.json';import catalogAuxiliary from './catalog-auxiliary.json';
import type { CatalogSeries, CatalogCategory, CatalogOption } from './types';

// Extract options from sharedOptions using object path (e.g. "voltageOptions.standard5")
function resolveOptions(ref: string): CatalogOption[] {
  const parts = ref.split('.');
  let current: any = sharedOptions;
  for (const part of parts) {
    if (current && current[part]) {
      current = current[part];
    } else {
      return [];
    }
  }
  return current as CatalogOption[];
}

const rawCatalogs = [
  ...(catalogFluid.series || catalogFluid),
  ...(catalogSolenoid.series || catalogSolenoid),
  ...(catalogActuators.series || catalogActuators),
  ...(catalogAirPrep.series || catalogAirPrep),  ...(catalogAuxiliary.series || catalogAuxiliary)
] as any[];

export const defaultCatalog: CatalogSeries[] = rawCatalogs.map(series => {
  return {
    ...series,
    categories: series.categories?.map((cat: any) => {
      if (cat.optionsRef) {
        return {
          ...cat,
          options: resolveOptions(cat.optionsRef)
        };
      }
      return cat;
    }) || []
  };
});

export { CatalogSeries, CatalogCategory, CatalogOption };
