/**
 * useDeepLinking Hook
 *
 * Handles deep link navigation from iOS Shortcuts
 * Must be called from a component inside NavigationContainer
 */

import { useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deepLinkService, DeepLinkParams } from '../services/DeepLinkService';
import { deepLinkStore } from '../store';
import { ROUTES } from '../utils/navigationConstants';

/**
 * Hook for handling deep link navigation
 * Call this once in a component inside NavigationContainer
 */
export const useDeepLinking = () => {
  const navigation = useNavigation();

  // Pal-specific deep linking logic removed
  const handleChatDeepLink = useCallback(
    async () => {
      // Legacy functionality removed
    },
    [],
  );

  const handleDeepLink = useCallback(
    async (params: DeepLinkParams) => {
      console.log('Handling deep link:', params);

      // Handle chat deep links (pal support removed)
      if (params.host === 'chat' && params.queryParams) {
        const { message } = params.queryParams;
        // Legacy pal support removed
      }
    },
    [handleChatDeepLink],
  );

  useEffect(() => {
    // Initialize deep link service
    deepLinkService.initialize();

    // Add deep link handler
    const removeListener = deepLinkService.addListener(handleDeepLink);

    // Cleanup on unmount
    return () => {
      removeListener();
      deepLinkService.cleanup();
    };
  }, [handleDeepLink]);
};

/**
 * Hook for accessing pending message state
 * Can be called from any component (doesn't require navigation)
 */
export const usePendingMessage = () => {
  return {
    pendingMessage: deepLinkStore.pendingMessage,
    clearPendingMessage: () => {
      deepLinkStore.clearPendingMessage();
    },
  };
};
