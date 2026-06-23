import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { TimelineModule } from 'primeng/timeline';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,

    TimelineModule,
    AccordionModule,
    CardModule
  ],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.scss',
})
export class HomeContentComponent {

  features = [
    {
      title: 'Consola Interactiva',
      description: 'Escribe, edita y ejecuta tu código en tiempo real directamente desde tu navegador sin instalar herramientas adicionales.',
      icon: 'pi pi-code',
      colorClass: 'c-green'
    },
    {
      title: 'Validación Automática',
      description: 'Recibe retroalimentación inmediata al enviar tus ejercicios. Identifica tus errores y corrígelos al instante.',
      icon: 'pi pi-check-circle',
      colorClass: 'c-blue'
    },
    {
      title: 'Rutas Estructuradas',
      description: 'Aprende paso a paso con rutas diseñadas de nivel básico a avanzado, asegurando bases sólidas en cada lenguaje.',
      icon: 'pi pi-sitemap',
      colorClass: 'c-purple'
    }
  ];

  steps = [
    {
      num: '01',
      icon: 'pi pi-search',
      title: 'Elige tu Ruta',
      description: 'Selecciona entre lenguajes demandados como JavaScript, Python o SQL y sigue un plan de estudios estructurado.'
    },
    {
      num: '02',
      icon: 'pi pi-pencil',
      title: 'Resuelve Desafíos',
      description: 'Escribe código para resolver problemas prácticos directamente en nuestra consola interactiva basada en la nube.'
    },
    {
      num: '03',
      icon: 'pi pi-chart-bar',
      title: 'Feedback al Instante',
      description: 'Nuestro motor de validación evalúa tu código inmediatamente, dándote pistas y métricas sobre tu desempeño.'
    }
  ];

  faqs = [
    {
      question: '¿Necesito conocimientos previos de programación?',
      answer: '¡No! EduCode está diseñado tanto para principiantes absolutos que nunca han escrito una línea de código como para programadores intermedios que buscan practicar y mejorar sus habilidades.',
    },
    {
      question: '¿Qué lenguajes puedo aprender en la plataforma?',
      answer: 'Actualmente ofrecemos soporte interactivo completo para JavaScript, Python y consultas SQL estructuradas, con planes de añadir TypeScript y Java muy pronto.',
    },
    {
      question: '¿Cómo funciona la validación automática?',
      answer: 'Cuando ejecutas tu código, nuestro sistema realiza pruebas unitarias automatizadas sobre tu solución para verificar si cumple con las condiciones del ejercicio, devolviéndote feedback instantáneo.',
    }
  ];

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
