import { Trip, Testimonial } from './types';

export const OWNER = {
    name: 'Deepa Murali',
    phone: '+91 9141137962',
    email: 'hello@deetours.in',
    instagram: '@deetours.in',
    tagline: 'Founder & Chief Experience Curator',
};

export const FEATURED_TRIPS: Trip[] = [
    {
        id: 'trip-1',
        title: 'Awakening in the Himalayas',
        destination: 'Bhutan',
        duration: '10 Days',
        price: 4500,
        imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2674&auto=format&fit=crop',
        category: 'spiritual',
        rating: 4.9,
        reviewsCount: 124,
        description: 'A transformative journey through ancient monasteries and pristine landscapes that challenge the very edges of your perspective.',
    },
    {
        id: 'trip-2',
        title: 'Patagonian Wilderness',
        destination: 'Chile & Argentina',
        duration: '14 Days',
        price: 6200,
        imageUrl: 'https://images.unsplash.com/photo-1516483642785-02bd6f6c984f?q=80&w=2674&auto=format&fit=crop',
        category: 'adventure',
        rating: 5.0,
        reviewsCount: 89,
        description: 'Trek the very edge of the world through ancient glaciers and dramatically sculpted peaks.',
    },
    {
        id: 'trip-3',
        title: 'Amalfi Coast Retreat',
        destination: 'Italy',
        duration: '7 Days',
        price: 5800,
        imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2674&auto=format&fit=crop',
        category: 'luxury',
        rating: 4.8,
        reviewsCount: 210,
        description: 'Experience absolute luxury along the Mediterranean coast, where every hour is orchestrated.',
    },
    {
        id: 'trip-4',
        title: 'Kerala Backwaters',
        destination: 'Kerala, India',
        duration: '6 Days',
        price: 1800,
        imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2670&auto=format&fit=crop',
        category: 'leisure',
        rating: 4.7,
        reviewsCount: 176,
        description: 'Float through emerald waterways on a private houseboat, surrounded by the lush silence of the tropics.',
    },
    {
        id: 'trip-5',
        title: 'The Atlas Traverse',
        destination: 'Morocco',
        duration: '9 Days',
        price: 3200,
        imageUrl: 'https://images.unsplash.com/photo-1549449850-891ca68453cc?q=80&w=2674&auto=format&fit=crop',
        category: 'adventure',
        rating: 4.9,
        reviewsCount: 102,
        description: 'A journey through the high Atlas Mountains, Saharan dunes, and ancient medinas of Morocco.',
    },
    {
        id: 'trip-6',
        title: 'Kyoto Serenity Retreat',
        destination: 'Japan',
        duration: '8 Days',
        price: 5200,
        imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop',
        category: 'spiritual',
        rating: 5.0,
        reviewsCount: 148,
        description: 'Immerse yourself in ancient temple culture, private tea ceremonies, and the meditative art of kaiseki dining.',
    },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 't-1',
        name: 'Priya Sharma',
        role: 'Solo Explorer — Bhutan Journey',
        content: 'DeeTours didn\'t just plan a trip; they curated a life-changing experience. As a solo woman traveller, I have never felt so safe and so completely free at the same time.',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop',
    },
    {
        id: 't-2',
        name: 'Ananya & Rohan',
        role: 'Honeymooners — Amalfi Coast',
        content: 'The level of care and attention we received made our honeymoon completely stress-free and utterly magical. Deepa thought of things we never even imagined.',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=256&auto=format&fit=crop',
    },
    {
        id: 't-3',
        name: 'Meera Iyer',
        role: 'Group Leader — Kyoto Retreat',
        content: 'I brought a group of 12 women. Not a single hiccup, not a single moment of stress. Every detail was flawlessly handled. We will be back.',
        avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1eb4ce?q=80&w=256&auto=format&fit=crop',
    },
];

