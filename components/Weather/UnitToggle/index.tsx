'use client';
// Packages
import classNames from 'classnames';
import Cookies from 'js-cookie';
// Hooks & Utilities
import { useStore } from '@/hooks/useStore';
// Styles
import sharedStyles from '../sharedWeatherStyles.module.css';

export function UnitToggle({
  usLabel,
  siLabel,
}: {
  usLabel: string;
  siLabel: string;
}) {
  const [unitSystem, setUnitSystem] = useStore((state: any) => [
    state.unitSystem,
    state.setUnitSystem,
  ]);

  const handleSelectUnitSystem = (unit: 'SI' | 'US') => {
    setUnitSystem(unit);
    Cookies.set('unitSystem', unit, { expires: 365 });
  };

  return (
    <>
      <div
        role="button"
        tabIndex={unitSystem === 'US' ? -1 : 0}
        className={classNames(
          sharedStyles.unit,
          unitSystem === 'US' ? sharedStyles.unitSelected : ''
        )}
        onClick={() => handleSelectUnitSystem('US')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSelectUnitSystem('US');
          }
        }}
        aria-pressed={unitSystem === 'US'}
        aria-label={`Switch to U.S. Measurements`}
      >
        {usLabel}
      </div>
      <div
        role="button"
        tabIndex={unitSystem === 'SI' ? -1 : 0}
        className={classNames(
          sharedStyles.unit,
          unitSystem === 'SI' ? sharedStyles.unitSelected : ''
        )}
        onClick={() => handleSelectUnitSystem('SI')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSelectUnitSystem('SI');
          }
        }}
        aria-pressed={unitSystem === 'SI'}
        aria-label={`Switch to International Measurements`}
      >
        {siLabel}
      </div>
    </>
  );
}
