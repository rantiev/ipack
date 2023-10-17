import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'progressColor'
})
export class ProgressColorPipe implements PipeTransform {
  transform(x: number): string {
    return x <= 0.5 ? 'success' : x <= 0.85 ? 'warning' : 'danger'
  }
}
