# Test Technique Beee Agency - Section Features

## Stack Technique

### Technologies Principales

- **Next.js 15** (App Router + Turbopack)
- **React 19**
- **TypeScript**
- **SCSS/Sass** avec modules CSS
- **Lenis** pour le smooth scrolling
- **GSAP** (disponible mais utilisé avec parcimonie)

### Choix de SCSS plutôt que Tailwind CSS

J'aurais pu utiliser **Tailwind CSS v4** pour ce projet, mais j'ai fait le choix délibéré d'opter pour **SCSS** pour plusieurs raisons :

1. **Maîtrise et Familiarité** : Cela fait des années que je travaille avec SCSS et j'ai développé une bibliothèque complète de fonctions, mixins et helpers qui me permettent d'être extrêmement productif.

2. **Gestion du REM** : Tailwind gère mal le système REM personnalisé selon moi. Mon approche avec `font-size: calc(100vw / 1440 * 10)` sur l'élément `html` me permet d'avoir un système où `1.6rem = 16px`, ce qui garantit un **pixel-perfect** avec les maquettes Figma. Tailwind ne supporte pas aussi facilement ce type de configuration personnalisée.

3. **Contrôle Total** : SCSS me donne un contrôle absolu sur mes styles, mes animations et mes transitions, sans avoir à contourner les limitations du framework.

## Raisonnement Global

### Architecture et Separation of Concerns

Le projet est structuré pour être **maintenable** et **évolutif** avec une séparation claire des responsabilités :

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── animation/         # Composants d'animation réutilisables
│   ├── providers/         # Context providers (Lenis)
│   ├── sections/          # Sections de page (Hero, Features)
│   └── ui/                # Composants UI réutilisables (BentoCard, Container)
├── hooks/                 # Custom hooks (useLenis, useIntersectionAnimation)
├── lib/
│   ├── constants/         # Constantes et configuration (bento.ts)
│   └── utils/             # Utilitaires (text, split, easings)
├── styles/
│   ├── base/              # Reset et styles de base
│   ├── shared/            # Styles partagés (text, utilities)
│   └── utils/             # Variables, mixins, functions SCSS
└── types/                 # Types TypeScript
```

### Architecture Prête pour la Production

Cette architecture contient **mon setup standard** que j'utilise sur chaque projet. Vous remarquerez certains dossiers vides (comme `styles/components/` ou certains hooks) : ce sont des éléments de mon boilerplate personnel, taillés pour la **performance** et prêts à accueillir de nouvelles fonctionnalités.

### Système de Design Responsive

Mon système repose sur un **calcul dynamique du REM** :

```scss
html {
  font-size: calc(100vw / 1440 * 10);
}
```

Cela signifie que :

- Sur desktop (1440px) : `1rem = 10px`, donc `1.6rem = 16px`
- Le système scale automatiquement avec la largeur de la fenêtre
- Les designs Figma en pixels se convertissent facilement en rem (diviser par 10)
- **Pixel-perfect** garanti sur toutes les tailles d'écran

C'est exactement ce type de flexibilité que Tailwind ne permet pas nativement, d'où mon choix de SCSS.

### Performance et Animations Optimisées

#### Animation de Texte au Scroll - Approche Maison

L'animation de texte visible sur le site utilise une **logique d'animation personnalisée** plutôt que les solutions classiques :

**Ce que j'ai fait :**

- **Custom Hook `useIntersectionAnimation`** avec `IntersectionObserver` natif
- **Fonction `split()` maison** pour découper le texte en spans
- **CSS transitions** plutôt que GSAP pour les animations
- Logique dans `lib/utils/text.ts` et `lib/utils/split.ts`

**Pourquoi cette approche ?**

- ✅ **Performance optimale** : pas de librairie lourde (pas de GSAP SplitText)
- ✅ **Bundle size réduit** : seulement ~2-3KB de code custom vs ~40KB pour GSAP SplitText
- ✅ **Contrôle total** sur le comportement et le timing
- ✅ **CSS-driven animations** : exploite l'accélération matérielle du GPU

**Alternative avec GSAP ScrollTrigger :**

- ❌ Plus lourd en bundle size
- ❌ Overhead JavaScript pour des animations simples
- ✅ Nécessaire pour des projets **scrollytelling** complexes avec `pin` et `scrub`
- ✅ Plus simple pour synchroniser animations et scroll de manière fine

#### Animations d'Images et Blocs

J'ai la même logique pour les animations de blocs d'images : **IntersectionObserver + CSS** plutôt que ScrollTrigger.

**Quand j'utilise ScrollTrigger :**

- Projets **scrollytelling** avec narration complexe
- Besoin de **pin** (épingler des éléments pendant le scroll)
- Besoin de **scrub** (animations liées à la position de scroll)
- Synchronisation fine entre plusieurs animations

Pour ce test technique, ces fonctionnalités n'étaient pas nécessaires, donc j'ai opté pour l'approche légère.

#### Animations au Hover - SCSS vs JavaScript/GSAP

J'ai utilisé **les deux approches** dans ce projet selon le contexte :

##### 1. SCSS pur pour les animations simples (Globe)

```scss
.globe:hover .mapPath {
  fill: $color-orange;
  transition: fill 0.6s $ease-out-expo;
}
```

**Avantages du SCSS :**

- ✅ **Performance native** : délégué au navigateur
- ✅ **Accélération GPU** automatique
- ✅ **Moins de JavaScript** dans le bundle
- ✅ **Simple et maintenable**

**Parfait pour :** changements de couleur, opacité, transformations simples

##### 2. GSAP Timeline pour les animations complexes (Chat)

Pour l'animation de la carte Chat, j'ai utilisé **GSAP avec Timeline** :

```tsx
const tl = gsap.timeline({
  paused: true,
  defaults: { duration: 1.3, ease: "power2.out", overwrite: "auto" },
});

