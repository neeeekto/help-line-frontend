import { Component } from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'admin';
  timer = 0;

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.timer += 1;
    })
  }
}
