export interface Trip {
    id?: string;
    _id?: string;
    title: string;
    destination: string;
    duration: string; // e.g., "7 Days"
    price: number;
    imageUrl: string;
    category: 'adventure' | 'spiritual' | 'luxury' | 'leisure';
    rating: number;
    reviewsCount: number;
    description?: string;
    itinerary?: { day: number; title: string; description: string; image: string }[];
    gallery?: string[];
    included?: string[];
    faq?: { question: string; answer: string }[];
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    avatarUrl?: string;
}
