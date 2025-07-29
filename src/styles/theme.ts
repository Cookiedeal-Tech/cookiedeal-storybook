const theme = {
  typos: {
    display1Bold: { fontSize: '3rem', lineHeight: 1.2, fontWeight: 700 },
    display1Medium: { fontSize: '3rem', lineHeight: 1.2, fontWeight: 500 },
    display1Regular: { fontSize: '3rem', lineHeight: 1.2, fontWeight: 400 },
    display2Bold: { fontSize: '2.5rem', lineHeight: 1.2, fontWeight: 700 },
    display2Medium: { fontSize: '2.5rem', lineHeight: 1.2, fontWeight: 500 },
    display2Regular: { fontSize: '2.5rem', lineHeight: 1.2, fontWeight: 400 },
    title1Bold: { fontSize: '1.75rem', lineHeight: 1.4, fontWeight: 700 },
    title1Medium: { fontSize: '1.75rem', lineHeight: 1.4, fontWeight: 500 },
    title1Regular: { fontSize: '1.75rem', lineHeight: 1.4, fontWeight: 400 },
    title2Bold: { fontSize: '1.5rem', lineHeight: 1.4, fontWeight: 700 },
    title2Medium: { fontSize: '1.5rem', lineHeight: 1.4, fontWeight: 500 },
    title2Regular: { fontSize: '1.5rem', lineHeight: 1.4, fontWeight: 400 },
    subtitle1Bold: { fontSize: '1.25rem', lineHeight: 1.4, fontWeight: 700 },
    subtitle1Medium: { fontSize: '1.25rem', lineHeight: 1.4, fontWeight: 500 },
    subtitle1Regular: { fontSize: '1.25rem', lineHeight: 1.4, fontWeight: 400 },
    subtitle2Bold: { fontSize: '1.125rem', lineHeight: 1.4, fontWeight: 700 },
    subtitle2Medium: { fontSize: '1.125rem', lineHeight: 1.4, fontWeight: 500 },
    subtitle2Regular: {
      fontSize: '1.125rem',
      lineHeight: 1.4,
      fontWeight: 400,
    },
    body1Bold: { fontSize: '1rem', lineHeight: 1.6, fontWeight: 700 },
    body1Medium: { fontSize: '1rem', lineHeight: 1.6, fontWeight: 500 },
    body1Regular: { fontSize: '1rem', lineHeight: 1.6, fontWeight: 400 },
    body2Bold: { fontSize: '0.875rem', lineHeight: 1.6, fontWeight: 700 },
    body2Medium: { fontSize: '0.875rem', lineHeight: 1.6, fontWeight: 500 },
    body2Regular: { fontSize: '0.875rem', lineHeight: 1.6, fontWeight: 400 },
    label1Bold: { fontSize: '1rem', lineHeight: 1, fontWeight: 700 },
    label1Medium: { fontSize: '1rem', lineHeight: 1, fontWeight: 500 },
    label1Regular: { fontSize: '1rem', lineHeight: 1, fontWeight: 400 },
    label2Bold: { fontSize: '0.875rem', lineHeight: 1, fontWeight: 700 },
    label2Medium: { fontSize: '0.875rem', lineHeight: 1, fontWeight: 500 },
    label2Regular: { fontSize: '0.875rem', lineHeight: 1, fontWeight: 400 },
    label3Bold: { fontSize: '0.75rem', lineHeight: 1, fontWeight: 700 },
    label3Medium: { fontSize: '0.75rem', lineHeight: 1, fontWeight: 500 },
    label3Regular: { fontSize: '0.75rem', lineHeight: 1, fontWeight: 400 },
    caption1Bold: { fontSize: '0.75rem', lineHeight: 1.36, fontWeight: 700 },
    caption1Medium: { fontSize: '0.75rem', lineHeight: 1.36, fontWeight: 500 },
    caption1Regular: { fontSize: '0.75rem', lineHeight: 1.36, fontWeight: 400 },
  },

  colors: {
    // Texts
    textDefaultWeak: '#868E96',
    textDefaultWeaker: '#ADB5BD',
    textDefaultNormal: '#495057',
    textDefaultStrong: '#212529',
    textDefaultOnColor: '#ffffff',

    textBrandNormal: '#0549CC',
    textDisabledNormal: '#ADB5BD',
    textDangerNormal: '#DA4343',
    textPositiveNormal: '#3E9E53',
    textWarningNormal: '#E8A43D',
    textHighlightNormal: '#7C3AED',

    // Icons
    iconDefaultWeak: '#ADB5BD',
    iconDefaultNormal: '#495057',
    iconDefaultStrong: '#212529',
    iconDefaultOnGoing: '#ffffff',

    iconBrandNormal: '#0549CC',
    iconDisabledNormal: '#ADB5BD',
    iconDangerNormal: '#DA4343',
    iconPositiveNormal: '#4EC568',
    iconWarningNormal: '#E8A43D',
    iconHighlightNormal: '#7C3AED',

    // Borders
    borderDefaultWeaker: '#DEE2E6',
    borderDefaultWeak: '#CED4DA',
    borderDefaultNormal: '#ADB5BD',
    borderBrandNormal: '#0549CC',
    borderDisabledNormal: '#DEE2E6',
    borderDangerNormal: '#DA4343',

    // Backgrounds
    backgroundDefaultDifferentiate: '#F8F9FA',
    backgroundDefaultPressed: '#E9ECEF',
    backgroundDefaultHover: '#F1F3F5',
    backgroundDefaultNormal: '#ffffff',
    backgroundDefaultStrong: '#F1F3F5',
    backgroundDefaultStronger: '#E9ECEF',
    backgroundDefaultStrongest: '#DEE2E6',
    backgroundDefaultBlack: '#343A40',

    backgroundBrandWeaker: '#EBF1FB',
    backgroundBrandWeak: '#D8E2F7',
    backgroundBrandNormal: '#0549CC',
    backgroundBrandStrong: '#043AA3',
    backgroundBrandStronger: '#032C7B',

    backgroundDisabledButton: '#CED4DA',
    backgroundDisabledInput: '#F1F3F5',

    backgroundDangerWeaker: '#FCF0F0',
    backgroundDangerWeak: '#F9E2E2',
    backgroundDangerNormal: '#DA4343',
    backgroundDangerStrong: '#AE3636',
    backgroundDangerStronger: '#842828',

    backgroundPositiveWeaker: '#F1FAF3',
    backgroundPositiveWeak: '#E3F6E7',
    backgroundPositiveNormal: '#3E9E53',
    backgroundPositiveStrong: '#2F773F',
    backgroundPositiveStronger: '#255E32',

    backgroundWarningWeaker: '#FDF8F0',
    backgroundWarningWeak: '#FBF1E1',
    backgroundWarningNormal: '#E8A43D',
    backgroundWarningStrong: '#BA8331',
    backgroundWarningStronger: '#8C6325',

    backgroundHighlightWeaker: '#F5F3FF',
    backgroundHighlightWeak: '#EDE9FE',
    backgroundHighlightNormal: '#8B5CF6',
    backgroundHighlightStrong: '#7C3AED',
    backgroundHighlightStronger: '#6D28D9',

    chartColors: [
      '#0549CC',
      '#46C0BA',
      '#FB963E',
      '#E76296',
      '#868E96',
      '#ADB5BD',
      '#CED4DA',
      '#DEE2E6',
      '#E9ECEF',
      '#F6F6F6',
    ],
  },
  device: {
    mobile: `@media only screen and (max-width: 767px)`,
    tablet: `@media only screen and (min-width: 768px) and (max-width: 1023px)`,
    belowTablet: `@media only screen and (max-width: 1023px)`, // 1023px 이하 공통
  },
};

export type ColorType = keyof typeof theme.colors;
export type TypoType = keyof typeof theme.typos;

export default theme;
