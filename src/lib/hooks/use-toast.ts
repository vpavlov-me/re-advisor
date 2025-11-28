import { toast as sonnerToast } from 'sonner';

interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
}

export function useToast() {
  const toast = (options: ToastOptions) => {
    const { title, description, variant = 'default', duration } = options;
    
    const message = description ? `${title}: ${description}` : title;
    
    switch (variant) {
      case 'destructive':
        sonnerToast.error(message, { duration });
        break;
      case 'success':
        sonnerToast.success(message, { duration });
        break;
      default:
        sonnerToast(message, { duration });
    }
  };

  return { toast };
}
