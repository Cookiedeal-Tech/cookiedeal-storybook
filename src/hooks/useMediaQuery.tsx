'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery as useReactResponsiveMedaiQuery } from 'react-responsive';

export const useMediaQuery = () => {
  const [mobile, setMobile] = useState<boolean>(false);
  const [tablet, setTablet] = useState<boolean>(false);

  const isMobile = useReactResponsiveMedaiQuery({ maxWidth: 768 });
  const isTablet = useReactResponsiveMedaiQuery({
    minWidth: 768,
    maxWidth: 1023,
  });

  useEffect(() => {
    if (isMobile) {
      setMobile(true);
      setTablet(false);
    } else if (isTablet) {
      setMobile(false);
      setTablet(true);
    } else {
      setMobile(false);
      setTablet(false);
    }
  }, [isMobile, isTablet]);

  return { isMobile: mobile, isTablet: tablet, isDesktop: !mobile && !tablet };
};
