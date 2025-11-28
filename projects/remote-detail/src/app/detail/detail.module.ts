import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DETAIL_ROUTES } from "./detail.routes";

@NgModule({
    imports: [
        RouterModule.forChild(DETAIL_ROUTES)
    ],
    declarations: [],
})
export class DetailModule {}