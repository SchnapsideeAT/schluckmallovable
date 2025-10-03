import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';

export const useKeyboard = () => {
  useEffect(() => {
    // Defensive init: always set to 0px
    document.documentElement.style.setProperty('--keyboard-height', '0px');

    // Only native platforms need keyboard listeners
    if (!Capacitor.isNativePlatform()) return;

    const onShow = (info: any) => {
      const h = info?.keyboardHeight || info?.height || 0;
      document.documentElement.style.setProperty('--keyboard-height', `${h}px`);
    };

    const onHide = () => {
      document.documentElement.style.setProperty('--keyboard-height', '0px');
    };

    // Setup listeners
    const setupListeners = async () => {
      const listeners = await Promise.all([
        Keyboard.addListener('keyboardWillShow', onShow),
        Keyboard.addListener('keyboardDidShow', onShow),
        Keyboard.addListener('keyboardWillHide', onHide),
        Keyboard.addListener('keyboardDidHide', onHide)
      ]);
      return listeners;
    };

    let listenersPromise = setupListeners();

    // Safeguard: reset on visibility change
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        document.documentElement.style.setProperty('--keyboard-height', '0px');
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      listenersPromise.then(listeners => {
        listeners.forEach(l => l.remove());
      });
      document.removeEventListener('visibilitychange', onVisibilityChange);
      // Final reset on cleanup
      document.documentElement.style.setProperty('--keyboard-height', '0px');
    };
  }, []);
};
