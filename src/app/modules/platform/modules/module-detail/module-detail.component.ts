import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProgressService } from '../../progress/progress-content/progress.service';

interface Lesson {
  title: string;
  duration: string;
  completed: boolean;
  content: { type: 'text' | 'code'; value: string }[];
}

interface ModuleData {
  name: string;
  description: string;
  icon: string;
  accent: string;
  iconBg: string;
  difficulty: string;
  status: string;
  lessons: Lesson[];
}

const MODULES_DATA: ModuleData[] = [
  {
    name: 'Introducción a Python',
    description: 'Conoce los fundamentos de la programación con Python desde cero.',
    icon: 'pi pi-python',
    accent: '#10b981',
    iconBg: 'rgba(16, 185, 129, 0.1)',
    difficulty: 'Principiante',
    status: 'in-progress',
    lessons: [
      {
        title: '¿Qué es Python?', duration: '10 min', completed: true,
        content: [
          { type: 'text', value: 'Python es un lenguaje de programación interpretado, de alto nivel y multiplataforma. Fue creado por Guido van Rossum y lanzado por primera vez en 1991.' },
          { type: 'text', value: 'Se caracteriza por su sintaxis limpia y legible, lo que lo hace ideal para principiantes. Python sigue la filosofía de que "la legibilidad cuenta".' },
          { type: 'code', value: '# Esto es un comentario en Python\nprint("Hola, mundo!")' },
          { type: 'text', value: 'Python se usa en desarrollo web, ciencia de datos, inteligencia artificial, automatización y mucho más.' },
        ]
      },
      {
        title: 'Instalación y configuración', duration: '15 min', completed: true,
        content: [
          { type: 'text', value: 'Para empezar a programar en Python, primero necesitas instalarlo en tu computadora. Ve a python.org y descarga la última versión.' },
          { type: 'text', value: 'Durante la instalación en Windows, asegúrate de marcar "Add Python to PATH" para poder usar Python desde la terminal.' },
          { type: 'code', value: '# Verifica la instalación en la terminal:\npython --version\n# Deberías ver algo como: Python 3.12.0' },
          { type: 'text', value: 'También puedes usar entornos online como Google Colab o Replit para practicar sin instalar nada.' },
        ]
      },
      {
        title: 'Tu primer programa', duration: '12 min', completed: true,
        content: [
          { type: 'text', value: 'El primer programa que todo desarrollador escribe es el clásico "Hola, mundo!". En Python es especialmente sencillo.' },
          { type: 'code', value: 'print("Hola, mundo!")' },
          { type: 'text', value: 'La función print() muestra texto en la pantalla. Puedes pasarle texto entre comillas dobles o simples.' },
          { type: 'code', value: 'print(\'Bienvenido a EduCode\')' },
        ]
      },
      {
        title: 'Comentarios y buenas prácticas', duration: '8 min', completed: true,
        content: [
          { type: 'text', value: 'Los comentarios son notas que el programador escribe para explicar su código. Python ignora los comentarios al ejecutar.' },
          { type: 'code', value: '# Esto es un comentario de una línea\n\n"""\nEsto es un comentario\nmultilínea\n"""\n\nprint("El código sigue funcionando")' },
          { type: 'text', value: 'Usa comentarios para explicar el "por qué" de tu código, no el "qué" (el código ya dice qué hace).' },
        ]
      },
      {
        title: 'Ejercicios prácticos', duration: '20 min', completed: false,
        content: [
          { type: 'text', value: 'Practica lo aprendido con estos ejercicios. Intenta resolverlos por tu cuenta antes de ver la solución.' },
          { type: 'text', value: 'Ejercicio 1: Escribe un programa que imprima tu nombre.' },
          { type: 'code', value: '# Solución:\nprint("Tu nombre aquí")' },
          { type: 'text', value: 'Ejercicio 2: Escribe un programa que imprima un poema corto de 3 líneas.' },
          { type: 'code', value: '# Solución:\nprint("Rosa roja")\nprint("Violeta azul")\nprint("Python es genial")' },
        ]
      },
    ]
  },
  {
    name: 'Variables',
    description: 'Aprende a almacenar y manipular información en tus programas.',
    icon: 'pi pi-database',
    accent: '#3b82f6',
    iconBg: 'rgba(59, 130, 246, 0.1)',
    difficulty: 'Principiante',
    status: 'in-progress',
    lessons: [
      {
        title: '¿Qué son las variables?', duration: '10 min', completed: true,
        content: [
          { type: 'text', value: 'Una variable es como una caja donde guardas información. Le pones una etiqueta (nombre) y dentro guardas un valor.' },
          { type: 'code', value: 'nombre = "Ana"\nedad = 25\nestatura = 1.68' },
          { type: 'text', value: 'En Python no necesitas declarar el tipo de la variable. El lenguaje lo infiere automáticamente.' },
        ]
      },
      {
        title: 'Tipos de variables', duration: '12 min', completed: true,
        content: [
          { type: 'text', value: 'Los tipos básicos en Python son:\n- int: números enteros\n- float: números decimales\n- str: cadenas de texto\n- bool: booleanos (True/False)' },
          { type: 'code', value: 'x = 10          # int\ny = 3.14        # float\nz = "Hola"      # str\nes_mayor = True # bool' },
        ]
      },
      {
        title: 'Asignación y reasignación', duration: '10 min', completed: false,
        content: [
          { type: 'text', value: 'Puedes cambiar el valor de una variable en cualquier momento reasignándola.' },
          { type: 'code', value: 'contador = 0\nprint(contador)  # 0\n\ncontador = 5\nprint(contador)  # 5\n\ncontador = contador + 1\nprint(contador)  # 6' },
        ]
      },
      {
        title: 'Ejercicios prácticos', duration: '20 min', completed: false,
        content: [
          { type: 'text', value: 'Ejercicio 1: Crea una variable con tu edad y otra con tu nombre, luego imprímelas.' },
          { type: 'code', value: '# Solución:\nedad = 25\nnombre = "Carlos"\nprint(nombre)\nprint(edad)' },
          { type: 'text', value: 'Ejercicio 2: Intercambia los valores de dos variables.' },
          { type: 'code', value: '# Solución:\na = 5\nb = 10\na, b = b, a\nprint(a)  # 10\nprint(b)  # 5' },
        ]
      },
    ]
  },
  {
    name: 'Tipos de datos',
    description: 'Descubre cómo Python maneja textos, números y valores booleanos.',
    icon: 'pi pi-table',
    accent: '#8b5cf6',
    iconBg: 'rgba(139, 92, 246, 0.1)',
    difficulty: 'Principiante',
    status: 'not-started',
    lessons: [
      {
        title: 'Números enteros y flotantes', duration: '10 min', completed: false,
        content: [
          { type: 'text', value: 'Python maneja dos tipos principales de números: int (enteros) y float (decimales). Puedes hacer operaciones matemáticas directamente.' },
          { type: 'code', value: 'suma = 10 + 5       # 15\nresta = 10 - 5      # 5\nmultiplicacion = 3 * 4  # 12\ndivision = 10 / 3   # 3.333...' },
          { type: 'text', value: 'La división siempre devuelve un float. Para división entera usa // y para módulo (residuo) usa %.' },
          { type: 'code', value: 'print(10 / 3)   # 3.3333\nprint(10 // 3)  # 3\nprint(10 % 3)   # 1' },
        ]
      },
      {
        title: 'Cadenas de texto', duration: '12 min', completed: false,
        content: [
          { type: 'text', value: 'Las cadenas (strings) se definen con comillas simples o dobles. Puedes concatenarlas con + o usar f-strings para interpolar.' },
          { type: 'code', value: 'nombre = "Ana"\nsaludo = f"Hola, {nombre}!"\nprint(saludo)  # Hola, Ana!' },
        ]
      },
      {
        title: 'Booleanos', duration: '8 min', completed: false,
        content: [
          { type: 'text', value: 'Los booleanos solo tienen dos valores: True o False. Se usan en condicionales y comparaciones.' },
          { type: 'code', value: 'es_mayor = 18 >= 18    # True\ntiene_permiso = False\nprint(es_mayor and tiene_permiso)  # False' },
        ]
      },
      {
        title: 'Ejercicios prácticos', duration: '20 min', completed: false,
        content: [
          { type: 'text', value: 'Ejercicio 1: Calcula el área de un círculo con radio 5.' },
          { type: 'code', value: '# Solución:\nradio = 5\narea = 3.1416 * radio ** 2\nprint(f"Área: {area}")' },
        ]
      },
    ]
  },
  {
    name: 'Operadores',
    description: 'Domina las operaciones aritméticas, lógicas y de comparación.',
    icon: 'pi pi-calculator',
    accent: '#f59e0b',
    iconBg: 'rgba(245, 158, 11, 0.1)',
    difficulty: 'Principiante',
    status: 'not-started',
    lessons: [
      {
        title: 'Operadores aritméticos', duration: '10 min', completed: false,
        content: [
          { type: 'text', value: 'Los operadores aritméticos te permiten hacer cálculos matemáticos: +, -, *, /, //, %, **' },
          { type: 'code', value: 'a = 10\nb = 3\nprint(a + b)   # 13\nprint(a ** b)  # 1000 (10 elevado a 3)' },
        ]
      },
      {
        title: 'Operadores de comparación', duration: '10 min', completed: false,
        content: [
          { type: 'text', value: 'Comparan dos valores y devuelven True o False: ==, !=, <, >, <=, >=' },
          { type: 'code', value: 'print(5 == 5)  # True\nprint(5 != 3)  # True\nprint(5 < 3)   # False' },
        ]
      },
      {
        title: 'Operadores lógicos', duration: '10 min', completed: false,
        content: [
          { type: 'text', value: 'Combinan condiciones booleanas: and, or, not.' },
          { type: 'code', value: 'edad = 20\ntiene_id = True\nif edad >= 18 and tiene_id:\n    print("Puedes entrar")' },
        ]
      },
    ]
  },
  {
    name: 'Condicionales',
    description: 'Controla el flujo de tu programa con if, else y elif.',
    icon: 'pi pi-sitemap',
    accent: '#ef4444',
    iconBg: 'rgba(239, 68, 68, 0.1)',
    difficulty: 'Intermedio',
    status: 'not-started',
    lessons: [
      {
        title: 'Sentencia if', duration: '12 min', completed: false,
        content: [
          { type: 'text', value: 'El if ejecuta un bloque solo si la condición es verdadera.' },
          { type: 'code', value: 'edad = 18\nif edad >= 18:\n    print("Eres mayor de edad")' },
        ]
      },
      {
        title: 'Else y elif', duration: '12 min', completed: false,
        content: [
          { type: 'text', value: 'Else se ejecuta si la condición es falsa. Elif encadena múltiples condiciones.' },
          { type: 'code', value: 'nota = 85\nif nota >= 90:\n    print("Excelente")\nelif nota >= 70:\n    print("Aprobado")\nelse:\n    print("Reprobado")' },
        ]
      },
      {
        title: 'Condiciones anidadas', duration: '15 min', completed: false,
        content: [
          { type: 'text', value: 'Puedes poner un if dentro de otro if. Úsalo con moderación para no complicar el código.' },
          { type: 'code', value: 'edad = 20\ntiene_permiso = True\nif edad >= 18:\n    if tiene_permiso:\n        print("Acceso concedido")\n    else:\n        print("Falta permiso")' },
        ]
      },
      {
        title: 'Operador ternario', duration: '10 min', completed: false,
        content: [
          { type: 'text', value: 'Una forma compacta de escribir if-else en una sola línea.' },
          { type: 'code', value: 'edad = 20\nmensaje = "Mayor" if edad >= 18 else "Menor"\nprint(mensaje)' },
        ]
      },
      {
        title: 'Ejercicios prácticos', duration: '25 min', completed: false,
        content: [
          { type: 'text', value: 'Ejercicio: Escribe un programa que determine si un número es positivo, negativo o cero.' },
          { type: 'code', value: '# Solución:\nnumero = int(input("Ingresa un número: "))\nif numero > 0:\n    print("Positivo")\nelif numero < 0:\n    print("Negativo")\nelse:\n    print("Cero")' },
        ]
      },
    ]
  },
  {
    name: 'Bucles',
    description: 'Automatiza tareas repetitivas con for y while.',
    icon: 'pi pi-reload',
    accent: '#06b6d4',
    iconBg: 'rgba(6, 182, 212, 0.1)',
    difficulty: 'Intermedio',
    status: 'not-started',
    lessons: [
      {
        title: 'Bucle for', duration: '12 min', completed: false,
        content: [
          { type: 'text', value: 'El bucle for itera sobre una secuencia (lista, string, rango, etc.).' },
          { type: 'code', value: 'for i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\nfor letra in "Python":\n    print(letra)' },
        ]
      },
      {
        title: 'Bucle while', duration: '12 min', completed: false,
        content: [
          { type: 'text', value: 'El while ejecuta mientras una condición sea verdadera. Cuidado con los bucles infinitos.' },
          { type: 'code', value: 'contador = 0\nwhile contador < 5:\n    print(contador)\n    contador += 1' },
        ]
      },
      {
        title: 'Break y continue', duration: '10 min', completed: false,
        content: [
          { type: 'text', value: 'break sale del bucle por completo. continue salta a la siguiente iteración.' },
          { type: 'code', value: 'for i in range(10):\n    if i == 5:\n        break  # termina en 5\n    print(i)\n\nfor i in range(5):\n    if i == 2:\n        continue  # salta el 2\n    print(i)' },
        ]
      },
      {
        title: 'Ejercicios prácticos', duration: '25 min', completed: false,
        content: [
          { type: 'text', value: 'Ejercicio: Imprime los números pares del 1 al 20 usando un bucle.' },
          { type: 'code', value: '# Solución:\nfor i in range(1, 21):\n    if i % 2 == 0:\n        print(i)' },
        ]
      },
    ]
  }
];

