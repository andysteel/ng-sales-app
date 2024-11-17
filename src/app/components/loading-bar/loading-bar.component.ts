import { Component, input } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: "loading-bar",
  standalone: true,
  imports: [MatProgressBarModule],
  template: `
    @if (visible()) {
      <mat-progress-bar color="primary" mode="indeterminate"></mat-progress-bar>
    }
  `,
  styles: ``,
})
export class LoadingBarComponent {
  visible = input<boolean>(false);
}
