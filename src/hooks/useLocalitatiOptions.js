import {useMemo} from 'react';
import {oraseComuneRomania} from 'constants/data/romania.locations';

const useLocalitatiOptions = judet => {
  const localitateOptions = useMemo(
    () =>
      oraseComuneRomania
        .filter(localitate => localitate.judet === judet)
        .map(oras => ({
          name: oras.diacritice,
          id: oras.diacritice,
        }))
        .sort((oras1, oras2) => oras1.name.localeCompare(oras2.name)),
    [judet],
  );
  return localitateOptions;
};
export default useLocalitatiOptions;
