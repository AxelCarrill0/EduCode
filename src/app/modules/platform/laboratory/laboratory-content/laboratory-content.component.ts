import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';

interface LabModule {
  id: number;
  name: string;
  icon: string;
  color: string;
  description: string;
  template: string;
}

interface ConsoleLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'info';
}

const MODULES: LabModule[] = [
  {
    id: 0,
    name: 'Introducción a Python',
    icon: 'pi pi-python',
    color: '#10b981',
    description: 'Practica los fundamentos: print(), comentarios y estructura básica.',
    template: `# Práctica: Introducción a Python
# Escribe y ejecuta tu código aquí

# 1. Imprime un saludo
print("Hola, mundo!")

# 2. Imprime tu nombre
print("Mi nombre es EduCode")

# 3. Imprime números y operaciones
print(42)
print(10 + 5)

# 4. Usa print() con múltiples argumentos
print("Python", "es", "genial", sep=" - ")`
  },
  {
    id: 1,
    name: 'Variables',
    icon: 'pi pi-database',
    color: '#3b82f6',
    description: 'Practica la creación y manipulación de variables.',
    template: `# Práctica: Variables
# Escribe y ejecuta tu código aquí

# 1. Crea variables y muéstralas
nombre = "Ana"
edad = 25
print(f"Me llamo {nombre} y tengo {edad} años")

# 2. Intercambia valores
a = 5
b = 10
print(f"Antes: a={a}, b={b}")
a, b = b, a
print(f"Después: a={a}, b={b}")

# 3. Calcula con variables
base = 8
altura = 3
area = base * altura
print(f"Área del rectángulo: {area}")`
  },
  {
    id: 2,
    name: 'Tipos de datos',
    icon: 'pi pi-table',
    color: '#8b5cf6',
    description: 'Experimenta con int, float, str, bool y conversiones.',
    template: `# Práctica: Tipos de Datos
# Escribe y ejecuta tu código aquí

# 1. Identifica tipos
x = 10
y = 3.14
z = "Python"
w = True
print(type(x), type(y), type(z), type(w))

# 2. Conversión de tipos
pi = 3.14159
print(int(pi))
print(float(100))
print(str(42))

# 3. Área de un círculo
radio = 5
area = 3.1416 * radio ** 2
print(f"Área del círculo (radio={radio}): {area:.2f}")`
  },
  {
    id: 3,
    name: 'Operadores',
    icon: 'pi pi-calculator',
    color: '#f59e0b',
    description: 'Practica operadores aritméticos, comparación y lógicos.',
    template: `# Práctica: Operadores
# Escribe y ejecuta tu código aquí

a = 15
b = 4

# 1. Operadores aritméticos
print(f"Suma: {a + b}")
print(f"Resta: {a - b}")
print(f"Multiplicación: {a * b}")
print(f"División: {a / b:.2f}")
print(f"División entera: {a // b}")
print(f"Módulo: {a % b}")
print(f"Potencia: {a ** b}")

# 2. Operadores de comparación
print(f"¿{a} > {b}? {a > b}")
print(f"¿{a} == {b}? {a == b}")

# 3. Operadores lógicos
x, y = True, False
print(f"True and False: {x and y}")
print(f"True or False: {x or y}")
print(f"not True: {not x}")`
  },
  {
    id: 4,
    name: 'Condicionales',
    icon: 'pi pi-sitemap',
    color: '#ef4444',
    description: 'Practica if, elif, else y condiciones anidadas.',
    template: `# Práctica: Condicionales
# Escribe y ejecuta tu código aquí

# 1. Número par o impar
numero = 7
if numero % 2 == 0:
    print(f"{numero} es par")
else:
    print(f"{numero} es impar")

# 2. Calcula la nota
nota = 85
if nota >= 90:
    print("Excelente")
elif nota >= 70:
    print("Aprobado")
else:
    print("Reprobado")

# 3. Mayor de 3 números
a, b, c = 10, 25, 15
mayor = a
if b > mayor: mayor = b
if c > mayor: mayor = c
print(f"El mayor es: {mayor}")`
  },
  {
    id: 5,
    name: 'Bucles',
    icon: 'pi pi-reload',
    color: '#06b6d4',
    description: 'Practica for, while, range y control de flujo.',
    template: `# Práctica: Bucles
# Escribe y ejecuta tu código aquí

# 1. Contar del 1 al 10
print("Contando del 1 al 10:")
for i in range(1, 11):
    print(i, end=" ")
print()

# 2. Suma acumulativa
suma = sum(range(1, 101))
print(f"Suma del 1 al 100: {suma}")

# 3. Tabla de multiplicar
n = 5
print(f"Tabla del {n}:")
for i in range(1, 11):
    print(f"  {n} x {i:2d} = {n * i:2d}")

# 4. Cuenta regresiva
print("Cuenta regresiva:")
for i in range(10, 0, -1):
    print(i, end=" ")
print("¡Despegue!")`
  },
];

