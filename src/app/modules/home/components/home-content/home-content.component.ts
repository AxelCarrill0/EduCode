import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { TimelineModule } from 'primeng/timeline';
import { CarouselModule } from 'primeng/carousel';
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
    CarouselModule,
    AccordionModule,
    CardModule
  ],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.scss',
})
export class HomeContentComponent implements OnInit {

  // Características principales (Backend-Ready)
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

  // Pasos de "Cómo funciona" (Backend-Ready)
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

  // Testimonios de Estudiantes (Backend-Ready)
  testimonials = [
    {
      name: 'Sofía Martínez',
      role: 'Estudiante de Ing. de Sistemas',
      text: 'EduCode me ayudó a entender la lógica de programación mucho más rápido que los métodos tradicionales. ¡La validación en tiempo real es excelente!',
      stars: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    {
      name: 'Alejandro Ruiz',
      role: 'Desarrollador Junior Frontend',
      text: 'Los laboratorios interactivos son muy prácticos. Sentar las bases con sus retos fue clave para conseguir mi primer empleo como programador.',
      stars: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      name: 'Andrea Gómez',
      role: 'Estudiante de Telecomunicaciones',
      text: 'Aprender SQL en EduCode fue sumamente intuitivo. El paso a paso te guía sin abrumarte y los retos incrementales son adictivos.',
      stars: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    }
  ];

  // Opciones de respuesta para el Carrusel de Testimonios
  carouselResponsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  // Preguntas frecuentes (Backend-Ready)
  faqs = [
    {
      question: '¿Necesito conocimientos previos de programación?',
      answer: '¡No! EduCode está diseñado tanto para principiantes absolutos que nunca han escrito una línea de código como para programadores intermedios que buscan practicar y mejorar sus habilidades.',
      open: false
    },
    {
      question: '¿Qué lenguajes puedo aprender en la plataforma?',
      answer: 'Actualmente ofrecemos soporte interactivo completo para JavaScript, Python y consultas SQL estructuradas, con planes de añadir TypeScript y Java muy pronto.',
      open: false
    },
    {
      question: '¿Cómo funciona la validación automática?',
      answer: 'Cuando ejecutas tu código, nuestro sistema realiza pruebas unitarias automatizadas sobre tu solución para verificar si cumple con las condiciones del ejercicio, devolviéndote feedback instantáneo.',
      open: false
    }
  ];

  ngOnInit(): void {}

  // este metodo nos ayuda a hacer scroll a la parte superior de la página
  // cuando hacemos click en inicio en el footer
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
