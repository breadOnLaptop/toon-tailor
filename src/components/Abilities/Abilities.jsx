import {
  CLASS_ABILITIES,
  RACE_ABILITIES,
  ABILITY_DESCRIPTIONS,
  DEFAULTS
} from '../../utils/constants';

import AbilityCard from './AbilityCard';

const Abilities = ({ character = {}, onChange, maxSelected }) => {
  // prefer prop override, then global default
  const limit = typeof maxSelected === 'number' ? maxSelected : DEFAULTS.MAX_SELECTED_ABILITIES;

  const classAbilities = CLASS_ABILITIES[character.class] || [];
  const raceAbilities = RACE_ABILITIES[character.race] || [];
  const selected = Array.isArray(character.selectedAbilities) ? character.selectedAbilities : [];

  const canSelectMore = (currentSelectedCount) => currentSelectedCount < limit;

  const handleAbilityToggle = (ability) => {
    const isSelected = selected.includes(ability);
    let newSelected;

    if (isSelected) {
      // remove
      newSelected = selected.filter(a => a !== ability);
    } else {
      // add (enforce limit)
      if (!canSelectMore(selected.length)) {
        alert(`You can only select up to ${limit} abilities at once.`);
        return;
      }
      newSelected = [...selected, ability];
    }

    onChange({
      ...character,
      selectedAbilities: newSelected
    });
  };

  const getAbilityDescription = (ability) => {
    return ABILITY_DESCRIPTIONS[ability] || 'No description available';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Abilities</h2>

      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Class Abilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {classAbilities.map((ability) => (
            <AbilityCard
              key={ability}
              ability={ability}
              selected={selected.includes(ability)}
              onToggle={handleAbilityToggle}
              description={getAbilityDescription(ability)}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Racial Abilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {raceAbilities.map((ability) => (
            <AbilityCard
              key={ability}
              ability={ability}
              selected={selected.includes(ability)}
              onToggle={handleAbilityToggle}
              description={getAbilityDescription(ability)}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 bg-gray-100 p-3 rounded">
        <h3 className="font-medium mb-2">
          Selected Abilities ({selected.length}/{limit})
        </h3>

        {selected.length > 0 ? (
          <ul className="list-disc pl-5">
            {selected.map(ability => (
              <li key={ability}>{ability}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No abilities selected yet</p>
        )}

        <p className="text-xs text-gray-500 mt-2">
          Click on abilities to select them. You can have up to {limit} active abilities at once.
        </p>
      </div>
    </div>
  );
};

export default Abilities;
