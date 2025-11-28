import { Routes } from "@angular/router";
import { PokeCatalog } from "./components/poke-catalog/poke-catalog";

export const CATALOG_ROUTES: Routes = [
    {
        path: '',
        component: PokeCatalog
    }
];