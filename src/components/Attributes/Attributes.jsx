import {
  ATTRIBUTES,
  ATTRIBUTE_META,
  ATTRIBUTE_DESCRIPTIONS
} from '../../utils/constants';

/**
 * Attributes component
 *
 * Props:
 *  - attributes: { [key]: number }  // total values (including bonuses)
 *  - raceBonuses: { [key]: number }  // e.g. { strength: 2, dexterity: 0, ... }
 *  - onChange: function(newAttributes)  // receives attributes object (total values including bonuses)
 *
 * Optional props to override defaults:
 *  - min, max, step         // numeric range for sliders
 *  - attributeOrder        // array of keys or objects {key,label} to override ATTRIBUTES ordering
 *  - attributeLabels       // { key: label } map to override labels
 */
const Attributes = ({
  attributes = {},
  raceBonuses = {},
  onChange,
  min,
  max,
  step,
  attributeOrder,
  attributeLabels
}) => {
  // Merge props with defaults
  const meta = {
    min: typeof min === 'number' ? min : ATTRIBUTE_META.min,
    max: typeof max === 'number' ? max : ATTRIBUTE_META.max,
    step: typeof step === 'number' ? step : ATTRIBUTE_META.step
  };

  // Build the list of attributes to render (preserve order)
  // attributeOrder can be an array of keys or objects { key, label }.
  const attributesToRender = Array.isArray(attributeOrder) && attributeOrder.length > 0
    ? attributeOrder.map(item => {
        if (typeof item === 'string') {
          const def = ATTRIBUTES.find(a => a.key === item);
          return def || { key: item, label: (attributeLabels && attributeLabels[item]) || item };
        }
        // assume object with { key, label }
        return { key: item.key, label: item.label || (attributeLabels && attributeLabels[item.key]) || item.key };
      })
    : ATTRIBUTES.map(a => ({ key: a.key, label: (attributeLabels && attributeLabels[a.key]) || a.label }));

  // Helper to read current total and base values safely
  const getTotalValue = (key) => {
    const raw = Number(attributes[key]);
    return Number.isFinite(raw) ? raw : (ATTRIBUTE_META.defaultBaseValue + (raceBonuses[key] || 0));
  };

  const getRaceBonus = (key) => {
    const b = Number(raceBonuses && raceBonuses[key]);
    return Number.isFinite(b) ? b : 0;
  };

  // When slider changes, slider value is representing baseValue (without race bonus).
  // We therefore add the bonus to compute the total value to send to parent.
  const handleAttributeChange = (key, baseValue) => {
    const bonus = getRaceBonus(key);
    const totalValue = parseInt(baseValue, 10) + parseInt(bonus, 10);
    // Build a new attributes object (shallow copy)
    const newAttributes = {
      ...attributes,
      [key]: totalValue
    };
    if (typeof onChange === 'function') onChange(newAttributes);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Attributes</h2>

      {attributesToRender.map(({ key, label }) => {
        const bonus = getRaceBonus(key);
        const total = getTotalValue(key);
        const baseValue = total - bonus; // slider should represent base
        const description = ATTRIBUTE_DESCRIPTIONS[key] || '';

        return (
          <div key={key} className="mb-3">
            <div className="flex justify-between items-baseline">
              <div>
                <label className="block text-gray-700 mb-1 capitalize">{label}</label>
                {description && <p className="text-xs text-gray-500">{description}</p>}
              </div>

              <div className="text-right">
                {bonus !== 0 && (
                  <div className={`text-xs ${bonus > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {bonus > 0 ? `+${bonus}` : bonus} racial bonus
                  </div>
                )}
                <div className="font-bold text-lg">{total}</div>
              </div>
            </div>

            <div className="flex items-center mt-2">
              <input
                type="range"
                min={meta.min}
                max={meta.max}
                step={meta.step}
                value={baseValue}
                onChange={(e) => handleAttributeChange(key, parseInt(e.target.value, 10))}
                className="w-full mr-3"
              />
              {/* <span className="w-8 text-center font-bold">{total}</span> */}
            </div>
          </div>
        );
      })}

      <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
        <p className="font-medium">Attribute Controls</p>
        <p className="text-xs mt-1">
          Use sliders to adjust base attribute values. Race bonuses are applied automatically and shown next to each stat.
        </p>
      </div>
    </div>
  );
};

export default Attributes;
