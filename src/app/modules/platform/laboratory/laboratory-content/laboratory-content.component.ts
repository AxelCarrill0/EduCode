import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

interface Language {
  value: string;
  label: string;
  icon: string;
  template: string;
}

interface ConsoleLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'info';
}

@Component({
  selector: 'app-laboratory-content',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule],
  templateUrl: './laboratory-content.component.html',
  styleUrl: './laboratory-content.component.scss'
})
export class LaboratoryContentComponent {
  languages: Language[] = [
    {
      value: 'python',
      label: 'Python',
      icon: 'pi pi-python',
      template: `# Escribe tu código aquí

print("Hola, mundo!")`
    },
    {
      value: 'javascript',
      label: 'JavaScript',
      icon: 'pi pi-code',
      template: `// Escribe tu código aquí

console.log("Hola, mundo!");`
    },
    {
      value: 'java',
      label: 'Java',
      icon: 'pi pi-cog',
      template: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hola, mundo!");
    }
}`
    },
    {
      value: 'cpp',
      label: 'C++',
      icon: 'pi pi-cog',
      template: `#include <iostream>
using namespace std;

int main() {
    cout << "Hola, mundo!" << endl;
    return 0;
}`
    }
  ];

  selectedLanguage = 'python';
  langOpen = false;
  code = this.getCurrentTemplate();
  codeLines: number[] = [];
  consoleLines: ConsoleLine[] = [
    { text: 'Laboratorio listo. Selecciona un lenguaje y escribe tu código.', type: 'info' }
  ];
  isRunning = false;

  constructor() {
    this.updateCodeLines();
  }

  get currentLang(): Language {
    return this.languages.find(l => l.value === this.selectedLanguage)!;
  }

  getCurrentTemplate(): string {
    return this.currentLang.template;
  }

  updateCodeLines(): void {
    const count = this.code.split('\n').length;
    this.codeLines = Array.from({ length: count }, (_, i) => i + 1);
  }

  selectLanguage(value: string): void {
    this.selectedLanguage = value;
    this.onLanguageChange();
  }

  onLanguageChange(): void {
    this.code = this.getCurrentTemplate();
    this.updateCodeLines();
    this.consoleLines = [
      { text: `Lenguaje cambiado a ${this.currentLang.label}.`, type: 'info' }
    ];
  }

  execute(): void {
    if (this.isRunning) return;
    this.isRunning = true;

    this.consoleLines = [];
    this.simulateTyping([
      { text: `Ejecutando ${this.currentLang.label.toLowerCase()} main...`, type: 'input', delay: 100 },
      { text: 'Compilando...', type: 'input', delay: 350 },
      { text: 'Hola, mundo!', type: 'output', delay: 650 },
      { text: '', type: 'info', delay: 850 },
      { text: `Proceso finalizado en 0.24s`, type: 'info', delay: 900 },
      { text: `Salida: 0`, type: 'info', delay: 1050 },
    ]);
  }

  private simulateTyping(lines: { text: string; type: ConsoleLine['type']; delay: number }[]): void {
    lines.forEach((line, i) => {
      setTimeout(() => {
        this.consoleLines = [...this.consoleLines, { text: line.text, type: line.type }];
        if (line.text.includes('Salida')) {
          this.isRunning = false;
        }
      }, line.delay);
    });
  }

  clearConsole(): void {
    this.consoleLines = [
      { text: 'Consola limpiada.', type: 'info' }
    ];
  }

  get hasErrors(): boolean {
    return this.consoleLines.some(l => l.type === 'error');
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.langOpen = false;
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      this.execute();
    }
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.langOpen && !target.closest('.lang-selector')) {
      this.langOpen = false;
    }
  }
}
