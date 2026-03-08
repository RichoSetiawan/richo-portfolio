export interface Profile {
    id: string;
    name: string;
    tagline: string | null;
    bio: string | null;
    university: string;
    major: string;
    gpa: number;
    avatarUrl: string | null;
    resumeUrl: string | null;
}

export interface Experience {
    id: string;
    title: string;
    position: string;
    company: string;
    location: string | null;
    startDate: string;
    endDate: string | null;
    isCurrent: boolean;
    description: string;
    fullDescription: string | null;
    imageUrl: string | null;
    skills: string | null;
    order: number;
}

export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    fullDescription: string | null;
    imageUrl: string | null;
    technologies: string | null;
    githubUrl: string | null;
    liveUrl: string | null;
    category: string;
    isDefault: boolean;
    projectType: string | null;
    order: number;
}

export interface Contact {
    id: string;
    type: string;
    label: string;
    value: string;
    icon: string | null;
    order: number;
}

export interface WeatherData {
    temp: number;
    feels_like: number;
    humidity: number;
    condition: string;
    description: string;
    icon: string;
    location: string;
}
