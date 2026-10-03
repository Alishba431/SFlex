// Pastel colour palette
export const colors = {
  background: '#FBF7F4',
  card: '#FFFFFF',
  text: '#3F3D56',
  muted: '#8E8AA0',
  border: '#EFE8F2',

  lavender: '#E9E2FF',
  lavenderDark: '#7C6BC4',
  mint: '#D7F3E5',
  mintDark: '#3E9B6E',
  peach: '#FFE6D5',
  peachDark: '#C9733F',
  pink: '#FFDCE5',
  pinkDark: '#C4587A',
  sky: '#DDEFFC',
  skyDark: '#4A86B5',
};

// Colours for each attendance status
export const statusStyles = {
  safe: { label: 'Safe', bg: colors.mint, text: colors.mintDark, bar: '#9ADBB9' },
  warning: { label: 'Borderline', bg: colors.peach, text: colors.peachDark, bar: '#FFC49E' },
  danger: { label: 'At risk', bg: colors.pink, text: colors.pinkDark, bar: '#F6A5BB' },
};

export const chartConfig = {
  backgroundGradientFrom: colors.card,
  backgroundGradientTo: colors.card,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(124, 107, 196, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(142, 138, 160, ${opacity})`,
  barPercentage: 0.6,
  propsForBackgroundLines: { stroke: colors.border },
};
