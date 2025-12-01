import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PokeCompare } from "./components/poke-compare/poke-compare";
import { RouterModule } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { COMPARE_ROUTES } from "./compare.routes";
import { 
    POKEMON_DETAIL_REPOSITORY, 
    POKEMON_DETAIL_SERVICE, 
    PokemonDetailService,
    ComparisonService 
} from "@domain/src/public-api";
import { PokeApiDetailAdapter } from "@infra/src/public-api";
import { Box, Center, Cluster, Container, Stack, Frame } from "@ui";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(COMPARE_ROUTES),
        Box,
        Center,
        Cluster,
        Container,
        Stack,
        Frame
    ],
    declarations: [PokeCompare],
    providers: [
        provideHttpClient(),
        // Infrastructure adapter bound to domain port
        { provide: POKEMON_DETAIL_REPOSITORY, useClass: PokeApiDetailAdapter },
        // Domain services (internally inject the repositories)
        ComparisonService,
        { provide: POKEMON_DETAIL_SERVICE, useClass: PokemonDetailService }
    ]
})
export class CompareModule {}