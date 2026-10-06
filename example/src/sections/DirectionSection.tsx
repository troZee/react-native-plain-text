import { Text, View } from 'react-native';
import { Section, screenStyles, TextItem } from '../components/Specimen';
import { PARAGRAPH, PARAGRAPH_LONG, sharedStyles } from './shared';

const TEXT_ALIGNS = ['left', 'center', 'right', 'justify', 'auto'] as const;

export function DirectionSection({ showText }: { showText: boolean }) {
  return (
    <Section title="Direction">
      {(['rtl', 'ltr'] as const).map((direction) => (
        <View key={direction} style={{ direction }}>
          {TEXT_ALIGNS.map((textAlign) => (
            <View key={textAlign}>
              <TextItem
                label={`${direction} / ${textAlign}`}
                showText={showText}
                style={[sharedStyles.body, { textAlign }]}
                containerStyle={screenStyles.wideRow}
              >
                {`${direction}-${textAlign} ${textAlign === 'justify' ? PARAGRAPH_LONG : PARAGRAPH}`}
              </TextItem>
              <Text
                style={[sharedStyles.body, { textAlign }, { borderColor: 'red', borderWidth: 1 }]}
              >
                {`${direction}-${textAlign} ${textAlign === 'justify' ? PARAGRAPH_LONG : PARAGRAPH}`}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </Section>
  );
}
