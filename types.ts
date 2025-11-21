export interface Slide {
  title: string;
  content: string[]; // Bullet points
  notes?: string;
  imageQuery?: string; // For fetching a relevant placeholder image
}

export interface PresentationData {
  topic: string;
  title: string;
  subtitle?: string;
  slides: Slide[];
}

export enum RevealTheme {
  Black = 'black',
  White = 'white',
  League = 'league',
  Beige = 'beige',
  Sky = 'sky',
  Night = 'night',
  Dracula = 'dracula',
  Simple = 'simple',
  Serif = 'serif',
  Blood = 'blood',
  Moon = 'moon',
  Solarized = 'solarized',
}

export const THEME_URLS: Record<RevealTheme, string> = {
  [RevealTheme.Black]: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/theme/black.min.css',
  [RevealTheme.White]: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/theme/white.min.css',
  [RevealTheme.League]: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/theme/league.min.css',
  [RevealTheme.Beige]: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/theme/beige.min.css',
  [RevealTheme.Sky]: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/theme/sky.min.css',
  [RevealTheme.Night]: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/theme/night.min.css',
  [RevealTheme.Dracula]: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/theme/dracula.min.css',
  [RevealTheme.Simple]: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/theme/simple.min.css',
  [RevealTheme.Serif]: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/theme/serif.min.css',
  [RevealTheme.Blood]: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/theme/blood.min.css',
  [RevealTheme.Moon]: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/theme/moon.min.css',
  [RevealTheme.Solarized]: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/theme/solarized.min.css',
};