export const CATEGORIES = [
    { id: 'adventure', title: 'Adventure', description: 'Push your boundaries in the wild.', imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop' },
    { id: 'spiritual', title: 'Spiritual', description: 'Reconnect with your innermost self.', imageUrl: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=2670&auto=format&fit=crop' },
    { id: 'luxury', title: 'Luxury', description: 'Uncompromising comfort and elegance.', imageUrl: 'https://images.unsplash.com/photo-1445013511106-4293677a28e5?q=80&w=2670&auto=format&fit=crop' },
    { id: 'leisure', title: 'Leisure', description: 'Slow down and rediscover stillness.', imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2670&auto=format&fit=crop' },
];

export const DESTINATIONS = [
    { id: 'bhutan', name: 'Bhutan', tagline: 'Kingdom of Happiness', region: 'South Asia', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2674&auto=format&fit=crop', tripCount: 3 },
    { id: 'japan', name: 'Japan', tagline: 'Where Silence Has Form', region: 'East Asia', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop', tripCount: 5 },
    { id: 'morocco', name: 'Morocco', tagline: 'The Labyrinth of Light', region: 'North Africa', image: 'https://images.unsplash.com/photo-1549449850-891ca68453cc?q=80&w=2674&auto=format&fit=crop', tripCount: 4 },
    { id: 'italy', name: 'Italy', tagline: 'Art, Taste, and Light', region: 'Europe', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2674&auto=format&fit=crop', tripCount: 6 },
    { id: 'patagonia', name: 'Patagonia', tagline: 'The Edge of the World', region: 'South America', image: 'https://images.unsplash.com/photo-1516483642785-02bd6f6c984f?q=80&w=2674&auto=format&fit=crop', tripCount: 2 },
    { id: 'kerala', name: 'Kerala', tagline: "God's Own Country", region: 'South India', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2670&auto=format&fit=crop', tripCount: 4 },
];

export const JOURNAL_POSTS = [
    {
        slug: "the-art-of-silence",
        title: "The Art of Silence in Kyoto",
        excerpt: "Why the absence of sound in certain sanctuaries transforms the way we perceive space and time — and why a woman who travels alone understands this better than anyone.",
        category: "Philosophy",
        date: "October 12, 2026",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop",
        author: OWNER.name,
        content: `
      <p>Kyoto does not speak in volumes. It whispers. In the temples of Arashiyama, silence is not merely the absence of noise; it is a physical presence. It has weight. It has texture. When you sit on the engawa of a 400-year-old zen monastery, the world slows down to the pace of a falling leaf.</p>
      
      <p>For a solo woman traveller, this silence is the ultimate luxury. It provides a rare clarity that is often drowned out by the constant hum of modern life. In the stillness, you begin to hear your own thoughts with startling precision. You realize that you have been navigating the world by reacting to it, rather than simply being in it.</p>
      
      <p>We often travel to see new things, but the most profound journeys are those where we finally see ourselves. Kyoto's sanctuaries are mirrors. The quiet isn't empty; it is full of the resonance of centuries of contemplation. To be silent in Kyoto is to join a conversation that has been happening for a millennium.</p>

      <blockquote class="my-12 pl-8 border-l-2 border-accent-luxury text-2xl font-hero italic text-primary-dark">"Silence is not a lack of something, but a presence that allows everything else to exist."</blockquote>

      <p>As the sun begins to dip behind the Western Hills, casting long, amber shadows across the rock gardens, you understand that the destination was never the temple itself. The destination was the silence. It was the ability to be still, to be alone, and to be completely at peace with the version of yourself that walks through those gates.</p>
    `
    },
    {
        slug: "luxury-redefined",
        title: "Redefining Luxury in the Atlas Mountains",
        excerpt: "True luxury is no longer defined by thread count. It is defined by absolute privacy, untouchable landscapes, and the profound sensation that nothing is being asked of you.",
        category: "Perspective",
        date: "September 28, 2026",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1549449850-891ca68453cc?q=80&w=2674&auto=format&fit=crop",
        author: OWNER.name,
        content: `
      <p>In the High Atlas, luxury is measured in altitude and distance from the nearest paved road. We have been conditioned to believe that luxury is additive—more amenities, more services, more things. But in the mountains of Morocco, luxury is subtractive.</p>
      
      <p>It is the removal of the digital tether. The disappearance of the schedule. The absolute silence of a starlit Saharan night where the only sound is the shifting of sand. Here, the greatest gift is the realization that nothing—absolutely nothing—is expected of you.</p>
      
      <p>This is what we seek at DeeTours. Not just high-end linens, but the space to breathe. To sit in a traditional Berber riad, drinking mint tea as the call to prayer echoes through the valley, and feel the immense relief of being entirely irrelevant to the rest of the world for a few precious days.</p>
    `
    },
    {
        slug: "solo-travel-safety",
        title: "The Illusion of Risk: Solo Travel for Women",
        excerpt: "How meticulous preparation and a curated support network create the ultimate freedom — and why the fear most people associate with solo travel is largely inherited, not rational.",
        category: "Methodology",
        date: "August 14, 2026",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2670&auto=format&fit=crop",
        author: OWNER.name,
        content: `
      <p>Fear is the most effective gatekeeper. For centuries, women have been told that the world is too dangerous to explore alone. We have inherited a narrative of fragility that suggests our safety is dependent on the presence of others.</p>
      
      <p>I built DeeTours to dismantle that narrative. Safety is not a matter of luck; it is a matter of architecture. By building a robust on-ground network, vetting every transfer, and choosing partners who share our values, we create a sanctuary that moves with you.</p>
      
      <p>When you remove the constant low-level vibration of anxiety about logistics and safety, your energy is freed for exploration. You find that you are more capable, more resilient, and more observant than you ever imagined. The "risk" was an illusion, designed to keep you small. The reality is that the world is waiting for you to walk through it on your own terms.</p>
    `
    },
    {
        slug: "bhutan-gross-national-happiness",
        title: "Bhutan and the Weight of Arrival",
        excerpt: "The Kingdom of Bhutan charges a daily Sustainable Development Fee. Upon landing, I understood immediately why. This is my field notes from a journey that broke me open.",
        category: "Field Notes",
        date: "July 3, 2026",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2674&auto=format&fit=crop",
        author: OWNER.name,
        content: `
      <p>Bhutan does not want you to visit. It wants you to appreciate. The cost of entry is a deliberate friction, designed to ensure that those who arrive are prepared to respect the sanctity of the land. It is a filter for intentionality.</p>
      
      <p>Walking the Tiger's Nest trail at 3,000 meters, your lungs burn with the effort, but your spirit feels lighter than ever. There is a profound sense of stewardship here—a collective agreement that the environment and the culture are worth more than the convenience of mass tourism.</p>
      
      <p>In Bhutan, happiness is not a pursuit; it is a policy. But it's not the superficial happiness of a smile. It is the deep contentment of a society that knows exactly who it is and what it values. For the traveller, it's a humbling reminder that we are guests not just in a country, but in a way of being.</p>
    `
    },
];

