import { Component, inject } from '@angular/core';
import { LoadingServiceService } from '../../../../core/services/loding/loading-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  imports: [CommonModule],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss',
})
export class LoadingScreenComponent {
  loading$ = inject(LoadingServiceService).loading$;
}
