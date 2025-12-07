export interface Profile {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  title?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  timezone?: string | null;
  company?: string | null;
  website?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  banner_url?: string | null;
  video_url?: string | null;
  joined_date?: string;
  completion_percentage?: number;
  rating?: number | null;
  reviews_count?: number | null;
}

export interface Credential {
  id: number;
  name: string;
  issuer?: string;
  year?: string;
  credential_id?: string;
  status?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description?: string;
  location?: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  field?: string;
  year?: string;
  grade?: string;
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price: string;
  duration?: string;
  status: string;
}

export interface Recommendation {
  id: number;
  author: string;
  title?: string;
  company?: string;
  relationship?: string;
  rating: number;
  text: string;
  featured?: boolean;
}
