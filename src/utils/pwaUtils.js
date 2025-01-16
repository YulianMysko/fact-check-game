// Перевірка чи додаток вже встановлено
export const isPWAInstalled = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
  };
  
  // Показати підказку про встановлення
  export const showInstallPrompt = async () => {
    const promptEvent = window.deferredPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      const result = await promptEvent.userChoice;
      window.deferredPrompt = null;
      return result.outcome === 'accepted';
    }
    return false;
  };
  
  // Перевірка доступності оновлень
  export const checkForUpdates = async (registration) => {
    try {
      const newWorker = registration.installing || registration.waiting;
      
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Є нова версія
              return true;
            }
          }
        });
      }
      
      return false;
    } catch (error) {
      console.error('Error checking for updates:', error);
      return false;
    }
  };
  
  // Застосувати оновлення
  export const applyUpdate = (registration) => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };