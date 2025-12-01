/*
 * Public API Surface of domain
 */

// Models
export * from './lib/models/pokemon.model';
export * from './lib/models/pokemon-detail.model';

// Ports (internal - for infra adapters only)
export * from './lib/ports/pokemon.repository';
export * from './lib/ports/pokemon-detail.repository';

// Services (public - for UI/app components)
export * from './lib/services/comparison.service';
export * from './lib/services/pokemon-catalog.service';
export * from './lib/services/pokemon-detail.service';
