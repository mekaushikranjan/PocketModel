import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { CopyIcon, CheckCircleIcon } from '../../assets/icons';

import { useTheme } from '../../hooks';

import { createStyles } from './styles';

interface CodeBlockHeaderProps {
  language: string;
  content: string;
}

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const CodeBlockHeader: React.FC<CodeBlockHeaderProps> = ({
  language,
  content,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = () => {
    ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    Clipboard.setString(content.trim());
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <View style={styles.codeHeader}>
      <Text style={styles.codeLanguage} numberOfLines={1} ellipsizeMode="tail">
        {language}
      </Text>
      <TouchableOpacity onPress={handleCopy} style={styles.iconTouchable}>
        {isCopied ? (
          <CheckCircleIcon
            width={16}
            height={16}
            stroke={theme.colors.onSurfaceVariant}
          />
        ) : (
          <CopyIcon
            width={16}
            height={16}
            stroke={theme.colors.onSurfaceVariant}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
