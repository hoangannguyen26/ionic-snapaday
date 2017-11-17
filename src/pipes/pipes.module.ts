import { NgModule } from '@angular/core';
import { DaysAgoPipe } from './days-ago/days-ago';
@NgModule({
	declarations: [DaysAgoPipe],
	imports: [],
	exports: [DaysAgoPipe]
})
export class PipesModule {}
