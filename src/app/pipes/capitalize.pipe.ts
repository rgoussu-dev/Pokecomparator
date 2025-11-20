import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Handle special cases
    const specialCases: { [key: string]: string } = {
      'mr-mime': 'Mr. Mime',
      'ho-oh': 'Ho-Oh',
      'porygon-z': 'Porygon-Z',
      'nidoran-f': 'Nidoran ♀',
      'nidoran-m': 'Nidoran ♂'
    };

    if (specialCases[value.toLowerCase()]) {
      return specialCases[value.toLowerCase()];
    }

    // Standard capitalization: split by hyphen, capitalize each word
    return value
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
