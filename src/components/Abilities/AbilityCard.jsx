const AbilityCard = ({ ability, selected, onToggle, description }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onToggle(ability)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onToggle(ability);
      }}
      className={`border rounded p-2 cursor-pointer ${
        selected ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-medium">{ability}</h4>
        <div className="w-4 h-4 rounded-full border flex items-center justify-center">
          {selected && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
        </div>
      </div>
      {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
    </div>
  );
};

export default AbilityCard;
