import { Routes } from "@angular/router";
import { PokeDetail } from "./components/poke-detail/poke-detail";


export const DETAIL_ROUTES: Routes = [
    {
        path: ':id',
        component: PokeDetail
    }
];