@Component({
  selector: 'app-module-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './module-detail.component.html',
  styleUrl: './module-detail.component.scss'
})
export class ModuleDetailComponent implements OnInit {
  module?: ModuleData;
  moduleId = '';
  openLesson: number | null = null;
  justUnlocked: string | null = null;

  constructor(private route: ActivatedRoute, private progress: ProgressService) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.moduleId = params.get('id') || '';
      const index = parseInt(this.moduleId, 10);
      if (!isNaN(index) && index >= 0 && index < MODULES_DATA.length) {
        this.module = MODULES_DATA[index];
        this.syncProgress();
      }
    });
  }

  private syncProgress(): void {
    if (!this.module) return;
    const mid = parseInt(this.moduleId, 10);
    const p = this.progress.getModuleProgress(mid);
    this.module.lessons.forEach((l, i) => {
      l.completed = i < p.completed;
    });
  }

  get completedCount(): number {
    const mid = parseInt(this.moduleId, 10);
    return this.progress.getModuleProgress(mid).completed;
  }

  get totalCount(): number {
    const mid = parseInt(this.moduleId, 10);
    return this.progress.getModuleProgress(mid).total;
  }

  get progressPct(): number {
    const mid = parseInt(this.moduleId, 10);
    return this.progress.getModuleProgress(mid).pct;
  }

  get moduleTitle(): string {
    return `Módulo ${parseInt(this.moduleId, 10) + 1}`;
  }

  toggleLesson(index: number): void {
    this.openLesson = this.openLesson === index ? null : index;
  }

  markComplete(index: number): void {
    const mid = parseInt(this.moduleId, 10);
    const unlocked = this.progress.completeLesson(mid, index);
    this.syncProgress();
    if (unlocked.length > 0) {
      this.justUnlocked = unlocked[0].name;
      setTimeout(() => this.justUnlocked = null, 4000);
    }
  }
}