tl.to(topEls, { x: 18, y: 8 }, 0).to(bottomEls, { x: -12, y: -18 }, 0);

card.addEventListener("mouseenter", () => tl.play(0));
card.addEventListener("mouseleave", () => tl.reverse());
```

**Pourquoi GSAP ici ?**

- ✅ **Animation fluide sans saccades** : si l'utilisateur hover/unhover rapidement, GSAP gère l'interpolation automatiquement
- ✅ **Overwrite intelligent** : `overwrite: "auto"` empêche les conflits d'animations
- ✅ **Timeline reversible** : `.reverse()` permet de revenir en arrière proprement, peu importe où l'animation en était
- ✅ **Synchronisation parfaite** : plusieurs éléments animés en même temps avec des trajectoires différentes
- ✅ **Pas de janking** : contrairement aux CSS transitions qui peuvent "sauter" si on hover trop vite

**Avec CSS uniquement :**

- ❌ Hover rapide = animation saccadée (transition réinitialisée à chaque hover)
- ❌ Pas de contrôle fin sur l'état intermédiaire de l'animation
- ❌ Difficile de synchroniser plusieurs éléments avec des trajectoires différentes

**Impact Performance :**

- **CSS hover simple** : ~0.1ms par frame (géré par le moteur de rendu)
- **GSAP Timeline** : ~0.3-0.8ms par frame (légèrement plus lourd, mais gestion intelligente des interruptions)
- **CSS hover complexe** : peut aller jusqu'à 2-3ms avec les saccades sur hovers rapides

**Ma règle :**

- Animation simple (1 propriété, 1 élément) → **SCSS**
- Animation complexe (plusieurs éléments, trajectoires différentes, besoin de réversibilité fluide) → **GSAP Timeline**

### Lenis - Smooth Scrolling

**Lenis** est ma bibliothèque de smooth scroll préférée et m'accompagne sur chaque projet.

**Pourquoi Lenis ?**

- ✅ Léger (~5KB gzipped)
- ✅ Performance excellente (RAF optimisé)
- ✅ Support mobile avec `syncTouch`
- ✅ API simple et élégante
- ✅ Compatible avec GSAP ScrollTrigger

Lenis est **optionnel**. Le site fonctionne parfaitement sans, mais il apporte un peitt plus au scroll qui fait la différence sur les sites modernes.

Pour ce projet, j'ai configuré Lenis pour :

- Scroll fluide sur desktop
- Scroll natif immédiat sur mobile (via `syncTouch: true` et `syncTouchLerp: 1`)
- Durée de 1.2s avec easing custom

## Améliorations Possibles avec Plus de Temps

### 1. Optimisations Techniques

#### Images et Assets

- **Next.js Image Component** : utiliser `next/image` pour l'optimisation automatique (WebP, responsive srcset)
- **Lazy loading** avancé avec `IntersectionObserver` pour les composants lourds
- **Sprite SVG** : regrouper les icônes SVG dans un sprite unique pour réduire les requêtes

#### Performance

- **Code Splitting** : lazy load des sections non critiques avec `dynamic()` de Next.js
- **Fonts optimization** : preload des fonts critiques + `font-display: swap`
- **Critical CSS** : extraction du CSS critique pour un First Contentful Paint plus rapide

#### Bundle Size

- **Tree shaking** : audit avec `@next/bundle-analyzer` pour identifier le code mort (très pratique)
- **Dynamic imports** : charger GSAP uniquement si nécessaire

### 2. Accessibilité (A11y)

- **Focus management** : gestion du focus clavier sur les cartes Bento
- **ARIA labels** : améliorer les labels pour les lecteurs d'écran
- **Reduced motion** : respecter `prefers-reduced-motion` pour désactiver les animations (c'est déjà un peu le cas)
- **Contraste** : vérifier les ratios WCAG AAA
- **Navigation clavier** : navigation complète au clavier sur tous les éléments interactifs

### 3. Animations et Interactions

#### Micro-interactions

- **Hover states** avancés sur les cartes Bento (lift effect, border glow)
- **Cursor custom** qui réagit aux éléments interactifs
- **Parallax** subtil sur certains éléments au scroll

#### Animations Complexes

- **Timeline GSAP** pour orchestrer plusieurs animations
- **Morphing SVG** entre différents états
- **Particle effects** sur certains hovers
- **Scroll-linked animations** avec ScrollTrigger pour les sections complexes

### 4. Developer Experience

- **Storybook** : documentation interactive des composants
- **Prettier** : formatting automatique du code
- **Husky** : pre-commit hooks pour linting
- **Conventional Commits** : standardisation des messages de commit
- **Changelog** automatique avec semantic-release

### 5. Responsive et Multi-Device

- **Breakpoints additionnels** : gestion fine de tous les devices (small mobile, tablet landscape, 4K)
- **Touch gestures** : swipe sur les carousels
- **PWA** : transformer le site en Progressive Web App
- **Dark mode** : thème sombre avec `prefers-color-scheme`

## Installation et Démarrage

```bash
# Installation des dépendances
npm install

# Développement
npm run dev

# Build de production
npm run build

# Démarrage production
npm start
```

Le projet sera accessible sur [http://localhost:3000](http://localhost:3000).

## Structure des Données

Les données des cartes Bento sont centralisées dans `src/lib/constants/bento.ts` pour faciliter la maintenance et permettre une future connexion à un CMS.

## Notes Techniques

- **Node.js** : v18+ requis
- **Package Manager** : npm (pnpm et yarn compatibles)
- **Browsers supportés** : Chrome, Firefox, Safari, Edge (2 dernières versions)
- **Mobile** : iOS Safari 14+, Chrome Android 90+

---

_Développé avec ❤️ pour le test technique Beee Agency_
