import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster 
      richColors 
      position="top-right"
      closeButton
      duration={4000}
      toastOptions={{
        style: {
          background: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          color: 'hsl(var(--foreground))',
        },
      }}
    />
  );
}