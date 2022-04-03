import {useMemo} from 'react';
import {oraseRomania} from 'constants/data/romania.locations';

const useJudeteOptions = () => {
  const judeteOptions = useMemo(
    () =>
      oraseRomania
        .map(oras => ({
          name: oras.judet,
          id: oras.judet,
        }))
        .sort((oras1, oras2) => oras1.name.localeCompare(oras2.name)),
    [],
  );
  return judeteOptions;
};
export default useJudeteOptions;