@Component({
  selector: 'app-laboratory-content',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule],
  templateUrl: './laboratory-content.component.html',
  styleUrl: './laboratory-content.component.scss'
})
export class LaboratoryContentComponent implements OnInit {
  modules = MODULES;
  selectedModuleId = 0;
  moduleOpen = false;
  code = '';
  codeLines: number[] = [];
  consoleLines: ConsoleLine[] = [];
  isRunning = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadTemplate();
  }

  get currentModule(): LabModule {
    return this.modules.find(m => m.id === this.selectedModuleId) ?? this.modules[0];
  }

  loadTemplate(): void {
    this.code = this.currentModule.template;
    this.updateCodeLines();
    this.consoleLines = [
      { text: `Módulo: ${this.currentModule.name}. Escribe tu código y haz clic en Ejecutar.`, type: 'info' },
      { text: 'Tip: Usa Ctrl+Enter para ejecutar rápidamente.', type: 'info' }
    ];
  }

  selectModule(id: number): void {
    if (id === this.selectedModuleId) return;
    this.selectedModuleId = id;
    this.moduleOpen = false;
    this.loadTemplate();
  }

  updateCodeLines(): void {
    const count = this.code.split('\n').length;
    this.codeLines = Array.from({ length: count }, (_, i) => i + 1);
  }

  execute(): void {
    if (this.isRunning || !this.code.trim()) return;
    this.isRunning = true;

    this.consoleLines = [
      { text: `Ejecutando...`, type: 'input' }
    ];

    this.api.post<{ stdout: string; stderr: string; output: string; exitCode: number; executionTime: number }>(
      '/execute', { code: this.code }
    ).subscribe({
      next: (res) => {
        this.isRunning = false;
        const lines: ConsoleLine[] = [];

        if (res.stdout) {
          lines.push({ text: res.stdout, type: 'output' });
        }
        if (res.stderr) {
          lines.push({ text: res.stderr, type: 'error' });
        }
        if (!res.stdout && !res.stderr) {
          lines.push({ text: '(sin salida)', type: 'info' });
        }

        const timeStr = res.executionTime < 1000
          ? `${res.executionTime}ms`
          : `${(res.executionTime / 1000).toFixed(2)}s`;

        lines.push({ text: '', type: 'info' });
        lines.push({ text: `Proceso finalizado en ${timeStr}  |  Código de salida: ${res.exitCode}`, type: 'info' });

        this.consoleLines = lines;
      },
      error: (err) => {
        this.isRunning = false;
        const msg = err.error?.message || 'Error al conectar con el servidor. Verifica que el backend esté corriendo.';
        this.consoleLines = [
          { text: msg, type: 'error' }
        ];
      }
    });
  }

  clearConsole(): void {
    this.consoleLines = [
      { text: 'Consola limpiada.', type: 'info' }
    ];
  }

  resetCode(): void {
    if (confirm('¿Restaurar el código original?')) {
      this.loadTemplate();
    }
  }

  get hasErrors(): boolean {
    return this.consoleLines.some(l => l.type === 'error');
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.moduleOpen = false;
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      this.execute();
    }
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.moduleOpen && !target.closest('.module-selector')) {
      this.moduleOpen = false;
    }
  }
}
