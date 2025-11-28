import { NgModule } from "@angular/core";
import { PokeCatalog } from "./components/poke-catalog/poke-catalog";
import { RouterModule } from "@angular/router";
import { CATALOG_ROUTES } from "./catalog.routes";

@NgModule({
    imports: [
        RouterModule.forChild(CATALOG_ROUTES)
    ],
    declarations: [PokeCatalog],
})
export class CatalogModule {}