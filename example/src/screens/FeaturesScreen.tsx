import { useRef, type ComponentType, type ReactElement } from 'react';
import { FlatList } from 'react-native';
import type { ParamListBase } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCompareText } from '../components/CompareText';
import { screenStyles } from '../components/Specimen';
import { DirectionSection } from '../sections/DirectionSection';

type Props = NativeStackScreenProps<ParamListBase>;

// One prop per section, one value per row (multi-prop rows live on Examples).
// Each section is a component in ../sections/, named after its prop.
//
// FlatList of pre-built elements: renderItem just returns the item, keeping virtualization.
// Search field is a sticky ListHeaderComponent; cover lives in `sections` so it scrolls
// away instead of pinning alongside the search field.
export default function FeaturesScreen({ navigation }: Props) {
  const showText = useCompareText(navigation);

  // Native-prop toggle, not state — avoids a re-render on every drag frame.
  const scrollRef = useRef<FlatList<ReactElement>>(null);

  // [title, Component] so search can filter on title directly. Key and title both
  // derive from `title` below, since every entry here shares the same showText prop.
  const sections: [string, ComponentType<{ showText: boolean }>][] = [
    ['Direction', DirectionSection],
  ];

  const query = '';
  const items: ReactElement[] = [
    ...sections
      .filter(([title]) => title.toLowerCase().includes(query))
      .map(([title, Section]) => <Section key={title} showText={showText} />),
  ];

  return (
    <FlatList<ReactElement>
      ref={scrollRef}
      style={screenStyles.scroll}
      contentContainerStyle={screenStyles.container}
      data={items}
      renderItem={({ item }) => item}
      keyExtractor={(item, index) => item.key ?? String(index)}
    />
  );
}
